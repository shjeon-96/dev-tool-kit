/**
 * QR Code content encoding utilities
 */

export interface WifiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
}

/**
 * Escape special characters for WiFi QR code
 */
export function escapeWifiString(str: string): string {
  return str.replace(/([\\;,:"'])/g, "\\$1");
}

/**
 * Generate WiFi connection string for QR code
 * @see https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
 */
export function generateWifiString(data: WifiData): string {
  const { ssid, password, encryption, hidden } = data;
  const escapedSsid = escapeWifiString(ssid);
  const escapedPassword = escapeWifiString(password);
  const hiddenFlag = hidden ? "true" : "false";

  return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};H:${hiddenFlag};;`;
}

/**
 * Generate vCard string for QR code
 * @see https://en.wikipedia.org/wiki/VCard
 */
export function generateVCardString(data: VCardData): string {
  const { firstName, lastName, phone, email, organization } = data;
  const fullName = `${firstName} ${lastName}`.trim();

  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${fullName}
TEL:${phone}
EMAIL:${email}
ORG:${organization}
END:VCARD`;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate approximate QR code capacity based on error correction level
 */
export function getQrCapacity(errorCorrectionLevel: "L" | "M" | "Q" | "H"): {
  numeric: number;
  alphanumeric: number;
  binary: number;
} {
  const capacities = {
    L: { numeric: 7089, alphanumeric: 4296, binary: 2953 },
    M: { numeric: 5596, alphanumeric: 3391, binary: 2331 },
    Q: { numeric: 3993, alphanumeric: 2420, binary: 1663 },
    H: { numeric: 3057, alphanumeric: 1852, binary: 1273 },
  };

  return capacities[errorCorrectionLevel];
}

/**
 * Check if content fits in QR code
 */
export function isContentTooLarge(
  content: string,
  errorCorrectionLevel: "L" | "M" | "Q" | "H",
): boolean {
  const capacity = getQrCapacity(errorCorrectionLevel);
  const byteLength = new TextEncoder().encode(content).length;
  return byteLength > capacity.binary;
}
