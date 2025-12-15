/**
 * Converter Examples - 변환 예시 데이터
 */

export interface ConversionExample {
  input: string;
  output: string;
}

export const conversionExamples: Record<string, ConversionExample[]> = {
  "json-to-yaml": [
    {
      input: `{
  "name": "John",
  "age": 30,
  "city": "Seoul"
}`,
      output: `name: John
age: 30
city: Seoul`,
    },
  ],
  "yaml-to-json": [
    {
      input: `name: John
age: 30
city: Seoul`,
      output: `{
  "name": "John",
  "age": 30,
  "city": "Seoul"
}`,
    },
  ],
  "json-to-csv": [
    {
      input: `[
  {"name": "John", "age": 30},
  {"name": "Jane", "age": 25}
]`,
      output: `name,age
John,30
Jane,25`,
    },
  ],
  "csv-to-json": [
    {
      input: `name,age
John,30
Jane,25`,
      output: `[
  {
    "name": "John",
    "age": "30"
  },
  {
    "name": "Jane",
    "age": "25"
  }
]`,
    },
  ],
  "text-to-base64": [
    {
      input: "Hello, World!",
      output: "SGVsbG8sIFdvcmxkIQ==",
    },
    {
      input: "안녕하세요",
      output: "7JWI64WV7ZWY7IS47JqU",
    },
  ],
  "base64-to-text": [
    {
      input: "SGVsbG8sIFdvcmxkIQ==",
      output: "Hello, World!",
    },
  ],
  "url-encode": [
    {
      input: "hello world & special=chars?",
      output: "hello%20world%20%26%20special%3Dchars%3F",
    },
  ],
  "url-decode": [
    {
      input: "hello%20world%20%26%20special%3Dchars%3F",
      output: "hello world & special=chars?",
    },
  ],
  "hex-to-rgb": [
    {
      input: "#FF5733",
      output: "rgb(255, 87, 51)",
    },
    {
      input: "#3498db",
      output: "rgb(52, 152, 219)",
    },
  ],
  "rgb-to-hex": [
    {
      input: "rgb(255, 87, 51)",
      output: "#FF5733",
    },
    {
      input: "52, 152, 219",
      output: "#3498DB",
    },
  ],
  "hex-to-hsl": [
    {
      input: "#FF5733",
      output: "hsl(11, 100%, 60%)",
    },
  ],
  "rgb-to-hsl": [
    {
      input: "255, 87, 51",
      output: "hsl(11, 100%, 60%)",
    },
  ],
  "decimal-to-binary": [
    {
      input: "42",
      output: "101010",
    },
    {
      input: "255",
      output: "11111111",
    },
  ],
  "binary-to-decimal": [
    {
      input: "101010",
      output: "42",
    },
    {
      input: "11111111",
      output: "255",
    },
  ],
  "decimal-to-hex": [
    {
      input: "255",
      output: "0xFF",
    },
    {
      input: "4096",
      output: "0x1000",
    },
  ],
  "hex-to-decimal": [
    {
      input: "0xFF",
      output: "255",
    },
    {
      input: "1000",
      output: "4096",
    },
  ],
  "md5-hash-generator": [
    {
      input: "hello",
      output: "5d41402abc4b2a76b9719d911017c592",
    },
  ],
  "sha256-hash-generator": [
    {
      input: "hello",
      output:
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    },
  ],
  "unix-to-date": [
    {
      input: "1702656000",
      output: "2023-12-15T16:00:00.000Z",
    },
  ],
  "date-to-unix": [
    {
      input: "2023-12-15T16:00:00Z",
      output: "1702656000",
    },
  ],
};

export function getExamples(slug: string): ConversionExample[] {
  return conversionExamples[slug] || [];
}
