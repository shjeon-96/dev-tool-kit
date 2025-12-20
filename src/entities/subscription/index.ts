/**
 * Subscription Entity
 *
 * 구독 관련 기능 모음
 */

// Feature Gate
export {
  FEATURES,
  PREMIUM_TOOLS,
  canAccessFeature,
  getFeatureLimit,
  getLockedFeatures,
  getAvailableFeatures,
  getProFeatures,
  isToolPremium,
  getToolFreeLimit,
} from "./lib/feature-gate";
export type {
  FeatureId,
  FeatureConfig,
  PremiumToolConfig,
} from "./lib/feature-gate";

// Types
export type {
  Subscription,
  SubscriptionInsert,
  SubscriptionUpdate,
  SubscriptionStatus,
  SubscriptionProvider,
  TierType,
  SubscriptionInfo,
  SubscriptionActions,
  UseSubscriptionReturn,
  SubscriptionEvent,
} from "./model/types";

// Hooks
export { useSubscription, useFeatureAccess } from "./model/use-subscription";

// Components
export { PlanBadge } from "./ui/plan-badge";
export { UpgradeModal, FeatureLockOverlay } from "./ui/upgrade-modal";
export { PremiumToolGate, PremiumBadge } from "./ui/premium-tool-gate";
export { OfflineUpgradeModal } from "./ui/offline-upgrade-modal";
export { OfflineUpgradePrompt } from "./ui/offline-upgrade-prompt";
