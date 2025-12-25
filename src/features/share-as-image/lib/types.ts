export type ThemeType =
  | "dracula"
  | "monokai"
  | "night-owl"
  | "one-dark"
  | "github-dark"
  | "github-light"
  | "solarized-dark"
  | "solarized-light";

export type BackgroundType =
  | "gradient-purple"
  | "gradient-blue"
  | "gradient-green"
  | "gradient-orange"
  | "gradient-pink"
  | "gradient-sunset"
  | "solid-dark"
  | "solid-white"
  | "transparent";

export type LanguageType =
  | "auto"
  | "javascript"
  | "typescript"
  | "python"
  | "json"
  | "html"
  | "css"
  | "bash"
  | "sql"
  | "go"
  | "rust"
  | "plaintext";

export type ExportFormat = "png" | "jpeg" | "svg";

export interface ThemeConfig {
  name: string;
  background: string;
  color: string;
  lineNumber: string;
  keyword: string;
  string: string;
  comment: string;
  number: string;
  function: string;
  operator: string;
}

export interface BackgroundConfig {
  name: string;
  value: string;
  preview: string;
}

export interface ImageSettings {
  theme: ThemeType;
  background: BackgroundType;
  language: LanguageType;
  fontSize: number;
  lineHeight: number;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  showLineNumbers: boolean;
  showWindowControls: boolean;
  windowTitle: string;
  watermark: boolean;
  scale: number;
}

export const defaultSettings: ImageSettings = {
  theme: "dracula",
  background: "gradient-purple",
  language: "auto",
  fontSize: 14,
  lineHeight: 1.5,
  paddingX: 32,
  paddingY: 24,
  borderRadius: 12,
  showLineNumbers: true,
  showWindowControls: true,
  windowTitle: "",
  watermark: true,
  scale: 2,
};

export const themes: Record<ThemeType, ThemeConfig> = {
  dracula: {
    name: "Dracula",
    background: "#282a36",
    color: "#f8f8f2",
    lineNumber: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    comment: "#6272a4",
    number: "#bd93f9",
    function: "#50fa7b",
    operator: "#ff79c6",
  },
  monokai: {
    name: "Monokai",
    background: "#272822",
    color: "#f8f8f2",
    lineNumber: "#90908a",
    keyword: "#f92672",
    string: "#e6db74",
    comment: "#75715e",
    number: "#ae81ff",
    function: "#a6e22e",
    operator: "#f92672",
  },
  "night-owl": {
    name: "Night Owl",
    background: "#011627",
    color: "#d6deeb",
    lineNumber: "#4b6479",
    keyword: "#c792ea",
    string: "#ecc48d",
    comment: "#637777",
    number: "#f78c6c",
    function: "#82aaff",
    operator: "#7fdbca",
  },
  "one-dark": {
    name: "One Dark",
    background: "#282c34",
    color: "#abb2bf",
    lineNumber: "#636d83",
    keyword: "#c678dd",
    string: "#98c379",
    comment: "#5c6370",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
  },
  "github-dark": {
    name: "GitHub Dark",
    background: "#0d1117",
    color: "#c9d1d9",
    lineNumber: "#6e7681",
    keyword: "#ff7b72",
    string: "#a5d6ff",
    comment: "#8b949e",
    number: "#79c0ff",
    function: "#d2a8ff",
    operator: "#ff7b72",
  },
  "github-light": {
    name: "GitHub Light",
    background: "#ffffff",
    color: "#24292f",
    lineNumber: "#6e7681",
    keyword: "#cf222e",
    string: "#0a3069",
    comment: "#6e7681",
    number: "#0550ae",
    function: "#8250df",
    operator: "#cf222e",
  },
  "solarized-dark": {
    name: "Solarized Dark",
    background: "#002b36",
    color: "#839496",
    lineNumber: "#586e75",
    keyword: "#859900",
    string: "#2aa198",
    comment: "#586e75",
    number: "#d33682",
    function: "#268bd2",
    operator: "#859900",
  },
  "solarized-light": {
    name: "Solarized Light",
    background: "#fdf6e3",
    color: "#657b83",
    lineNumber: "#93a1a1",
    keyword: "#859900",
    string: "#2aa198",
    comment: "#93a1a1",
    number: "#d33682",
    function: "#268bd2",
    operator: "#859900",
  },
};

export const backgrounds: Record<BackgroundType, BackgroundConfig> = {
  "gradient-purple": {
    name: "Purple Gradient",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    preview: "#7c5cb8",
  },
  "gradient-blue": {
    name: "Blue Gradient",
    value: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    preview: "#49b4cf",
  },
  "gradient-green": {
    name: "Green Gradient",
    value: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    preview: "#25c485",
  },
  "gradient-orange": {
    name: "Orange Gradient",
    value: "linear-gradient(135deg, #ff512f 0%, #f09819 100%)",
    preview: "#f77524",
  },
  "gradient-pink": {
    name: "Pink Gradient",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    preview: "#f275b3",
  },
  "gradient-sunset": {
    name: "Sunset Gradient",
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    preview: "#fcab6d",
  },
  "solid-dark": {
    name: "Dark",
    value: "#1a1a2e",
    preview: "#1a1a2e",
  },
  "solid-white": {
    name: "White",
    value: "#f0f0f0",
    preview: "#f0f0f0",
  },
  transparent: {
    name: "Transparent",
    value: "transparent",
    preview: "transparent",
  },
};

export const languages: { value: LanguageType; label: string }[] = [
  { value: "auto", label: "Auto Detect" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "bash", label: "Bash" },
  { value: "sql", label: "SQL" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "plaintext", label: "Plain Text" },
];
