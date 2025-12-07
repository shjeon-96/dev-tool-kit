import CryptoJS from "crypto-js";

export type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
}

export const HASH_ALGORITHMS: HashAlgorithm[] = [
  "md5",
  "sha1",
  "sha256",
  "sha512",
];

/**
 * Computes a hash of the input string using the specified algorithm
 * @param input - The string to hash
 * @param algorithm - The hash algorithm to use
 * @returns The computed hash as a hexadecimal string
 */
export function computeHash(input: string, algorithm: HashAlgorithm): string {
  switch (algorithm) {
    case "md5":
      return CryptoJS.MD5(input).toString();
    case "sha1":
      return CryptoJS.SHA1(input).toString();
    case "sha256":
      return CryptoJS.SHA256(input).toString();
    case "sha512":
      return CryptoJS.SHA512(input).toString();
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Computes all supported hashes for the input string
 * @param input - The string to hash
 * @returns Array of hash results with algorithm and hash value
 */
export function computeAllHashes(input: string): HashResult[] {
  return HASH_ALGORITHMS.map((algorithm) => ({
    algorithm,
    hash: computeHash(input, algorithm),
  }));
}

/**
 * Compares a hash against computed hashes to check for a match
 * @param hashes - Array of computed hashes
 * @param compareHash - The hash to compare against
 * @returns true if any hash matches, false otherwise, null if compareHash is empty
 */
export function compareHashes(
  hashes: HashResult[],
  compareHash: string,
): boolean | null {
  if (!compareHash.trim() || hashes.length === 0) return null;

  const normalizedCompare = compareHash.toLowerCase().trim();
  return hashes.some((h) => h.hash.toLowerCase() === normalizedCompare);
}
