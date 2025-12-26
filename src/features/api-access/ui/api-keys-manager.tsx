"use client";

import { useState, useCallback } from "react";
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Crown,
  Loader2,
  Clock,
  Activity,
} from "lucide-react";
import { useApiKeys } from "../model/use-api-keys";
import type { ApiKeyCreateInput } from "../model/types";
import { Button } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Label } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui";
import { useToast } from "@/shared/ui";
import { formatDate, formatRelativeDate } from "@/shared/lib";
import { UpgradeModal } from "@/entities/subscription";

export function ApiKeysManager() {
  const {
    keys,
    isLoading,
    isPro,
    canAccessApi,
    newlyCreatedKey,
    createKey,
    revokeKey,
    deleteKey,
    clearNewlyCreatedKey,
  } = useApiKeys();

  const { showToast } = useToast();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyExpiry, setNewKeyExpiry] = useState<
    "30d" | "90d" | "1y" | "never"
  >("never");
  const [showNewKey, setShowNewKey] = useState(true);

  const handleCreateKey = useCallback(() => {
    if (!newKeyName.trim()) {
      showToast("Please enter a name for the API key", "error");
      return;
    }

    const input: ApiKeyCreateInput = {
      name: newKeyName.trim(),
      expiresIn: newKeyExpiry,
    };

    const result = createKey(input);

    if (result.success) {
      showToast("API key created successfully", "success");
      setNewKeyName("");
      setNewKeyExpiry("never");
      setCreateDialogOpen(false);
    } else {
      showToast(result.error || "Failed to create API key", "error");
      if (!isPro) {
        setShowUpgrade(true);
      }
    }
  }, [newKeyName, newKeyExpiry, createKey, showToast, isPro]);

  const handleCopyKey = useCallback(
    async (key: string) => {
      await navigator.clipboard.writeText(key);
      showToast("API key copied to clipboard", "success");
    },
    [showToast],
  );

  const handleRevokeKey = useCallback(
    (keyId: string) => {
      revokeKey(keyId);
      showToast("API key revoked", "success");
    },
    [revokeKey, showToast],
  );

  const handleDeleteKey = useCallback(
    (keyId: string) => {
      deleteKey(keyId);
      showToast("API key deleted", "success");
    },
    [deleteKey, showToast],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Newly Created Key Alert */}
      {newlyCreatedKey && (
        <Card className="border-success bg-success/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-success">
                    API Key Created Successfully
                  </h3>
                  <p className="text-sm text-success mt-1">
                    Copy this key now. You won&apos;t be able to see it again!
                  </p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-black/30 rounded-lg font-mono text-sm">
                  {showNewKey ? (
                    <code className="flex-1 break-all">{newlyCreatedKey}</code>
                  ) : (
                    <code className="flex-1">{"•".repeat(40)}</code>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNewKey(!showNewKey)}
                  >
                    {showNewKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyKey(newlyCreatedKey)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearNewlyCreatedKey}
                >
                  I&apos;ve copied the key
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API keys for programmatic access to Web Toolkit
              </CardDescription>
            </div>
            {!isPro && (
              <Badge variant="outline" className="gap-1">
                <Crown className="h-3 w-3" />
                Pro Feature
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pro Required Notice */}
          {!canAccessApi && (
            <div className="flex items-start gap-4 p-4 bg-warning/10 rounded-lg border border-warning/30">
              <Crown className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-warning">
                  Pro Subscription Required
                </h3>
                <p className="text-sm text-warning mt-1">
                  API access is available for Pro subscribers. Upgrade to create
                  API keys and access our API endpoints programmatically.
                </p>
                <Button
                  className="mt-3"
                  size="sm"
                  onClick={() => setShowUpgrade(true)}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          )}

          {/* Create Key Button */}
          {canAccessApi && (
            <div className="flex justify-end">
              <Dialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New API Key</DialogTitle>
                    <DialogDescription>
                      Create a new API key for programmatic access. You can
                      create up to 5 API keys.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="key-name">Name</Label>
                      <Input
                        id="key-name"
                        placeholder="e.g., Production App, CI/CD Pipeline"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key-expiry">Expiration</Label>
                      <Select
                        value={newKeyExpiry}
                        onValueChange={(v) =>
                          setNewKeyExpiry(v as typeof newKeyExpiry)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30d">30 days</SelectItem>
                          <SelectItem value="90d">90 days</SelectItem>
                          <SelectItem value="1y">1 year</SelectItem>
                          <SelectItem value="never">Never expires</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateKey}>Create Key</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Keys Table */}
          {keys.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Last Used
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {key.maskedKey}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyKey(key.maskedKey)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {formatDate(key.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {key.lastUsedAt ? (
                            <>
                              <Activity className="h-3 w-3" />
                              {formatRelativeDate(key.lastUsedAt)}
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3" />
                              Never
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {key.isActive ? (
                          <Badge variant="default" className="bg-success">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Revoked</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {key.isActive && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Revoke API Key?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will immediately disable this API key.
                                    Any applications using this key will no
                                    longer be able to authenticate.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRevokeKey(key.id)}
                                  >
                                    Revoke
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete API Key?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. The API key will
                                  be permanently deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteKey(key.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : canAccessApi ? (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No API Keys Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first API key to start using the Web Toolkit API.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create API Key
              </Button>
            </div>
          ) : null}

          {/* API Documentation Link */}
          {canAccessApi && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">API Documentation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Learn how to use the Web Toolkit API to integrate our tools into
                your workflow.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="/docs/api" target="_blank">
                    View Documentation
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/docs/api/examples" target="_blank">
                    Code Examples
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rate Limits Card */}
      {canAccessApi && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rate Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold">60</div>
                <div className="text-sm text-muted-foreground">
                  Requests / Minute
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold">10,000</div>
                <div className="text-sm text-muted-foreground">
                  Requests / Day
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold">100K</div>
                <div className="text-sm text-muted-foreground">
                  Requests / Month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        feature="api-access"
        featureDescription="API Access allows you to integrate Web Toolkit into your applications with programmatic access to all tools."
        currentLimit="No API access"
        proLimit="Unlimited API access"
      />
    </div>
  );
}
