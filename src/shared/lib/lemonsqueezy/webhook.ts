import crypto from "crypto";

/**
 * Lemon Squeezy 웹훅 이벤트 타입
 */
export type WebhookEventType =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_success"
  | "subscription_payment_failed"
  | "subscription_payment_recovered"
  | "license_key_created"
  | "license_key_updated";

/**
 * 웹훅 페이로드 인터페이스
 */
export interface WebhookPayload {
  meta: {
    event_name: WebhookEventType;
    custom_data?: {
      user_id?: string;
      [key: string]: unknown;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: Record<string, unknown>;
    relationships?: Record<string, unknown>;
  };
}

/**
 * 구독 관련 웹훅 데이터
 */
export interface SubscriptionWebhookData {
  id: string;
  storeId: number;
  customerId: number;
  orderId: number;
  orderItemId: number;
  productId: number;
  variantId: number;
  productName: string;
  variantName: string;
  userName: string;
  userEmail: string;
  status: string;
  statusFormatted: string;
  cardBrand: string | null;
  cardLastFour: string | null;
  pause: unknown | null;
  cancelled: boolean;
  trialEndsAt: string | null;
  billingAnchor: number;
  firstSubscriptionItem: {
    id: number;
    subscriptionId: number;
    priceId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  } | null;
  urls: {
    updatePaymentMethod: string;
    customerPortal: string;
  };
  renewsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
  testMode: boolean;
}

/**
 * 웹훅 서명 검증
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

/**
 * 웹훅 페이로드 파싱
 */
export function parseWebhookPayload(body: string): WebhookPayload {
  try {
    return JSON.parse(body) as WebhookPayload;
  } catch {
    throw new Error("Invalid webhook payload");
  }
}

/**
 * 구독 웹훅 데이터 추출
 */
export function extractSubscriptionData(
  payload: WebhookPayload,
): SubscriptionWebhookData {
  const attributes = payload.data.attributes;

  return {
    id: payload.data.id,
    storeId: attributes.store_id as number,
    customerId: attributes.customer_id as number,
    orderId: attributes.order_id as number,
    orderItemId: attributes.order_item_id as number,
    productId: attributes.product_id as number,
    variantId: attributes.variant_id as number,
    productName: attributes.product_name as string,
    variantName: attributes.variant_name as string,
    userName: attributes.user_name as string,
    userEmail: attributes.user_email as string,
    status: attributes.status as string,
    statusFormatted: attributes.status_formatted as string,
    cardBrand: attributes.card_brand as string | null,
    cardLastFour: attributes.card_last_four as string | null,
    pause: attributes.pause,
    cancelled: attributes.cancelled as boolean,
    trialEndsAt: attributes.trial_ends_at as string | null,
    billingAnchor: attributes.billing_anchor as number,
    firstSubscriptionItem:
      attributes.first_subscription_item as SubscriptionWebhookData["firstSubscriptionItem"],
    urls: attributes.urls as SubscriptionWebhookData["urls"],
    renewsAt: attributes.renews_at as string | null,
    endsAt: attributes.ends_at as string | null,
    createdAt: attributes.created_at as string,
    updatedAt: attributes.updated_at as string,
    testMode: attributes.test_mode as boolean,
  };
}

/**
 * 이벤트 타입별 핸들러 매핑을 위한 유틸리티
 */
export function isSubscriptionEvent(eventType: WebhookEventType): boolean {
  return eventType.startsWith("subscription_");
}

export function isOrderEvent(eventType: WebhookEventType): boolean {
  return eventType.startsWith("order_");
}

/**
 * 사용자 ID 추출 (custom_data에서)
 */
export function extractUserId(payload: WebhookPayload): string | null {
  return payload.meta.custom_data?.user_id || null;
}
