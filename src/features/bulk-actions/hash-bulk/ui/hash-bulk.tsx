"use client";

import { useState, useCallback, Fragment } from "react";
import {
  Hash,
  Plus,
  Play,
  Trash2,
  Download,
  Copy,
  Upload,
  Crown,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { useHashBulk, type ExportMode } from "../model/use-hash-bulk";
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
import { Progress } from "@/shared/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { useToast } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { UpgradeModal } from "@/entities/subscription";
import {
  BulkStatusIcon,
  BulkStatsBar,
  BulkProgressBar,
  EmptyDropzone,
} from "@/shared/ui";
import { useFileDropzone, formatSize } from "@/shared/lib";

export function HashBulk() {
  const {
    items,
    isProcessing,
    overallProgress,
    stats,
    limits,
    isPro,
    exportMode,
    fsAccess,
    setExportMode,
    addFiles,
    removeItem,
    clearAll,
    processAll,
    exportResults,
    copyHash,
  } = useHashBulk();

  const { showToast } = useToast();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      const fileList = files as unknown as FileList;
      const result = await addFiles(fileList);
      if (!result.success) {
        if (!isPro) {
          setShowUpgrade(true);
        }
        showToast(result.error || "Limit reached", "error");
      }
    },
    [addFiles, isPro, showToast],
  );

  const { isDragging, getDropzoneProps, getInputProps, openFileDialog } =
    useFileDropzone({
      multiple: true,
      maxFiles: limits.maxItems,
      maxFileSize: limits.maxFileSizeMB * 1024 * 1024,
      onFilesSelected: handleFilesSelected,
      onError: (error) => showToast(error, "error"),
      disabled: isProcessing,
    });

  const handleCopyHash = useCallback(
    async (hash: string) => {
      const success = await copyHash(hash);
      if (success) {
        showToast("Copied to clipboard", "success");
      }
    },
    [copyHash, showToast],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Batch Hash Generator
              </CardTitle>
              <CardDescription>
                Generate MD5, SHA-1, SHA-256, SHA-512 hashes for multiple files
              </CardDescription>
            </div>
            {!isPro && (
              <Badge variant="outline" className="gap-1">
                <Crown className="h-3 w-3" />
                Free: {limits.maxItems} files
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <input {...getInputProps()} />
              <Button
                variant="outline"
                onClick={openFileDialog}
                disabled={isProcessing}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Files
              </Button>

              {items.length > 0 && (
                <>
                  <Button
                    onClick={processAll}
                    disabled={isProcessing || stats.pending === 0}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Generate Hashes
                  </Button>

                  {stats.success > 0 && (
                    <Button
                      variant="outline"
                      onClick={async () => {
                        const result = await exportResults();
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
                </>
              )}
            </div>
          </div>

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

          {/* Drop Zone */}
          {items.length === 0 && (
            <EmptyDropzone
              {...getDropzoneProps()}
              icon={<Upload className="h-12 w-12 text-muted-foreground" />}
              title="Drop files here to hash"
              description={`or click to browse (max ${limits.maxItems} files, ${limits.maxFileSizeMB}MB each)`}
              isDragging={isDragging}
            />
          )}

          {/* Overall Progress */}
          <BulkProgressBar
            isProcessing={isProcessing}
            progress={overallProgress}
            className="mb-4"
          />

          {/* Stats */}
          {items.length > 0 && <BulkStatsBar stats={stats} className="mb-4" />}

          {/* Items Table */}
          {items.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Status</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead className="w-24">Size</TableHead>
                    <TableHead className="w-32">Progress</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <Fragment key={item.id}>
                      <TableRow
                        className={cn(
                          "cursor-pointer",
                          expandedItem === item.id && "bg-muted/30",
                        )}
                        onClick={() =>
                          setExpandedItem(
                            expandedItem === item.id ? null : item.id,
                          )
                        }
                      >
                        <TableCell>
                          <BulkStatusIcon status={item.status} />
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">{item.name}</span>
                            {item.error && (
                              <p className="text-xs text-destructive mt-1">
                                {item.error}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatSize(item.size)}
                        </TableCell>
                        <TableCell>
                          {item.status === "processing" ? (
                            <Progress value={item.progress} className="h-2" />
                          ) : item.status === "success" ? (
                            <span className="text-success text-sm">
                              Complete
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            disabled={isProcessing}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Hash Details */}
                      {expandedItem === item.id && item.hashes && (
                        <TableRow>
                          <TableCell colSpan={5} className="bg-muted/20 p-4">
                            <div className="space-y-2">
                              {item.hashes.map((hash) => (
                                <div
                                  key={hash.algorithm}
                                  className="flex items-center gap-3"
                                >
                                  <span className="w-16 text-xs font-medium uppercase text-muted-foreground">
                                    {hash.algorithm}
                                  </span>
                                  <code className="flex-1 text-xs bg-muted px-2 py-1 rounded font-mono truncate">
                                    {hash.hash}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleCopyHash(hash.hash)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        feature="bulk-hash"
        currentLimit={`${limits.maxItems} files`}
        proLimit="500 files"
      />
    </div>
  );
}
