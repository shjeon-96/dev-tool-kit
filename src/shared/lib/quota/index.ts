/**
 * Quota Configuration
 *
 * Quota config is in shared, hook is in features/quota
 * @see @/features/quota for useQuota hook
 */

export {
  getToolQuota,
  getRemainingQuota,
  isQuotaExceeded,
  TIER_QUOTAS,
  TOOL_QUOTAS,
  type QuotaConfig,
} from "./config";
