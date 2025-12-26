"use client";

import { useCallback, useState } from "react";
import {
  QrCode,
  Plus,
  Play,
  Trash2,
  Download,
  Copy,
  Loader2,
  Crown,
  FileText,
  XCircle,
  FolderOpen,
} from "lucide-react";
import {
  useQrBulk,
  type QRBulkItem,
  type ExportMode,
} from "../model/use-qr-bulk";
import {
  BrowserPromptBanner,
  ExportModeSelector,
} from "@/shared/lib/fs-access";
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
import { Textarea } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useToast } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { UpgradeModal } from "@/entities/subscription";
import { BulkStatusIcon, BulkStatsBar, BulkProgressBar } from "@/shared/ui";

export function QrBulk() {
  const {
    items,
    options,
    isProcessing,
    progress,
    stats,
    limits,
    isPro,
    exportMode,
    fsAccess,
    setExportMode,
    addItem,
    addMultipleItems,
    removeItem,
    clearAll,
    updateOptions,
    processAll,
    downloadItem,
    exportAll,
    copyToClipboard,
  } = useQrBulk();

  const { showToast } = useToast();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [singleInput, setSingleInput] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [inputMode, setInputMode] = useState<"single" | "bulk">("single");

  const handleAddSingle = useCallback(() => {
    if (!singleInput.trim()) return;

    const result = addItem(singleInput);
    if (!result.success) {
      if (!isPro) {
        setShowUpgrade(true);
      }
      showToast(result.error || "Failed to add item", "error");
    } else {
      setSingleInput("");
      showToast("Item added", "success");
    }
  }, [singleInput, addItem, isPro, showToast]);

  const handleAddBulk = useCallback(() => {
    if (!bulkInput.trim()) return;

    const lines = bulkInput.split("\n").filter((line) => line.trim());
    const result = addMultipleItems(lines);

    if (!result.success) {
      if (!isPro) {
        setShowUpgrade(true);
      }
      showToast(result.error || "Failed to add items", "error");
    } else {
      setBulkInput("");
      showToast(`${result.added} items added`, "success");
      if (result.error) {
        showToast(result.error, "error");
      }
    }
  }, [bulkInput, addMultipleItems, isPro, showToast]);

  const handleCopy = useCallback(
    async (item: QRBulkItem) => {
      if (!item.dataUrl) return;
      const success = await copyToClipboard(item.dataUrl);
      if (success) {
        showToast("Copied to clipboard", "success");
      } else {
        showToast("Failed to copy", "error");
      }
    },
    [copyToClipboard, showToast],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Bulk Generator
              </CardTitle>
              <CardDescription>
                Generate multiple QR codes at once from URLs, text, or any data
              </CardDescription>
            </div>
            {!isPro && (
              <Badge variant="outline" className="gap-1">
                <Crown className="h-3 w-3" />
                Free: {limits.maxItems} QR code
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <Label>Size (px)</Label>
              <Select
                value={options.size.toString()}
                onValueChange={(v) => updateOptions({ size: parseInt(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Error Correction</Label>
              <Select
                value={options.errorCorrectionLevel}
                onValueChange={(v) =>
                  updateOptions({
                    errorCorrectionLevel: v as "L" | "M" | "Q" | "H",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select
                value={options.format}
                onValueChange={(v) =>
                  updateOptions({ format: v as "png" | "svg" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Foreground</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={options.foregroundColor}
                  onChange={(e) =>
                    updateOptions({ foregroundColor: e.target.value })
                  }
                  className="w-12 h-9 p-1"
                />
                <Input
                  value={options.foregroundColor}
                  onChange={(e) =>
                    updateOptions({ foregroundColor: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Input Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={inputMode === "single" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMode("single")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Single
            </Button>
            <Button
              variant={inputMode === "bulk" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMode("bulk")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Bulk (one per line)
            </Button>
          </div>

          {/* Input Area */}
          {inputMode === "single" ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter URL, text, or any content..."
                value={singleInput}
                onChange={(e) => setSingleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSingle()}
                disabled={isProcessing}
              />
              <Button
                onClick={handleAddSingle}
                disabled={isProcessing || !singleInput.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Enter one item per line...
https://example.com
Hello World
https://another-url.com"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                rows={5}
                disabled={isProcessing}
              />
              <Button
                onClick={handleAddBulk}
                disabled={isProcessing || !bulkInput.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add All
              </Button>
            </div>
          )}

          {/* Actions */}
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={processAll}
                disabled={isProcessing || stats.pending === 0}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Generate All
              </Button>

              {stats.success > 0 && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    const result = await exportAll();
                    if (result && !result.success && result.error) {
                      showToast(result.error, "error");
                    } else if (result?.success) {
                      showToast(
                        exportMode === "folder"
                          ? "Files saved to folder"
                          : "ZIP downloaded",
                        "success",
                      );
                    }
                  }}
                  disabled={fsAccess.isExporting}
                >
                  {fsAccess.isExporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : exportMode === "folder" && fsAccess.isSupported ? (
                    <FolderOpen className="h-4 w-4 mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {exportMode === "folder" && fsAccess.isSupported
                    ? "Save to Folder"
                    : "Download ZIP"}
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={clearAll}
                disabled={isProcessing}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          )}

          {/* Browser Compatibility Banner */}
          {stats.success > 0 && !fsAccess.isSupported && (
            <BrowserPromptBanner className="mb-4" />
          )}

          {/* Export Mode Selector */}
          {stats.success > 0 && (
            <div className="mb-4">
              <ExportModeSelector
                mode={exportMode}
                onModeChange={setExportMode}
                disabled={fsAccess.isExporting || isProcessing}
              />
            </div>
          )}

          {/* Progress */}
          <BulkProgressBar
            isProcessing={isProcessing}
            progress={progress}
            label="Generating..."
          />

          {/* Stats */}
          {items.length > 0 && (
            <BulkStatsBar
              stats={{
                total: stats.total,
                pending: stats.remaining,
                success: stats.success,
                error: stats.error,
              }}
            />
          )}

          {/* Items Grid */}
          {items.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "border rounded-lg p-3 space-y-2",
                    item.status === "error" &&
                      "border-red-300 bg-red-50 dark:bg-red-950/20",
                  )}
                >
                  {/* QR Preview */}
                  <div className="aspect-square bg-white rounded flex items-center justify-center overflow-hidden">
                    {item.status === "success" && item.dataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.dataUrl}
                        alt={item.label}
                        className="w-full h-full object-contain"
                      />
                    ) : item.status === "processing" ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : item.status === "error" ? (
                      <XCircle className="h-8 w-8 text-red-500" />
                    ) : (
                      <QrCode className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Label & Status */}
                  <div className="flex items-center gap-2">
                    <BulkStatusIcon status={item.status} />
                    <span
                      className="text-xs truncate flex-1"
                      title={item.content}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Error */}
                  {item.error && (
                    <p
                      className="text-xs text-red-500 truncate"
                      title={item.error}
                    >
                      {item.error}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-1">
                    {item.status === "success" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleCopy(item)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => downloadItem(item)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto"
                      onClick={() => removeItem(item.id)}
                      disabled={isProcessing}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {items.length === 0 && (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <QrCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                Add items to generate QR codes
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Enter URLs, text, or any data (max {limits.maxItems} items)
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        feature="bulk-qr"
        currentLimit={`${limits.maxItems} QR code`}
        proLimit="50 QR codes"
      />
    </div>
  );
}
