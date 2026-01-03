/**
 * Billing-Specific Errors
 *
 * Specialized error types for payment and subscription handling
 * with LemonSqueezy integration.
 */

import { AppError, type ErrorMetadata } from "./app-error";

/**
 * Billing error codes
 */
export type BillingErrorCode =
  | "PAYMENT_DECLINED"
  | "PAYMENT_PROCESSING"
  | "INVALID_PAYMENT_METHOD"
  | "SUBSCRIPTION_INACTIVE"
  | "SUBSCRIPTION_CANCELLED"
  | "SUBSCRIPTION_EXPIRED"
  | "SUBSCRIPTION_NOT_FOUND"
  | "CHECKOUT_FAILED"
  | "WEBHOOK_INVALID"
  | "WEBHOOK_SIGNATURE_MISMATCH"
  | "PORTAL_SESSION_FAILED"
  | "QUOTA_EXCEEDED";

/**
 * Billing error metadata
 */
export interface BillingErrorMetadata extends ErrorMetadata {
  /** Subscription ID if applicable */
  subscriptionId?: string;
  /** User ID if applicable */
  userId?: string;
  /** LemonSqueezy error code */
  providerErrorCode?: string;
  /** Current subscription status */
  subscriptionStatus?: string;
}

/**
 * BillingError - Specialized error for payment/subscription issues
 *
 * @example
 * throw new BillingError("PAYMENT_DECLINED", "Card was declined", {
 *   userId: "user_123",
 *   providerErrorCode: "card_declined",
 * });
 */
export class BillingError extends AppError {
  public readonly billingCode: BillingErrorCode;
  public readonly billingMetadata: BillingErrorMetadata;

  constructor(
    billingCode: BillingErrorCode,
    message: string,
    metadata: BillingErrorMetadata = {},
  ) {
    const appErrorCode = mapBillingToAppErrorCode(billingCode);
    super(appErrorCode, message, {
      ...metadata,
      userMessage: metadata.userMessage ?? getBillingUserMessage(billingCode),
    });

    this.name = "BillingError";
    this.billingCode = billingCode;
    this.billingMetadata = metadata;
  }

  /**
   * Convert to plain object for logging
   */
  override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      billingCode: this.billingCode,
      billingMetadata: this.billingMetadata,
    };
  }

  /**
   * Check if user should be prompted to update payment method
   */
  shouldUpdatePaymentMethod(): boolean {
    return (
      this.billingCode === "PAYMENT_DECLINED" ||
      this.billingCode === "INVALID_PAYMENT_METHOD"
    );
  }

  /**
   * Check if subscription needs reactivation
   */
  needsReactivation(): boolean {
    return (
      this.billingCode === "SUBSCRIPTION_INACTIVE" ||
      this.billingCode === "SUBSCRIPTION_CANCELLED" ||
      this.billingCode === "SUBSCRIPTION_EXPIRED"
    );
  }

  // Factory methods

  /**
   * Create payment declined error
   */
  static paymentDeclined(providerErrorCode?: string): BillingError {
    return new BillingError("PAYMENT_DECLINED", "Payment was declined", {
      providerErrorCode,
    });
  }

  /**
   * Create subscription not found error
   */
  static subscriptionNotFound(userId: string): BillingError {
    return new BillingError(
      "SUBSCRIPTION_NOT_FOUND",
      `Subscription not found for user ${userId}`,
      { userId },
    );
  }

  /**
   * Create subscription inactive error
   */
  static subscriptionInactive(
    subscriptionId: string,
    status: string,
  ): BillingError {
    return new BillingError(
      "SUBSCRIPTION_INACTIVE",
      `Subscription ${subscriptionId} is ${status}`,
      { subscriptionId, subscriptionStatus: status },
    );
  }

  /**
   * Create checkout failed error
   */
  static checkoutFailed(cause?: Error): BillingError {
    return new BillingError(
      "CHECKOUT_FAILED",
      "Failed to create checkout session",
      {
        cause,
      },
    );
  }

  /**
   * Create webhook validation error
   */
  static webhookInvalid(reason: string): BillingError {
    return new BillingError("WEBHOOK_INVALID", `Invalid webhook: ${reason}`);
  }

  /**
   * Create quota exceeded error
   */
  static quotaExceeded(limit: number, usage: number): BillingError {
    return new BillingError(
      "QUOTA_EXCEEDED",
      `Usage limit exceeded: ${usage}/${limit}`,
      {
        context: { limit, usage },
      },
    );
  }
}

/**
 * Map billing error code to general app error code
 */
function mapBillingToAppErrorCode(billingCode: BillingErrorCode) {
  switch (billingCode) {
    case "PAYMENT_DECLINED":
    case "PAYMENT_PROCESSING":
    case "INVALID_PAYMENT_METHOD":
      return "PAYMENT_FAILED" as const;
    case "SUBSCRIPTION_INACTIVE":
    case "SUBSCRIPTION_CANCELLED":
    case "SUBSCRIPTION_EXPIRED":
    case "SUBSCRIPTION_NOT_FOUND":
      return "SUBSCRIPTION_ERROR" as const;
    case "CHECKOUT_FAILED":
    case "PORTAL_SESSION_FAILED":
      return "BILLING_ERROR" as const;
    case "WEBHOOK_INVALID":
    case "WEBHOOK_SIGNATURE_MISMATCH":
      return "VALIDATION" as const;
    case "QUOTA_EXCEEDED":
      return "QUOTA_EXCEEDED" as const;
    default:
      return "BILLING_ERROR" as const;
  }
}

/**
 * Get user-friendly message for billing error
 */
function getBillingUserMessage(billingCode: BillingErrorCode): string {
  switch (billingCode) {
    case "PAYMENT_DECLINED":
      return "Your payment was declined. Please update your payment method.";
    case "PAYMENT_PROCESSING":
      return "Your payment is being processed. Please wait a moment.";
    case "INVALID_PAYMENT_METHOD":
      return "The payment method is invalid. Please try a different card.";
    case "SUBSCRIPTION_INACTIVE":
      return "Your subscription is inactive. Please renew to continue.";
    case "SUBSCRIPTION_CANCELLED":
      return "Your subscription has been cancelled.";
    case "SUBSCRIPTION_EXPIRED":
      return "Your subscription has expired. Please renew to continue.";
    case "SUBSCRIPTION_NOT_FOUND":
      return "No subscription found. Please subscribe to access this feature.";
    case "CHECKOUT_FAILED":
      return "Failed to start checkout. Please try again.";
    case "PORTAL_SESSION_FAILED":
      return "Failed to open billing portal. Please try again.";
    case "QUOTA_EXCEEDED":
      return "You've reached your usage limit. Please upgrade your plan.";
    default:
      return "A billing error occurred. Please try again.";
  }
}

/**
 * Type guard for BillingError
 */
export function isBillingError(error: unknown): error is BillingError {
  return error instanceof BillingError;
}
