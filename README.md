<p align="center">
  <img src="public/icons/icon-192x192.png" alt="Web Toolkit Logo" width="120" height="120">
</p>

<h1 align="center">Web Toolkit</h1>

<p align="center">
  <strong>28+ free developer tools in your browser. No signup, no server uploads.</strong>
</p>

<p align="center">
  <a href="https://web-toolkit.app">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tools">Tools</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## Why Web Toolkit?

Most online developer tools have a problem: **you don't know where your data goes**. When you paste a JWT token or format sensitive JSON, is it being logged? Stored? Sold?

**Web Toolkit is different:**

- 🔒 **100% Client-Side** – All processing happens in your browser. Your data never leaves your device.
- ⚡ **Fast** – No server round-trips. Instant results.
- 📴 **Works Offline** – It's a PWA. Install it and use it anywhere.
- 🌍 **Multi-language** – Available in English, Korean, and Japanese.
- 🆓 **Free Forever** – No signup, no premium tiers, no ads (well, minimal ads).

---

## Features

- **28+ Developer Tools** – Everything you need in one place
- **Privacy First** – No data collection, no tracking, no server uploads
- **PWA Support** – Install as an app, works offline
- **Dark Mode** – Easy on the eyes
- **Keyboard Shortcuts** – Power user friendly (⌘K to search)
- **i18n** – English, Korean, Japanese
- **SEO Optimized** – Guides and cheatsheets for discoverability

---

## Tools

### Text & Code

| Tool                      | Description                               |
| ------------------------- | ----------------------------------------- |
| **JSON Formatter**        | Format, minify, and validate JSON data    |
| **SQL Formatter**         | Beautify SQL queries with dialect support |
| **Regex Tester**          | Test patterns with real-time matching     |
| **Diff Checker**          | Compare two texts side-by-side            |
| **Markdown Preview**      | Live preview with syntax highlighting     |
| **Prettier Playground**   | Format code in 10+ languages              |
| **Lorem Ipsum Generator** | Generate placeholder text                 |
| **Cron Parser**           | Parse cron expressions                    |
| **URL Parser**            | Parse and edit URL components             |
| **UUID Generator**        | Generate UUID v1, v4, and ULID            |
| **User Agent Parser**     | Parse browser/OS from UA strings          |
| **Meta Tag Generator**    | Generate SEO meta tags                    |
| **cURL Builder**          | Build HTTP requests visually              |

### Media & Design

| Tool                     | Description                              |
| ------------------------ | ---------------------------------------- |
| **QR Code Generator**    | Create QR codes for URLs, WiFi, contacts |
| **Image Resizer**        | Resize and convert images                |
| **App Icon Generator**   | Generate iOS/Android/Favicon icons       |
| **Color Picker**         | Extract colors from images               |
| **Gradient Generator**   | Create CSS gradients visually            |
| **Box Shadow Generator** | Design CSS shadows                       |
| **SVG Optimizer**        | Reduce SVG file sizes                    |

### Converters

| Tool                      | Description                       |
| ------------------------- | --------------------------------- |
| **Base64 Converter**      | Encode/decode text and files      |
| **Unix Timestamp**        | Convert timestamps to dates       |
| **URL Encoder**           | Encode/decode URLs                |
| **HTML Entity Encoder**   | Encode HTML special characters    |
| **Number Base Converter** | Convert between binary, hex, etc. |
| **CSS to Tailwind**       | Convert CSS to Tailwind classes   |

### Security

| Tool               | Description                           |
| ------------------ | ------------------------------------- |
| **JWT Decoder**    | Decode and inspect JWT tokens         |
| **Hash Generator** | Generate MD5, SHA-256, SHA-512 hashes |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shjeon-96/web-toolkit.git
cd web-toolkit

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run analyze      # Analyze bundle size
```

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **UI:** [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **State:** [Zustand](https://zustand-demo.pmnd.rs/)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/)
- **Testing:** [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Code Quality:** ESLint, Prettier, Husky

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes
│   │   ├── tools/         # Tool pages
│   │   ├── cheatsheets/   # Cheatsheet pages
│   │   └── guides/        # Guide pages
│   └── api/               # API routes
├── entities/              # Domain entities (FSD)
│   ├── tool/              # Tool registry & types
│   ├── cheatsheet/        # Cheatsheet data
│   └── guide/             # Guide data
├── features/              # Feature modules (FSD)
│   ├── json-formatter/
│   ├── jwt-decoder/
│   └── ...
├── shared/                # Shared utilities
│   ├── ui/                # UI components
│   ├── lib/               # Utilities
│   └── config/            # Configuration
└── widgets/               # Composite components
    ├── header/
    ├── sidebar/
    └── footer/
```

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs** – Open an issue with reproduction steps
2. **Suggest features** – Open an issue with your idea
3. **Submit PRs** – Fork, create a branch, and submit a pull request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive

---

## Roadmap

- [ ] More tools (JSON Schema Validator, Color Converter, etc.)
- [ ] Browser extension
- [ ] API access
- [ ] More languages

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for hosting

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/shjeon-96">shjeon-96</a>
</p>
