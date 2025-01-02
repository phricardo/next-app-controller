import { NextRequest } from "next/server";

/**
 * Represents the context for a controller in a Next.js API route.
 * Provides structured access to the request, parameters, search parameters, and request body.
 */
export type ControllerContext<T> = {
  /**
   * The original Next.js `NextRequest` object.
   * Contains information about the HTTP request, including headers, URL, and method.
   */
  request: NextRequest;

  /**
   * Optional contextual information about the route.
   * Includes:
   * - `params`: Route parameters extracted from dynamic routes (e.g., `[id]`).
   * - `searchParams`: Query parameters from the URL.
   * These can be undefined or null if not present in the request.
   */
  context?: {
    params: Record<string, string> | undefined | null;
    searchParams: Record<string, string> | undefined | null;
  };

  /**
   * The parsed body of the request.
   * This is typically available for POST, PUT, or PATCH requests.
   * The type `T` allows flexibility to define the expected structure of the body.
   */
  body?: T;
};
