"use client";

import { useState, useCallback } from "react";
import CryptoJS from "crypto-js";
import type { HashType } from "@/entities/hash-type";

export interface UseHashTypeResult {
  input: string;
  setInput: (value: string) => void;
  output: string;
  compute: () => void;
  clear: () => void;
  isComputing: boolean;
  secretKey: string;
  setSecretKey: (value: string) => void;
}

/**
 * Hash 알고리즘별 계산 로직
 */
function computeHashByAlgorithm(
  input: string,
  algorithm: string,
  secretKey?: string,
): string {
  const algo = algorithm.toLowerCase();

  // HMAC 계열
  if (algo.includes("hmac")) {
    if (!secretKey) {
      return "Secret key required for HMAC";
    }
    if (algo.includes("sha256") || algo === "hmac-sha256") {
      return CryptoJS.HmacSHA256(input, secretKey).toString();
    }
    if (algo.includes("sha512") || algo === "hmac-sha512") {
      return CryptoJS.HmacSHA512(input, secretKey).toString();
    }
    if (algo.includes("sha1")) {
      return CryptoJS.HmacSHA1(input, secretKey).toString();
    }
    if (algo.includes("md5")) {
      return CryptoJS.HmacMD5(input, secretKey).toString();
    }
  }

  // 일반 해시
  switch (algo) {
    case "md5":
    case "file md5":
      return CryptoJS.MD5(input).toString();
    case "sha-1":
    case "sha1":
      return CryptoJS.SHA1(input).toString();
    case "sha-256":
    case "sha256":
    case "file sha-256":
      return CryptoJS.SHA256(input).toString();
    case "sha-384":
    case "sha384":
      return CryptoJS.SHA384(input).toString();
    case "sha-512":
    case "sha512":
      return CryptoJS.SHA512(input).toString();
    case "sha3-256":
      return CryptoJS.SHA3(input, { outputLength: 256 }).toString();
    case "sha3-512":
      return CryptoJS.SHA3(input, { outputLength: 512 }).toString();
    case "ripemd160":
      return CryptoJS.RIPEMD160(input).toString();
    default:
      // 기본 SHA256
      return CryptoJS.SHA256(input).toString();
  }
}

export function useHashType(hashType: HashType): UseHashTypeResult {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isComputing, setIsComputing] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const compute = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    setIsComputing(true);
    try {
      const result = computeHashByAlgorithm(
        input,
        hashType.algorithm,
        secretKey,
      );
      setOutput(result);
    } catch {
      setOutput("Error computing hash");
    } finally {
      setIsComputing(false);
    }
  }, [input, hashType.algorithm, secretKey]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setSecretKey("");
  }, []);

  return {
    input,
    setInput,
    output,
    compute,
    clear,
    isComputing,
    secretKey,
    setSecretKey,
  };
}
