import type { Guide } from "../model/types";

export const cssToTailwindGuide: Guide = {
  slug: "css-to-tailwind",
  sections: [
    {
      id: "what-is-tailwind",
      titleKey: "guides.css-to-tailwind.sections.whatIs.title",
      contentKey: "guides.css-to-tailwind.sections.whatIs.content",
      code: `/* Traditional CSS */
.card {
  display: flex;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

<!-- Tailwind CSS -->
<div class="flex p-4 bg-white rounded-lg shadow-md">
  ...
</div>`,
      language: "css",
    },
    {
      id: "common-conversions",
      titleKey: "guides.css-to-tailwind.sections.conversions.title",
      contentKey: "guides.css-to-tailwind.sections.conversions.content",
      code: `/* Spacing */
margin: 16px      → m-4
padding: 8px 16px → px-4 py-2

/* Colors */
color: #3b82f6    → text-blue-500
background: #fff  → bg-white

/* Layout */
display: flex     → flex
justify-content: center → justify-center

/* Typography */
font-size: 18px   → text-lg
font-weight: bold → font-bold`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.css-to-tailwind.sections.howToUse.title",
      contentKey: "guides.css-to-tailwind.sections.howToUse.content",
    },
    {
      id: "responsive-design",
      titleKey: "guides.css-to-tailwind.sections.responsive.title",
      contentKey: "guides.css-to-tailwind.sections.responsive.content",
      code: `/* CSS Media Query */
@media (min-width: 768px) {
  .container { width: 100%; }
}

<!-- Tailwind Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
  ...
</div>

/* Breakpoints: sm(640) md(768) lg(1024) xl(1280) */`,
      language: "css",
    },
  ],
  relatedTools: ["box-shadow", "gradient-generator", "color-picker"],
  keywords: [
    "css to tailwind converter",
    "tailwind css generator",
    "convert css to tailwind",
    "tailwind class generator",
    "css tailwind translator",
    "tailwind utility classes",
    "tailwind converter online",
  ],
  difficulty: "intermediate",
  readTime: 6,
};
