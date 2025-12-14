"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Key, Settings, X, Eye, EyeOff, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { AI_PROVIDERS, type AIProvider } from "../lib/providers";

interface AIConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: {
    provider: AIProvider;
    model: string;
    apiKey: string;
  }) => boolean;
  currentConfig?: {
    provider: AIProvider;
    model: string;
    apiKey: string;
  } | null;
}

export function AIConfigDialog({
  isOpen,
  onClose,
  onSave,
  currentConfig,
}: AIConfigDialogProps) {
  const t = useTranslations("aiExplain");
  const [provider, setProvider] = useState<AIProvider>(
    currentConfig?.provider || "openai",
  );
  const [model, setModel] = useState(
    currentConfig?.model || AI_PROVIDERS.openai.defaultModel,
  );
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || "");
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const providerConfig = AI_PROVIDERS[provider];

  const handleProviderChange = (newProvider: AIProvider) => {
    setProvider(newProvider);
    setModel(AI_PROVIDERS[newProvider].defaultModel);
    setError(null);
  };

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError(t("enterApiKey"));
      return;
    }

    const success = onSave({ provider, model, apiKey: apiKey.trim() });
    if (success) {
      onClose();
    } else {
      setError(t("invalidApiKey"));
    }
  };

  const getProviderLink = (p: AIProvider) => {
    switch (p) {
      case "openai":
        return "https://platform.openai.com/api-keys";
      case "anthropic":
        return "https://console.anthropic.com/settings/keys";
      case "google":
        return "https://aistudio.google.com/apikey";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card border rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <h2 className="font-semibold">{t("configureAI")}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Provider Selection */}
                <div>
                  <label className="text-sm font-medium">{t("provider")}</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(Object.keys(AI_PROVIDERS) as AIProvider[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => handleProviderChange(p)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-md border transition-colors",
                          provider === p
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-accent",
                        )}
                      >
                        {AI_PROVIDERS[p].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selection */}
                <div>
                  <label className="text-sm font-medium">{t("model")}</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full mt-2 h-10 px-3 rounded-md border bg-background text-sm"
                  >
                    {providerConfig.models.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* API Key */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{t("apiKey")}</label>
                    <a
                      href={getProviderLink(provider)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      {t("getApiKey")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="relative mt-2">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        setError(null);
                      }}
                      placeholder={`${providerConfig.keyPrefix}...`}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive mt-1">{error}</p>
                  )}
                </div>

                {/* Security Note */}
                <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {t("securityNote")}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 p-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleSave}>{t("save")}</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
