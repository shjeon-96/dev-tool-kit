import type { CheatsheetItem } from "../model/types";

export const mimeTypes: CheatsheetItem[] = [
  // Text
  {
    code: "text/plain",
    name: "Plain Text",
    description: "Plain text file (.txt)",
    category: "Text",
  },
  {
    code: "text/html",
    name: "HTML",
    description: "HTML document (.html, .htm)",
    category: "Text",
  },
  {
    code: "text/css",
    name: "CSS",
    description: "CSS stylesheet (.css)",
    category: "Text",
  },
  {
    code: "text/javascript",
    name: "JavaScript",
    description: "JavaScript file (.js)",
    category: "Text",
  },
  {
    code: "text/csv",
    name: "CSV",
    description: "Comma-separated values (.csv)",
    category: "Text",
  },
  {
    code: "text/xml",
    name: "XML",
    description: "XML document (.xml)",
    category: "Text",
  },
  {
    code: "text/markdown",
    name: "Markdown",
    description: "Markdown document (.md)",
    category: "Text",
  },

  // Application
  {
    code: "application/json",
    name: "JSON",
    description: "JSON data (.json)",
    category: "Application",
  },
  {
    code: "application/xml",
    name: "XML",
    description: "XML application data",
    category: "Application",
  },
  {
    code: "application/javascript",
    name: "JavaScript",
    description: "JavaScript (preferred)",
    category: "Application",
  },
  {
    code: "application/pdf",
    name: "PDF",
    description: "PDF document (.pdf)",
    category: "Application",
  },
  {
    code: "application/zip",
    name: "ZIP",
    description: "ZIP archive (.zip)",
    category: "Application",
  },
  {
    code: "application/gzip",
    name: "GZIP",
    description: "GZIP archive (.gz)",
    category: "Application",
  },
  {
    code: "application/x-tar",
    name: "TAR",
    description: "TAR archive (.tar)",
    category: "Application",
  },
  {
    code: "application/x-rar-compressed",
    name: "RAR",
    description: "RAR archive (.rar)",
    category: "Application",
  },
  {
    code: "application/x-7z-compressed",
    name: "7-Zip",
    description: "7-Zip archive (.7z)",
    category: "Application",
  },
  {
    code: "application/octet-stream",
    name: "Binary",
    description: "Generic binary data",
    category: "Application",
  },
  {
    code: "application/x-www-form-urlencoded",
    name: "Form Data",
    description: "URL-encoded form data",
    category: "Application",
  },
  {
    code: "application/ld+json",
    name: "JSON-LD",
    description: "Linked Data JSON",
    category: "Application",
  },
  {
    code: "application/wasm",
    name: "WebAssembly",
    description: "WebAssembly binary (.wasm)",
    category: "Application",
  },

  // Image
  {
    code: "image/jpeg",
    name: "JPEG",
    description: "JPEG image (.jpg, .jpeg)",
    category: "Image",
  },
  {
    code: "image/png",
    name: "PNG",
    description: "PNG image (.png)",
    category: "Image",
  },
  {
    code: "image/gif",
    name: "GIF",
    description: "GIF image (.gif)",
    category: "Image",
  },
  {
    code: "image/webp",
    name: "WebP",
    description: "WebP image (.webp)",
    category: "Image",
  },
  {
    code: "image/svg+xml",
    name: "SVG",
    description: "SVG vector image (.svg)",
    category: "Image",
  },
  {
    code: "image/x-icon",
    name: "ICO",
    description: "Icon file (.ico)",
    category: "Image",
  },
  {
    code: "image/avif",
    name: "AVIF",
    description: "AVIF image (.avif)",
    category: "Image",
  },
  {
    code: "image/bmp",
    name: "BMP",
    description: "Bitmap image (.bmp)",
    category: "Image",
  },
  {
    code: "image/tiff",
    name: "TIFF",
    description: "TIFF image (.tif, .tiff)",
    category: "Image",
  },

  // Audio
  {
    code: "audio/mpeg",
    name: "MP3",
    description: "MP3 audio (.mp3)",
    category: "Audio",
  },
  {
    code: "audio/wav",
    name: "WAV",
    description: "WAV audio (.wav)",
    category: "Audio",
  },
  {
    code: "audio/ogg",
    name: "OGG Audio",
    description: "OGG audio (.ogg)",
    category: "Audio",
  },
  {
    code: "audio/webm",
    name: "WebM Audio",
    description: "WebM audio",
    category: "Audio",
  },
  {
    code: "audio/aac",
    name: "AAC",
    description: "AAC audio (.aac)",
    category: "Audio",
  },
  {
    code: "audio/flac",
    name: "FLAC",
    description: "FLAC audio (.flac)",
    category: "Audio",
  },

  // Video
  {
    code: "video/mp4",
    name: "MP4",
    description: "MP4 video (.mp4)",
    category: "Video",
  },
  {
    code: "video/webm",
    name: "WebM",
    description: "WebM video (.webm)",
    category: "Video",
  },
  {
    code: "video/ogg",
    name: "OGG Video",
    description: "OGG video (.ogv)",
    category: "Video",
  },
  {
    code: "video/quicktime",
    name: "QuickTime",
    description: "QuickTime video (.mov)",
    category: "Video",
  },
  {
    code: "video/x-msvideo",
    name: "AVI",
    description: "AVI video (.avi)",
    category: "Video",
  },
  {
    code: "video/mpeg",
    name: "MPEG",
    description: "MPEG video (.mpeg)",
    category: "Video",
  },

  // Font
  {
    code: "font/woff",
    name: "WOFF",
    description: "Web Open Font Format (.woff)",
    category: "Font",
  },
  {
    code: "font/woff2",
    name: "WOFF2",
    description: "Web Open Font Format 2 (.woff2)",
    category: "Font",
  },
  {
    code: "font/ttf",
    name: "TrueType",
    description: "TrueType font (.ttf)",
    category: "Font",
  },
  {
    code: "font/otf",
    name: "OpenType",
    description: "OpenType font (.otf)",
    category: "Font",
  },

  // Office Documents
  {
    code: "application/msword",
    name: "Word (legacy)",
    description: "Microsoft Word (.doc)",
    category: "Office",
  },
  {
    code: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "Word",
    description: "Microsoft Word (.docx)",
    category: "Office",
  },
  {
    code: "application/vnd.ms-excel",
    name: "Excel (legacy)",
    description: "Microsoft Excel (.xls)",
    category: "Office",
  },
  {
    code: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    name: "Excel",
    description: "Microsoft Excel (.xlsx)",
    category: "Office",
  },
  {
    code: "application/vnd.ms-powerpoint",
    name: "PowerPoint (legacy)",
    description: "Microsoft PowerPoint (.ppt)",
    category: "Office",
  },
  {
    code: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    name: "PowerPoint",
    description: "Microsoft PowerPoint (.pptx)",
    category: "Office",
  },

  // Multipart
  {
    code: "multipart/form-data",
    name: "Form Data",
    description: "Form data with file upload",
    category: "Multipart",
  },
  {
    code: "multipart/byteranges",
    name: "Byte Ranges",
    description: "Partial content response",
    category: "Multipart",
  },
];
