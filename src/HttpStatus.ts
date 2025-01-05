/**
 * Enumeration representing common HTTP status codes and their numeric values.
 */
enum HttpStatusEnum {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * A mapping of HTTP status codes to their corresponding textual descriptions.
 */
const HttpStatusEnumText: Record<HttpStatusEnum, string> = {
  [HttpStatusEnum.OK]: "OK",
  [HttpStatusEnum.CREATED]: "Created",
  [HttpStatusEnum.ACCEPTED]: "Accepted",
  [HttpStatusEnum.NO_CONTENT]: "No Content",
  [HttpStatusEnum.BAD_REQUEST]: "Bad Request",
  [HttpStatusEnum.UNAUTHORIZED]: "Unauthorized",
  [HttpStatusEnum.FORBIDDEN]: "Forbidden",
  [HttpStatusEnum.NOT_FOUND]: "Not Found",
  [HttpStatusEnum.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatusEnum.SERVICE_UNAVAILABLE]: "Service Unavailable",
};

/**
 * Exporting individual status codes for convenient usage.
 */
export const OK = HttpStatusEnum.OK;
export const CREATED = HttpStatusEnum.CREATED;
export const ACCEPTED = HttpStatusEnum.ACCEPTED;
export const NO_CONTENT = HttpStatusEnum.NO_CONTENT;
export const BAD_REQUEST = HttpStatusEnum.BAD_REQUEST;
export const UNAUTHORIZED = HttpStatusEnum.UNAUTHORIZED;
export const FORBIDDEN = HttpStatusEnum.FORBIDDEN;
export const NOT_FOUND = HttpStatusEnum.NOT_FOUND;
export const INTERNAL_SERVER_ERROR = HttpStatusEnum.INTERNAL_SERVER_ERROR;
export const SERVICE_UNAVAILABLE = HttpStatusEnum.SERVICE_UNAVAILABLE;

/**
 * Utility class to provide additional functionality around HTTP status codes.
 */
export class HttpStatus {
  static OK = HttpStatusEnum.OK;
  static CREATED = HttpStatusEnum.CREATED;
  static ACCEPTED = HttpStatusEnum.ACCEPTED;
  static NO_CONTENT = HttpStatusEnum.NO_CONTENT;
  static BAD_REQUEST = HttpStatusEnum.BAD_REQUEST;
  static UNAUTHORIZED = HttpStatusEnum.UNAUTHORIZED;
  static FORBIDDEN = HttpStatusEnum.FORBIDDEN;
  static NOT_FOUND = HttpStatusEnum.NOT_FOUND;
  static INTERNAL_SERVER_ERROR = HttpStatusEnum.INTERNAL_SERVER_ERROR;
  static SERVICE_UNAVAILABLE = HttpStatusEnum.SERVICE_UNAVAILABLE;

  /**
   * Retrieves the textual description of a given HTTP status code.
   * @param status The HTTP status code.
   * @returns The textual description of the status code, or "Unknown Status" if not found.
   */
  static getStatusText(status: HttpStatusEnum): string {
    return HttpStatusEnumText[status] || "Unknown Status";
  }

  /**
   * Validates and converts a numeric HTTP status code to the corresponding `HttpStatusEnum` value.
   * @param statusCode The numeric HTTP status code.
   * @returns The corresponding `HttpStatusEnum` value if valid, or `undefined` otherwise.
   */
  static fromCode(statusCode: number): HttpStatusEnum | undefined {
    return Object.values(HttpStatusEnum).includes(statusCode as HttpStatusEnum)
      ? (statusCode as HttpStatusEnum)
      : undefined;
  }

  /**
   * Retrieves both the numeric HTTP status code and its textual description.
   * @param statusCode The numeric HTTP status code.
   * @returns An object containing the status code and its description, or `undefined` if the code is invalid.
   */
  static getStatusWithText(
    statusCode: number,
  ): { status: HttpStatusEnum; text: string } | undefined {
    const status = this.fromCode(statusCode);
    if (status) {
      return { status, text: this.getStatusText(status) };
    }
    return undefined;
  }
}
