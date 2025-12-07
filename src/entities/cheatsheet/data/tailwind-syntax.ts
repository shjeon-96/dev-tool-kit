import type { CheatsheetItem } from "../model/types";

export const tailwindSyntax: CheatsheetItem[] = [
  // Layout
  {
    code: "container mx-auto",
    name: "Container",
    description: "Centered container with max-width",
    category: "Layout",
  },
  {
    code: "block / inline / inline-block / hidden",
    name: "Display",
    description: "Display property utilities",
    category: "Layout",
  },
  {
    code: "box-border / box-content",
    name: "Box sizing",
    description: "Box sizing mode",
    category: "Layout",
  },
  {
    code: "overflow-auto / overflow-hidden / overflow-scroll",
    name: "Overflow",
    description: "Overflow behavior",
    category: "Layout",
  },
  {
    code: "float-left / float-right / float-none",
    name: "Float",
    description: "Float positioning",
    category: "Layout",
  },
  {
    code: "clear-left / clear-right / clear-both",
    name: "Clear",
    description: "Clear floats",
    category: "Layout",
  },

  // Flexbox
  {
    code: "flex",
    name: "Flex container",
    description: "Enable flexbox",
    category: "Flexbox",
  },
  {
    code: "flex-row / flex-col",
    name: "Flex direction",
    description: "Row or column direction",
    category: "Flexbox",
  },
  {
    code: "flex-wrap / flex-nowrap",
    name: "Flex wrap",
    description: "Wrap flex items",
    category: "Flexbox",
  },
  {
    code: "justify-start / justify-center / justify-end / justify-between",
    name: "Justify content",
    description: "Main axis alignment",
    category: "Flexbox",
  },
  {
    code: "items-start / items-center / items-end / items-stretch",
    name: "Align items",
    description: "Cross axis alignment",
    category: "Flexbox",
  },
  {
    code: "flex-1 / flex-auto / flex-none",
    name: "Flex grow/shrink",
    description: "Flex item sizing",
    category: "Flexbox",
  },
  {
    code: "gap-4 / gap-x-4 / gap-y-4",
    name: "Gap",
    description: "Gap between items",
    category: "Flexbox",
  },
  {
    code: "order-first / order-last / order-1",
    name: "Order",
    description: "Flex item order",
    category: "Flexbox",
  },

  // Grid
  {
    code: "grid",
    name: "Grid container",
    description: "Enable CSS grid",
    category: "Grid",
  },
  {
    code: "grid-cols-1 / grid-cols-2 / grid-cols-12",
    name: "Grid columns",
    description: "Number of columns",
    category: "Grid",
  },
  {
    code: "grid-rows-1 / grid-rows-2 / grid-rows-6",
    name: "Grid rows",
    description: "Number of rows",
    category: "Grid",
  },
  {
    code: "col-span-1 / col-span-2 / col-span-full",
    name: "Column span",
    description: "Span across columns",
    category: "Grid",
  },
  {
    code: "row-span-1 / row-span-2 / row-span-full",
    name: "Row span",
    description: "Span across rows",
    category: "Grid",
  },
  {
    code: "col-start-1 / col-end-3",
    name: "Column start/end",
    description: "Column positioning",
    category: "Grid",
  },
  {
    code: "auto-cols-auto / auto-cols-min / auto-cols-max",
    name: "Auto columns",
    description: "Implicit column sizing",
    category: "Grid",
  },
  {
    code: "place-items-center / place-content-center",
    name: "Place items",
    description: "Align grid items",
    category: "Grid",
  },

  // Spacing
  {
    code: "p-4 / px-4 / py-4 / pt-4 / pb-4 / pl-4 / pr-4",
    name: "Padding",
    description: "Padding utilities",
    category: "Spacing",
  },
  {
    code: "m-4 / mx-4 / my-4 / mt-4 / mb-4 / ml-4 / mr-4",
    name: "Margin",
    description: "Margin utilities",
    category: "Spacing",
  },
  {
    code: "m-auto / mx-auto",
    name: "Auto margin",
    description: "Auto margin centering",
    category: "Spacing",
  },
  {
    code: "-m-4 / -mt-4",
    name: "Negative margin",
    description: "Negative margin values",
    category: "Spacing",
  },
  {
    code: "space-x-4 / space-y-4",
    name: "Space between",
    description: "Space between children",
    category: "Spacing",
  },

  // Sizing
  {
    code: "w-4 / w-1/2 / w-full / w-screen / w-auto",
    name: "Width",
    description: "Width utilities",
    category: "Sizing",
  },
  {
    code: "h-4 / h-1/2 / h-full / h-screen / h-auto",
    name: "Height",
    description: "Height utilities",
    category: "Sizing",
  },
  {
    code: "min-w-0 / min-w-full / min-w-min / min-w-max",
    name: "Min width",
    description: "Minimum width",
    category: "Sizing",
  },
  {
    code: "max-w-xs / max-w-md / max-w-lg / max-w-xl / max-w-full",
    name: "Max width",
    description: "Maximum width",
    category: "Sizing",
  },
  {
    code: "min-h-0 / min-h-full / min-h-screen",
    name: "Min height",
    description: "Minimum height",
    category: "Sizing",
  },
  {
    code: "max-h-0 / max-h-full / max-h-screen",
    name: "Max height",
    description: "Maximum height",
    category: "Sizing",
  },
  {
    code: "size-4 / size-full",
    name: "Size",
    description: "Width and height together",
    category: "Sizing",
  },

  // Typography
  {
    code: "text-xs / text-sm / text-base / text-lg / text-xl / text-2xl",
    name: "Font size",
    description: "Text size utilities",
    category: "Typography",
  },
  {
    code: "font-thin / font-normal / font-medium / font-bold",
    name: "Font weight",
    description: "Text weight utilities",
    category: "Typography",
  },
  {
    code: "font-sans / font-serif / font-mono",
    name: "Font family",
    description: "Font family utilities",
    category: "Typography",
  },
  {
    code: "italic / not-italic",
    name: "Font style",
    description: "Italic text style",
    category: "Typography",
  },
  {
    code: "text-left / text-center / text-right / text-justify",
    name: "Text align",
    description: "Text alignment",
    category: "Typography",
  },
  {
    code: "leading-none / leading-tight / leading-normal / leading-loose",
    name: "Line height",
    description: "Line height utilities",
    category: "Typography",
  },
  {
    code: "tracking-tight / tracking-normal / tracking-wide",
    name: "Letter spacing",
    description: "Letter spacing utilities",
    category: "Typography",
  },
  {
    code: "uppercase / lowercase / capitalize / normal-case",
    name: "Text transform",
    description: "Text case transform",
    category: "Typography",
  },
  {
    code: "underline / line-through / no-underline",
    name: "Text decoration",
    description: "Text decoration styles",
    category: "Typography",
  },
  {
    code: "truncate / text-ellipsis / text-clip",
    name: "Text overflow",
    description: "Text overflow handling",
    category: "Typography",
  },
  {
    code: "whitespace-normal / whitespace-nowrap / whitespace-pre",
    name: "Whitespace",
    description: "Whitespace handling",
    category: "Typography",
  },
  {
    code: "break-words / break-all / break-keep",
    name: "Word break",
    description: "Word breaking behavior",
    category: "Typography",
  },

  // Colors
  {
    code: "text-gray-500 / text-red-500 / text-blue-500",
    name: "Text color",
    description: "Text color utilities",
    category: "Colors",
  },
  {
    code: "bg-gray-500 / bg-red-500 / bg-blue-500",
    name: "Background color",
    description: "Background colors",
    category: "Colors",
  },
  {
    code: "text-black / text-white / text-transparent",
    name: "Base colors",
    description: "Basic color values",
    category: "Colors",
  },
  {
    code: "bg-opacity-50 / text-opacity-75",
    name: "Opacity",
    description: "Color opacity modifier",
    category: "Colors",
  },
  {
    code: "bg-gradient-to-r from-cyan-500 to-blue-500",
    name: "Gradient",
    description: "Gradient backgrounds",
    category: "Colors",
  },

  // Borders
  {
    code: "border / border-2 / border-4 / border-0",
    name: "Border width",
    description: "Border width utilities",
    category: "Borders",
  },
  {
    code: "border-t / border-b / border-l / border-r",
    name: "Border side",
    description: "Single side border",
    category: "Borders",
  },
  {
    code: "border-gray-500 / border-red-500",
    name: "Border color",
    description: "Border color utilities",
    category: "Borders",
  },
  {
    code: "border-solid / border-dashed / border-dotted / border-none",
    name: "Border style",
    description: "Border style utilities",
    category: "Borders",
  },
  {
    code: "rounded / rounded-md / rounded-lg / rounded-full / rounded-none",
    name: "Border radius",
    description: "Border radius utilities",
    category: "Borders",
  },
  {
    code: "rounded-t / rounded-b / rounded-l / rounded-r",
    name: "Radius side",
    description: "Single side radius",
    category: "Borders",
  },
  {
    code: "divide-x / divide-y / divide-gray-200",
    name: "Divide",
    description: "Dividers between children",
    category: "Borders",
  },
  {
    code: "ring / ring-2 / ring-blue-500",
    name: "Ring",
    description: "Focus ring utilities",
    category: "Borders",
  },

  // Effects
  {
    code: "shadow / shadow-md / shadow-lg / shadow-xl / shadow-none",
    name: "Box shadow",
    description: "Shadow utilities",
    category: "Effects",
  },
  {
    code: "opacity-0 / opacity-50 / opacity-100",
    name: "Opacity",
    description: "Element opacity",
    category: "Effects",
  },
  {
    code: "blur / blur-sm / blur-md / blur-lg",
    name: "Blur",
    description: "Blur filter",
    category: "Effects",
  },
  {
    code: "brightness-50 / brightness-100 / brightness-150",
    name: "Brightness",
    description: "Brightness filter",
    category: "Effects",
  },
  {
    code: "grayscale / grayscale-0",
    name: "Grayscale",
    description: "Grayscale filter",
    category: "Effects",
  },
  {
    code: "backdrop-blur / backdrop-blur-md",
    name: "Backdrop blur",
    description: "Backdrop blur filter",
    category: "Effects",
  },

  // Positioning
  {
    code: "static / relative / absolute / fixed / sticky",
    name: "Position",
    description: "Position utilities",
    category: "Positioning",
  },
  {
    code: "top-0 / right-0 / bottom-0 / left-0",
    name: "Inset",
    description: "Position offsets",
    category: "Positioning",
  },
  {
    code: "inset-0 / inset-x-0 / inset-y-0",
    name: "Inset shorthand",
    description: "All sides at once",
    category: "Positioning",
  },
  {
    code: "z-0 / z-10 / z-50 / z-auto",
    name: "Z-index",
    description: "Stacking order",
    category: "Positioning",
  },

  // Responsive
  {
    code: "sm:flex / md:flex / lg:flex / xl:flex / 2xl:flex",
    name: "Breakpoints",
    description: "Responsive prefixes",
    category: "Responsive",
  },
  {
    code: "sm:640px md:768px lg:1024px xl:1280px 2xl:1536px",
    name: "Breakpoint values",
    description: "Default breakpoint sizes",
    category: "Responsive",
  },
  {
    code: "max-sm: / max-md: / max-lg:",
    name: "Max breakpoints",
    description: "Max-width breakpoints",
    category: "Responsive",
  },

  // States
  {
    code: "hover:bg-blue-600",
    name: "Hover",
    description: "Hover state modifier",
    category: "States",
  },
  {
    code: "focus:ring-2 / focus:outline-none",
    name: "Focus",
    description: "Focus state modifier",
    category: "States",
  },
  {
    code: "active:bg-blue-700",
    name: "Active",
    description: "Active state modifier",
    category: "States",
  },
  {
    code: "disabled:opacity-50 / disabled:cursor-not-allowed",
    name: "Disabled",
    description: "Disabled state modifier",
    category: "States",
  },
  {
    code: "first:mt-0 / last:mb-0",
    name: "First/Last",
    description: "First/last child modifiers",
    category: "States",
  },
  {
    code: "odd:bg-gray-100 / even:bg-white",
    name: "Odd/Even",
    description: "Odd/even child modifiers",
    category: "States",
  },
  {
    code: "group-hover:text-blue-500",
    name: "Group hover",
    description: "Parent hover state",
    category: "States",
  },
  {
    code: "peer-focus:ring-2",
    name: "Peer state",
    description: "Sibling state modifier",
    category: "States",
  },

  // Dark Mode
  {
    code: "dark:bg-gray-800 / dark:text-white",
    name: "Dark mode",
    description: "Dark mode variants",
    category: "Dark Mode",
  },
  {
    code: 'class="dark" on html',
    name: "Dark class",
    description: "Enable dark mode via class",
    category: "Dark Mode",
  },

  // Transitions
  {
    code: "transition / transition-all / transition-colors",
    name: "Transition",
    description: "Transition property",
    category: "Transitions",
  },
  {
    code: "duration-150 / duration-300 / duration-500",
    name: "Duration",
    description: "Transition duration",
    category: "Transitions",
  },
  {
    code: "ease-in / ease-out / ease-in-out / ease-linear",
    name: "Timing",
    description: "Transition timing",
    category: "Transitions",
  },
  {
    code: "delay-150 / delay-300",
    name: "Delay",
    description: "Transition delay",
    category: "Transitions",
  },

  // Transforms
  {
    code: "scale-50 / scale-100 / scale-150",
    name: "Scale",
    description: "Scale transform",
    category: "Transforms",
  },
  {
    code: "rotate-45 / rotate-90 / -rotate-45",
    name: "Rotate",
    description: "Rotation transform",
    category: "Transforms",
  },
  {
    code: "translate-x-4 / translate-y-4 / -translate-x-1/2",
    name: "Translate",
    description: "Translation transform",
    category: "Transforms",
  },
  {
    code: "skew-x-3 / skew-y-3",
    name: "Skew",
    description: "Skew transform",
    category: "Transforms",
  },
  {
    code: "origin-center / origin-top / origin-bottom-left",
    name: "Transform origin",
    description: "Transform origin point",
    category: "Transforms",
  },

  // Animation
  {
    code: "animate-spin / animate-ping / animate-pulse / animate-bounce",
    name: "Animation",
    description: "Built-in animations",
    category: "Animation",
  },

  // Cursor & Interaction
  {
    code: "cursor-pointer / cursor-not-allowed / cursor-wait",
    name: "Cursor",
    description: "Cursor style",
    category: "Interaction",
  },
  {
    code: "select-none / select-text / select-all",
    name: "User select",
    description: "Text selection behavior",
    category: "Interaction",
  },
  {
    code: "pointer-events-none / pointer-events-auto",
    name: "Pointer events",
    description: "Pointer event handling",
    category: "Interaction",
  },
  {
    code: "resize / resize-none / resize-x / resize-y",
    name: "Resize",
    description: "Element resize behavior",
    category: "Interaction",
  },
  {
    code: "scroll-smooth / scroll-auto",
    name: "Scroll behavior",
    description: "Smooth scrolling",
    category: "Interaction",
  },

  // Aspect Ratio
  {
    code: "aspect-auto / aspect-square / aspect-video",
    name: "Aspect ratio",
    description: "Element aspect ratio",
    category: "Layout",
  },

  // Arbitrary Values
  {
    code: "w-[200px] / h-[50vh] / top-[117px]",
    name: "Arbitrary values",
    description: "Custom values with brackets",
    category: "Arbitrary",
  },
  {
    code: "bg-[#1da1f2] / text-[22px]",
    name: "Arbitrary colors/sizes",
    description: "Custom colors and sizes",
    category: "Arbitrary",
  },
  {
    code: "grid-cols-[200px_1fr_200px]",
    name: "Arbitrary grid",
    description: "Custom grid columns",
    category: "Arbitrary",
  },
];
