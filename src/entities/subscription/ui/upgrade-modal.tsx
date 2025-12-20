"use client";

/**
 * UpgradeModal Component
 *
 * 프리미엄 기능 접근 시 표시되는 업그레이드 모달
 */

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Check, Zap, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui";
import { TIERS, formatPrice } from "@/shared/lib/lemonsqueezy/tiers";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
  featureDescription?: string;
  currentLimit?: string;
  proLimit?: string;
}

export function UpgradeModal({
  open,
  onOpenChange,
  feature,
  featureDescription,
  currentLimit,
  proLimit,
}: UpgradeModalProps) {
  const t = useTranslations("pricing");
  const router = useRouter();
  const locale = useLocale();

  const proTier = TIERS.pro;

  const handleUpgrade = () => {
    onOpenChange(false);
    router.push(`/${locale}/pricing`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-center text-xl">
            {feature
              ? t("upgrade.featureTitle", { feature })
              : t("upgrade.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {featureDescription || t("upgrade.description")}
          </DialogDescription>
          {currentLimit && proLimit && (
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground">Current</div>
                <div className="font-medium">{currentLimit}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">With Pro</div>
                <div className="font-medium text-green-600">{proLimit}</div>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="mt-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{proTier.name}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">
                {formatPrice(proTier.monthlyPrice)}
              </span>
              <span className="text-muted-foreground">/월</span>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {proTier.features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
          >
            {t("upgrade.cta")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            {t("upgrade.later")}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {t("upgrade.guarantee")}
        </p>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 프리미엄 기능 잠금 오버레이
 */
interface FeatureLockOverlayProps {
  feature: string;
  children: React.ReactNode;
  isLocked: boolean;
  onUpgradeClick: () => void;
}

export function FeatureLockOverlay({
  feature,
  children,
  isLocked,
  onUpgradeClick,
}: FeatureLockOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none opacity-50 blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Zap className="h-5 w-5" />
          </div>
          <p className="mb-2 text-sm font-medium">{feature}</p>
          <Button size="sm" onClick={onUpgradeClick}>
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
