"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { Button } from "@/shared/ui";
import { WifiOff, Zap, Check, X } from "lucide-react";

interface OfflineUpgradeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onUpgrade: () => void;
}

export function OfflineUpgradeModal({
  isOpen,
  onDismiss,
  onUpgrade,
}: OfflineUpgradeModalProps) {
  const t = useTranslations("subscription");

  const proFeatures = [
    t("proFeatures.unlimitedOffline"),
    t("proFeatures.noAds"),
    t("proFeatures.bulkActions"),
    t("proFeatures.prioritySupport"),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
            <WifiOff className="h-6 w-6 text-warning" />
          </div>
          <DialogTitle className="text-center">
            {t("offlineUpgrade.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("offlineUpgrade.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {t("offlineUpgrade.proBenefits")}
              </span>
            </div>
            <ul className="space-y-2">
              {proFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {t("offlineUpgrade.pricing")}
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onUpgrade} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            {t("offlineUpgrade.upgradeButton")}
          </Button>
          <Button variant="ghost" onClick={onDismiss} className="w-full">
            {t("offlineUpgrade.dismissButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
