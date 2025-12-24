/**
 * Discord 요청 서명 검증
 *
 * Discord Interactions API는 모든 요청에 서명을 포함합니다.
 * Ed25519 알고리즘으로 검증해야 합니다.
 */

// Discord Public Key (환경변수에서 가져옴)
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY || "";

/**
 * Hex 문자열을 Uint8Array로 변환
 */
function hexToUint8Array(hex: string): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(hex.length / 2);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Discord 요청 서명 검증
 *
 * @param signature - X-Signature-Ed25519 헤더
 * @param timestamp - X-Signature-Timestamp 헤더
 * @param body - 요청 본문 (문자열)
 * @returns 검증 성공 여부
 */
export async function verifyDiscordRequest(
  signature: string,
  timestamp: string,
  body: string,
): Promise<boolean> {
  if (!DISCORD_PUBLIC_KEY) {
    console.error("DISCORD_PUBLIC_KEY is not set");
    return false;
  }

  try {
    // Ed25519 공개키 import
    const publicKeyBytes = hexToUint8Array(DISCORD_PUBLIC_KEY);
    const signatureBytes = hexToUint8Array(signature);
    const messageBytes = new TextEncoder().encode(timestamp + body);

    // Web Crypto API를 사용한 Ed25519 검증
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      publicKeyBytes,
      { name: "Ed25519" },
      false,
      ["verify"],
    );

    const isValid = await crypto.subtle.verify(
      "Ed25519",
      cryptoKey,
      signatureBytes,
      messageBytes,
    );

    return isValid;
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}

/**
 * Discord 요청 검증 (헤더에서 추출)
 */
export async function verifyDiscordRequestFromHeaders(
  headers: Headers,
  body: string,
): Promise<boolean> {
  const signature = headers.get("X-Signature-Ed25519");
  const timestamp = headers.get("X-Signature-Timestamp");

  if (!signature || !timestamp) {
    console.error("Missing Discord signature headers");
    return false;
  }

  return verifyDiscordRequest(signature, timestamp, body);
}
