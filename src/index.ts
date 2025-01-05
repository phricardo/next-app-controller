import { HttpStatus } from "./HttpStatus";
import { ControllerError } from "./errors";
import { NextRequest, NextResponse } from "next/server";
import { handleError, buildResponse } from "./controllerBuilders";

export { HttpStatus, buildResponse, ControllerError };

/**
 * Extracts the Bearer token from the Authorization header.
 * @param request The incoming NextRequest.
 * @returns The Bearer token or an empty string if not found.
 */
function getAuthorizationToken(request: NextRequest): string {
  const bearerPrefix = "Bearer ";
  const authorizationHeader = request.headers.get("Authorization") || "";
  if (!authorizationHeader.startsWith(bearerPrefix)) return "";
  return authorizationHeader.slice(bearerPrefix.length);
}

class CustomHeaders extends Headers {
  private request: NextRequest;

  constructor(request: NextRequest) {
    super(request.headers);
    this.request = request;
  }

  getBearerToken(): string {
    return getAuthorizationToken(this.request as NextRequest);
  }

  /**
   * Parses and returns cookies as a key-value object.
   * @returns An object representing the cookies.
   */
  getCookies(): Record<string, string> {
    const cookieHeader = this.get("cookie") || "";
    return Object.fromEntries(
      cookieHeader.split(";").map((cookie) => {
        const [key, value] = cookie.split("=").map((part) => part.trim());
        return [key, decodeURIComponent(value)];
      }),
    );
  }
}

type ControllerContext<T> = {
  request: NextRequest;
  context?: {
    params?: Record<string, string>;
    searchParams?: Record<string, string>;
  };
  body?: T;
  headers: CustomHeaders;
};

interface HandlerResponse {
  data?: unknown;
  response: {
    httpStatus: number;
  };
}

/**
 * Wrapper function to handle API route logic with error handling and context preparation.
 * @param handler The function that handles the request logic.
 * @returns A handler for Next.js API routes.
 */
export function controller<T extends HandlerResponse | NextResponse>(
  handler: (
    ctx: ControllerContext<T>,
  ) => Promise<HandlerResponse | NextResponse>,
) {
  /**
   * Main request handler.
   * @param request The incoming NextRequest object.
   * @param context Additional context, such as route parameters.
   * @returns A Next.js Response object.
   */
  const handleRequest = async (
    request: NextRequest,
    context: { params?: Record<string, string> },
  ): Promise<Response> => {
    const params = context.params || {};
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    );

    const requestBody: T | undefined =
      request.method !== "GET"
        ? await request.json().catch(() => undefined)
        : undefined;

    const ctx: ControllerContext<T> = {
      request,
      context: {
        params,
        searchParams,
      },
      body: requestBody,
      headers: new CustomHeaders(request),
    };

    try {
      const result = await handler(ctx);

      if (result instanceof NextResponse) {
        return result;
      }

      return buildResponse({
        data: result.data,
        response: { httpStatus: result.response.httpStatus },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  };

  /**
   * Adds authorization logic to the request handler.
   * @param authorizationCheck A function to check the token's validity.
   * @returns A handler with authorization.
   */
  handleRequest.authorize = function (
    authorizationCheck: (token: string) => boolean | Promise<boolean>,
  ) {
    return async (
      request: NextRequest,
      context: { params?: Record<string, string> },
    ) => {
      try {
        const token = getAuthorizationToken(request);
        const isAuthorized = await authorizationCheck(token);

        if (!isAuthorized) {
          throw new ControllerError(
            "UNAUTHORIZED",
            "Unauthorized resource access",
            HttpStatus.UNAUTHORIZED,
          );
        }

        return handleRequest(request, context);
      } catch (error: unknown) {
        return handleError(error);
      }
    };
  };

  return handleRequest;
}
