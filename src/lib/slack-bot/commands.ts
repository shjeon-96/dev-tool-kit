/**
 * Slack Bot 명령어 핸들러
 *
 * 사용 가능한 슬래시 명령어:
 * - /wt-json: JSON 포맷팅/최소화
 * - /wt-hash: 해시 생성
 * - /wt-base64: Base64 인코딩/디코딩
 * - /wt-uuid: UUID 생성
 * - /wt-timestamp: Unix 타임스탬프 변환
 * - /wt-url: URL 인코딩/디코딩
 * - /wt-help: 도움말
 */

import type {
  SlackSlashCommand,
  SlackResponse,
  SlackBotCommand,
  SlackBlock,
} from "./types";
import { SLACK_COLORS } from "./types";

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 마크다운 섹션 블록 생성
 */
function mrkdwnSection(text: string): SlackBlock {
  return {
    type: "section",
    text: { type: "mrkdwn", text },
  };
}

/**
 * 헤더 블록 생성
 */
function headerBlock(text: string): SlackBlock {
  return {
    type: "header",
    text: { type: "plain_text", text, emoji: true },
  };
}

/**
 * 코드 블록으로 감싸기
 */
function codeBlock(code: string, language = ""): string {
  return `\`\`\`${language}\n${code}\n\`\`\``;
}

/**
 * SHA 해시 생성 (Web Crypto API)
 */
async function generateHash(
  text: string,
  algorithm: "SHA-1" | "SHA-256" | "SHA-512",
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ============================================
// 명령어 핸들러
// ============================================

/**
 * /wt-json - JSON 포맷팅/최소화
 */
async function handleJson(command: SlackSlashCommand): Promise<SlackResponse> {
  const text = command.text.trim();

  if (!text) {
    return {
      response_type: "ephemeral",
      text: '❌ 사용법: `/wt-json {"key": "value"}` 또는 `/wt-json minify {"key": "value"}`',
    };
  }

  // minify 옵션 확인
  const isMinify = text.toLowerCase().startsWith("minify ");
  const jsonInput = isMinify ? text.slice(7).trim() : text;

  try {
    const parsed = JSON.parse(jsonInput);
    const output = isMinify
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, 2);

    return {
      response_type: "ephemeral",
      blocks: [
        headerBlock(isMinify ? "🗜️ Minified JSON" : "📄 Formatted JSON"),
        mrkdwnSection(codeBlock(output, "json")),
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `<https://web-toolkit.app/en/tools/json-formatter|Open in Web Toolkit>`,
            },
          ],
        },
      ],
    };
  } catch {
    return {
      response_type: "ephemeral",
      text: "❌ Invalid JSON. Please check the syntax.",
    };
  }
}

/**
 * /wt-hash - 해시 생성
 */
async function handleHash(command: SlackSlashCommand): Promise<SlackResponse> {
  const text = command.text.trim();

  if (!text) {
    return {
      response_type: "ephemeral",
      text: "❌ 사용법: `/wt-hash <text>` 또는 `/wt-hash sha512 <text>`",
    };
  }

  // 알고리즘 파싱
  const parts = text.split(" ");
  let algorithm: "SHA-1" | "SHA-256" | "SHA-512" = "SHA-256";
  let input = text;

  if (parts[0].toLowerCase() === "sha1" || parts[0].toLowerCase() === "sha-1") {
    algorithm = "SHA-1";
    input = parts.slice(1).join(" ");
  } else if (
    parts[0].toLowerCase() === "sha512" ||
    parts[0].toLowerCase() === "sha-512"
  ) {
    algorithm = "SHA-512";
    input = parts.slice(1).join(" ");
  } else if (
    parts[0].toLowerCase() === "sha256" ||
    parts[0].toLowerCase() === "sha-256"
  ) {
    algorithm = "SHA-256";
    input = parts.slice(1).join(" ");
  }

  if (!input) {
    return {
      response_type: "ephemeral",
      text: "❌ Please provide text to hash.",
    };
  }

  const hash = await generateHash(input, algorithm);

  return {
    response_type: "ephemeral",
    blocks: [
      headerBlock(`🔐 ${algorithm} Hash`),
      mrkdwnSection(`*Input:* \`${input}\``),
      mrkdwnSection(`*Hash:*\n\`${hash}\``),
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `<https://web-toolkit.app/en/tools/hash-generator|Open in Web Toolkit>`,
          },
        ],
      },
    ],
  };
}

