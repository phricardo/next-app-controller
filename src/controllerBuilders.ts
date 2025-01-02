import { ZodError } from "zod";
import { HttpStatus } from "./HttpStatus";
import { NextResponse } from "next/server";
import { ControllerError } from "./errors";

/**
 * Builds a standard HTTP response for API routes.
 * @param data The response data, which can be any valid response body.
 * @param response The response metadata, including HTTP status code and optional headers.
 * @param contentType The content type of the response, default is "application/json".
 * @returns A Next.js `NextResponse` object with the formatted body and headers.
 */
export function buildResponse({
  data,
  response,
  contentType = "application/json",
}: {
  data: unknown;
  response: { httpStatus: number; headers?: Record<string, string> };
  contentType?: string;
}) {
  // Create a new Headers object based on the provided response headers
  const headers = new Headers(response.headers);

  /**
   * Converts an HTTP status code into the corresponding `HttpStatusEnum` value
   * and retrieves its textual description.
   */
  const statusEnum = HttpStatus.fromCode(response.httpStatus);
  // Attempts to map the numeric HTTP status code (`response.httpStatus`) to a value
  // in the `HttpStatusEnum` enumeration. If the code is valid, `statusEnum` will
  // hold the corresponding `HttpStatusEnum` value; otherwise, it will be `undefined`.

  const statusText =
    statusEnum !== undefined ? HttpStatus.getStatusText(statusEnum) : null;
  // If `statusEnum` is not `undefined`, retrieves the textual description of the
  // HTTP status using `HttpStatus.getStatusText(statusEnum)` (e.g., "OK" for 200).
  // If `statusEnum` is `undefined`, assigns `null` to `statusText`.

  // Set the Content-Type header to the provided or default content type
  headers.set("Content-Type", contentType);

  // If the content type is "application/json", convert data to a JSON string; otherwise, use raw data
  const body = contentType === "application/json" ? JSON.stringify(data) : data;

  // Return a Next.js response with the status, headers, and body
  return new NextResponse(body as BodyInit, {
    status: response.httpStatus,
    ...(statusText ? { statusText } : {}),
    headers,
  });
}

/**
 * Helper function to build an error response.
 * @param key The error key, typically a string representing the error type.
 * @param message An optional error message providing more details.
 * @param response The response metadata, including HTTP status code.
 * @returns A formatted error response using `buildResponse`.
 */
function buildError({
  key,
  message,
  response,
}: {
  key: string;
  message?: string;
  response: { httpStatus: number };
}) {
  return buildResponse({
    data: {
      error: { key, ...(message && { message }) },
    },
    response,
  });
}

/**
 * Handles various types of errors by mapping them to appropriate HTTP responses.
 * - ZodError results in a 400 Bad Request response.
 * - ControllerError uses its own error status code.
 * - Any other error defaults to a 400 Bad Request response.
 * @param error The error encountered during the request processing.
 * @returns A Next.js response with a standardized error message and HTTP status.
 */
export function handleError(error: unknown) {
  // If the error is a Zod validation error, return a bad request response with the error messages
  if (error instanceof ZodError) {
    return buildError({
      key: "VALIDATION_ERROR",
      message: error.errors.map((e) => e.message).join(", ") || "",
      response: { httpStatus: HttpStatus.BAD_REQUEST },
    });
  }

  // If the error is an instance of ControllerError, return the error with its own status code
  if (error instanceof ControllerError) {
    return buildError({
      key: error.key,
      message: error.message,
      response: { httpStatus: error.httpStatus },
    });
  }

  // For any other errors, return a generic unexpected error response with status 400
  return buildError({
    key: "UNEXPECTED_ERROR",
    message: error instanceof Error ? error.message : "Unknown error occurred",
    response: { httpStatus: HttpStatus.BAD_REQUEST },
  });
}
