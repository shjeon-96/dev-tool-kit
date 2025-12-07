"use client";

import { useState } from "react";
import { Search, Copy, Check, SearchX } from "lucide-react";
import { Input, Button } from "@/shared/ui";
import type { CheatsheetItem } from "../model/types";

interface CheatsheetTableProps {
  items: CheatsheetItem[];
  showCategory?: boolean;
}

export function CheatsheetTable({
  items,
  showCategory = true,
}: CheatsheetTableProps) {
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  const groupedItems = showCategory
    ? filteredItems.reduce(
        (acc, item) => {
          const category = item.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        },
        {} as Record<string, CheatsheetItem[]>,
      )
    : { All: filteredItems };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-6">
      {/* 검색창 - 스티키 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-4 -mx-1 px-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search commands, syntax, or descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          {search && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {filteredItems.length} results
            </span>
          )}
        </div>
      </div>

      {/* 검색 결과 없음 */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <SearchX className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">
            Try searching for &quot;{search.slice(0, 20)}
            {search.length > 20 && "..."}
            &quot;
          </p>
        </div>
      )}

      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          {showCategory && category !== "All" && (
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {category}
              <span className="text-sm font-normal text-muted-foreground">
                ({categoryItems.length})
              </span>
            </h3>
          )}
          <div className="rounded-lg border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-medium text-sm">Code</th>
                    <th className="text-left p-3 font-medium text-sm">Name</th>
                    <th className="text-left p-3 font-medium text-sm hidden md:table-cell">
                      Description
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categoryItems.map((item, index) => (
                    <tr
                      key={`${item.code}-${index}`}
                      className="hover:bg-muted/30 transition-colors even:bg-muted/10"
                    >
                      <td className="p-3">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono break-all border border-border/50">
                          {item.code}
                        </code>
                      </td>
                      <td className="p-3 font-medium text-sm">{item.name}</td>
                      <td className="p-3 text-muted-foreground text-sm hidden md:table-cell">
                        {item.description}
                        {item.example && (
                          <span className="block text-xs mt-1 font-mono text-primary/70">
                            → {item.example}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleCopy(item.code)}
                          className="opacity-50 hover:opacity-100 transition-opacity"
                        >
                          {copiedCode === item.code ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