/**
 * /wt-base64 - Base64 인코딩/디코딩
 */
async function handleBase64(
  command: SlackSlashCommand,
): Promise<SlackResponse> {
  const text = command.text.trim();

  if (!text) {
    return {
      response_type: "ephemeral",
      text: "❌ 사용법: `/wt-base64 <text>` (인코딩) 또는 `/wt-base64 decode <base64>`",
    };
  }

  const isDecode = text.toLowerCase().startsWith("decode ");
  const input = isDecode ? text.slice(7).trim() : text;

  if (!input) {
    return {
      response_type: "ephemeral",
      text: "❌ Please provide input text.",
    };
  }

  try {
    let output: string;
    let action: string;

    if (isDecode) {
      output = atob(input);
      action = "Decoded";
    } else {
      output = btoa(input);
      action = "Encoded";
    }

    return {
      response_type: "ephemeral",
      blocks: [
        headerBlock(`📦 Base64 ${action}`),
        mrkdwnSection(
          `*Input:* \`${input.slice(0, 100)}${input.length > 100 ? "..." : ""}\``,
        ),
        mrkdwnSection(
          `*Output:*\n\`${output.slice(0, 500)}${output.length > 500 ? "..." : ""}\``,
        ),
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `<https://web-toolkit.app/en/tools/base64-converter|Open in Web Toolkit>`,
            },
          ],
        },
      ],
    };
  } catch {
    return {
      response_type: "ephemeral",
      text: "❌ Invalid input. Make sure the Base64 string is valid.",
    };
  }
}

/**
 * /wt-uuid - UUID 생성
 */
async function handleUuid(command: SlackSlashCommand): Promise<SlackResponse> {
  const countStr = command.text.trim();
  let count = 1;

  if (countStr) {
    const parsed = parseInt(countStr, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) {
      count = parsed;
    }
  }

  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(crypto.randomUUID());
  }

  return {
    response_type: "ephemeral",
    blocks: [
      headerBlock(`🆔 Generated ${count} UUID${count > 1 ? "s" : ""}`),
      mrkdwnSection(uuids.map((uuid) => `\`${uuid}\``).join("\n")),
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `<https://web-toolkit.app/en/tools/uuid-generator|Open in Web Toolkit>`,
          },
        ],
      },
    ],
  };
}

/**
 * /wt-timestamp - 타임스탬프 변환
 */
async function handleTimestamp(
  command: SlackSlashCommand,
): Promise<SlackResponse> {
  const input = command.text.trim().toLowerCase();
  const now = Date.now();

  let timestamp: number;
  let date: Date;

  if (!input || input === "now") {
    timestamp = now;
    date = new Date(now);
  } else {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
      return {
        response_type: "ephemeral",
        text: "❌ Invalid timestamp. Use a Unix timestamp (seconds or milliseconds) or 'now'.",
      };
    }

    // 초 단위인지 밀리초 단위인지 판단
    if (parsed < 10000000000) {
      timestamp = parsed * 1000;
    } else {
      timestamp = parsed;
    }
    date = new Date(timestamp);
  }

  const seconds = Math.floor(timestamp / 1000);
  const milliseconds = timestamp;

  return {
    response_type: "ephemeral",
    blocks: [
      headerBlock("⏰ Timestamp Converter"),
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Seconds:*\n\`${seconds}\`` },
          { type: "mrkdwn", text: `*Milliseconds:*\n\`${milliseconds}\`` },
          { type: "mrkdwn", text: `*ISO 8601:*\n\`${date.toISOString()}\`` },
          { type: "mrkdwn", text: `*UTC:*\n\`${date.toUTCString()}\`` },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `<https://web-toolkit.app/en/tools/unix-timestamp|Open in Web Toolkit>`,
          },
        ],
      },
    ],
  };
}

/**
 * /wt-url - URL 인코딩/디코딩
 */
