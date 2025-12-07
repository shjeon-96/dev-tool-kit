import type { CheatsheetItem } from "../model/types";

export const cssSyntax: CheatsheetItem[] = [
  // Selectors
  {
    code: "*",
    name: "Universal",
    description: "Selects all elements",
    category: "Selectors",
  },
  {
    code: "element",
    name: "Type",
    description: "Selects all elements of type",
    category: "Selectors",
  },
  {
    code: ".class",
    name: "Class",
    description: "Selects elements with class",
    category: "Selectors",
  },
  {
    code: "#id",
    name: "ID",
    description: "Selects element with ID",
    category: "Selectors",
  },
  {
    code: "[attr]",
    name: "Attribute",
    description: "Selects elements with attribute",
    category: "Selectors",
  },
  {
    code: "[attr=value]",
    name: "Attribute equals",
    description: "Attribute equals value",
    category: "Selectors",
  },
  {
    code: "[attr^=value]",
    name: "Attribute starts with",
    description: "Attribute starts with value",
    category: "Selectors",
  },
  {
    code: "[attr$=value]",
    name: "Attribute ends with",
    description: "Attribute ends with value",
    category: "Selectors",
  },
  {
    code: "[attr*=value]",
    name: "Attribute contains",
    description: "Attribute contains value",
    category: "Selectors",
  },

  // Combinators
  {
    code: "A B",
    name: "Descendant",
    description: "B inside A (any level)",
    category: "Combinators",
  },
  {
    code: "A > B",
    name: "Child",
    description: "B direct child of A",
    category: "Combinators",
  },
  {
    code: "A + B",
    name: "Adjacent sibling",
    description: "B immediately after A",
    category: "Combinators",
  },
  {
    code: "A ~ B",
    name: "General sibling",
    description: "B after A (same parent)",
    category: "Combinators",
  },
  {
    code: "A, B",
    name: "Grouping",
    description: "Selects both A and B",
    category: "Combinators",
  },

  // Pseudo Classes
  {
    code: ":hover",
    name: "Hover",
    description: "Mouse over element",
    category: "Pseudo Classes",
  },
  {
    code: ":active",
    name: "Active",
    description: "Element being clicked",
    category: "Pseudo Classes",
  },
  {
    code: ":focus",
    name: "Focus",
    description: "Element has focus",
    category: "Pseudo Classes",
  },
  {
    code: ":focus-visible",
    name: "Focus visible",
    description: "Focus with keyboard navigation",
    category: "Pseudo Classes",
  },
  {
    code: ":focus-within",
    name: "Focus within",
    description: "Element contains focused element",
    category: "Pseudo Classes",
  },
  {
    code: ":visited",
    name: "Visited",
    description: "Visited link",
    category: "Pseudo Classes",
  },
  {
    code: ":first-child",
    name: "First child",
    description: "First child of parent",
    category: "Pseudo Classes",
  },
  {
    code: ":last-child",
    name: "Last child",
    description: "Last child of parent",
    category: "Pseudo Classes",
  },
  {
    code: ":nth-child(n)",
    name: "Nth child",
    description: "Nth child of parent",
    category: "Pseudo Classes",
  },
  {
    code: ":nth-child(odd/even)",
    name: "Odd/Even",
    description: "Odd or even children",
    category: "Pseudo Classes",
  },
  {
    code: ":not(selector)",
    name: "Not",
    description: "Elements not matching selector",
    category: "Pseudo Classes",
  },
  {
    code: ":is(selector)",
    name: "Is",
    description: "Matches any of the selectors",
    category: "Pseudo Classes",
  },
  {
    code: ":where(selector)",
    name: "Where",
    description: "Like :is() but zero specificity",
    category: "Pseudo Classes",
  },
  {
    code: ":has(selector)",
    name: "Has",
    description: "Parent selector (contains child)",
    category: "Pseudo Classes",
  },
  {
    code: ":empty",
    name: "Empty",
    description: "Elements with no children",
    category: "Pseudo Classes",
  },
  {
    code: ":disabled",
    name: "Disabled",
    description: "Disabled form elements",
    category: "Pseudo Classes",
  },
  {
    code: ":checked",
    name: "Checked",
    description: "Checked checkbox/radio",
    category: "Pseudo Classes",
  },

  // Pseudo Elements
  {
    code: "::before",
    name: "Before",
    description: "Insert content before element",
    category: "Pseudo Elements",
  },
  {
    code: "::after",
    name: "After",
    description: "Insert content after element",
    category: "Pseudo Elements",
  },
  {
    code: "::first-line",
    name: "First line",
    description: "First line of text",
    category: "Pseudo Elements",
  },
  {
    code: "::first-letter",
    name: "First letter",
    description: "First letter of text",
    category: "Pseudo Elements",
  },
  {
    code: "::placeholder",
    name: "Placeholder",
    description: "Input placeholder text",
    category: "Pseudo Elements",
  },
  {
    code: "::selection",
    name: "Selection",
    description: "User selected text",
    category: "Pseudo Elements",
  },

  // Box Model
  {
    code: "width / height",
    name: "Dimensions",
    description: "Element width and height",
    category: "Box Model",
  },
  {
    code: "min-width / max-width",
    name: "Min/Max width",
    description: "Minimum and maximum width",
    category: "Box Model",
  },
  {
    code: "padding",
    name: "Padding",
    description: "Inner spacing",
    category: "Box Model",
  },
  {
    code: "margin",
    name: "Margin",
    description: "Outer spacing",
    category: "Box Model",
  },
  {
    code: "margin: auto",
    name: "Auto margin",
    description: "Center block element horizontally",
    category: "Box Model",
  },
  {
    code: "border",
    name: "Border",
    description: "Element border",
    category: "Box Model",
  },
  {
    code: "border-radius",
    name: "Border radius",
    description: "Rounded corners",
    category: "Box Model",
  },
  {
    code: "box-sizing: border-box",
    name: "Border box",
    description: "Include padding/border in width",
    category: "Box Model",
  },
  {
    code: "outline",
    name: "Outline",
    description: "Line outside border (no layout)",
    category: "Box Model",
  },

  // Flexbox
  {
    code: "display: flex",
    name: "Flex container",
    description: "Create flex container",
    category: "Flexbox",
  },
  {
    code: "flex-direction",
    name: "Direction",
    description: "row | row-reverse | column | column-reverse",
    category: "Flexbox",
  },
  {
    code: "flex-wrap",
    name: "Wrap",
    description: "nowrap | wrap | wrap-reverse",
    category: "Flexbox",
  },
  {
    code: "justify-content",
    name: "Justify content",
    description: "Main axis alignment",
    category: "Flexbox",
  },
  {
    code: "align-items",
    name: "Align items",
    description: "Cross axis alignment",
    category: "Flexbox",
  },
  {
    code: "align-content",
    name: "Align content",
    description: "Multi-line cross axis",
    category: "Flexbox",
  },
  {
    code: "gap",
    name: "Gap",
    description: "Space between flex items",
    category: "Flexbox",
  },
  {
    code: "flex-grow",
    name: "Flex grow",
    description: "Item growth factor",
    category: "Flexbox",
  },
  {
    code: "flex-shrink",
    name: "Flex shrink",
    description: "Item shrink factor",
    category: "Flexbox",
  },
  {
    code: "flex-basis",
    name: "Flex basis",
    description: "Initial item size",
    category: "Flexbox",
  },
  {
    code: "flex: 1",
    name: "Flex shorthand",
    description: "grow shrink basis shorthand",
    category: "Flexbox",
  },
  {
    code: "align-self",
    name: "Align self",
    description: "Override align-items for item",
    category: "Flexbox",
  },
  {
    code: "order",
    name: "Order",
    description: "Change item order",
    category: "Flexbox",
  },

  // Grid
  {
    code: "display: grid",
    name: "Grid container",
    description: "Create grid container",
    category: "Grid",
  },
  {
    code: "grid-template-columns",
    name: "Grid columns",
    description: "Define column tracks",
    category: "Grid",
  },
  {
    code: "grid-template-rows",
    name: "Grid rows",
    description: "Define row tracks",
    category: "Grid",
  },
  {
    code: "repeat(n, size)",
    name: "Repeat",
    description: "Repeat track definition",
    category: "Grid",
  },
  {
    code: "1fr",
    name: "Fraction unit",
    description: "Fractional unit of available space",
    category: "Grid",
  },
  {
    code: "minmax(min, max)",
    name: "Minmax",
    description: "Size range for tracks",
    category: "Grid",
  },
  {
    code: "auto-fill / auto-fit",
    name: "Auto fill/fit",
    description: "Auto-create responsive columns",
    category: "Grid",
  },
  {
    code: "gap / row-gap / column-gap",
    name: "Grid gap",
    description: "Space between grid items",
    category: "Grid",
  },
  {
    code: "grid-column: start / end",
    name: "Grid column span",
    description: "Item column placement",
    category: "Grid",
  },
  {
    code: "grid-row: start / end",
    name: "Grid row span",
    description: "Item row placement",
    category: "Grid",
  },
  {
    code: "grid-area",
    name: "Grid area",
    description: "Name or place grid item",
    category: "Grid",
  },
  {
    code: "place-items: center",
    name: "Place items",
    description: "Align + justify items shorthand",
    category: "Grid",
  },
  {
    code: "place-content: center",
    name: "Place content",
    description: "Align + justify content shorthand",
    category: "Grid",
  },

  // Positioning
  {
    code: "position: static",
    name: "Static",
    description: "Default positioning",
    category: "Positioning",
  },
  {
    code: "position: relative",
    name: "Relative",
    description: "Position relative to normal position",
    category: "Positioning",
  },
  {
    code: "position: absolute",
    name: "Absolute",
    description: "Position relative to positioned ancestor",
    category: "Positioning",
  },
  {
    code: "position: fixed",
    name: "Fixed",
    description: "Position relative to viewport",
    category: "Positioning",
  },
  {
    code: "position: sticky",
    name: "Sticky",
    description: "Sticky within scroll container",
    category: "Positioning",
  },
  {
    code: "top / right / bottom / left",
    name: "Offsets",
    description: "Position offsets",
    category: "Positioning",
  },
  {
    code: "inset",
    name: "Inset",
    description: "Shorthand for all offsets",
    category: "Positioning",
  },
  {
    code: "z-index",
    name: "Z-index",
    description: "Stacking order",
    category: "Positioning",
  },

  // Typography
  {
    code: "font-family",
    name: "Font family",
    description: "Font stack",
    category: "Typography",
  },
  {
    code: "font-size",
    name: "Font size",
    description: "Text size",
    category: "Typography",
  },
  {
    code: "font-weight",
    name: "Font weight",
    description: "Text boldness",
    category: "Typography",
  },
  {
    code: "font-style",
    name: "Font style",
    description: "normal | italic | oblique",
    category: "Typography",
  },
  {
    code: "line-height",
    name: "Line height",
    description: "Line spacing",
    category: "Typography",
  },
  {
    code: "letter-spacing",
    name: "Letter spacing",
    description: "Character spacing",
    category: "Typography",
  },
  {
    code: "text-align",
    name: "Text align",
    description: "Horizontal text alignment",
    category: "Typography",
  },
  {
    code: "text-decoration",
    name: "Text decoration",
    description: "underline | line-through | none",
    category: "Typography",
  },
  {
    code: "text-transform",
    name: "Text transform",
    description: "uppercase | lowercase | capitalize",
    category: "Typography",
  },
  {
    code: "white-space",
    name: "White space",
    description: "How whitespace is handled",
    category: "Typography",
  },
  {
    code: "overflow-wrap / word-break",
    name: "Word breaking",
    description: "How words break",
    category: "Typography",
  },
  {
    code: "text-overflow: ellipsis",
    name: "Text overflow",
    description: "Show ellipsis for overflow",
    category: "Typography",
  },

  // Colors & Backgrounds
  {
    code: "color",
    name: "Color",
    description: "Text color",
    category: "Colors",
  },
  {
    code: "background-color",
    name: "Background color",
    description: "Element background",
    category: "Colors",
  },
  {
    code: "background-image",
    name: "Background image",
    description: "Background image or gradient",
    category: "Colors",
  },
  {
    code: "background-size",
    name: "Background size",
    description: "cover | contain | size",
    category: "Colors",
  },
  {
    code: "background-position",
    name: "Background position",
    description: "Position of background",
    category: "Colors",
  },
  {
    code: "opacity",
    name: "Opacity",
    description: "Element transparency (0-1)",
    category: "Colors",
  },
  {
    code: "linear-gradient()",
    name: "Linear gradient",
    description: "Linear color gradient",
    category: "Colors",
  },
  {
    code: "radial-gradient()",
    name: "Radial gradient",
    description: "Radial color gradient",
    category: "Colors",
  },

  // Transforms & Animations
  {
    code: "transform: translate(x, y)",
    name: "Translate",
    description: "Move element",
    category: "Transforms",
  },
  {
    code: "transform: scale(x, y)",
    name: "Scale",
    description: "Resize element",
    category: "Transforms",
  },
  {
    code: "transform: rotate(deg)",
    name: "Rotate",
    description: "Rotate element",
    category: "Transforms",
  },
  {
    code: "transform: skew(x, y)",
    name: "Skew",
    description: "Skew element",
    category: "Transforms",
  },
  {
    code: "transform-origin",
    name: "Transform origin",
    description: "Origin point for transforms",
    category: "Transforms",
  },
  {
    code: "transition",
    name: "Transition",
    description: "Animate property changes",
    category: "Transforms",
  },
  {
    code: "animation",
    name: "Animation",
    description: "Keyframe animation",
    category: "Transforms",
  },
  {
    code: "@keyframes name { }",
    name: "Keyframes",
    description: "Define animation keyframes",
    category: "Transforms",
  },

  // Misc
  {
    code: "overflow",
    name: "Overflow",
    description: "visible | hidden | scroll | auto",
    category: "Misc",
  },
  {
    code: "cursor",
    name: "Cursor",
    description: "Mouse cursor style",
    category: "Misc",
  },
  {
    code: "visibility",
    name: "Visibility",
    description: "visible | hidden (keeps space)",
    category: "Misc",
  },
  {
    code: "display: none",
    name: "Display none",
    description: "Hide element completely",
    category: "Misc",
  },
  {
    code: "pointer-events",
    name: "Pointer events",
    description: "Control click/hover events",
    category: "Misc",
  },
  {
    code: "user-select",
    name: "User select",
    description: "Control text selection",
    category: "Misc",
  },
  {
    code: "box-shadow",
    name: "Box shadow",
    description: "Element shadow",
    category: "Misc",
  },
  {
    code: "filter",
    name: "Filter",
    description: "blur, brightness, contrast, etc",
    category: "Misc",
  },
  {
    code: "backdrop-filter",
    name: "Backdrop filter",
    description: "Filter for element backdrop",
    category: "Misc",
  },
  {
    code: "aspect-ratio",
    name: "Aspect ratio",
    description: "Maintain width/height ratio",
    category: "Misc",
  },
  {
    code: "object-fit",
    name: "Object fit",
    description: "How replaced elements fit",
    category: "Misc",
  },

  // CSS Variables
  {
    code: "--name: value",
    name: "Define variable",
    description: "Define CSS custom property",
    category: "Variables",
  },
  {
    code: "var(--name)",
    name: "Use variable",
    description: "Use CSS custom property",
    category: "Variables",
  },
  {
    code: "var(--name, fallback)",
    name: "Variable fallback",
    description: "Variable with fallback value",
    category: "Variables",
  },

  // Media Queries
  {
    code: "@media (min-width: 768px)",
    name: "Min width",
    description: "Styles for screens >= 768px",
    category: "Media Queries",
  },
  {
    code: "@media (max-width: 767px)",
    name: "Max width",
    description: "Styles for screens < 768px",
    category: "Media Queries",
  },
  {
    code: "@media (prefers-color-scheme: dark)",
    name: "Dark mode",
    description: "Styles for dark mode preference",
    category: "Media Queries",
  },
  {
    code: "@media (prefers-reduced-motion)",
    name: "Reduced motion",
    description: "Respect motion preferences",
    category: "Media Queries",
  },
  {
    code: "@container (min-width: 400px)",
    name: "Container query",
    description: "Query container size",
    category: "Media Queries",
  },
];
