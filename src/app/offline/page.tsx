"use client";

import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-muted">
            <WifiOff className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">You&apos;re Offline</h1>
          <p className="text-muted-foreground">
            It looks like you&apos;ve lost your internet connection. Don&apos;t
            worry - many of our tools work offline once they&apos;ve been
            loaded!
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 text-left">
            <h2 className="font-semibold mb-2">Available Offline:</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• JSON Formatter & Validator</li>
              <li>• Base64 Encoder/Decoder</li>
              <li>• URL Encoder/Decoder</li>
              <li>• Hash Generator (MD5, SHA)</li>
              <li>• Color Picker & Converter</li>
              <li>• Regex Tester</li>
              <li>• And more...</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Visit our tools while online to cache them for offline use.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