async function handleUrl(command: SlackSlashCommand): Promise<SlackResponse> {
  const text = command.text.trim();

  if (!text) {
    return {
      response_type: "ephemeral",
      text: "❌ 사용법: `/wt-url <text>` (인코딩) 또는 `/wt-url decode <url>`",
    };
  }

  const isDecode = text.toLowerCase().startsWith("decode ");
  const input = isDecode ? text.slice(7).trim() : text;

  if (!input) {
    return {
      response_type: "ephemeral",
      text: "❌ Please provide input.",
    };
  }

  try {
    let output: string;
    let action: string;

    if (isDecode) {
      output = decodeURIComponent(input);
      action = "Decoded";
    } else {
      output = encodeURIComponent(input);
      action = "Encoded";
    }

    return {
      response_type: "ephemeral",
      blocks: [
        headerBlock(`🔗 URL ${action}`),
        mrkdwnSection(`*Input:*\n\`${input}\``),
        mrkdwnSection(`*Output:*\n\`${output}\``),
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `<https://web-toolkit.app/en/tools/url-encoder|Open in Web Toolkit>`,
            },
          ],
        },
      ],
    };
  } catch {
    return {
      response_type: "ephemeral",
      text: "❌ Invalid input.",
    };
  }
}

/**
 * /wt-help - 도움말
 */
async function handleHelp(_command: SlackSlashCommand): Promise<SlackResponse> {
  return {
    response_type: "ephemeral",
    blocks: [
      headerBlock("🛠️ Web Toolkit Slack Commands"),
      mrkdwnSection(
        "*Available commands:*\n\n" +
          "• `/wt-json <json>` - Format JSON\n" +
          "• `/wt-json minify <json>` - Minify JSON\n" +
          "• `/wt-hash <text>` - Generate SHA-256 hash\n" +
          "• `/wt-hash sha512 <text>` - Generate SHA-512 hash\n" +
          "• `/wt-base64 <text>` - Encode to Base64\n" +
          "• `/wt-base64 decode <base64>` - Decode Base64\n" +
          "• `/wt-uuid [count]` - Generate UUIDs (1-10)\n" +
          "• `/wt-timestamp [unix]` - Convert timestamp\n" +
          "• `/wt-url <text>` - URL encode\n" +
          "• `/wt-url decode <url>` - URL decode\n" +
          "• `/wt-help` - Show this help",
      ),
      { type: "divider" },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "🌐 Full toolkit at <https://web-toolkit.app|web-toolkit.app>",
          },
        ],
      },
    ],
  };
}

// ============================================
// 명령어 레지스트리
// ============================================

export const SLACK_COMMANDS: SlackBotCommand[] = [
  {
    name: "wt-json",
    description: "Format or minify JSON",
    usage: "/wt-json <json> or /wt-json minify <json>",
    handler: handleJson,
  },
  {
    name: "wt-hash",
    description: "Generate hash from text",
    usage: "/wt-hash [sha1|sha256|sha512] <text>",
    handler: handleHash,
  },
  {
    name: "wt-base64",
    description: "Encode or decode Base64",
    usage: "/wt-base64 <text> or /wt-base64 decode <base64>",
    handler: handleBase64,
  },
  {
    name: "wt-uuid",
    description: "Generate UUIDs",
    usage: "/wt-uuid [count]",
    handler: handleUuid,
  },
  {
    name: "wt-timestamp",
    description: "Convert Unix timestamp",
    usage: "/wt-timestamp [timestamp|now]",
    handler: handleTimestamp,
  },
  {
    name: "wt-url",
    description: "Encode or decode URL",
    usage: "/wt-url <text> or /wt-url decode <url>",
    handler: handleUrl,
  },
  {
    name: "wt-help",
    description: "Show all commands",
    usage: "/wt-help",
    handler: handleHelp,
  },
];

/**
 * 명령어 이름으로 핸들러 찾기
 */
export function getSlackCommand(name: string): SlackBotCommand | undefined {
  // /wt-json 형식에서 wt-json 추출
  const commandName = name.startsWith("/") ? name.slice(1) : name;
  return SLACK_COMMANDS.find((cmd) => cmd.name === commandName);
}
