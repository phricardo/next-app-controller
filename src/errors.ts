/**
 * Custom error class to standardize error handling in controllers.
 * Includes a unique key, detailed message, and associated HTTP status code.
 */
export class ControllerError extends Error {
  key: string; // A unique key to identify the specific error.
  message: string; // The error message, either provided or default.
  httpStatus: number; // The associated HTTP status code for the error.

  /**
   * Constructor for the `ControllerError` class.
   * @param key A unique key identifying the error.
   * @param message An optional detailed message for the error. If not provided, a default message is generated using the key.
   * @param httpStatus The HTTP status code for the error (default is 400 - Bad Request).
   */
  constructor(key: string, message?: string, httpStatus: number = 400) {
    // Generate a default message if none is provided.
    const defaultMessage = message || `An error occurred with key: ${key}`;
    super(defaultMessage); // Call the parent Error class constructor with the message.

    this.key = key;
    this.message = defaultMessage;
    this.httpStatus = httpStatus;
    this.name = this.constructor.name; // Set the error name to the class name.

    // Capture the stack trace for better debugging (if supported in the environment).
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
