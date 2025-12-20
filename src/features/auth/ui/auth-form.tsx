"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Button, Input, Label } from "@/shared/ui";
import { useAuth } from "../model/use-auth";
import { OAuthButtons } from "./oauth-buttons";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const { signInWithEmail, signUpWithEmail, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t("errors.unknown"));
    }
  };

  const isSignIn = mode === "signin";

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {isSignIn ? t("signin.title") : t("signup.title")}
        </h1>
        <p className="text-muted-foreground">
          {isSignIn ? t("signin.subtitle") : t("signup.subtitle")}
        </p>
      </div>

      {/* OAuth 버튼 */}
      <OAuthButtons />

      {/* 구분선 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

      {/* 이메일 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <div className="space-y-2">
            <Label htmlFor="name">{t("fields.name")}</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("fields.namePlaceholder")}
              autoComplete="name"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">{t("fields.email")}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("fields.emailPlaceholder")}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("fields.password")}</Label>
            {isSignIn && (
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="text-sm text-primary hover:underline"
              >
                {t("signin.forgotPassword")}
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("fields.passwordPlaceholder")}
            required
            minLength={6}
            autoComplete={isSignIn ? "current-password" : "new-password"}
          />
        </div>

        {(formError || error) && (
          <p className="text-sm text-destructive">
            {formError || error?.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSignIn ? t("signin.submit") : t("signup.submit")}
        </Button>
      </form>

      {/* 전환 링크 */}
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? t("signin.noAccount") : t("signup.hasAccount")}{" "}
        <Link
          href={`/${locale}/auth/${isSignIn ? "signup" : "signin"}`}
          className="text-primary hover:underline"
        >
          {isSignIn ? t("signin.signupLink") : t("signup.signinLink")}
        </Link>
      </p>
    </div>
  );
}
