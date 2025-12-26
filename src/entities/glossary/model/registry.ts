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

  // ============================================
  // Data Formats (New: 10 terms)
  // ============================================
  toml: {
    slug: "toml",
    term: "TOML",
    acronymFor: "Tom's Obvious Minimal Language",
    shortDefinition:
      "A minimal configuration file format that is easy to read and write.",
    fullDefinition:
      "TOML (Tom's Obvious Minimal Language) is a configuration file format that aims to be easy to read and write due to its obvious semantics. It maps unambiguously to a hash table and is designed to be minimal yet expressive. TOML is commonly used in Rust projects (Cargo.toml), Python projects (pyproject.toml), and various other configuration scenarios where human readability is prioritized.",
    examples: [
      '[package]\nname = "my-app"\nversion = "0.1.0"',
      '[database]\nhost = "localhost"\nport = 5432',
    ],
    useCases: [
      "Rust Cargo configuration",
      "Python pyproject.toml",
      "Hugo static site configuration",
      "Application settings",
    ],
    relatedTerms: ["yaml", "json", "xml"],
    relatedTools: ["json-formatter"],
    category: "data-formats",
    seoKeywords: ["what is toml", "toml format", "toml vs yaml", "toml syntax"],
  },
  markdown: {
    slug: "markdown",
    term: "Markdown",
    shortDefinition:
      "A lightweight markup language for creating formatted text using a plain-text editor.",
    fullDefinition:
      "Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting syntax that can be converted to HTML and other formats. Markdown is widely used for documentation, README files, forum posts, and content management systems. Various flavors exist, including GitHub Flavored Markdown (GFM) which adds features like tables and task lists.",
    examples: [
      "# Heading 1\n## Heading 2",
      "**bold** and *italic*",
      "[link](https://example.com)",
      "- bullet list item",
    ],
    useCases: [
      "README files on GitHub",
      "Documentation",
      "Blog posts",
      "Note-taking applications",
    ],
    relatedTerms: ["html", "json"],
    relatedTools: ["markdown-preview"],
    category: "data-formats",
    seoKeywords: [
      "what is markdown",
      "markdown syntax",
      "markdown guide",
      "markdown cheatsheet",
    ],
  },
  html: {
    slug: "html",
    term: "HTML",
    acronymFor: "HyperText Markup Language",
    shortDefinition:
      "The standard markup language for creating web pages and web applications.",
    fullDefinition:
      "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages using a system of tags and attributes. HTML5, the latest version, introduced semantic elements, multimedia support, and APIs for complex web applications. It works alongside CSS for styling and JavaScript for interactivity.",
    examples: [
      "<!DOCTYPE html><html><head><title>Page</title></head><body><h1>Hello</h1></body></html>",
      '<div class="container"><p>Content</p></div>',
    ],
    useCases: [
      "Web page structure",
      "Email templates",
      "Web applications",
      "Documentation",
    ],
    relatedTerms: ["html-entity", "xml"],
    relatedTools: ["html-entity", "prettier-playground"],
    category: "data-formats",
    seoKeywords: [
      "what is html",
      "html tutorial",
      "html tags",
      "html5",
      "learn html",
    ],
  },
  svg: {
    slug: "svg",
    term: "SVG",
    acronymFor: "Scalable Vector Graphics",
    shortDefinition:
      "An XML-based vector image format for two-dimensional graphics with interactivity and animation.",
    fullDefinition:
      "SVG (Scalable Vector Graphics) is an XML-based vector image format for defining two-dimensional graphics with support for interactivity and animation. Unlike raster formats (PNG, JPEG), SVG images can be scaled to any size without losing quality. SVG files can be edited with text editors and styled with CSS. They are ideal for logos, icons, illustrations, and interactive graphics on the web.",
    examples: [
      '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>',
      '<svg><rect width="100" height="50" fill="blue"/></svg>',
    ],
    useCases: [
      "Icons and logos",
      "Illustrations",
      "Interactive charts",
      "Animations",
    ],
    relatedTerms: ["xml", "html"],
    relatedTools: ["qr-generator"],
    category: "data-formats",
    seoKeywords: [
      "what is svg",
      "svg format",
      "svg vs png",
      "svg icons",
      "svg editor",
    ],
  },
  protobuf: {
    slug: "protobuf",
    term: "Protocol Buffers",
    shortDefinition:
      "A language-neutral, platform-neutral mechanism for serializing structured data.",
    fullDefinition:
      "Protocol Buffers (Protobuf) is a method of serializing structured data developed by Google. It is smaller, faster, and simpler than XML or JSON for data serialization. You define the data structure in .proto files, and the protobuf compiler generates code in various languages to read and write that data. Protobuf is widely used in gRPC and internal Google services.",
    examples: [
      "message Person {\n  string name = 1;\n  int32 age = 2;\n}",
      'syntax = "proto3";',
    ],
    useCases: [
      "gRPC services",
      "High-performance APIs",
      "Inter-service communication",
      "Data storage",
    ],
    relatedTerms: ["json", "graphql", "msgpack"],
    relatedTools: [],
    category: "data-formats",
    seoKeywords: [
      "what is protobuf",
      "protocol buffers",
      "protobuf vs json",
      "grpc protobuf",
    ],
  },
  graphql: {
    slug: "graphql",
    term: "GraphQL",
    shortDefinition:
      "A query language for APIs and a runtime for executing those queries.",
    fullDefinition:
      "GraphQL is a query language for APIs and a runtime for fulfilling those queries with existing data. Developed by Facebook in 2012 and open-sourced in 2015, GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need, and makes it easier to evolve APIs over time. Unlike REST, GraphQL uses a single endpoint and allows clients to specify the exact data they need.",
    examples: [
      "query { user(id: 1) { name, email } }",
      'mutation { createUser(name: "John") { id } }',
    ],
    useCases: [
      "Mobile app APIs",
      "Complex data requirements",
      "Real-time subscriptions",
      "API aggregation",
    ],
    relatedTerms: ["api", "rest", "json"],
    relatedTools: ["curl-builder"],
    category: "data-formats",
    seoKeywords: [
      "what is graphql",
      "graphql vs rest",
      "graphql tutorial",
      "graphql api",
    ],
  },
  avro: {
    slug: "avro",
    term: "Apache Avro",
    shortDefinition:
      "A row-oriented remote procedure call and data serialization framework.",
    fullDefinition:
      "Apache Avro is a row-oriented remote procedure call and data serialization framework developed within Apache's Hadoop project. It uses JSON for defining data types and protocols, and serializes data in a compact binary format. Avro provides rich data structures, a compact binary format, and integration with dynamic languages. It is commonly used in big data processing with Apache Kafka and Hadoop.",
    examples: [
      '{"type": "record", "name": "User", "fields": [{"name": "name", "type": "string"}]}',
    ],
    useCases: [
      "Apache Kafka message format",
      "Hadoop data storage",
      "Schema evolution",
      "Big data pipelines",
    ],
    relatedTerms: ["json", "protobuf", "parquet"],
    relatedTools: [],
    category: "data-formats",
    seoKeywords: [
      "apache avro",
      "avro format",
      "avro vs parquet",
      "kafka avro",
    ],
  },
  parquet: {
    slug: "parquet",
    term: "Apache Parquet",
    shortDefinition:
      "A columnar storage file format optimized for big data processing.",
    fullDefinition:
      "Apache Parquet is an open-source, columnar storage file format designed for efficient data storage and retrieval. It provides efficient data compression and encoding schemes with enhanced performance to handle complex data in bulk. Parquet is optimized for queries that process specific columns rather than entire rows, making it ideal for analytical workloads in big data systems like Spark and Hive.",
    examples: ["data.parquet", "spark.read.parquet('path/to/file.parquet')"],
    useCases: [
      "Data lake storage",
      "Apache Spark analytics",
      "AWS Athena queries",
      "Big data processing",
    ],
    relatedTerms: ["avro", "csv", "json"],
    relatedTools: [],
    category: "data-formats",
    seoKeywords: [
      "apache parquet",
      "parquet format",
      "parquet vs csv",
      "spark parquet",
    ],
  },
  msgpack: {
    slug: "msgpack",
    term: "MessagePack",
    shortDefinition:
      "An efficient binary serialization format that is more compact than JSON.",
    fullDefinition:
      "MessagePack is an efficient binary serialization format that lets you exchange data among multiple languages like JSON. But it's faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves. MessagePack is used in high-performance applications where JSON's size and parsing overhead are concerns.",
    examples: ["82 a4 6e 61 6d 65 a4 4a 6f 68 6e (binary for {name: 'John'})"],
    useCases: [
      "High-performance APIs",
      "Game networking",
      "IoT data transmission",
      "Cache serialization",
    ],
    relatedTerms: ["json", "protobuf", "bson"],
    relatedTools: [],
    category: "data-formats",
    seoKeywords: [
      "messagepack",
      "msgpack format",
      "msgpack vs json",
      "binary json",
    ],
  },
  bson: {
    slug: "bson",
    term: "BSON",
    acronymFor: "Binary JSON",
    shortDefinition:
      "A binary-encoded serialization of JSON-like documents used by MongoDB.",
    fullDefinition:
      "BSON (Binary JSON) is a binary-encoded serialization of JSON-like documents. It extends the JSON model to provide additional data types and to be efficient for encoding and decoding within different languages. BSON is the primary data representation for MongoDB, supporting embedded documents and arrays. It includes types like Date, Binary, and ObjectId that are not part of standard JSON.",
    examples: ['{"_id": ObjectId("507f1f77bcf86cd799439011"), "name": "John"}'],
    useCases: [
      "MongoDB document storage",
      "Binary data storage",
      "Date/time handling",
      "Efficient data transfer",
    ],
    relatedTerms: ["json", "msgpack"],
    relatedTools: ["json-formatter"],
    category: "data-formats",
    seoKeywords: [
      "what is bson",
      "bson vs json",
      "mongodb bson",
      "binary json",
    ],
  },

  // ============================================
  // Security (New: 15 terms)
  // ============================================
  "ssl-tls": {
    slug: "ssl-tls",
    term: "SSL/TLS",
    acronymFor: "Secure Sockets Layer / Transport Layer Security",
    shortDefinition:
      "Cryptographic protocols designed to provide secure communication over a network.",
    fullDefinition:
      "SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols designed to provide communications security over a computer network. TLS is the successor to SSL and is what is actually used today when people refer to 'SSL'. These protocols encrypt data transmitted between web browsers and servers, ensuring privacy and data integrity. They are the foundation of HTTPS.",
    examples: [
      "https://example.com (TLS-encrypted connection)",
      "TLS 1.3 handshake",
    ],
    useCases: [
      "HTTPS websites",
      "Email encryption (SMTP/IMAP over TLS)",
      "VPN connections",
      "API security",
    ],
    relatedTerms: ["https", "encryption", "ssl-certificate"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "ssl vs tls",
      "what is tls",
      "ssl certificate",
      "tls encryption",
    ],
  },
  https: {
    slug: "https",
    term: "HTTPS",
    acronymFor: "HyperText Transfer Protocol Secure",
    shortDefinition:
      "The secure version of HTTP that encrypts data between browser and server.",
    fullDefinition:
      "HTTPS (HyperText Transfer Protocol Secure) is an extension of HTTP that uses TLS/SSL encryption to secure data transmitted between a web browser and a website. It provides three key protections: encryption (preventing eavesdropping), data integrity (preventing tampering), and authentication (verifying the website's identity). HTTPS is now the standard for all websites and is required for many modern web features.",
    examples: ["https://www.google.com", "Lock icon in browser address bar"],
    useCases: [
      "All modern websites",
      "E-commerce transactions",
      "Login pages",
      "API endpoints",
    ],
    relatedTerms: ["http", "ssl-tls", "ssl-certificate"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is https",
      "http vs https",
      "https security",
      "ssl https",
    ],
  },
  encryption: {
    slug: "encryption",
    term: "Encryption",
    shortDefinition:
      "The process of encoding data so only authorized parties can access it.",
    fullDefinition:
      "Encryption is the process of encoding data so that only authorized parties can access it. It converts plaintext into ciphertext using an algorithm and a key. There are two main types: symmetric encryption (same key for encryption and decryption) and asymmetric encryption (public/private key pairs). Encryption is fundamental to data security, protecting information at rest and in transit.",
    examples: [
      "AES-256 encrypted file",
      "RSA public/private key encryption",
      "End-to-end encrypted messaging",
    ],
    useCases: [
      "Data protection at rest",
      "Secure communication",
      "Password managers",
      "Full disk encryption",
    ],
    relatedTerms: ["aes", "rsa", "hashing", "ssl-tls"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is encryption",
      "encryption types",
      "encryption vs hashing",
      "data encryption",
    ],
  },
  aes: {
    slug: "aes",
    term: "AES",
    acronymFor: "Advanced Encryption Standard",
    shortDefinition:
      "A symmetric encryption algorithm widely used to protect sensitive data.",
    fullDefinition:
      "AES (Advanced Encryption Standard) is a symmetric encryption algorithm established by the U.S. National Institute of Standards and Technology (NIST) in 2001. It replaced DES as the standard and is used worldwide. AES supports key sizes of 128, 192, and 256 bits. It's used to encrypt data in various applications, from HTTPS to disk encryption to secure messaging.",
    examples: ["AES-256-GCM encryption", "AES-128-CBC mode"],
    useCases: [
      "File encryption",
      "Database encryption",
      "VPN tunnels",
      "Secure messaging apps",
    ],
    relatedTerms: ["encryption", "rsa", "ssl-tls"],
    relatedTools: [],
    category: "security",
    seoKeywords: ["what is aes", "aes encryption", "aes 256", "aes vs rsa"],
  },
  rsa: {
    slug: "rsa",
    term: "RSA",
    acronymFor: "Rivest-Shamir-Adleman",
    shortDefinition:
      "An asymmetric cryptographic algorithm used for secure data transmission.",
    fullDefinition:
      "RSA (Rivest-Shamir-Adleman) is an asymmetric cryptographic algorithm invented in 1977. It uses a pair of keys: a public key for encryption and a private key for decryption. RSA is widely used for secure data transmission, digital signatures, and key exchange. While slower than symmetric algorithms like AES, RSA solves the key distribution problem by allowing secure communication without prior key sharing.",
    examples: [
      "RSA-2048 key pair",
      "SSH key authentication",
      "Digital signatures",
    ],
    useCases: [
      "TLS/SSL key exchange",
      "Digital signatures",
      "SSH authentication",
      "Email encryption (PGP)",
    ],
    relatedTerms: ["encryption", "aes", "ssl-tls"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is rsa",
      "rsa encryption",
      "rsa algorithm",
      "rsa vs aes",
    ],
  },
  bcrypt: {
    slug: "bcrypt",
    term: "bcrypt",
    shortDefinition:
      "A password hashing function designed to be computationally expensive.",
    fullDefinition:
      "bcrypt is a password hashing function designed by Niels Provos and David Mazières in 1999. It incorporates a salt to protect against rainbow table attacks and is adaptive—the iteration count can be increased to make it slower, keeping it resistant to brute-force attacks even as computers get faster. bcrypt is widely recommended for password storage in web applications.",
    examples: ["$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"],
    useCases: [
      "Password hashing",
      "User authentication",
      "Credential storage",
      "Security applications",
    ],
    relatedTerms: ["hashing", "argon2", "sha"],
    relatedTools: ["hash-generator"],
    category: "security",
    seoKeywords: [
      "what is bcrypt",
      "bcrypt password",
      "bcrypt vs sha",
      "bcrypt hash",
    ],
  },
  argon2: {
    slug: "argon2",
    term: "Argon2",
    shortDefinition:
      "A modern password-hashing function that won the Password Hashing Competition.",
    fullDefinition:
      "Argon2 is a key derivation function that won the Password Hashing Competition in 2015. It's designed to be resistant to GPU cracking attacks and side-channel attacks. Argon2 comes in three variants: Argon2d (data-dependent), Argon2i (data-independent), and Argon2id (hybrid). It allows tuning memory usage, parallelism, and time cost, making it the recommended choice for new applications.",
    examples: ["$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$hash"],
    useCases: [
      "Password hashing (recommended)",
      "Key derivation",
      "Cryptocurrency wallets",
      "Secure authentication",
    ],
    relatedTerms: ["bcrypt", "hashing", "sha"],
    relatedTools: ["hash-generator"],
    category: "security",
    seoKeywords: [
      "what is argon2",
      "argon2 vs bcrypt",
      "argon2 password hashing",
      "argon2id",
    ],
  },
  hmac: {
    slug: "hmac",
    term: "HMAC",
    acronymFor: "Hash-based Message Authentication Code",
    shortDefinition:
      "A type of message authentication code using a cryptographic hash function and a secret key.",
    fullDefinition:
      "HMAC (Hash-based Message Authentication Code) is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It can verify both the data integrity and authenticity of a message. HMAC is used in various security protocols, including TLS, IPsec, and API authentication (JWT signing).",
    examples: [
      "HMAC-SHA256(key, message)",
      "API signature: X-Signature: hmac-sha256=...",
    ],
    useCases: [
      "API request signing",
      "JWT signing (HS256)",
      "Message authentication",
      "Data integrity verification",
    ],
    relatedTerms: ["sha", "jwt", "hashing"],
    relatedTools: ["jwt-decoder", "hash-generator"],
    category: "security",
    seoKeywords: [
      "what is hmac",
      "hmac sha256",
      "hmac authentication",
      "hmac vs hash",
    ],
  },
  xss: {
    slug: "xss",
    term: "XSS",
    acronymFor: "Cross-Site Scripting",
    shortDefinition:
      "A security vulnerability that allows attackers to inject malicious scripts into web pages.",
    fullDefinition:
      "Cross-Site Scripting (XSS) is a type of security vulnerability typically found in web applications. It enables attackers to inject malicious client-side scripts into web pages viewed by other users. XSS attacks occur when an application includes untrusted data in a web page without proper validation or escaping. There are three types: Stored XSS, Reflected XSS, and DOM-based XSS.",
    examples: [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert('XSS')>",
    ],
    useCases: [
      "Security testing",
      "Vulnerability assessment",
      "Web application security audits",
      "Bug bounty programs",
    ],
    relatedTerms: ["csrf", "sql-injection", "html-entity"],
    relatedTools: ["html-entity"],
    category: "security",
    seoKeywords: [
      "what is xss",
      "xss attack",
      "cross site scripting",
      "prevent xss",
    ],
  },
  csrf: {
    slug: "csrf",
    term: "CSRF",
    acronymFor: "Cross-Site Request Forgery",
    shortDefinition:
      "An attack that tricks users into performing actions they didn't intend to perform.",
    fullDefinition:
      "Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated. Unlike XSS, which exploits the trust a user has for a site, CSRF exploits the trust that a site has in a user's browser. Prevention typically involves using CSRF tokens that must be included with each state-changing request.",
    examples: [
      "<img src='https://bank.com/transfer?to=attacker&amount=1000'>",
      "Hidden form submission",
    ],
    useCases: [
      "Security testing",
      "Vulnerability assessment",
      "Web application security",
      "Token-based protection",
    ],
    relatedTerms: ["xss", "authentication", "session"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is csrf",
      "csrf attack",
      "csrf token",
      "cross site request forgery",
    ],
  },
  "sql-injection": {
    slug: "sql-injection",
    term: "SQL Injection",
    shortDefinition:
      "A code injection technique that exploits security vulnerabilities in database queries.",
    fullDefinition:
      "SQL Injection is a code injection technique that exploits security vulnerabilities in an application's software when user input is incorrectly filtered or not strongly typed and unexpectedly executed as SQL commands. It allows attackers to interfere with the queries that an application makes to its database. Prevention includes using parameterized queries and prepared statements.",
    examples: ["' OR '1'='1", "1; DROP TABLE users; --", "admin'--"],
    useCases: [
      "Security testing",
      "Database security audits",
      "Penetration testing",
      "Vulnerability assessment",
    ],
    relatedTerms: ["xss", "csrf", "authentication"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "sql injection",
      "sql injection attack",
      "prevent sql injection",
      "sqli",
    ],
  },
  authentication: {
    slug: "authentication",
    term: "Authentication",
    shortDefinition:
      "The process of verifying the identity of a user, device, or system.",
    fullDefinition:
      "Authentication is the process of verifying the identity of a user, device, or system. It answers the question 'Who are you?' Common authentication methods include passwords, biometrics, security tokens, and multi-factor authentication (MFA). Authentication is distinct from authorization, which determines what an authenticated user is allowed to do.",
    examples: [
      "Username and password login",
      "Fingerprint scan",
      "SMS verification code",
    ],
    useCases: [
      "User login systems",
      "API access control",
      "Device pairing",
      "System access management",
    ],
    relatedTerms: ["authorization", "oauth", "jwt", "two-factor-auth"],
    relatedTools: ["jwt-decoder"],
    category: "security",
    seoKeywords: [
      "what is authentication",
      "authentication vs authorization",
      "user authentication",
      "auth methods",
    ],
  },
  authorization: {
    slug: "authorization",
    term: "Authorization",
    shortDefinition:
      "The process of determining what actions an authenticated user is allowed to perform.",
    fullDefinition:
      "Authorization is the process of determining what actions a user, device, or system is allowed to perform after their identity has been authenticated. It answers the question 'What are you allowed to do?' Authorization systems typically use roles, permissions, or access control lists (ACLs) to manage access to resources. Common models include RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control).",
    examples: [
      "Admin can delete users, regular users cannot",
      "Read-only vs read-write access",
      "API scopes (read:users, write:users)",
    ],
    useCases: [
      "Access control systems",
      "API permissions",
      "File system permissions",
      "Application feature access",
    ],
    relatedTerms: ["authentication", "oauth", "session"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is authorization",
      "authentication vs authorization",
      "access control",
      "rbac",
    ],
  },
  "two-factor-auth": {
    slug: "two-factor-auth",
    term: "Two-Factor Authentication",
    shortDefinition:
      "A security process requiring two different forms of identification for access.",
    fullDefinition:
      "Two-Factor Authentication (2FA) is a security process in which users provide two different authentication factors to verify themselves. This adds an extra layer of security beyond just a password. The three categories of authentication factors are: something you know (password), something you have (phone, security key), and something you are (biometrics). Common 2FA methods include SMS codes, authenticator apps (TOTP), and hardware security keys.",
    examples: [
      "Password + SMS code",
      "Password + authenticator app (Google Authenticator)",
      "Password + hardware key (YubiKey)",
    ],
    useCases: [
      "Account security",
      "Banking applications",
      "Email protection",
      "Enterprise systems",
    ],
    relatedTerms: ["authentication", "oauth"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "two factor authentication",
      "2fa",
      "multi factor authentication",
      "mfa",
    ],
  },
  session: {
    slug: "session",
    term: "Session",
    shortDefinition:
      "A temporary state maintained between a client and server across multiple requests.",
    fullDefinition:
      "A session is a way to persist state and data across multiple HTTP requests between a client and server. Since HTTP is stateless, sessions provide a mechanism to remember user information (like login status) across page visits. Sessions are typically implemented using cookies that store a session ID, with the actual session data stored on the server. Session management is crucial for security and user experience.",
    examples: [
      "Session ID: PHPSESSID=abc123",
      "Login session lasting 30 minutes",
      "Shopping cart persistence",
    ],
    useCases: [
      "User login state",
      "Shopping cart persistence",
      "Form wizard state",
      "User preferences",
    ],
    relatedTerms: ["cookie", "authentication", "jwt"],
    relatedTools: [],
    category: "security",
    seoKeywords: [
      "what is session",
      "session management",
      "session vs cookie",
      "session security",
    ],
  },

  // ============================================
  // Encoding (New: 10 terms)
  // ============================================
  ascii: {
    slug: "ascii",
    term: "ASCII",
    acronymFor: "American Standard Code for Information Interchange",
    shortDefinition:
      "A character encoding standard using 7-bit binary numbers for text representation.",
    fullDefinition:
      "ASCII (American Standard Code for Information Interchange) is a character encoding standard first published in 1963. It uses 7-bit binary numbers to represent 128 characters, including uppercase and lowercase letters, digits, punctuation marks, and control characters. ASCII is the basis for most modern character encoding schemes, including UTF-8, which is backward compatible with ASCII.",
    examples: ["A = 65, a = 97", "0 = 48, 9 = 57", "Space = 32"],
    useCases: [
      "Text file encoding",
      "Data transmission",
      "Character code reference",
      "Legacy system compatibility",
    ],
    relatedTerms: ["utf-8", "unicode", "encoding"],
    relatedTools: ["text-case-converter"],
    category: "encoding",
    seoKeywords: [
      "what is ascii",
      "ascii table",
      "ascii code",
      "ascii to text",
    ],
  },
  unicode: {
    slug: "unicode",
    term: "Unicode",
    shortDefinition:
      "A universal character encoding standard supporting text in all writing systems.",
    fullDefinition:
      "Unicode is a universal character encoding standard that provides a unique number for every character, regardless of platform, program, or language. It covers characters from all writing systems worldwide, including emojis and symbols. Unicode can be implemented by different character encodings, with UTF-8 being the most common on the web. The current version includes over 140,000 characters from 150+ scripts.",
    examples: ["U+0041 = A", "U+1F600 = 😀", "U+4E2D = 中"],
    useCases: [
      "Internationalization (i18n)",
      "Emoji support",
      "Multi-language text",
      "Cross-platform text",
    ],
    relatedTerms: ["utf-8", "ascii", "encoding"],
    relatedTools: ["text-case-converter"],
    category: "encoding",
    seoKeywords: [
      "what is unicode",
      "unicode characters",
      "unicode table",
      "unicode vs ascii",
    ],
  },
  punycode: {
    slug: "punycode",
    term: "Punycode",
    shortDefinition:
      "An encoding syntax for representing Unicode characters in ASCII for domain names.",
    fullDefinition:
      "Punycode is a representation of Unicode with the limited ASCII character subset used for Internet hostnames. It allows for Internationalized Domain Names (IDN) that contain non-ASCII characters. The encoding converts Unicode strings to ASCII-compatible encoding (ACE) format. Punycode-encoded domains are prefixed with 'xn--'.",
    examples: [
      "münchen → xn--mnchen-3ya",
      "北京 → xn--1lq90i",
      "日本語.jp → xn--wgv71a119e.jp",
    ],
    useCases: [
      "Internationalized Domain Names",
      "Non-ASCII URLs",
      "Email addresses with Unicode",
      "DNS compatibility",
    ],
    relatedTerms: ["unicode", "url-encoding", "dns"],
    relatedTools: ["url-encoder"],
    category: "encoding",
    seoKeywords: [
      "what is punycode",
      "punycode converter",
      "internationalized domain names",
      "idn encoding",
    ],
  },
  "percent-encoding": {
    slug: "percent-encoding",
    term: "Percent-Encoding",
    shortDefinition:
      "A method to encode special characters in URIs using percent signs and hex digits.",
    fullDefinition:
      "Percent-encoding, also known as URL encoding, is a mechanism for encoding information in a URI (Uniform Resource Identifier). It replaces unsafe characters with a '%' followed by two hexadecimal digits representing the character's ASCII value. This ensures that URIs are transmitted correctly, as certain characters have special meanings or are not allowed in URIs.",
    examples: ["space → %20", "@ → %40", "/ → %2F", "? → %3F"],
    useCases: [
      "URL query parameters",
      "Form data encoding",
      "Special character handling",
      "API parameters",
    ],
    relatedTerms: ["url-encoding", "uri", "query-string"],
    relatedTools: ["url-encoder"],
    category: "encoding",
    seoKeywords: [
      "percent encoding",
      "url encoding",
      "urlencode",
      "encode url characters",
    ],
  },
  gzip: {
    slug: "gzip",
    term: "Gzip",
    shortDefinition:
      "A file format and software for file compression and decompression.",
    fullDefinition:
      "Gzip (GNU zip) is a file format and a software application used for file compression and decompression. It uses the DEFLATE algorithm, combining LZ77 and Huffman coding. Gzip is widely used on the web for HTTP compression, significantly reducing the size of HTML, CSS, and JavaScript files transmitted between servers and browsers. It typically achieves 70-90% compression for text files.",
    examples: ["Content-Encoding: gzip", "file.tar.gz", "gzip -9 file.txt"],
    useCases: [
      "HTTP content compression",
      "File archiving",
      "Log file compression",
      "Data transfer optimization",
    ],
    relatedTerms: ["brotli", "deflate", "encoding"],
    relatedTools: [],
    category: "encoding",
    seoKeywords: [
      "what is gzip",
      "gzip compression",
      "gzip vs brotli",
      "http gzip",
    ],
  },
  brotli: {
    slug: "brotli",
    term: "Brotli",
    shortDefinition:
      "A compression algorithm developed by Google offering better compression than gzip.",
    fullDefinition:
      "Brotli is a generic-purpose lossless compression algorithm developed by Google that compresses data using a combination of a modern variant of the LZ77 algorithm, Huffman coding, and 2nd order context modeling. It offers better compression ratios than gzip (typically 15-25% smaller) while being comparable in decompression speed. Brotli is supported by all modern browsers for HTTP compression.",
    examples: ["Content-Encoding: br", "file.br"],
    useCases: [
      "HTTP content compression",
      "Static file compression",
      "Web asset optimization",
      "CDN delivery",
    ],
    relatedTerms: ["gzip", "deflate", "encoding"],
    relatedTools: [],
    category: "encoding",
    seoKeywords: [
      "what is brotli",
      "brotli compression",
      "brotli vs gzip",
      "brotli encoding",
    ],
  },
  deflate: {
    slug: "deflate",
    term: "DEFLATE",
    shortDefinition:
      "A lossless data compression algorithm combining LZ77 and Huffman coding.",
    fullDefinition:
      "DEFLATE is a lossless data compression algorithm that uses a combination of the LZ77 algorithm and Huffman coding. It is the underlying algorithm used by both gzip and ZIP file formats. DEFLATE provides a good balance between compression ratio and speed, making it suitable for various applications. It was developed by Phil Katz and specified in RFC 1951.",
    examples: [
      "Content-Encoding: deflate",
      "ZIP file compression",
      "PNG image compression",
    ],
    useCases: [
      "ZIP file format",
      "PNG image compression",
      "HTTP compression",
      "PDF compression",
    ],
    relatedTerms: ["gzip", "brotli", "encoding"],
    relatedTools: [],
    category: "encoding",
    seoKeywords: [
      "deflate algorithm",
      "deflate compression",
      "deflate vs gzip",
      "lz77 huffman",
    ],
  },
  base32: {
    slug: "base32",
    term: "Base32",
    shortDefinition:
      "A binary-to-text encoding scheme using 32 ASCII characters.",
    fullDefinition:
      "Base32 is a transfer encoding using a 32-character set consisting of uppercase letters A-Z and digits 2-7. Unlike Base64, Base32 doesn't use lowercase letters or easily confused characters (0, 1, 8, 9), making it more human-readable and case-insensitive. It's commonly used in TOTP (Time-based One-Time Passwords) for authenticator apps and in file systems that are case-insensitive.",
    examples: [
      "JBSWY3DPEHPK3PXP (secret key for TOTP)",
      "Hello → JBSWY3DPEBLW64TMMQ======",
    ],
    useCases: [
      "TOTP secret keys",
      "Case-insensitive systems",
      "File naming",
      "URL-safe encoding",
    ],
    relatedTerms: ["base64", "base58", "encoding"],
    relatedTools: ["base64-converter"],
    category: "encoding",
    seoKeywords: [
      "base32 encoding",
      "base32 decode",
      "base32 vs base64",
      "totp base32",
    ],
  },
  base58: {
    slug: "base58",
    term: "Base58",
    shortDefinition:
      "A binary-to-text encoding designed for human readability, used in Bitcoin addresses.",
    fullDefinition:
      "Base58 is a binary-to-text encoding that was developed for Bitcoin and is designed to be more human-friendly than hexadecimal or Base64. It excludes easily confused characters: 0 (zero), O (uppercase o), I (uppercase i), and l (lowercase L). It also excludes + and / to make the output URL-safe. Base58Check adds a checksum for error detection.",
    examples: [
      "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2 (Bitcoin address)",
      "Base58Check with version byte and checksum",
    ],
    useCases: [
      "Bitcoin addresses",
      "Cryptocurrency wallets",
      "Short URL identifiers",
      "Human-readable identifiers",
    ],
    relatedTerms: ["base64", "base32", "encoding"],
    relatedTools: ["base64-converter"],
    category: "encoding",
    seoKeywords: [
      "base58 encoding",
      "base58 bitcoin",
      "base58 decode",
      "base58check",
    ],
  },
  base91: {
    slug: "base91",
    term: "Base91",
    shortDefinition:
      "An efficient binary-to-text encoding using 91 printable ASCII characters.",
    fullDefinition:
      "Base91 (basE91) is a binary-to-text encoding scheme that uses 91 printable ASCII characters, offering better efficiency than Base64. It encodes 13/14 bits per character compared to Base64's 6 bits per character. Base91 uses all printable ASCII characters except for '-', ''' (single quote), and '\\''. It's useful when you need the most compact ASCII representation of binary data.",
    examples: ["Hello World → >OwJh>Io0Tv!8PE"],
    useCases: [
      "Compact data encoding",
      "URL shortening",
      "QR code data",
      "Space-efficient storage",
    ],
    relatedTerms: ["base64", "base58", "encoding"],
    relatedTools: ["base64-converter"],
    category: "encoding",
    seoKeywords: [
      "base91 encoding",
      "base91 decode",
      "base91 vs base64",
      "efficient encoding",
    ],
  },

  // ============================================
  // Web (New: 15 terms)
  // ============================================
  http: {
    slug: "http",
    term: "HTTP",
    acronymFor: "HyperText Transfer Protocol",
    shortDefinition:
      "The foundation of data communication on the World Wide Web.",
    fullDefinition:
      "HTTP (HyperText Transfer Protocol) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can be used for other purposes as well. HTTP follows a classical client-server model, with a client opening a connection to make a request, then waiting for a response. HTTP is stateless, meaning the server doesn't keep any data between two requests.",
    examples: [
      "GET /index.html HTTP/1.1",
      "POST /api/users HTTP/2",
      "HTTP/1.1 200 OK",
    ],
    useCases: [
      "Web page delivery",
      "REST APIs",
      "File downloads",
      "Web services",
    ],
    relatedTerms: ["https", "rest", "api", "http-status-codes"],
    relatedTools: ["curl-builder"],
    category: "web",
    seoKeywords: [
      "what is http",
      "http protocol",
      "http vs https",
      "http methods",
    ],
  },
  "http-status-codes": {
    slug: "http-status-codes",
    term: "HTTP Status Codes",
    shortDefinition:
      "Standard response codes indicating the result of an HTTP request.",
    fullDefinition:
      "HTTP status codes are three-digit codes returned by servers to indicate the result of a client's request. They are grouped into five classes: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error). Common codes include 200 (OK), 404 (Not Found), and 500 (Internal Server Error). Understanding status codes is essential for debugging web applications and APIs.",
    examples: [
      "200 OK - Request succeeded",
      "404 Not Found - Resource doesn't exist",
      "500 Internal Server Error - Server error",
      "301 Moved Permanently - Redirect",
    ],
    useCases: [
      "API response handling",
      "Error handling",
      "Debugging",
      "SEO (redirects)",
    ],
    relatedTerms: ["http", "rest", "api"],
    relatedTools: ["curl-builder"],
    category: "web",
    seoKeywords: [
      "http status codes",
      "http response codes",
      "404 error",
      "500 error",
    ],
  },
  websocket: {
    slug: "websocket",
    term: "WebSocket",
    shortDefinition:
      "A protocol providing full-duplex communication channels over a single TCP connection.",
    fullDefinition:
      "WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. Unlike HTTP, which is request-response based, WebSocket allows for persistent, bi-directional communication between client and server. This makes it ideal for real-time applications where low latency is important. WebSocket connections start as HTTP and then upgrade to the WebSocket protocol.",
    examples: [
      "ws://example.com/socket",
      "wss://example.com/socket (secure)",
      "socket.send('message')",
    ],
    useCases: [
      "Real-time chat applications",
      "Live sports updates",
      "Collaborative editing",
      "Gaming",
    ],
    relatedTerms: ["http", "api", "ssr"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "what is websocket",
      "websocket vs http",
      "websocket connection",
      "real time websocket",
    ],
  },
  cookie: {
    slug: "cookie",
    term: "Cookie",
    shortDefinition:
      "A small piece of data stored on the user's computer by the web browser.",
    fullDefinition:
      "An HTTP cookie is a small piece of data that a server sends to a user's web browser. The browser may store it and send it back with later requests to the same server. Cookies are mainly used for session management, personalization, and tracking. They have attributes like expiration, domain, path, and security flags (Secure, HttpOnly, SameSite) that control their behavior.",
    examples: [
      "Set-Cookie: sessionId=abc123; HttpOnly; Secure",
      "document.cookie = 'theme=dark'",
    ],
    useCases: [
      "Session management",
      "User preferences",
      "Tracking and analytics",
      "Shopping carts",
    ],
    relatedTerms: ["session", "local-storage", "session-storage"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "what are cookies",
      "http cookie",
      "cookie settings",
      "cookie security",
    ],
  },
  "session-storage": {
    slug: "session-storage",
    term: "Session Storage",
    shortDefinition:
      "A web storage mechanism that stores data for one session in the browser.",
    fullDefinition:
      "Session Storage is a web storage API that allows you to store key-value pairs in a web browser. Data stored in sessionStorage is specific to the protocol of the page and gets cleared when the page session ends (when the browser tab is closed). Unlike localStorage, sessionStorage data is not shared between tabs, even for the same origin. It's useful for storing temporary data that shouldn't persist beyond the session.",
    examples: [
      "sessionStorage.setItem('key', 'value')",
      "sessionStorage.getItem('key')",
      "sessionStorage.clear()",
    ],
    useCases: [
      "Form wizard state",
      "Temporary UI state",
      "One-time messages",
      "Tab-specific data",
    ],
    relatedTerms: ["local-storage", "cookie", "session"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "session storage",
      "sessionstorage javascript",
      "session vs local storage",
      "web storage",
    ],
  },
  "local-storage": {
    slug: "local-storage",
    term: "Local Storage",
    shortDefinition:
      "A web storage mechanism that stores data with no expiration date.",
    fullDefinition:
      "Local Storage is a web storage API that allows you to store key-value pairs in a web browser with no expiration date. The data persists even after the browser is closed and reopened. localStorage is domain-specific, meaning data is shared across all tabs/windows of the same origin. It provides about 5-10MB of storage and is synchronous, which can block the main thread for large operations.",
    examples: [
      "localStorage.setItem('theme', 'dark')",
      "localStorage.getItem('theme')",
      "localStorage.removeItem('theme')",
    ],
    useCases: [
      "User preferences",
      "Theme settings",
      "Cached data",
      "Offline data storage",
    ],
    relatedTerms: ["session-storage", "cookie", "cache"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "local storage",
      "localstorage javascript",
      "local vs session storage",
      "web storage api",
    ],
  },
  cache: {
    slug: "cache",
    term: "Cache",
    shortDefinition:
      "A hardware or software component that stores data for faster future access.",
    fullDefinition:
      "A cache is a hardware or software component that stores data so that future requests for that data can be served faster. In web development, caching occurs at multiple levels: browser cache (storing static assets), CDN cache (edge caching), server cache (database query results), and application cache (computed values). Proper caching strategies are crucial for web performance and scalability.",
    examples: [
      "Cache-Control: max-age=3600",
      "ETag: 'abc123'",
      "Service Worker cache",
    ],
    useCases: [
      "Static asset caching",
      "API response caching",
      "Database query caching",
      "CDN edge caching",
    ],
    relatedTerms: ["cdn", "http", "local-storage"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "what is cache",
      "browser cache",
      "cache control",
      "http caching",
    ],
  },
  cdn: {
    slug: "cdn",
    term: "CDN",
    acronymFor: "Content Delivery Network",
    shortDefinition:
      "A distributed network of servers that delivers web content based on user location.",
    fullDefinition:
      "A Content Delivery Network (CDN) is a geographically distributed network of proxy servers and data centers that work together to provide fast delivery of internet content. CDNs cache static content (images, CSS, JavaScript) on edge servers close to users, reducing latency and server load. Major CDN providers include Cloudflare, AWS CloudFront, Akamai, and Fastly.",
    examples: [
      "https://cdn.example.com/image.png",
      "Cloudflare CDN",
      "AWS CloudFront distribution",
    ],
    useCases: [
      "Static asset delivery",
      "Video streaming",
      "Website acceleration",
      "DDoS protection",
    ],
    relatedTerms: ["cache", "dns", "http"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "what is cdn",
      "content delivery network",
      "cdn benefits",
      "cdn providers",
    ],
  },
  dns: {
    slug: "dns",
    term: "DNS",
    acronymFor: "Domain Name System",
    shortDefinition:
      "The system that translates human-readable domain names to IP addresses.",
    fullDefinition:
      "The Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the internet or a private network. It translates human-readable domain names (like www.example.com) to IP addresses (like 192.0.2.1). DNS is often described as the 'phonebook of the internet' and is essential for the functioning of the web.",
    examples: [
      "A record: example.com → 192.0.2.1",
      "CNAME record: www → example.com",
      "MX record for email",
    ],
    useCases: [
      "Domain resolution",
      "Email routing",
      "Load balancing",
      "Subdomain management",
    ],
    relatedTerms: ["cdn", "ssl-certificate", "http"],
    relatedTools: [],
    category: "web",
    seoKeywords: ["what is dns", "dns lookup", "dns records", "dns server"],
  },
  "ssl-certificate": {
    slug: "ssl-certificate",
    term: "SSL Certificate",
    shortDefinition:
      "A digital certificate that authenticates a website's identity and enables encrypted connections.",
    fullDefinition:
      "An SSL (Secure Sockets Layer) certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection using the TLS protocol. When a website has an SSL certificate, the URL shows HTTPS instead of HTTP, and a padlock icon appears in the browser. Certificates are issued by Certificate Authorities (CAs) and contain the domain name, certificate holder, CA signature, and public key.",
    examples: [
      "DV (Domain Validation) certificate",
      "OV (Organization Validation) certificate",
      "EV (Extended Validation) certificate",
      "Let's Encrypt free certificate",
    ],
    useCases: [
      "Website security",
      "E-commerce trust",
      "User data protection",
      "SEO ranking factor",
    ],
    relatedTerms: ["https", "ssl-tls", "dns"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "ssl certificate",
      "ssl vs tls",
      "free ssl certificate",
      "ssl certificate types",
    ],
  },
  "load-balancer": {
    slug: "load-balancer",
    term: "Load Balancer",
    shortDefinition:
      "A device or software that distributes network traffic across multiple servers.",
    fullDefinition:
      "A load balancer is a device or software that distributes network traffic across multiple servers to ensure no single server bears too much demand. By spreading the work evenly, load balancers improve responsiveness and increase availability of applications. They can route traffic based on various algorithms (round-robin, least connections, IP hash) and perform health checks to route traffic only to healthy servers.",
    examples: [
      "AWS Elastic Load Balancer",
      "NGINX as reverse proxy/load balancer",
      "HAProxy",
    ],
    useCases: [
      "High availability",
      "Horizontal scaling",
      "Traffic distribution",
      "Failover handling",
    ],
    relatedTerms: ["proxy", "reverse-proxy", "cdn"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "load balancer",
      "load balancing",
      "aws load balancer",
      "nginx load balancer",
    ],
  },
  proxy: {
    slug: "proxy",
    term: "Proxy Server",
    shortDefinition:
      "An intermediary server that forwards requests between clients and other servers.",
    fullDefinition:
      "A proxy server is an intermediary server that forwards requests from clients to other servers. Proxies can provide various functions: anonymity (hiding client IP), filtering (blocking certain content), caching (storing frequently accessed resources), and load balancing. Forward proxies act on behalf of clients, while reverse proxies act on behalf of servers. Proxies are essential for security, performance, and network management.",
    examples: [
      "HTTP proxy: http://proxy.example.com:8080",
      "SOCKS5 proxy",
      "Corporate firewall proxy",
    ],
    useCases: [
      "Corporate network filtering",
      "Anonymity/privacy",
      "Bypassing geo-restrictions",
      "Web scraping",
    ],
    relatedTerms: ["reverse-proxy", "load-balancer", "cors"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "proxy server",
      "what is proxy",
      "proxy vs vpn",
      "http proxy",
    ],
  },
  "reverse-proxy": {
    slug: "reverse-proxy",
    term: "Reverse Proxy",
    shortDefinition:
      "A server that forwards client requests to backend servers on behalf of those servers.",
    fullDefinition:
      "A reverse proxy is a server that sits in front of one or more web servers, intercepting requests from clients. Unlike a forward proxy (which acts on behalf of clients), a reverse proxy acts on behalf of servers. It can provide load balancing, SSL termination, caching, and security features. Popular reverse proxies include NGINX, Apache, and Traefik. They're essential for modern web architecture.",
    examples: [
      "NGINX reverse proxy",
      "Cloudflare as reverse proxy",
      "AWS Application Load Balancer",
    ],
    useCases: [
      "Load balancing",
      "SSL termination",
      "Caching static content",
      "Security/DDoS protection",
    ],
    relatedTerms: ["proxy", "load-balancer", "cdn"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "reverse proxy",
      "nginx reverse proxy",
      "reverse proxy vs proxy",
      "reverse proxy setup",
    ],
  },
  spa: {
    slug: "spa",
    term: "SPA",
    acronymFor: "Single-Page Application",
    shortDefinition:
      "A web application that loads a single HTML page and dynamically updates content.",
    fullDefinition:
      "A Single-Page Application (SPA) is a web application that loads a single HTML document and dynamically updates the page content as the user interacts with the app. SPAs use JavaScript frameworks (React, Vue, Angular) to handle routing and rendering on the client side, making interactions feel faster and more app-like. However, SPAs can have challenges with SEO and initial load time, which SSR addresses.",
    examples: ["Gmail", "Google Maps", "React applications with React Router"],
    useCases: [
      "Web applications",
      "Dashboards",
      "Interactive tools",
      "Social media platforms",
    ],
    relatedTerms: ["ssr", "javascript", "api"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "single page application",
      "spa vs mpa",
      "spa react",
      "spa architecture",
    ],
  },
  ssr: {
    slug: "ssr",
    term: "SSR",
    acronymFor: "Server-Side Rendering",
    shortDefinition:
      "A technique where web pages are rendered on the server before being sent to the client.",
    fullDefinition:
      "Server-Side Rendering (SSR) is a technique for rendering web pages on the server instead of in the browser. When a user requests a page, the server generates the full HTML content and sends it to the browser. This improves initial page load performance and SEO since search engines can easily crawl the content. Frameworks like Next.js (React), Nuxt.js (Vue), and Angular Universal support SSR.",
    examples: [
      "Next.js getServerSideProps",
      "Nuxt.js asyncData",
      "PHP/Ruby on Rails (traditional SSR)",
    ],
    useCases: [
      "SEO optimization",
      "Faster initial page load",
      "Content-heavy websites",
      "E-commerce sites",
    ],
    relatedTerms: ["spa", "html", "javascript"],
    relatedTools: [],
    category: "web",
    seoKeywords: [
      "server side rendering",
      "ssr vs spa",
      "nextjs ssr",
      "ssr react",
    ],
  },

  // ============================================
  // Programming (New: 16 terms)
  // ============================================
  typescript: {
    slug: "typescript",
    term: "TypeScript",
    shortDefinition:
      "A typed superset of JavaScript that compiles to plain JavaScript.",
    fullDefinition:
      "TypeScript is a strongly typed programming language developed by Microsoft that builds on JavaScript. It adds optional static typing, classes, and interfaces. TypeScript code compiles to plain JavaScript, running on any browser, Node.js, or JavaScript engine. It catches errors at compile time rather than runtime, improving code quality and developer productivity. TypeScript is the standard for large-scale JavaScript applications.",
    examples: [
      "let name: string = 'John';",
      "interface User { id: number; name: string; }",
      "function greet(name: string): string { return `Hello ${name}`; }",
    ],
    useCases: [
      "Large-scale applications",
      "React/Vue/Angular development",
      "Node.js backend",
      "Library development",
    ],
    relatedTerms: ["javascript", "transpiling", "npm"],
    relatedTools: ["json-to-typescript", "prettier-playground"],
    category: "programming",
    seoKeywords: [
      "what is typescript",
      "typescript vs javascript",
      "typescript tutorial",
      "learn typescript",
    ],
  },
  javascript: {
    slug: "javascript",
    term: "JavaScript",
    shortDefinition:
      "A high-level, interpreted programming language that powers interactive web pages.",
    fullDefinition:
      "JavaScript is a high-level, just-in-time compiled programming language that conforms to the ECMAScript specification. Originally developed for web browsers, JavaScript is now used for server-side development (Node.js), mobile apps (React Native), desktop apps (Electron), and more. It's the only programming language natively supported by all web browsers, making it essential for web development.",
    examples: [
      "const greeting = 'Hello World';",
      "document.getElementById('id');",
      "fetch('/api/data').then(res => res.json())",
    ],
    useCases: [
      "Web interactivity",
      "Frontend frameworks",
      "Node.js backend",
      "Full-stack development",
    ],
    relatedTerms: ["typescript", "json", "promise", "async-await"],
    relatedTools: ["json-formatter", "regex-tester"],
    category: "programming",
    seoKeywords: [
      "what is javascript",
      "javascript tutorial",
      "learn javascript",
      "javascript vs python",
    ],
  },
  callback: {
    slug: "callback",
    term: "Callback Function",
    shortDefinition:
      "A function passed as an argument to another function to be executed later.",
    fullDefinition:
      "A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. Callbacks are fundamental to asynchronous programming in JavaScript, allowing code to run after an operation completes. While powerful, nested callbacks can lead to 'callback hell', which Promises and async/await were designed to solve.",
    examples: [
      "setTimeout(() => console.log('Done'), 1000);",
      "array.forEach(item => console.log(item));",
      "fs.readFile('file.txt', (err, data) => {...});",
    ],
    useCases: [
      "Event handlers",
      "Asynchronous operations",
      "Array methods (map, filter, forEach)",
      "Timers (setTimeout, setInterval)",
    ],
    relatedTerms: ["promise", "async-await", "closure"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "callback function",
      "javascript callback",
      "callback vs promise",
      "callback hell",
    ],
  },
  promise: {
    slug: "promise",
    term: "Promise",
    shortDefinition:
      "An object representing the eventual completion or failure of an asynchronous operation.",
    fullDefinition:
      "A Promise is a JavaScript object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. A Promise is in one of three states: pending, fulfilled, or rejected. Promises provide cleaner asynchronous code than callbacks, with .then() for success and .catch() for errors. They can be chained and combined using Promise.all(), Promise.race(), etc.",
    examples: [
      "fetch(url).then(res => res.json()).catch(err => console.error(err));",
      "new Promise((resolve, reject) => {...});",
      "Promise.all([promise1, promise2]);",
    ],
    useCases: [
      "API calls (fetch)",
      "File operations",
      "Database queries",
      "Any asynchronous operation",
    ],
    relatedTerms: ["async-await", "callback", "javascript"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript promise",
      "promise then catch",
      "promise all",
      "async promise",
    ],
  },
  "async-await": {
    slug: "async-await",
    term: "Async/Await",
    shortDefinition:
      "Syntax for writing asynchronous code that looks and behaves like synchronous code.",
    fullDefinition:
      "Async/await is syntactic sugar built on top of Promises in JavaScript, introduced in ES2017. The 'async' keyword declares that a function returns a Promise, and 'await' pauses execution until a Promise resolves. This makes asynchronous code easier to read and write, looking similar to synchronous code. Error handling uses try/catch blocks, making it more intuitive than Promise chains.",
    examples: [
      "async function fetchData() { const res = await fetch(url); return res.json(); }",
      "try { const data = await fetchData(); } catch (err) { console.error(err); }",
    ],
    useCases: [
      "API calls",
      "Database operations",
      "File system operations",
      "Sequential async operations",
    ],
    relatedTerms: ["promise", "callback", "javascript"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "async await",
      "async await javascript",
      "async await vs promise",
      "async function",
    ],
  },
  closure: {
    slug: "closure",
    term: "Closure",
    shortDefinition:
      "A function that has access to variables from its outer scope even after the outer function has returned.",
    fullDefinition:
      "A closure is a JavaScript feature where an inner function has access to the outer function's variables and parameters, even after the outer function has finished executing. Closures 'close over' their lexical environment, maintaining references to those variables. They're fundamental to JavaScript and are used for data privacy, factory functions, and maintaining state in functional programming.",
    examples: [
      "function outer() { let count = 0; return () => ++count; }",
      "const counter = outer(); counter(); // 1, counter(); // 2",
    ],
    useCases: [
      "Data privacy/encapsulation",
      "Factory functions",
      "Event handlers with state",
      "Partial application",
    ],
    relatedTerms: ["callback", "javascript", "prototype"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript closure",
      "what is closure",
      "closure example",
      "closure scope",
    ],
  },
  prototype: {
    slug: "prototype",
    term: "Prototype",
    shortDefinition:
      "The mechanism by which JavaScript objects inherit features from one another.",
    fullDefinition:
      "In JavaScript, every object has a prototype, which is another object from which it inherits properties and methods. This prototype chain is the mechanism for inheritance in JavaScript. When you access a property on an object, JavaScript first looks on the object itself, then on its prototype, then on the prototype's prototype, and so on up the chain until it finds the property or reaches null.",
    examples: [
      "Object.getPrototypeOf(obj)",
      "Array.prototype.map",
      "function Foo() {} Foo.prototype.method = function() {};",
    ],
    useCases: [
      "Object inheritance",
      "Adding methods to built-ins",
      "Class-like patterns (pre-ES6)",
      "Understanding JavaScript internals",
    ],
    relatedTerms: ["javascript", "closure", "module"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript prototype",
      "prototype chain",
      "prototype inheritance",
      "prototype vs class",
    ],
  },
  decorator: {
    slug: "decorator",
    term: "Decorator",
    shortDefinition:
      "A design pattern that allows behavior to be added to objects dynamically.",
    fullDefinition:
      "A decorator is a design pattern that allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. In JavaScript/TypeScript, decorators are proposed syntax for modifying classes, methods, and properties. They are widely used in frameworks like Angular and NestJS for dependency injection, validation, and metadata annotation.",
    examples: [
      "@Component({ selector: 'app-root' }) class AppComponent {}",
      "@Injectable() class UserService {}",
      "@Get('/users') getUsers() {}",
    ],
    useCases: [
      "Angular components",
      "NestJS controllers",
      "Dependency injection",
      "Validation and logging",
    ],
    relatedTerms: ["typescript", "module", "javascript"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript decorator",
      "typescript decorator",
      "decorator pattern",
      "angular decorator",
    ],
  },
  iterator: {
    slug: "iterator",
    term: "Iterator",
    shortDefinition:
      "An object that enables traversing a collection one element at a time.",
    fullDefinition:
      "An iterator is an object that defines a sequence and potentially a return value upon its termination. In JavaScript, an object is an iterator when it implements a next() method that returns an object with 'value' and 'done' properties. Many built-in JavaScript objects are iterable (arrays, strings, maps, sets) and can be traversed using for...of loops or the spread operator.",
    examples: [
      "const it = arr[Symbol.iterator](); it.next(); // { value: 1, done: false }",
      "for (const item of iterable) { console.log(item); }",
      "[...iterable]",
    ],
    useCases: [
      "Traversing collections",
      "Custom iteration logic",
      "Lazy evaluation",
      "Generator functions",
    ],
    relatedTerms: ["generator", "javascript", "promise"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript iterator",
      "iterator pattern",
      "iterable javascript",
      "for of loop",
    ],
  },
  generator: {
    slug: "generator",
    term: "Generator Function",
    shortDefinition:
      "A function that can be paused and resumed, yielding multiple values over time.",
    fullDefinition:
      "A generator function is a special type of function that can be paused and resumed, producing a sequence of values on-demand using the 'yield' keyword. Generator functions are defined using function* syntax and return a Generator object when called. They're useful for implementing iterators, handling asynchronous operations (with libraries like redux-saga), and working with potentially infinite sequences.",
    examples: [
      "function* count() { yield 1; yield 2; yield 3; }",
      "const gen = count(); gen.next(); // { value: 1, done: false }",
      "function* infinite() { let i = 0; while(true) yield i++; }",
    ],
    useCases: [
      "Lazy iteration",
      "Infinite sequences",
      "Async flow control (redux-saga)",
      "Custom iterators",
    ],
    relatedTerms: ["iterator", "async-await", "promise"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript generator",
      "generator function",
      "yield javascript",
      "generator vs iterator",
    ],
  },
  module: {
    slug: "module",
    term: "Module",
    shortDefinition:
      "A reusable piece of code that encapsulates implementation details and exposes a public API.",
    fullDefinition:
      "A module is a reusable piece of code that encapsulates implementation details and exposes a public API. JavaScript supports ES Modules (import/export) and CommonJS (require/module.exports). Modules help organize code, prevent naming collisions through their own scope, and enable dependency management. Modern bundlers like webpack and esbuild handle module resolution and bundling for browsers.",
    examples: [
      "export function add(a, b) { return a + b; }",
      "import { add } from './math';",
      "const fs = require('fs'); // CommonJS",
    ],
    useCases: [
      "Code organization",
      "Reusable libraries",
      "Dependency management",
      "Code splitting",
    ],
    relatedTerms: ["npm", "javascript", "package-json"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "javascript modules",
      "es modules",
      "import export javascript",
      "commonjs vs esm",
    ],
  },
  "package-json": {
    slug: "package-json",
    term: "package.json",
    shortDefinition:
      "The configuration file for Node.js projects containing metadata and dependencies.",
    fullDefinition:
      "package.json is the central configuration file for Node.js projects and JavaScript packages. It contains metadata about the project (name, version, description), lists dependencies and devDependencies, defines scripts for common tasks, and specifies the entry point and module type. It's managed by npm, yarn, or pnpm and is essential for any JavaScript/TypeScript project.",
    examples: [
      '{"name": "my-app", "version": "1.0.0", "dependencies": {"react": "^18.0.0"}}',
      '"scripts": {"start": "node index.js", "build": "tsc"}',
    ],
    useCases: [
      "Dependency management",
      "Script definitions",
      "Project metadata",
      "npm/yarn/pnpm configuration",
    ],
    relatedTerms: ["npm", "module", "semver"],
    relatedTools: ["json-formatter"],
    category: "programming",
    seoKeywords: [
      "package.json",
      "package json npm",
      "package.json scripts",
      "package json explained",
    ],
  },
  npm: {
    slug: "npm",
    term: "npm",
    acronymFor: "Node Package Manager",
    shortDefinition:
      "The default package manager for Node.js and the world's largest software registry.",
    fullDefinition:
      "npm (Node Package Manager) is the default package manager for Node.js and the world's largest software registry. It consists of a command-line client that interacts with a remote registry. npm is used to install, share, and manage dependencies in JavaScript projects. Alternative package managers include yarn and pnpm. npm also provides services like publishing packages and managing organizations.",
    examples: [
      "npm install react",
      "npm run build",
      "npm init -y",
      "npx create-react-app my-app",
    ],
    useCases: [
      "Installing dependencies",
      "Running scripts",
      "Publishing packages",
      "Managing project configuration",
    ],
    relatedTerms: ["package-json", "module", "semver"],
    relatedTools: [],
    category: "programming",
    seoKeywords: ["npm", "npm install", "npm vs yarn", "npm commands"],
  },
  semver: {
    slug: "semver",
    term: "Semantic Versioning",
    shortDefinition:
      "A versioning scheme using MAJOR.MINOR.PATCH format to convey meaning about changes.",
    fullDefinition:
      "Semantic Versioning (SemVer) is a versioning scheme for software using a three-part number: MAJOR.MINOR.PATCH. MAJOR versions indicate incompatible API changes, MINOR versions add functionality in a backward-compatible manner, and PATCH versions make backward-compatible bug fixes. SemVer is widely used in npm packages and helps developers understand the impact of upgrading dependencies.",
    examples: [
      "1.0.0 → 2.0.0 (breaking change)",
      "1.0.0 → 1.1.0 (new feature)",
      "1.0.0 → 1.0.1 (bug fix)",
      "^1.0.0 (compatible with 1.x.x)",
    ],
    useCases: [
      "npm package versioning",
      "API versioning",
      "Dependency management",
      "Release management",
    ],
    relatedTerms: ["npm", "package-json"],
    relatedTools: [],
    category: "programming",
    seoKeywords: [
      "semantic versioning",
      "semver",
      "version numbering",
      "npm versioning",
    ],
  },
  linting: {
    slug: "linting",
    term: "Linting",
    shortDefinition:
      "The process of analyzing code to find potential errors and enforce coding standards.",
    fullDefinition:
      "Linting is the process of running a program (linter) that analyzes code for potential errors, bugs, stylistic errors, and suspicious constructs. Popular JavaScript/TypeScript linters include ESLint and Biome. Linters can enforce coding standards, catch common mistakes, and improve code quality. They can be integrated into editors, pre-commit hooks, and CI/CD pipelines.",
    examples: ["eslint src/**/*.ts", "biome check .", "no-unused-vars rule"],
    useCases: [
      "Code quality enforcement",
      "Style consistency",
      "Bug prevention",
      "Team coding standards",
    ],
    relatedTerms: ["typescript", "transpiling"],
    relatedTools: ["prettier-playground"],
    category: "programming",
    seoKeywords: ["linting", "eslint", "code linting", "linter javascript"],
  },
  transpiling: {
    slug: "transpiling",
    term: "Transpiling",
    shortDefinition:
      "Converting source code from one language or version to another of similar abstraction.",
    fullDefinition:
      "Transpiling (source-to-source compilation) is the process of converting source code from one programming language or version to another at a similar level of abstraction. In JavaScript, transpilers like Babel convert modern ES6+ code to older ES5 for browser compatibility. TypeScript is transpiled to JavaScript. Unlike traditional compilers (high-level to low-level), transpilers work between high-level languages.",
    examples: [
      "TypeScript → JavaScript",
      "ES6 → ES5 (Babel)",
      "JSX → JavaScript (React)",
    ],
    useCases: [
      "Browser compatibility",
      "TypeScript compilation",
      "React JSX transformation",
      "Using new language features",
    ],
    relatedTerms: ["typescript", "javascript", "linting"],
    relatedTools: ["prettier-playground"],
    category: "programming",
    seoKeywords: [
      "transpiling",
      "transpiler",
      "babel transpile",
      "transpile vs compile",
    ],
  },

  // ============================================
  // Standards (New: 7 terms)
  // ============================================
  rfc: {
    slug: "rfc",
    term: "RFC",
    acronymFor: "Request for Comments",
    shortDefinition:
      "A formal document describing internet standards, protocols, and procedures.",
    fullDefinition:
      "A Request for Comments (RFC) is a formal document from the Internet Engineering Task Force (IETF) describing specifications, protocols, procedures, and events related to the Internet. RFCs define foundational internet standards like HTTP (RFC 2616), JSON (RFC 8259), and JWT (RFC 7519). Despite the name suggesting informality, many RFCs define critical internet standards that are implemented worldwide.",
    examples: [
      "RFC 2616 - HTTP/1.1",
      "RFC 7519 - JSON Web Token",
      "RFC 8259 - JSON format",
    ],
    useCases: [
      "Protocol specifications",
      "Internet standards",
      "Implementation reference",
      "Technical compliance",
    ],
    relatedTerms: ["http", "json", "jwt"],
    relatedTools: [],
    category: "standards",
    seoKeywords: [
      "what is rfc",
      "rfc standards",
      "internet rfc",
      "rfc document",
    ],
  },
  "iso-8601": {
    slug: "iso-8601",
    term: "ISO 8601",
    shortDefinition:
      "An international standard for representing dates and times.",
    fullDefinition:
      "ISO 8601 is an international standard for the representation of dates and times. It provides a clear, unambiguous format that avoids confusion caused by different date conventions worldwide. The format uses YYYY-MM-DD for dates and HH:MM:SS for times, with optional timezone information. ISO 8601 is widely used in APIs, databases, and data interchange to ensure consistent date/time handling.",
    examples: [
      "2024-01-15",
      "2024-01-15T14:30:00Z",
      "2024-01-15T14:30:00+09:00",
      "P1Y2M3D (duration: 1 year, 2 months, 3 days)",
    ],
    useCases: [
      "API date formats",
      "Database timestamps",
      "Log file timestamps",
      "International data exchange",
    ],
    relatedTerms: ["unix-timestamp", "json"],
    relatedTools: [],
    category: "standards",
    seoKeywords: [
      "iso 8601",
      "iso date format",
      "iso 8601 format",
      "iso timestamp",
    ],
  },
  "unix-timestamp": {
    slug: "unix-timestamp",
    term: "Unix Timestamp",
    shortDefinition:
      "The number of seconds that have elapsed since January 1, 1970 (UTC).",
    fullDefinition:
      "A Unix timestamp (also known as Epoch time or POSIX time) is a way of tracking time as a running total of seconds since the Unix Epoch: January 1, 1970, 00:00:00 UTC. Unix timestamps are timezone-independent and widely used in programming and databases. They're simple to compare and calculate with. Modern systems often use millisecond timestamps for greater precision.",
    examples: [
      "1704067200 (2024-01-01 00:00:00 UTC)",
      "Date.now() // JavaScript milliseconds",
      "time() // PHP seconds",
    ],
    useCases: [
      "Database timestamps",
      "API responses",
      "Log files",
      "Cache expiration",
    ],
    relatedTerms: ["iso-8601", "json"],
    relatedTools: [],
    category: "standards",
    seoKeywords: [
      "unix timestamp",
      "epoch time",
      "unix time converter",
      "timestamp to date",
    ],
  },
  uri: {
    slug: "uri",
    term: "URI",
    acronymFor: "Uniform Resource Identifier",
    shortDefinition:
      "A string that identifies a resource, either by location (URL) or name (URN).",
    fullDefinition:
      "A Uniform Resource Identifier (URI) is a compact sequence of characters that identifies an abstract or physical resource. URIs can be classified as URLs (Uniform Resource Locators) which identify resources by location, or URNs (Uniform Resource Names) which identify resources by name. A URI consists of a scheme, authority, path, query, and fragment. URIs are defined in RFC 3986.",
    examples: [
      "https://example.com/path?query=value#fragment",
      "urn:isbn:0451450523",
      "mailto:user@example.com",
      "file:///etc/passwd",
    ],
    useCases: [
      "Resource identification",
      "Web addresses",
      "API endpoints",
      "Reference systems",
    ],
    relatedTerms: ["url", "percent-encoding", "http"],
    relatedTools: ["url-parser"],
    category: "standards",
    seoKeywords: [
      "what is uri",
      "uri vs url",
      "uri format",
      "uniform resource identifier",
    ],
  },
  url: {
    slug: "url",
    term: "URL",
    acronymFor: "Uniform Resource Locator",
    shortDefinition:
      "A reference to a web resource that specifies its location and access mechanism.",
    fullDefinition:
      "A Uniform Resource Locator (URL) is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it. A URL is a specific type of URI that identifies a resource by its location. URLs consist of a scheme (protocol), host, optional port, path, optional query string, and optional fragment. URLs are the primary way to access resources on the web.",
    examples: [
      "https://www.example.com:8080/path/to/resource?key=value#section",
      "ftp://ftp.example.com/file.txt",
      "file:///home/user/document.pdf",
    ],
    useCases: [
      "Web page addresses",
      "API endpoints",
      "Resource linking",
      "Navigation",
    ],
    relatedTerms: ["uri", "query-string", "url-encoding"],
    relatedTools: ["url-parser", "url-encoder"],
    category: "standards",
    seoKeywords: ["what is url", "url vs uri", "url format", "url structure"],
  },
  openapi: {
    slug: "openapi",
    term: "OpenAPI",
    shortDefinition:
      "A specification for describing, producing, consuming, and visualizing RESTful APIs.",
    fullDefinition:
      "OpenAPI Specification (formerly known as Swagger Specification) is a standard, language-agnostic specification for describing RESTful APIs. It allows both humans and computers to discover and understand the capabilities of a service without access to source code or documentation. OpenAPI definitions can be used to generate documentation, client SDKs, and server stubs. Version 3.0+ is the current standard.",
    examples: [
      "openapi: 3.0.0\ninfo:\n  title: API\n  version: 1.0.0\npaths:\n  /users:\n    get:\n      summary: List users",
      "Swagger UI documentation",
    ],
    useCases: [
      "API documentation",
      "SDK generation",
      "API testing",
      "Contract-first development",
    ],
    relatedTerms: ["rest", "api", "yaml", "json"],
    relatedTools: ["curl-builder"],
    category: "standards",
    seoKeywords: [
      "openapi",
      "swagger",
      "openapi specification",
      "api documentation",
    ],
  },
  "semantic-versioning": {
    slug: "semantic-versioning",
    term: "Semantic Versioning",
    shortDefinition:
      "A formal specification for version numbers using MAJOR.MINOR.PATCH format.",
    fullDefinition:
      "Semantic Versioning (SemVer) is a formal specification for version numbers that conveys meaning about the underlying changes. The format is MAJOR.MINOR.PATCH where: MAJOR version changes indicate incompatible API changes, MINOR version changes add functionality in a backward-compatible manner, and PATCH version changes make backward-compatible bug fixes. Pre-release and build metadata can be appended.",
    examples: [
      "1.0.0 - initial release",
      "1.0.1 - bug fix",
      "1.1.0 - new feature",
      "2.0.0-alpha.1 - pre-release",
    ],
    useCases: [
      "Software versioning",
      "Dependency management",
      "Release management",
      "Change communication",
    ],
    relatedTerms: ["npm", "package-json", "semver"],
    relatedTools: [],
    category: "standards",
    seoKeywords: [
      "semantic versioning",
      "semver specification",
      "version numbering",
      "release versioning",
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
