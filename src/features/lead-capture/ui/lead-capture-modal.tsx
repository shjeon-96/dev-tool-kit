"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Gift, ArrowRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { getLeadMagnetForTool, getLeadMagnetId } from "../config/magnets";

interface LeadCaptureModalProps {
  isOpen: boolean;
  toolSlug: string | null;
  isSubmitting: boolean;
  error: string | null;
  onClose: (skipAndDownload?: boolean) => void;
  onSubmit: (email: string, leadMagnetId: string, personaTag: string) => void;
}

export function LeadCaptureModal({
  isOpen,
  toolSlug,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: LeadCaptureModalProps) {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const leadMagnet = toolSlug ? getLeadMagnetForTool(toolSlug) : null;
  const leadMagnetId = toolSlug ? getLeadMagnetId(toolSlug) : null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(t("leadCapture.invalidEmail"));
      return;
    }

    if (leadMagnetId && leadMagnet) {
      onSubmit(email, leadMagnetId, leadMagnet.personaTag);
    }
  };

  const handleSkip = () => {
    onClose(true);
    setEmail("");
    setEmailError(null);
  };

  const handleClose = () => {
    onClose(false);
    setEmail("");
    setEmailError(null);
  };

  if (!leadMagnet) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">
            {t("leadCapture.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("leadCapture.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">{t(leadMagnet.titleKey)}</p>
              <p className="text-muted-foreground text-xs mt-1">
                {t(leadMagnet.descriptionKey)}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("leadCapture.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("leadCapture.emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              disabled={isSubmitting}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && (
              <p className="text-destructive text-xs">{emailError}</p>
            )}
            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>

          <p className="text-muted-foreground text-xs">
            {t("leadCapture.privacyNote")}
          </p>

          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? (
                t("leadCapture.submitting")
              ) : (
                <>
                  {t("leadCapture.submitButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleSkip}
              disabled={isSubmitting}
            >
              {t("leadCapture.skipButton")}
            </Button>
          </DialogFooter>
        </form>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
