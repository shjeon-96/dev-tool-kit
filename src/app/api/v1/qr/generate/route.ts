import { NextRequest } from "next/server";
import QRCode from "qrcode";
import {
  authenticateApiKey,
  logApiUsage,
  apiResponse,
  apiError,
} from "@/shared/lib/api";

export const runtime = "nodejs";

type QRFormat = "png" | "svg" | "dataurl";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

/**
 * POST /api/v1/qr/generate
 *
 * QR 코드 생성 API
 *
 * Request Body:
 * {
 *   "data": string,            // QR 코드에 인코딩할 데이터
 *   "format": "png" | "svg" | "dataurl",  // 출력 형식 (기본: dataurl)
 *   "size": number,            // 크기 (기본: 256)
 *   "margin": number,          // 여백 (기본: 4)
 *   "errorCorrectionLevel": "L" | "M" | "Q" | "H",  // 오류 보정 수준 (기본: M)
 *   "color": {
 *     "dark": string,          // 전경색 (기본: #000000)
 *     "light": string          // 배경색 (기본: #ffffff)
 *   }
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "qrCode": string,        // Base64 데이터 URL 또는 SVG 문자열
 *     "format": string,
 *     "size": number,
 *     "dataLength": number
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // 인증
  const auth = await authenticateApiKey(request);
  if (!auth.success) {
    return apiError(auth.error!, auth.statusCode!);
  }

  try {
    const body = await request.json();
    const {
      data,
      format = "dataurl",
      size = 256,
      margin = 4,
      errorCorrectionLevel = "M",
      color = { dark: "#000000", light: "#ffffff" },
    } = body as {
      data?: string;
      format?: QRFormat;
      size?: number;
      margin?: number;
      errorCorrectionLevel?: ErrorCorrectionLevel;
      color?: { dark?: string; light?: string };
    };

    if (!data) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/qr/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Missing required field: data");
    }

    if (typeof data !== "string") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/qr/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Data must be a string");
    }

    // 데이터 길이 제한 (QR 코드 제한)
    if (data.length > 4296) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/qr/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Data too long. Maximum 4296 characters for QR code");
    }

    if (!["png", "svg", "dataurl"].includes(format)) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/qr/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError('Format must be "png", "svg", or "dataurl"');
    }

    if (!["L", "M", "Q", "H"].includes(errorCorrectionLevel)) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/qr/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError('Error correction level must be "L", "M", "Q", or "H"');
    }

    const qrOptions = {
      width: Math.min(Math.max(size, 64), 1024), // 64-1024 사이로 제한
      margin: Math.min(Math.max(margin, 0), 10), // 0-10 사이로 제한
      errorCorrectionLevel,
      color: {
        dark: color.dark || "#000000",
        light: color.light || "#ffffff",
      },
    };

    let qrCode: string;

    switch (format) {
      case "svg":
        qrCode = await QRCode.toString(data, {
          ...qrOptions,
          type: "svg",
        });
        break;
      case "png":
        // PNG를 Base64로 반환
        qrCode = await QRCode.toDataURL(data, {
          ...qrOptions,
          type: "image/png",
        });
        break;
      case "dataurl":
      default:
        qrCode = await QRCode.toDataURL(data, qrOptions);
        break;
    }

    const responseData = {
      qrCode,
      format,
      size: qrOptions.width,
      dataLength: data.length,
    };

    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/qr/generate",
      "POST",
      200,
      Date.now() - startTime,
    );

    return apiResponse(responseData);
  } catch (error) {
    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/qr/generate",
      "POST",
      500,
      Date.now() - startTime,
    );
    return apiError(
      `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      500,
    );
  }
}
