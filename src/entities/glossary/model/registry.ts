import type { GlossaryTerm, GlossaryTermSlug } from "./types";

export const glossaryTerms: Record<GlossaryTermSlug, GlossaryTerm> = {
  json: {
    slug: "json",
    term: "JSON",
    acronymFor: "JavaScript Object Notation",
    shortDefinition:
      "A lightweight data interchange format that is easy for humans to read and write.",
    fullDefinition:
      "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. Despite its name, JSON is language-independent and is widely used across different programming languages. It uses human-readable text to store and transmit data objects consisting of key-value pairs and arrays. JSON has become the de facto standard for data exchange on the web, particularly in REST APIs and configuration files.",
    examples: [
      '{"name": "John", "age": 30}',
      '["apple", "banana", "cherry"]',
      '{"users": [{"id": 1}, {"id": 2}]}',
    ],
    useCases: [
      "API request and response payloads",
      "Configuration files (package.json, tsconfig.json)",
      "Data storage and transfer",
      "Web application state management",
    ],
    relatedTerms: ["yaml", "xml", "json-schema", "api", "rest"],
    relatedTools: ["json-formatter", "json-to-typescript", "diff-checker"],
    category: "data-formats",
    seoKeywords: [
      "what is json",
      "json format",
      "json example",
      "json definition",
    ],
  },
  jwt: {
    slug: "jwt",
    term: "JWT",
    acronymFor: "JSON Web Token",
    shortDefinition:
      "A compact, URL-safe token format for securely transmitting information between parties.",
    fullDefinition:
      "JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWTs can be signed using a secret (HMAC) or a public/private key pair (RSA/ECDSA). They are commonly used for authentication and information exchange, particularly in single sign-on (SSO) scenarios.",
    examples: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    ],
    useCases: [
      "User authentication",
      "API authorization",
      "Single Sign-On (SSO)",
      "Information exchange between services",
    ],
    relatedTerms: ["oauth", "base64", "hashing", "encoding"],
    relatedTools: ["jwt-decoder"],
    category: "security",
    seoKeywords: [
      "what is jwt",
      "jwt token",
      "jwt authentication",
      "json web token",
    ],
  },
  base64: {
    slug: "base64",
    term: "Base64",
    shortDefinition:
      "A binary-to-text encoding scheme that represents binary data in ASCII string format.",
    fullDefinition:
      "Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media designed to deal with text. This ensures that the data remains intact without modification during transport.",
    examples: [
      "SGVsbG8gV29ybGQ= (Hello World)",
      "data:image/png;base64,iVBORw0KGgo...",
    ],
    useCases: [
      "Embedding images in HTML/CSS (Data URIs)",
      "Email attachments (MIME)",
      "Storing binary data in JSON",
      "URL-safe data transmission",
    ],
    relatedTerms: ["encoding", "data-uri", "binary", "mime-type"],
    relatedTools: ["base64-converter"],
    category: "encoding",
    seoKeywords: [
      "what is base64",
      "base64 encoding",
      "base64 decode",
      "base64 image",
    ],
  },
  uuid: {
    slug: "uuid",
    term: "UUID",
    acronymFor: "Universally Unique Identifier",
    shortDefinition:
      "A 128-bit identifier that is unique across all devices and time.",
    fullDefinition:
      "A Universally Unique Identifier (UUID) is a 128-bit label used for information in computer systems. UUIDs are standardized by the Open Software Foundation (OSF) as part of the Distributed Computing Environment (DCE). When generated according to the standard methods, UUIDs are unique enough that the probability of duplicates is negligible. They are commonly used for database primary keys, session identifiers, and distributed systems.",
    examples: [
      "550e8400-e29b-41d4-a716-446655440000",
      "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    ],
    useCases: [
      "Database primary keys",
      "Session identifiers",
      "Distributed system identifiers",
      "File naming for uniqueness",
    ],
    relatedTerms: ["hashing"],
    relatedTools: ["uuid-generator"],
    category: "standards",
    seoKeywords: [
      "what is uuid",
      "uuid generator",
      "uuid format",
      "guid vs uuid",
    ],
  },
  sha: {
    slug: "sha",
    term: "SHA",
    acronymFor: "Secure Hash Algorithm",
    shortDefinition:
      "A family of cryptographic hash functions designed by the NSA.",
    fullDefinition:
      "The Secure Hash Algorithm (SHA) is a family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST). SHA-256 and SHA-512 are part of the SHA-2 family and are widely used for security applications and protocols. These algorithms produce fixed-size hash values from variable-length input data, making them useful for verifying data integrity and creating digital signatures.",
    examples: [
      "SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "SHA-512: cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e",
    ],
    useCases: [
      "Password storage (with salt)",
      "File integrity verification",
      "Digital signatures",
      "Blockchain and cryptocurrencies",
    ],
    relatedTerms: ["md5", "hashing"],
    relatedTools: ["hash-generator"],
    category: "security",
    seoKeywords: [
      "what is sha",
      "sha256",
      "sha512",
      "sha hash",
      "secure hash algorithm",
    ],
  },
  md5: {
    slug: "md5",
    term: "MD5",
    acronymFor: "Message-Digest Algorithm 5",
    shortDefinition:
      "A widely used hash function producing a 128-bit hash value (not recommended for security).",
    fullDefinition:
      "MD5 (Message-Digest Algorithm 5) is a widely used hash function producing a 128-bit (16-byte) hash value. It was designed by Ronald Rivest in 1991. While MD5 is still commonly used for checksums to verify data integrity, it is no longer considered secure for cryptographic purposes due to discovered vulnerabilities. For security-sensitive applications, SHA-256 or stronger algorithms should be used instead.",
    examples: ["d41d8cd98f00b204e9800998ecf8427e (empty string)"],
    useCases: [
      "File checksum verification (non-security)",
      "Deduplication checks",
      "Cache key generation",
      "Legacy system compatibility",
    ],
    relatedTerms: ["sha", "hashing"],
    relatedTools: ["hash-generator"],
    category: "security",
    seoKeywords: ["what is md5", "md5 hash", "md5 checksum", "md5 vs sha"],
  },
  "url-encoding": {
    slug: "url-encoding",
    term: "URL Encoding",
    shortDefinition:
      "A method to encode special characters in URLs to ensure safe transmission.",
    fullDefinition:
      "URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). It replaces unsafe characters with a '%' followed by two hexadecimal digits representing the character's ASCII code. This is necessary because URLs can only be sent over the Internet using the ASCII character set, and certain characters have special meanings in URLs.",
    examples: [
      "Hello World → Hello%20World",
      "foo=bar&baz=qux → foo%3Dbar%26baz%3Dqux",
    ],
    useCases: [
      "Query string parameters",
      "Form data submission",
      "API parameters",
      "File paths with special characters",
    ],
    relatedTerms: ["query-string", "encoding", "base64"],
    relatedTools: ["url-encoder"],
    category: "encoding",
    seoKeywords: [
      "url encoding",
      "percent encoding",
      "urlencode",
      "url encode special characters",
    ],
  },
  regex: {
    slug: "regex",
    term: "Regex",
    acronymFor: "Regular Expression",
    shortDefinition:
      "A sequence of characters defining a search pattern for string matching.",
    fullDefinition:
      "A regular expression (regex or regexp) is a sequence of characters that specifies a search pattern in text. These patterns are used by string-searching algorithms for 'find' or 'find and replace' operations, as well as input validation. Regex is supported by most programming languages and is an essential tool for text processing, data validation, and parsing.",
    examples: [
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ (email)",
      "^\\d{3}-\\d{3}-\\d{4}$ (phone number)",
    ],
    useCases: [
      "Email validation",
      "Phone number formatting",
      "Log file parsing",
      "Search and replace operations",
    ],
    relatedTerms: [],
    relatedTools: ["regex-tester"],
    category: "programming",
    seoKeywords: [
      "what is regex",
      "regular expression",
      "regex pattern",
      "regex tutorial",
    ],
  },
  yaml: {
    slug: "yaml",
    term: "YAML",
    acronymFor: "YAML Ain't Markup Language",
    shortDefinition:
      "A human-readable data serialization format commonly used for configuration files.",
    fullDefinition:
      "YAML (YAML Ain't Markup Language) is a human-readable data serialization format. It is commonly used for configuration files and in applications where data is being stored or transmitted. YAML uses indentation to represent structure, making it easy to read and write. It supports complex data types and is a superset of JSON, meaning any valid JSON document is also valid YAML.",
    examples: [
      "name: John Doe\nage: 30\ncity: New York",
      "database:\n  host: localhost\n  port: 5432",
    ],
    useCases: [
      "Configuration files (Docker, Kubernetes, CI/CD)",
      "Infrastructure as Code",
      "Data serialization",
      "API documentation (OpenAPI)",
    ],
    relatedTerms: ["json", "xml"],
    relatedTools: ["json-formatter"],
    category: "data-formats",
    seoKeywords: ["what is yaml", "yaml format", "yaml vs json", "yaml syntax"],
  },
  xml: {
    slug: "xml",
    term: "XML",
    acronymFor: "eXtensible Markup Language",
    shortDefinition:
      "A markup language for encoding documents in a format readable by both humans and machines.",
    fullDefinition:
      "XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. It was designed to store and transport data, with a focus on simplicity and usability across different systems. While XML has been largely superseded by JSON for web APIs, it remains prevalent in enterprise systems, document formats, and configuration files.",
    examples: [
      '<?xml version="1.0"?><note><to>User</to><message>Hello</message></note>',
    ],
    useCases: [
      "Document formats (DOCX, XLSX, SVG)",
      "SOAP web services",
      "RSS feeds",
      "Configuration files",
    ],
    relatedTerms: ["json", "yaml", "html-entity"],
    relatedTools: ["json-formatter"],
    category: "data-formats",
    seoKeywords: ["what is xml", "xml format", "xml vs json", "xml parser"],
  },
  csv: {
    slug: "csv",
    term: "CSV",
    acronymFor: "Comma-Separated Values",
    shortDefinition:
      "A simple file format for storing tabular data in plain text.",
    fullDefinition:
      "CSV (Comma-Separated Values) is a simple file format used to store tabular data, such as a spreadsheet or database. Each line in a CSV file corresponds to a row in the table, and each field is separated by a comma (or other delimiter). CSV files are widely supported by spreadsheet applications and databases, making them a common choice for data import/export operations.",
    examples: ["name,age,city\nJohn,30,New York\nJane,25,Los Angeles"],
    useCases: [
      "Data export from databases",
      "Spreadsheet data exchange",
      "Bulk data import",
      "Log file storage",
    ],
    relatedTerms: ["json", "xml"],
    relatedTools: ["json-formatter"],
    category: "data-formats",
    seoKeywords: ["what is csv", "csv format", "csv file", "csv to json"],
  },
  "html-entity": {
    slug: "html-entity",
    term: "HTML Entity",
    shortDefinition:
      "A string representing reserved characters in HTML that would otherwise be interpreted as code.",
    fullDefinition:
      "HTML entities are special strings that represent characters that have special meaning in HTML or are not easily typed on a keyboard. They begin with an ampersand (&) and end with a semicolon (;). Entities are used to display reserved characters (like < and >) that would otherwise be interpreted as HTML code, as well as characters not present on the keyboard.",
    examples: [
      "&lt; represents <",
      "&gt; represents >",
      "&amp; represents &",
      "&nbsp; represents non-breaking space",
    ],
    useCases: [
      "Displaying code in HTML pages",
      "Special character insertion",
      "Preventing XSS attacks",
      "Email obfuscation",
    ],
    relatedTerms: ["xml", "encoding"],
    relatedTools: ["html-entity"],
    category: "web",
    seoKeywords: [
      "html entity",
      "html special characters",
      "html encode",
      "html entities list",
    ],
  },
  cron: {
    slug: "cron",
    term: "Cron Expression",
    shortDefinition:
      "A string format for defining scheduled task execution times in Unix-like systems.",
    fullDefinition:
      "A cron expression is a string consisting of five or six fields separated by spaces that represents a schedule for recurring tasks. Named after the Unix 'cron' command, these expressions define when a task should run based on minute, hour, day of month, month, and day of week. Cron expressions are widely used in task schedulers, job queues, and CI/CD pipelines.",
    examples: [
      "0 0 * * * (every day at midnight)",
      "*/15 * * * * (every 15 minutes)",
      "0 9 * * 1-5 (weekdays at 9 AM)",
    ],
    useCases: [
      "Scheduled backups",
      "Automated reports",
      "CI/CD pipeline triggers",
      "Data synchronization",
    ],
    relatedTerms: [],
    relatedTools: ["cron-parser"],
    category: "standards",
    seoKeywords: ["cron expression", "cron syntax", "cron job", "crontab"],
  },
  "mime-type": {
    slug: "mime-type",
    term: "MIME Type",
    acronymFor: "Multipurpose Internet Mail Extensions",
    shortDefinition:
      "A standard indicating the nature and format of a file or data.",
    fullDefinition:
      "A MIME type (Multipurpose Internet Mail Extensions) is a standard that indicates the nature and format of a document, file, or assortment of bytes. It is used by browsers and servers to determine how to handle content. MIME types consist of a type and subtype, separated by a slash (e.g., text/html, application/json). They are essential for proper content handling in HTTP responses and file uploads.",
    examples: ["text/html", "application/json", "image/png", "application/pdf"],
    useCases: [
      "HTTP Content-Type headers",
      "File upload validation",
      "Email attachments",
      "API response types",
    ],
    relatedTerms: ["api", "base64", "data-uri"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "mime type",
      "content type",
      "mime type list",
      "file mime type",
    ],
  },
  api: {
    slug: "api",
    term: "API",
    acronymFor: "Application Programming Interface",
    shortDefinition:
      "A set of protocols and tools for building and integrating application software.",
    fullDefinition:
      "An Application Programming Interface (API) is a set of definitions and protocols for building and integrating application software. APIs allow different software systems to communicate with each other, enabling data exchange and functionality sharing. In web development, APIs typically refer to web services that accept requests and return data in formats like JSON or XML. REST and GraphQL are popular API architectural styles.",
    examples: [
      "GET /api/users returns list of users",
      "POST /api/login authenticates user",
    ],
    useCases: [
      "Third-party integrations",
      "Mobile app backends",
      "Microservices communication",
      "Data access abstraction",
    ],
    relatedTerms: ["rest", "json", "cors", "oauth"],
    relatedTools: ["curl-builder", "json-formatter"],
    category: "web",
    seoKeywords: ["what is api", "api meaning", "rest api", "api development"],
  },
  rest: {
    slug: "rest",
    term: "REST",
    acronymFor: "Representational State Transfer",
    shortDefinition:
      "An architectural style for designing networked applications using HTTP methods.",
    fullDefinition:
      "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful systems use standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs. REST emphasizes statelessness, where each request contains all information needed to process it. This approach has become the dominant style for web APIs due to its simplicity and scalability.",
    examples: [
      "GET /users - Retrieve all users",
      "POST /users - Create a new user",
      "PUT /users/1 - Update user with ID 1",
      "DELETE /users/1 - Delete user with ID 1",
    ],
    useCases: [
      "Web API design",
      "Mobile backends",
      "Microservices architecture",
      "Third-party integrations",
    ],
    relatedTerms: ["api", "json", "cors"],
    relatedTools: ["curl-builder"],
    category: "web",
    seoKeywords: ["what is rest", "rest api", "restful api", "rest vs graphql"],
  },
  oauth: {
    slug: "oauth",
    term: "OAuth",
    shortDefinition:
      "An open standard for access delegation, commonly used for token-based authentication.",
    fullDefinition:
      "OAuth (Open Authorization) is an open standard for access delegation, commonly used as a way to grant websites or applications access to information on other websites without giving them passwords. OAuth provides a secure way for users to authorize third-party access to their resources. OAuth 2.0 is the current version and is widely used for 'Login with Google/Facebook/GitHub' functionality.",
    examples: [
      "Login with Google button",
      "Connect your GitHub account",
      "Authorize app to access your calendar",
    ],
    useCases: [
      "Social login (Google, Facebook, GitHub)",
      "Third-party API access",
      "Single Sign-On (SSO)",
      "Mobile app authentication",
    ],
    relatedTerms: ["jwt", "api"],
    relatedTools: ["jwt-decoder"],
    category: "security",
    seoKeywords: [
      "what is oauth",
      "oauth 2.0",
      "oauth authentication",
      "oauth vs jwt",
    ],
  },
  "utf-8": {
    slug: "utf-8",
    term: "UTF-8",
    acronymFor: "8-bit Unicode Transformation Format",
    shortDefinition:
      "A variable-width character encoding capable of encoding all Unicode characters.",
    fullDefinition:
      "UTF-8 (8-bit Unicode Transformation Format) is a variable-width character encoding capable of encoding all 1,112,064 valid character code points in Unicode. It uses one to four bytes per character and is backward compatible with ASCII. UTF-8 is the dominant character encoding for the World Wide Web, used in over 98% of all web pages. It allows representation of characters from all languages, emojis, and special symbols.",
    examples: [
      "A = 1 byte (0x41)",
      "€ = 3 bytes (0xE2 0x82 0xAC)",
      "😀 = 4 bytes (0xF0 0x9F 0x98 0x80)",
    ],
    useCases: [
      "Web page character encoding",
      "Database text storage",
      "File encoding",
      "Internationalization (i18n)",
    ],
    relatedTerms: ["encoding", "binary", "hex"],
    relatedTools: ["text-case-converter"],
    category: "encoding",
    seoKeywords: [
      "what is utf-8",
      "utf-8 encoding",
      "utf-8 vs ascii",
      "unicode",
    ],
  },
  hex: {
    slug: "hex",
    term: "Hexadecimal",
    shortDefinition:
      "A base-16 numeral system using digits 0-9 and letters A-F.",
    fullDefinition:
      "Hexadecimal (hex) is a base-16 numeral system using sixteen distinct symbols: 0-9 for values zero to nine, and A-F for values ten to fifteen. It is widely used in computing as a more human-friendly representation of binary-coded values. Each hexadecimal digit represents four binary digits (bits), making it convenient for representing byte values, memory addresses, and color codes.",
    examples: [
      "#FF5733 (CSS color)",
      "0x1A3F (memory address)",
      "FF = 255 in decimal",
    ],
    useCases: [
      "CSS color codes (#RGB)",
      "Memory addresses",
      "MAC addresses",
      "Byte representation",
    ],
    relatedTerms: ["binary", "encoding", "base64"],
    relatedTools: ["base-converter", "color-picker"],
    category: "encoding",
    seoKeywords: [
      "hexadecimal",
      "hex to decimal",
      "hex color",
      "hex converter",
    ],
  },
  binary: {
    slug: "binary",
    term: "Binary",
    shortDefinition: "A base-2 numeral system using only two digits: 0 and 1.",
    fullDefinition:
      "Binary is a base-2 numeral system that uses only two digits: 0 and 1. It is the fundamental language of computers, where each binary digit (bit) represents an electrical on (1) or off (0) state. All data in computers—text, images, programs—is ultimately stored and processed as binary. Understanding binary is essential for low-level programming, networking, and hardware design.",
    examples: [
      "1010 = 10 in decimal",
      "11111111 = 255 in decimal",
      "01000001 = 'A' in ASCII",
    ],
    useCases: [
      "Computer data storage",
      "Network protocols",
      "Bitwise operations",
      "File formats",
    ],
    relatedTerms: ["hex", "encoding", "base64"],
    relatedTools: ["base-converter"],
    category: "encoding",
    seoKeywords: [
      "binary number",
      "binary to decimal",
      "binary code",
      "how binary works",
    ],
  },
  "query-string": {
    slug: "query-string",
    term: "Query String",
    shortDefinition:
      "The part of a URL that contains data to be passed to web applications.",
    fullDefinition:
      "A query string is the part of a URL that contains data to be passed to web applications. It begins with a question mark (?) and consists of key-value pairs separated by ampersands (&). Query strings are commonly used to pass search parameters, filter criteria, and other data to web servers. They are a fundamental part of how web applications receive user input through URLs.",
    examples: [
      "?search=hello&page=1",
      "?filter=active&sort=date",
      "/products?category=electronics&brand=apple",
    ],
    useCases: [
      "Search functionality",
      "Pagination",
      "Filtering and sorting",
      "Tracking parameters (UTM)",
    ],
    relatedTerms: ["url-encoding", "api"],
    relatedTools: ["url-parser"],
    category: "web",
    seoKeywords: [
      "query string",
      "url parameters",
      "query string parameters",
      "parse query string",
    ],
  },
  "data-uri": {
    slug: "data-uri",
    term: "Data URI",
    shortDefinition:
      "A URI scheme that allows embedding small data files directly in web pages.",
    fullDefinition:
      "A Data URI (Uniform Resource Identifier) is a scheme that allows you to embed small data files directly into documents as if they were external resources. The format is 'data:[<mediatype>][;base64],<data>'. Data URIs are commonly used to embed images, fonts, and other assets directly in HTML or CSS files, reducing HTTP requests but increasing file size due to Base64 encoding overhead.",
    examples: [
      "data:text/html,<h1>Hello</h1>",
      "data:image/png;base64,iVBORw0KGgo...",
      'data:application/json,{"name":"test"}',
    ],
    useCases: [
      "Embedding small images in CSS",
      "Inline SVG icons",
      "Reducing HTTP requests",
      "Email HTML with embedded images",
    ],
    relatedTerms: ["base64", "mime-type"],
    relatedTools: ["base64-converter"],
    category: "web",
    seoKeywords: ["data uri", "data url", "base64 image", "inline image"],
  },
  "json-schema": {
    slug: "json-schema",
    term: "JSON Schema",
    shortDefinition:
      "A vocabulary for annotating and validating JSON documents.",
    fullDefinition:
      "JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It describes your data format in a clear, human- and machine-readable format. JSON Schema enables automatic validation of JSON data, documentation generation, and IDE support with autocompletion. It is widely used in API development to define request/response formats and in configuration file validation.",
    examples: [
      '{"type": "object", "properties": {"name": {"type": "string"}}}',
      '{"type": "array", "items": {"type": "number"}}',
    ],
    useCases: [
      "API request/response validation",
      "Configuration file validation",
      "Form generation",
      "Documentation",
    ],
    relatedTerms: ["json", "api"],
    relatedTools: ["json-formatter", "json-to-typescript"],
    category: "standards",
    seoKeywords: [
      "json schema",
      "json validation",
      "json schema validator",
      "json schema example",
    ],
  },
  cors: {
    slug: "cors",
    term: "CORS",
    acronymFor: "Cross-Origin Resource Sharing",
    shortDefinition:
      "A mechanism that allows web pages to request resources from different domains.",
    fullDefinition:
      "Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS is a security feature that prevents malicious websites from making requests to different domains. Proper CORS configuration is essential for web applications that consume APIs from different origins.",
    examples: [
      "Access-Control-Allow-Origin: *",
      "Access-Control-Allow-Methods: GET, POST",
      "Access-Control-Allow-Headers: Content-Type",
    ],
    useCases: [
      "Cross-domain API calls",
      "CDN resource loading",
      "Third-party integrations",
      "Microservices communication",
    ],
    relatedTerms: ["api", "rest"],
    relatedTools: [],
    category: "web",
    seoKeywords: ["what is cors", "cors error", "cors policy", "enable cors"],
  },
  minification: {
    slug: "minification",
    term: "Minification",
    shortDefinition:
      "The process of removing unnecessary characters from code without changing functionality.",
    fullDefinition:
      "Minification is the process of removing all unnecessary characters from source code without changing its functionality. This includes removing whitespace, comments, shortening variable names, and optimizing code. Minification is commonly applied to JavaScript, CSS, and HTML files to reduce file sizes, which improves website loading times and reduces bandwidth usage.",
    examples: [
      "function add(a,b){return a+b} (minified)",
      "Original: function add(a, b) { return a + b; }",
    ],
    useCases: [
      "Production JavaScript bundles",
      "CSS optimization",
      "HTML compression",
      "Bandwidth reduction",
    ],
    relatedTerms: ["encoding"],
    relatedTools: ["css-minifier", "prettier-playground"],
    category: "programming",
    seoKeywords: [
      "minification",
      "minify javascript",
      "minify css",
      "code minifier",
    ],
  },
  hashing: {
    slug: "hashing",
    term: "Hashing",
    shortDefinition:
      "The process of converting input data into a fixed-size string of characters.",
    fullDefinition:
      "Hashing is the process of converting input data of any size into a fixed-size string of characters, which typically appears random. A hash function is deterministic—the same input always produces the same output. However, it is designed to be one-way, meaning you cannot reverse the process to get the original input. Hashing is fundamental to data integrity verification, password storage, and digital signatures.",
    examples: [
      "SHA-256('hello') = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    ],
    useCases: [
      "Password storage",
      "Data integrity verification",
      "Digital signatures",
      "Hash tables",
    ],
    relatedTerms: ["sha", "md5", "encoding"],
    relatedTools: ["hash-generator"],
    category: "security",
    seoKeywords: [
      "what is hashing",
      "hash function",
      "hashing vs encryption",
      "hash algorithm",
    ],
  },
  encoding: {
    slug: "encoding",
    term: "Encoding",
    shortDefinition:
      "The process of converting data from one format to another for proper storage or transmission.",
    fullDefinition:
      "Encoding is the process of converting data from one format to another. Unlike encryption, encoding is not meant to keep data secret—it is designed to ensure data can be properly stored, transmitted, or processed by different systems. Common encoding schemes include Base64, URL encoding, and character encoding (UTF-8). Understanding the difference between encoding and encryption is crucial for developers.",
    examples: [
      "Base64: SGVsbG8= (Hello)",
      "URL: Hello%20World",
      "HTML: &lt; (<)",
    ],
    useCases: [
      "Data transmission",
      "Character set conversion",
      "URL parameters",
      "Binary to text conversion",
    ],
    relatedTerms: ["base64", "url-encoding", "utf-8", "hex"],
    relatedTools: ["base64-converter", "url-encoder"],
    category: "encoding",
    seoKeywords: [
      "encoding vs encryption",
      "data encoding",
      "character encoding",
      "base64 encoding",
    ],
  },
};

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms[slug as GlossaryTermSlug];
}

export function getGlossaryTermSlugs(): GlossaryTermSlug[] {
  return Object.keys(glossaryTerms) as GlossaryTermSlug[];
}

export function getAllGlossaryTerms(): GlossaryTerm[] {
  return Object.values(glossaryTerms);
}

export function getGlossaryTermsByCategory(
  category: GlossaryTerm["category"],
): GlossaryTerm[] {
  return Object.values(glossaryTerms).filter(
    (term) => term.category === category,
  );
}
