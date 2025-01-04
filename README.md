![next-app-controller](./.github/logos/logo_repo.png "Next App Controller")

# API Route Handler Library for Next.js

This library is designed to streamline the creation and organization of **API route handlers** in Next.js applications. It offers an efficient way to structure and manage API routes, making them reusable, scalable, and easy to maintain. The project provides a modular and extensible framework for building controllers in Next.js, focusing on simplifying the development of robust APIs. Key features include response standardization and consistent error handling, ensuring a clean and predictable API development process.

- Easily create modular **API route handlers** in Next.js.
- Integrates seamlessly with libraries like `zod` for data validation.
- Simple to configure and extend for more complex use cases.
- Supports TypeScript for better development experience.

## Features

- **HTTP Status Enumeration**:  
  Provides an enumeration (`HttpStatus`) for the most common HTTP status codes, enabling simple and consistent access. Includes helper methods to map codes to textual descriptions and validate status codes.

- **Response Builders**:  
  Includes utility functions like `buildResponse` and `buildError` to standardize API response structures, simplifying the creation of responses with customized headers, messages, and data.

- **Error Handling**:  
  A custom error class (`ControllerError`) ensures consistent error identification and handling. The `handleError` method automatically processes various error types, such as validation errors (via `ZodError`) or custom exceptions, delivering clear and specific responses.

- **Context Definition**:  
  Through the `ControllerContext` type, it offers a clear and structured way to access request information, including the body, route parameters, and query strings.

- **Integration with Next.js**:  
  Optimized for use with Next.js API Routes, leveraging objects like `NextRequest` and `NextResponse`.

- **Extensibility and Clarity**:  
  The modular architecture simplifies extensions and maintenance while ensuring that the code remains organized and readable.

## Use Cases

- Creating REST APIs with standardized responses.
- Centralized and detailed error handling in controllers.
- Facilitating the mapping and documentation of HTTP status codes and their meanings.
- Structuring business logic within controllers with strong typing and validation support.

## Installation

To install `next-app-controller`, use npm or yarn:

```bash
npm install next-app-controller
```

## Contributors

<a href="https://github.com/phricardo/next-app-controller/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=phricardo/next-app-controller&max=500" alt="Contributors" />
</a>
