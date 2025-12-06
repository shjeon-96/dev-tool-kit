import type { ToolCategory, ToolSlug, Tool } from "./types";

export interface CategoryConfig {
  id: ToolCategory;
  labelKey: string;
  order: number;
}

export const categoryConfig: Record<ToolCategory, CategoryConfig> = {
  text: { id: "text", labelKey: "text", order: 1 },
  media: { id: "media", labelKey: "media", order: 2 },
  converters: { id: "converters", labelKey: "converters", order: 3 },
  security: { id: "security", labelKey: "security", order: 4 },
};

export function getToolsByCategory(
  tools: Record<ToolSlug, Tool>
): Map<ToolCategory, ToolSlug[]> {
  const grouped = new Map<ToolCategory, ToolSlug[]>();

  Object.entries(tools).forEach(([slug, tool]) => {
    const category = tool.category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(slug as ToolSlug);
  });

  return grouped;
}

export function getSortedCategories(): CategoryConfig[] {
  return Object.values(categoryConfig).sort((a, b) => a.order - b.order);
}
