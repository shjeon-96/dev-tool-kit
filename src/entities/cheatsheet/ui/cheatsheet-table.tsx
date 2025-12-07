"use client";

import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No results found for &quot;{search}&quot;
        </div>
      )}

      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          {showCategory && category !== "All" && (
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
          )}
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Code</th>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">
                      Description
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categoryItems.map((item, index) => (
                    <tr
                      key={`${item.code}-${index}`}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-3">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono break-all">
                          {item.code}
                        </code>
                      </td>
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {item.description}
                        {item.example && (
                          <span className="block text-xs mt-1 font-mono opacity-70">
                            {item.example}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleCopy(item.code)}
                        >
                          {copiedCode === item.code ? (
                            <Check className="h-3 w-3" />
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
