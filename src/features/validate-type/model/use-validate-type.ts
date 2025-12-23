"use client";

import { useState, useCallback } from "react";
import type { ValidateType } from "@/entities/validate-type";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details?: Record<string, unknown>;
}

interface UseValidateTypeReturn {
  input: string;
  setInput: (value: string) => void;
  result: ValidationResult | null;
  validate: () => void;
  clear: () => void;
  isProcessing: boolean;
}

export function useValidateType(
  validateType: ValidateType,
): UseValidateTypeReturn {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateJson = useCallback((text: string): ValidationResult => {
    try {
      JSON.parse(text);
      return { isValid: true, errors: [], warnings: [] };
    } catch (e) {
      return {
        isValid: false,
        errors: [e instanceof Error ? e.message : "Invalid JSON"],
        warnings: [],
      };
    }
  }, []);

  const validateXml = useCallback((text: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for XML declaration
    if (!text.trim().startsWith("<?xml") && !text.trim().startsWith("<")) {
      errors.push("Document does not start with valid XML");
    }

    // Check tag matching (simple check)
    const allTags = text.match(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g) || [];
    const openTags = allTags.filter((tag) => !tag.endsWith("/>"));
    const closeTags = text.match(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g) || [];

    if (openTags.length !== closeTags.length) {
      warnings.push(
        `Mismatched tags: ${openTags.length} open, ${closeTags.length} close`,
      );
    }

    // Try DOM parsing
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "application/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        errors.push(parseError.textContent || "XML parsing error");
      }
    } catch {
      errors.push("Unable to parse XML document");
    }

    return { isValid: errors.length === 0, errors, warnings };
  }, []);

  const validateYaml = useCallback((text: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic YAML validation
    const lines = text.split("\n");

    lines.forEach((line, index) => {
      // Check for tabs (YAML prefers spaces)
      if (line.includes("\t")) {
        warnings.push(`Line ${index + 1}: Contains tabs, use spaces instead`);
      }

      // Check for inconsistent indentation
      const leadingSpaces = line.match(/^(\s*)/)?.[1].length || 0;
      if (leadingSpaces % 2 !== 0 && line.trim()) {
        warnings.push(`Line ${index + 1}: Inconsistent indentation`);
      }

      // Check for trailing colon without value
      if (line.trim().endsWith(":") && !line.trim().endsWith("::")) {
        // This is valid for nested structures
      }
    });

    // Check for proper key-value format
    const hasValidStructure = lines.some(
      (line) => line.includes(":") || line.trim().startsWith("-"),
    );
    if (!hasValidStructure && text.trim()) {
      errors.push("No valid YAML key-value pairs found");
    }

    return { isValid: errors.length === 0, errors, warnings };
  }, []);

  const validateHtml = useCallback((text: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Check for parsing errors
      const parseErrors = doc.querySelectorAll("parsererror");
      parseErrors.forEach((err) => {
        errors.push(err.textContent || "HTML parsing error");
      });

      // Check for common issues
      if (!text.toLowerCase().includes("<!doctype")) {
        warnings.push("Missing DOCTYPE declaration");
      }

      // Check for unclosed tags in input
      const voidElements = [
        "br",
        "hr",
        "img",
        "input",
        "meta",
        "link",
        "area",
        "base",
        "col",
        "embed",
        "param",
        "source",
        "track",
        "wbr",
      ];
      const tagPattern = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
      let match;
      while ((match = tagPattern.exec(text)) !== null) {
        const tagName = match[1].toLowerCase();
        if (!voidElements.includes(tagName)) {
          const closeTag = new RegExp(`</${tagName}>`, "i");
          if (!closeTag.test(text)) {
            warnings.push(`Tag <${tagName}> may not be closed`);
          }
        }
      }
    } catch {
      errors.push("Unable to parse HTML document");
    }

    return { isValid: errors.length === 0, errors, warnings };
  }, []);

  const validateCss = useCallback((text: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for balanced braces
    const openBraces = (text.match(/{/g) || []).length;
    const closeBraces = (text.match(/}/g) || []).length;

    if (openBraces !== closeBraces) {
      errors.push(
        `Unbalanced braces: ${openBraces} open, ${closeBraces} close`,
      );
    }

    // Check for common CSS syntax issues
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for missing semicolons
      if (
        trimmed &&
        !trimmed.endsWith("{") &&
        !trimmed.endsWith("}") &&
        !trimmed.endsWith(";") &&
        !trimmed.startsWith("/*") &&
        !trimmed.endsWith("*/") &&
        trimmed.includes(":")
      ) {
        warnings.push(`Line ${index + 1}: Missing semicolon`);
      }

      // Check for empty rules
      if (trimmed === "{}") {
        warnings.push(`Line ${index + 1}: Empty rule set`);
      }
    });

    return { isValid: errors.length === 0, errors, warnings };
  }, []);

  const validateEmail = useCallback((text: string): ValidationResult => {
    const email = text.trim();
    const errors: string[] = [];
    const warnings: string[] = [];

    // RFC 5322 simplified regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }

    // Check for common issues
    if (email.includes("..")) {
      errors.push("Consecutive dots are not allowed");
    }

    if (email.startsWith(".") || email.endsWith(".")) {
      errors.push("Email cannot start or end with a dot");
    }

    // Warnings for potential issues
    const domain = email.split("@")[1];
    if (domain && !domain.includes(".")) {
      warnings.push("Domain appears to be missing TLD");
    }

    // Check for common typos
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    if (domain) {
      commonDomains.forEach((common) => {
        if (
          domain !== common &&
          domain.replace(/[^a-z]/g, "").includes(common.replace(".com", ""))
        ) {
          warnings.push(`Did you mean ${common}?`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      details: { email, domain },
    };
  }, []);

  const validateUrl = useCallback((text: string): ValidationResult => {
    const url = text.trim();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const parsed = new URL(url);

      // Check protocol
      if (!["http:", "https:"].includes(parsed.protocol)) {
        warnings.push(`Unusual protocol: ${parsed.protocol}`);
      }

      // Check for localhost
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
        warnings.push("This is a localhost URL");
      }

      return {
        isValid: true,
        errors,
        warnings,
        details: {
          protocol: parsed.protocol,
          hostname: parsed.hostname,
          pathname: parsed.pathname,
          search: parsed.search,
        },
      };
    } catch {
      errors.push("Invalid URL format");
      return { isValid: false, errors, warnings };
    }
  }, []);

  const validateRegex = useCallback((text: string): ValidationResult => {
    const pattern = text.trim();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      new RegExp(pattern);

      // Check for common issues
      if (pattern.includes("(?<") && !pattern.includes(">")) {
        warnings.push("Possible incomplete named group");
      }

      // Check for potential regex complexity
      if (pattern.length > 500) {
        warnings.push("Very long pattern may have performance issues");
      }

      return { isValid: true, errors, warnings };
    } catch (e) {
      errors.push(
        e instanceof Error ? e.message : "Invalid regular expression",
      );
      return { isValid: false, errors, warnings };
    }
  }, []);

  const validateCreditCard = useCallback((text: string): ValidationResult => {
    const number = text.replace(/[\s-]/g, "");
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if it contains only digits
    if (!/^\d+$/.test(number)) {
      errors.push("Card number should contain only digits");
      return { isValid: false, errors, warnings };
    }

    // Check length
    if (number.length < 13 || number.length > 19) {
      errors.push("Card number should be between 13 and 19 digits");
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    if (sum % 10 !== 0) {
      errors.push("Invalid card number (Luhn check failed)");
    }

    // Detect card type
    let cardType = "Unknown";
    if (/^4/.test(number)) cardType = "Visa";
    else if (/^5[1-5]/.test(number)) cardType = "Mastercard";
    else if (/^3[47]/.test(number)) cardType = "American Express";
    else if (/^6(?:011|5)/.test(number)) cardType = "Discover";

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      details: { cardType, length: number.length },
    };
  }, []);

  const validatePhone = useCallback((text: string): ValidationResult => {
    const phone = text.replace(/[\s()-]/g, "");
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if it contains only digits and optional + prefix
    if (!/^\+?\d+$/.test(phone)) {
      errors.push("Phone number should contain only digits");
      return { isValid: false, errors, warnings };
    }

    // Check length (most phone numbers are 10-15 digits)
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      warnings.push("Phone number seems too short");
    }
    if (digits.length > 15) {
      warnings.push("Phone number seems too long");
    }

    // Detect country code
    let countryCode = "Unknown";
    if (phone.startsWith("+1") || phone.startsWith("1"))
      countryCode = "US/Canada";
    else if (phone.startsWith("+44")) countryCode = "UK";
    else if (phone.startsWith("+82")) countryCode = "South Korea";
    else if (phone.startsWith("+81")) countryCode = "Japan";
    else if (phone.startsWith("+86")) countryCode = "China";

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      details: { countryCode, digits: digits.length },
    };
  }, []);

  const validate = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }

    setIsProcessing(true);

    try {
      let validationResult: ValidationResult;

      switch (validateType.slug) {
        case "json":
          validationResult = validateJson(input);
          break;
        case "xml":
          validationResult = validateXml(input);
          break;
        case "yaml":
          validationResult = validateYaml(input);
          break;
        case "html":
          validationResult = validateHtml(input);
          break;
        case "css":
          validationResult = validateCss(input);
          break;
        case "email":
          validationResult = validateEmail(input);
          break;
        case "url":
          validationResult = validateUrl(input);
          break;
        case "regex":
          validationResult = validateRegex(input);
          break;
        case "credit-card":
          validationResult = validateCreditCard(input);
          break;
        case "phone":
          validationResult = validatePhone(input);
          break;
        default:
          validationResult = { isValid: true, errors: [], warnings: [] };
      }

      setResult(validationResult);
    } finally {
      setIsProcessing(false);
    }
  }, [
    input,
    validateType.slug,
    validateJson,
    validateXml,
    validateYaml,
    validateHtml,
    validateCss,
    validateEmail,
    validateUrl,
    validateRegex,
    validateCreditCard,
    validatePhone,
  ]);

  const clear = useCallback(() => {
    setInput("");
    setResult(null);
  }, []);

  return {
    input,
    setInput,
    result,
    validate,
    clear,
    isProcessing,
  };
}
