import {
  lemonSqueezySetup,
  getAuthenticatedUser,
  listProducts,
  listVariants,
  getCheckout,
  createCheckout,
  listSubscriptions,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  type Checkout,
  type Subscription,
} from "@lemonsqueezy/lemonsqueezy.js";

// Lemon Squeezy 클라이언트 초기화
export function initLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY is not set");
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy Error:", error);
    },
  });
}

// 인증된 사용자 확인 (API 키 유효성 검증)
export async function verifyLemonSqueezySetup() {
  initLemonSqueezy();
  const { data, error } = await getAuthenticatedUser();

  if (error) {
    throw new Error(`Lemon Squeezy authentication failed: ${error.message}`);
  }

  return data;
}

// 상품 목록 조회
export async function getLemonSqueezyProducts(storeId?: string) {
  initLemonSqueezy();

  const { data, error } = await listProducts({
    filter: storeId ? { storeId } : undefined,
  });

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return data;
}

// Variant 목록 조회 (가격 옵션)
export async function getLemonSqueezyVariants(productId?: string) {
  initLemonSqueezy();

  const { data, error } = await listVariants({
    filter: productId ? { productId } : undefined,
  });

  if (error) {
    throw new Error(`Failed to fetch variants: ${error.message}`);
  }

  return data;
}

// 체크아웃 세션 생성
export interface CreateCheckoutOptions {
  variantId: string;
  userId: string;
  userEmail: string;
  userName?: string;
  customData?: Record<string, unknown>;
}

export async function createLemonSqueezyCheckout(
  options: CreateCheckoutOptions,
): Promise<Checkout> {
  initLemonSqueezy();

  const storeId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID;

  if (!storeId) {
    throw new Error("NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID is not set");
  }

  const { data, error } = await createCheckout(storeId, options.variantId, {
    checkoutData: {
      email: options.userEmail,
      name: options.userName,
      custom: {
        user_id: options.userId,
        ...options.customData,
      },
    },
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      receiptButtonText: "Go to Dashboard",
      receiptThankYouNote:
        "Thank you for subscribing to Web Toolkit Pro! Your account has been upgraded.",
    },
  });

  if (error) {
    throw new Error(`Failed to create checkout: ${error.message}`);
  }

  return data as Checkout;
}

// 체크아웃 조회
export async function getLemonSqueezyCheckout(checkoutId: string) {
  initLemonSqueezy();

  const { data, error } = await getCheckout(checkoutId);

  if (error) {
    throw new Error(`Failed to fetch checkout: ${error.message}`);
  }

  return data;
}

// 구독 목록 조회 (특정 사용자)
export async function getLemonSqueezySubscriptions(userEmail?: string) {
  initLemonSqueezy();

  const { data, error } = await listSubscriptions({
    filter: userEmail ? { userEmail } : undefined,
  });

  if (error) {
    throw new Error(`Failed to fetch subscriptions: ${error.message}`);
  }

  return data;
}

// 특정 구독 조회
export async function getLemonSqueezySubscription(subscriptionId: string) {
  initLemonSqueezy();

  const { data, error } = await getSubscription(subscriptionId);

  if (error) {
    throw new Error(`Failed to fetch subscription: ${error.message}`);
  }

  return data;
}

// 구독 업데이트 (플랜 변경)
export async function updateLemonSqueezySubscription(
  subscriptionId: string,
  variantId: number,
) {
  initLemonSqueezy();

  const { data, error } = await updateSubscription(subscriptionId, {
    variantId,
  });

  if (error) {
    throw new Error(`Failed to update subscription: ${error.message}`);
  }

  return data;
}

// 구독 취소
export async function cancelLemonSqueezySubscription(subscriptionId: string) {
  initLemonSqueezy();

  const { data, error } = await cancelSubscription(subscriptionId);

  if (error) {
    throw new Error(`Failed to cancel subscription: ${error.message}`);
  }

  return data;
}

// 구독 상태 확인
export type SubscriptionStatus =
  | "on_trial"
  | "active"
  | "paused"
  | "past_due"
  | "unpaid"
  | "cancelled"
  | "expired";

export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return ["on_trial", "active"].includes(status);
}

// 타입 내보내기
export type { Checkout, Subscription };
