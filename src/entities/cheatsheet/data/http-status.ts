import type { CheatsheetItem } from "../model/types";

export const httpStatusCodes: CheatsheetItem[] = [
  // 1xx Informational
  {
    code: "100",
    name: "Continue",
    description: "Server received request headers, client should proceed",
    category: "1xx Informational",
  },
  {
    code: "101",
    name: "Switching Protocols",
    description: "Server is switching protocols as requested",
    category: "1xx Informational",
  },
  {
    code: "102",
    name: "Processing",
    description: "Server is processing the request (WebDAV)",
    category: "1xx Informational",
  },
  {
    code: "103",
    name: "Early Hints",
    description: "Used to return response headers before final response",
    category: "1xx Informational",
  },

  // 2xx Success
  {
    code: "200",
    name: "OK",
    description: "Request succeeded",
    category: "2xx Success",
  },
  {
    code: "201",
    name: "Created",
    description: "Request fulfilled, new resource created",
    category: "2xx Success",
  },
  {
    code: "202",
    name: "Accepted",
    description: "Request accepted but not yet processed",
    category: "2xx Success",
  },
  {
    code: "203",
    name: "Non-Authoritative Info",
    description: "Metadata from third-party copy",
    category: "2xx Success",
  },
  {
    code: "204",
    name: "No Content",
    description: "Success but no content to return",
    category: "2xx Success",
  },
  {
    code: "205",
    name: "Reset Content",
    description: "Reset the document view",
    category: "2xx Success",
  },
  {
    code: "206",
    name: "Partial Content",
    description: "Partial resource returned (range requests)",
    category: "2xx Success",
  },
  {
    code: "207",
    name: "Multi-Status",
    description: "Multiple status codes (WebDAV)",
    category: "2xx Success",
  },

  // 3xx Redirection
  {
    code: "300",
    name: "Multiple Choices",
    description: "Multiple options for the resource",
    category: "3xx Redirection",
  },
  {
    code: "301",
    name: "Moved Permanently",
    description: "Resource moved permanently to new URL",
    category: "3xx Redirection",
  },
  {
    code: "302",
    name: "Found",
    description: "Resource temporarily at different URL",
    category: "3xx Redirection",
  },
  {
    code: "303",
    name: "See Other",
    description: "Redirect to another resource via GET",
    category: "3xx Redirection",
  },
  {
    code: "304",
    name: "Not Modified",
    description: "Resource not modified since last request",
    category: "3xx Redirection",
  },
  {
    code: "307",
    name: "Temporary Redirect",
    description: "Temporary redirect, keep request method",
    category: "3xx Redirection",
  },
  {
    code: "308",
    name: "Permanent Redirect",
    description: "Permanent redirect, keep request method",
    category: "3xx Redirection",
  },

  // 4xx Client Error
  {
    code: "400",
    name: "Bad Request",
    description: "Server cannot process due to client error",
    category: "4xx Client Error",
  },
  {
    code: "401",
    name: "Unauthorized",
    description: "Authentication required",
    category: "4xx Client Error",
  },
  {
    code: "402",
    name: "Payment Required",
    description: "Reserved for future use",
    category: "4xx Client Error",
  },
  {
    code: "403",
    name: "Forbidden",
    description: "Server refuses to authorize request",
    category: "4xx Client Error",
  },
  {
    code: "404",
    name: "Not Found",
    description: "Requested resource not found",
    category: "4xx Client Error",
  },
  {
    code: "405",
    name: "Method Not Allowed",
    description: "Request method not supported",
    category: "4xx Client Error",
  },
  {
    code: "406",
    name: "Not Acceptable",
    description: "No content matching Accept headers",
    category: "4xx Client Error",
  },
  {
    code: "407",
    name: "Proxy Auth Required",
    description: "Proxy authentication required",
    category: "4xx Client Error",
  },
  {
    code: "408",
    name: "Request Timeout",
    description: "Server timed out waiting for request",
    category: "4xx Client Error",
  },
  {
    code: "409",
    name: "Conflict",
    description: "Request conflicts with server state",
    category: "4xx Client Error",
  },
  {
    code: "410",
    name: "Gone",
    description: "Resource no longer available",
    category: "4xx Client Error",
  },
  {
    code: "411",
    name: "Length Required",
    description: "Content-Length header required",
    category: "4xx Client Error",
  },
  {
    code: "412",
    name: "Precondition Failed",
    description: "Precondition in headers not met",
    category: "4xx Client Error",
  },
  {
    code: "413",
    name: "Payload Too Large",
    description: "Request entity too large",
    category: "4xx Client Error",
  },
  {
    code: "414",
    name: "URI Too Long",
    description: "Request URI too long",
    category: "4xx Client Error",
  },
  {
    code: "415",
    name: "Unsupported Media Type",
    description: "Media type not supported",
    category: "4xx Client Error",
  },
  {
    code: "416",
    name: "Range Not Satisfiable",
    description: "Requested range not available",
    category: "4xx Client Error",
  },
  {
    code: "418",
    name: "I'm a Teapot",
    description: "Server refuses to brew coffee (RFC 2324)",
    category: "4xx Client Error",
  },
  {
    code: "422",
    name: "Unprocessable Entity",
    description: "Request well-formed but semantically incorrect",
    category: "4xx Client Error",
  },
  {
    code: "429",
    name: "Too Many Requests",
    description: "Rate limit exceeded",
    category: "4xx Client Error",
  },
  {
    code: "451",
    name: "Unavailable For Legal",
    description: "Blocked for legal reasons",
    category: "4xx Client Error",
  },

  // 5xx Server Error
  {
    code: "500",
    name: "Internal Server Error",
    description: "Unexpected server condition",
    category: "5xx Server Error",
  },
  {
    code: "501",
    name: "Not Implemented",
    description: "Server doesn't support functionality",
    category: "5xx Server Error",
  },
  {
    code: "502",
    name: "Bad Gateway",
    description: "Invalid response from upstream server",
    category: "5xx Server Error",
  },
  {
    code: "503",
    name: "Service Unavailable",
    description: "Server temporarily unavailable",
    category: "5xx Server Error",
  },
  {
    code: "504",
    name: "Gateway Timeout",
    description: "Upstream server timed out",
    category: "5xx Server Error",
  },
  {
    code: "505",
    name: "HTTP Version Not Supported",
    description: "HTTP version not supported",
    category: "5xx Server Error",
  },
  {
    code: "507",
    name: "Insufficient Storage",
    description: "Server cannot store representation",
    category: "5xx Server Error",
  },
  {
    code: "508",
    name: "Loop Detected",
    description: "Infinite loop detected (WebDAV)",
    category: "5xx Server Error",
  },
  {
    code: "511",
    name: "Network Auth Required",
    description: "Network authentication required",
    category: "5xx Server Error",
  },
];
