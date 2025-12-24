/**
 * Slack 요청 서명 검증
 *
 * Slack은 HMAC-SHA256으로 서명합니다.
 */

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || "";

/**
 * Slack 요청 서명 검증
 *
 * @param signature - X-Slack-Signature 헤더
 * @param timestamp - X-Slack-Request-Timestamp 헤더
 * @param body - 요청 본문 (문자열)
 * @returns 검증 성공 여부
 */
export async function verifySlackRequest(
  signature: string,
  timestamp: string,
  body: string,
): Promise<boolean> {
  if (!SLACK_SIGNING_SECRET) {
    console.error("SLACK_SIGNING_SECRET is not set");
    return false;
  }

  // 타임스탬프 검증 (5분 이내)
  const now = Math.floor(Date.now() / 1000);
  const requestTimestamp = parseInt(timestamp, 10);
  if (Math.abs(now - requestTimestamp) > 60 * 5) {
    console.error("Request timestamp is too old");
    return false;
  }

  try {
    // 서명 기준 문자열 생성
    const sigBaseString = `v0:${timestamp}:${body}`;

    // HMAC-SHA256 계산
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SLACK_SIGNING_SECRET);
    const msgData = encoder.encode(sigBaseString);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      msgData,
    );
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const computedSignature =
      "v0=" +
      signatureArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // 서명 비교 (타이밍 공격 방지를 위해 상수 시간 비교)
    if (signature.length !== computedSignature.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ computedSignature.charCodeAt(i);
    }

    return result === 0;
  } catch (error) {
    console.error("Slack signature verification failed:", error);
    return false;
  }
}

/**
 * Slack 요청 검증 (헤더에서 추출)
 */
export async function verifySlackRequestFromHeaders(
  headers: Headers,
  body: string,
): Promise<boolean> {
  const signature = headers.get("X-Slack-Signature");
  const timestamp = headers.get("X-Slack-Request-Timestamp");

  if (!signature || !timestamp) {
    console.error("Missing Slack signature headers");
    return false;
  }

  return verifySlackRequest(signature, timestamp, body);
}
