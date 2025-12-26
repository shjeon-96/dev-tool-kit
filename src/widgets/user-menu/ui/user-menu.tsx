"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { LogOut, Settings, User as UserIcon, CreditCard } from "lucide-react";
import { useAuth } from "@/features/auth";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";

export function UserMenu() {
  const t = useTranslations("userMenu");
  const { session, signOut, loading } = useAuth();

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  const authUser = session?.user;

  if (!authUser) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href="/auth/signin">{t("signIn")}</Link>
      </Button>
    );
  }

  const initials =
    authUser.email?.split("@")[0].slice(0, 2).toUpperCase() || "U";

  const displayName =
    authUser.user_metadata?.full_name ||
    authUser.email?.split("@")[0] ||
    "User";
  const avatarUrl = authUser.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {authUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <UserIcon className="mr-2 h-4 w-4" />
              {t("dashboard")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/billing">
              <CreditCard className="mr-2 h-4 w-4" />
              {t("billing")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              {t("settings")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
