import type { ToolSlug } from "@/entities/tool";

export type GlossaryTermSlug =
  // Data Formats (14)
  | "json"
  | "yaml"
  | "xml"
  | "csv"
  | "toml"
  | "markdown"
  | "html"
  | "svg"
  | "protobuf"
  | "graphql"
  | "avro"
  | "parquet"
  | "msgpack"
  | "bson"
  // Security (20)
  | "jwt"
  | "sha"
  | "md5"
  | "oauth"
  | "hashing"
  | "ssl-tls"
  | "https"
  | "encryption"
  | "aes"
  | "rsa"
  | "bcrypt"
  | "argon2"
  | "hmac"
  | "xss"
  | "csrf"
  | "sql-injection"
  | "authentication"
  | "authorization"
  | "two-factor-auth"
  | "session"
  // Encoding (16)
  | "base64"
  | "url-encoding"
  | "utf-8"
  | "hex"
  | "binary"
  | "encoding"
  | "ascii"
  | "unicode"
  | "punycode"
  | "percent-encoding"
  | "gzip"
  | "brotli"
  | "deflate"
  | "base32"
  | "base58"
  | "base91"
  // Web (22)
  | "html-entity"
  | "mime-type"
  | "api"
  | "rest"
  | "query-string"
  | "data-uri"
  | "cors"
  | "http"
  | "http-status-codes"
  | "websocket"
  | "cookie"
  | "session-storage"
  | "local-storage"
  | "cache"
  | "cdn"
  | "dns"
  | "ssl-certificate"
  | "load-balancer"
  | "proxy"
  | "reverse-proxy"
  | "spa"
  | "ssr"
  // Programming (18)
  | "regex"
  | "minification"
  | "typescript"
  | "javascript"
  | "callback"
  | "promise"
  | "async-await"
  | "closure"
  | "prototype"
  | "decorator"
  | "iterator"
  | "generator"
  | "module"
  | "package-json"
  | "npm"
  | "semver"
  | "linting"
  | "transpiling"
  // Standards (10)
  | "uuid"
  | "cron"
  | "json-schema"
  | "rfc"
  | "iso-8601"
  | "unix-timestamp"
  | "uri"
  | "url"
  | "openapi"
  | "semantic-versioning";

export interface GlossaryTerm {
  slug: GlossaryTermSlug;
  term: string;
  acronymFor?: string;
  shortDefinition: string;
  fullDefinition: string;
  examples: string[];
  useCases: string[];
  relatedTerms: GlossaryTermSlug[];
  relatedTools: ToolSlug[];
  category:
    | "data-formats"
    | "security"
    | "encoding"
    | "web"
    | "programming"
    | "standards";
  seoKeywords: string[];
}
