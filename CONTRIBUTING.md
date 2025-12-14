# Contributing to Web Toolkit

Thank you for your interest in contributing to Web Toolkit! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Adding a New Tool](#adding-a-new-tool)
- [Adding a New Cheatsheet](#adding-a-new-cheatsheet)
- [Adding a New Guide](#adding-a-new-guide)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/shjeon-96/web-toolkit.git
cd web-toolkit

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Project Architecture

This project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** architecture.

### Layer Structure

```
src/
├── app/        # Layer 1: App (routing, providers)
├── shared/     # Layer 2: Shared (UI, lib, config)
├── entities/   # Layer 4: Entities (business entities)
├── features/   # Layer 5: Features (user interactions)
└── widgets/    # Layer 6: Widgets (composite components)
```

### Key Principles

1. **Unidirectional imports**: Lower layers cannot import from higher layers
2. **Public API**: Each module exports through `index.ts`
3. **Isolation**: Features are independent and don't import from each other

---

## Adding a New Tool

### Step 1: Create the Feature Module

Create a new directory under `src/features/`:

```
src/features/your-tool/
├── ui/
│   └── your-tool.tsx      # Main component
├── model/
│   └── use-your-tool.ts   # Hook for business logic
├── lib/
│   └── utils.ts           # Pure utility functions
└── index.ts               # Public API
```

### Step 2: Create the Main Component

```tsx
// src/features/your-tool/ui/your-tool.tsx
"use client";

import { useYourTool } from "../model/use-your-tool";

export function YourTool() {
  const { input, setInput, result } = useYourTool();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input..."
        />
      </div>

      {/* Output Panel */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted">{result}</div>
      </div>
    </div>
  );
}
```

### Step 3: Create the Custom Hook

```tsx
// src/features/your-tool/model/use-your-tool.ts
"use client";

import { useState, useMemo } from "react";
import { processInput } from "../lib/utils";

export function useYourTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input) return null;
    return processInput(input);
  }, [input]);

  return { input, setInput, result };
}
```

### Step 4: Export Public API

```tsx
// src/features/your-tool/index.ts
export { YourTool } from "./ui/your-tool";
```

### Step 5: Register the Tool

Add your tool to the registry:

```tsx
// src/entities/tool/model/registry.ts
import { YourIcon } from "lucide-react";

export const tools: Record<ToolSlug, Tool> = {
  // ... existing tools
  "your-tool": {
    title: "Your Tool",
    description: "Description of your tool.",
    icon: YourIcon,
    category: "text", // text | media | converters | security
  },
};
```

Update the type:

```tsx
// src/entities/tool/model/types.ts
export type ToolSlug =
  | "json-formatter"
  // ... existing slugs
  | "your-tool";
```

### Step 6: Create the Page

```tsx
// src/app/[locale]/tools/your-tool/page.tsx
import type { Metadata } from "next";
import { YourTool } from "@/features/your-tool";

export const metadata: Metadata = {
  title: "Your Tool",
  description: "Description for SEO.",
};

export default function YourToolPage() {
  return <YourTool />;
}
```

### Step 7: Add Translations

Add translations for all supported languages:

```json
// messages/en.json
{
  "tools": {
    "your-tool": {
      "title": "Your Tool",
      "description": "Description of your tool."
    }
  }
}
```

```json
// messages/ko.json
{
  "tools": {
    "your-tool": {
      "title": "도구 이름",
      "description": "도구 설명."
    }
  }
}
```

```json
// messages/ja.json
{
  "tools": {
    "your-tool": {
      "title": "ツール名",
      "description": "ツールの説明。"
    }
  }
}
```

---

## Adding a New Cheatsheet

### Step 1: Create Data File

```tsx
// src/entities/cheatsheet/data/your-cheatsheet.ts
import type { CheatsheetItem } from "../model/types";

export const yourCheatsheet: CheatsheetItem[] = [
  {
    code: "command",
    name: "Command Name",
    description: "What this command does",
    category: "Category Name",
  },
  // ... more items
];
```

### Step 2: Register in Index

```tsx
// src/entities/cheatsheet/data/index.ts
export { yourCheatsheet } from "./your-cheatsheet";
```

### Step 3: Create Page

```tsx
// src/app/[locale]/cheatsheets/your-cheatsheet/page.tsx
import { CheatsheetTable } from "@/entities/cheatsheet";
import { yourCheatsheet } from "@/entities/cheatsheet/data";

export default function YourCheatsheetPage() {
  return <CheatsheetTable items={yourCheatsheet} />;
}
```

---

## Adding a New Guide

### Step 1: Create Data File

```tsx
// src/entities/guide/data/your-tool.ts
import type { Guide } from "../model/types";

export const yourToolGuide: Guide = {
  slug: "your-tool",
  sections: [
    {
      id: "what-is",
      titleKey: "guides.your-tool.sections.whatIs.title",
      contentKey: "guides.your-tool.sections.whatIs.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.your-tool.sections.howToUse.title",
      contentKey: "guides.your-tool.sections.howToUse.content",
      code: `// Example code`,
      language: "javascript",
    },
  ],
  relatedTools: ["json-formatter", "other-tool"],
  keywords: ["keyword1", "keyword2"],
  difficulty: "beginner", // beginner | intermediate | advanced
  readTime: 5,
};
```

### Step 2: Register Guide

```tsx
// src/entities/guide/data/index.ts
export { yourToolGuide } from "./your-tool";
```

Update slug type:

```tsx
// src/entities/guide/model/types.ts
export type GuideSlug =
  | "json-formatter"
  // ... existing slugs
  | "your-tool";
```

### Step 3: Add Translations

```json
// messages/en.json
{
  "guides": {
    "your-tool": {
      "title": "Your Tool Guide",
      "description": "Learn how to use Your Tool effectively.",
      "sections": {
        "whatIs": {
          "title": "What is Your Tool?",
          "content": "Your Tool is..."
        },
        "howToUse": {
          "title": "How to Use",
          "content": "Step-by-step guide..."
        }
      }
    }
  }
}
```

---

## Code Style

### General Rules

- Use TypeScript strict mode
- Use functional components with hooks
- Prefer named exports
- Use absolute imports with `@/` prefix

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utilities: `kebab-case.ts`
- Types: `types.ts`

### Component Structure

```tsx
// Imports
import { useState } from "react";
import { Button } from "@/shared/ui";

// Types
interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Component
export function ComponentName({ value, onChange }: Props) {
  // Hooks
  const [state, setState] = useState(false);

  // Handlers
  const handleClick = () => {
    onChange(value);
  };

  // Render
  return (
    <div>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}
```

---

## Testing

### Unit Tests

```bash
npm run test
```

Create test files next to the source:

```
src/features/your-tool/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts  # Unit tests
```

### E2E Tests

```bash
npm run test:e2e
```

Create E2E tests in the `e2e/` directory:

```tsx
// e2e/your-tool.spec.ts
import { test, expect } from "@playwright/test";

test("your tool works", async ({ page }) => {
  await page.goto("/en/tools/your-tool");
  await page.fill("textarea", "input");
  await expect(page.locator("[data-testid=output]")).toContainText("result");
});
```

---

## Pull Request Process

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make your changes** following the guidelines above
4. **Test** your changes:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
5. **Commit** with a descriptive message:
   ```bash
   git commit -m "feat: add your-tool feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature
   ```
7. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots if UI changes
   - Link to related issues

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

---

## Questions?

- Open an [issue](https://github.com/shjeon-96/web-toolkit/issues)
- Check existing [discussions](https://github.com/shjeon-96/web-toolkit/discussions)

Thank you for contributing! 🎉
