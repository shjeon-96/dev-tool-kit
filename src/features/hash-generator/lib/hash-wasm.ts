/**
 * High-performance hash generation using hash-wasm (WebAssembly)
 * Supports chunked/streaming processing for large files (1GB+)
 */
import {
  createMD5,
  createSHA1,
  createSHA256,
  createSHA512,
  type IHasher,
} from "hash-wasm";

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

// Note: ReadableStream.getReader() handles chunking automatically
// Browser uses optimal chunk size based on network and memory conditions

/**
 * Creates a hasher instance for the specified algorithm
 */
async function createHasher(algorithm: HashAlgorithm): Promise<IHasher> {
  switch (algorithm) {
    case "md5":
      return createMD5();
    case "sha1":
      return createSHA1();
    case "sha256":
      return createSHA256();
    case "sha512":
      return createSHA512();
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Computes hash of a string using WebAssembly
 * @param input - The string to hash
 * @param algorithm - The hash algorithm to use
 * @returns The computed hash as a hexadecimal string
 */
export async function computeHashWasm(
  input: string,
  algorithm: HashAlgorithm,
): Promise<string> {
  const hasher = await createHasher(algorithm);
  hasher.init();
  hasher.update(input);
  return hasher.digest("hex");
}

/**
 * Computes all supported hashes for a string using WebAssembly
 * @param input - The string to hash
 * @returns Array of hash results with algorithm and hash value
 */
export async function computeAllHashesWasm(
  input: string,
): Promise<HashResult[]> {
  const results = await Promise.all(
    HASH_ALGORITHMS.map(async (algorithm) => ({
      algorithm,
      hash: await computeHashWasm(input, algorithm),
    })),
  );
  return results;
}

/**
 * Progress callback for file hashing
 */
export type HashProgressCallback = (progress: number) => void;

/**
 * Computes hash of a File using chunked streaming (for large files)
 * @param file - The File to hash
 * @param algorithm - The hash algorithm to use
 * @param onProgress - Optional progress callback (0-100)
 * @returns The computed hash as a hexadecimal string
 */
export async function computeFileHashWasm(
  file: File,
  algorithm: HashAlgorithm,
  onProgress?: HashProgressCallback,
): Promise<string> {
  const hasher = await createHasher(algorithm);
  hasher.init();

  const totalSize = file.size;
  let processedSize = 0;

  // Use ReadableStream for efficient chunked reading
  const stream = file.stream();
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Update hash with chunk
      hasher.update(value);
      processedSize += value.length;

      // Report progress
      if (onProgress) {
        const progress = Math.round((processedSize / totalSize) * 100);
        onProgress(progress);
      }
    }
  } finally {
    reader.releaseLock();
  }

  return hasher.digest("hex");
}

/**
 * Computes all supported hashes for a File using chunked streaming
 * This processes all algorithms in parallel, reading the file once per algorithm
 * @param file - The File to hash
 * @param onProgress - Optional progress callback (0-100, average of all algorithms)
 * @returns Array of hash results with algorithm and hash value
 */
export async function computeAllFileHashesWasm(
  file: File,
  onProgress?: HashProgressCallback,
): Promise<HashResult[]> {
  // Create all hashers
  const hashers = await Promise.all(
    HASH_ALGORITHMS.map(async (algorithm) => ({
      algorithm,
      hasher: await createHasher(algorithm),
    })),
  );

  // Initialize all hashers
  hashers.forEach(({ hasher }) => hasher.init());

  const totalSize = file.size;
  let processedSize = 0;

  // Stream the file once and update all hashers
  const stream = file.stream();
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Update all hashers with the same chunk
      hashers.forEach(({ hasher }) => hasher.update(value));
      processedSize += value.length;

      // Report progress
      if (onProgress) {
        const progress = Math.round((processedSize / totalSize) * 100);
        onProgress(progress);
      }
    }
  } finally {
    reader.releaseLock();
  }

  // Digest all hashers
  return hashers.map(({ algorithm, hasher }) => ({
    algorithm,
    hash: hasher.digest("hex"),
  }));
}

/**
 * Computes hash using ArrayBuffer chunks (for manual chunk processing)
 * @param chunks - Array of ArrayBuffer or Uint8Array chunks
 * @param algorithm - The hash algorithm to use
 * @returns The computed hash as a hexadecimal string
 */
export async function computeChunkedHashWasm(
  chunks: (ArrayBuffer | Uint8Array)[],
  algorithm: HashAlgorithm,
): Promise<string> {
  const hasher = await createHasher(algorithm);
  hasher.init();

  for (const chunk of chunks) {
    const uint8Array =
      chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
    hasher.update(uint8Array);
  }

  return hasher.digest("hex");
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
