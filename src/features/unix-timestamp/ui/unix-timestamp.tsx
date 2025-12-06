"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTimestamp, type TimestampUnit } from "../model/use-timestamp";

export function UnixTimestamp() {
  const {
    timestamp,
    dateString,
    currentTime,
    unit,
    error,
    setUnit,
    handleTimestampChange,
    handleDateChange,
    setNow,
    handleClear,
    copyTimestamp,
    copyDate,
  } = useTimestamp();

  const [copiedField, setCopiedField] = useState<"timestamp" | "date" | null>(
    null
  );

  const handleCopy = async (field: "timestamp" | "date") => {
    const success = field === "timestamp" ? await copyTimestamp() : await copyDate();
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const currentTimestamp =
    unit === "milliseconds"
      ? currentTime.getTime()
      : Math.floor(currentTime.getTime() / 1000);

  return (
    <div className="space-y-6">
      {/* Current Time Display */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4" />
          Current Time
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div>
            <span className="text-xs text-muted-foreground">Timestamp</span>
            <p className="font-mono text-lg">{currentTimestamp}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Date/Time</span>
            <p className="font-mono text-lg">{currentTime.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={setNow}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Now
        </Button>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-muted-foreground">Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as TimestampUnit)}
            className="h-8 rounded-md border bg-background px-2 text-sm"
          >
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </div>

        <Button variant="outline" size="sm" onClick={handleClear}>
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Conversion Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Timestamp Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Unix Timestamp</label>
            {timestamp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy("timestamp")}
              >
                {copiedField === "timestamp" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => handleTimestampChange(e.target.value)}
            placeholder={unit === "milliseconds" ? "1699012345678" : "1699012345"}
            className="h-12 w-full rounded-md border bg-muted/50 px-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Enter a Unix timestamp to convert to date
          </p>
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Date/Time</label>
            {dateString && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy("date")}
              >
                {copiedField === "date" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <input
            type="text"
            value={dateString}
            onChange={(e) => handleDateChange(e.target.value)}
            placeholder="2024-01-01 12:00:00"
            className="h-12 w-full rounded-md border bg-muted/50 px-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Format: YYYY-MM-DD HH:mm:ss
          </p>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Quick Reference</h3>
        <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-3">
          <div>
            <span className="font-medium">1 minute</span> = 60 seconds
          </div>
          <div>
            <span className="font-medium">1 hour</span> = 3,600 seconds
          </div>
          <div>
            <span className="font-medium">1 day</span> = 86,400 seconds
          </div>
          <div>
            <span className="font-medium">1 week</span> = 604,800 seconds
          </div>
          <div>
            <span className="font-medium">1 month (30d)</span> = 2,592,000 seconds
          </div>
          <div>
            <span className="font-medium">1 year</span> = 31,536,000 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
