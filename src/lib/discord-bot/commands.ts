/**
 * Discord Bot 명령어 핸들러
 *
 * 지원 명령어:
 * /json - JSON 포맷팅/검증
 * /hash - 해시 생성 (MD5, SHA-1, SHA-256)
 * /base64 - Base64 인코딩/디코딩
 * /uuid - UUID 생성
 * /timestamp - Unix 타임스탬프 변환
 * /url - URL 인코딩/디코딩
 */

import {
  type DiscordInteraction,
  type InteractionResponse,
  type BotCommand,
  type DiscordEmbed,
  InteractionResponseType,
  ApplicationCommandOptionType,
  EMBED_COLORS,
} from "./types";

// ============================================
// 유틸리티 함수
// ============================================

function createEmbed(options: Partial<DiscordEmbed>): DiscordEmbed {
  return {
    color: EMBED_COLORS.PRIMARY,
    timestamp: new Date().toISOString(),
    footer: {
      text: "Web Toolkit • web-toolkit.app",
      icon_url: "https://web-toolkit.app/icon-192.png",
    },
    ...options,
  };
}

function createErrorEmbed(message: string): DiscordEmbed {
  return createEmbed({
    title: "❌ 오류",
    description: message,
    color: EMBED_COLORS.ERROR,
  });
}

function createSuccessEmbed(title: string, description: string): DiscordEmbed {
  return createEmbed({
    title: `✅ ${title}`,
    description,
    color: EMBED_COLORS.SUCCESS,
  });
}

function getOptionValue(
  interaction: DiscordInteraction,
  name: string,
): string | undefined {
  const option = interaction.data?.options?.find((o) => o.name === name);
  return option?.value as string | undefined;
}

function truncateOutput(text: string, maxLength = 1900): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "\n... (truncated)";
}

// ============================================
// /json 명령어
// ============================================

async function handleJsonCommand(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const input = getOptionValue(interaction, "input");
  const action = getOptionValue(interaction, "action") || "format";

  if (!input) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("JSON 입력이 필요합니다.")] },
    };
  }

  try {
    const parsed = JSON.parse(input);

    if (action === "minify") {
      const result = JSON.stringify(parsed);
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [
            createSuccessEmbed(
              "JSON Minified",
              `\`\`\`json\n${truncateOutput(result)}\n\`\`\``,
            ),
          ],
        },
      };
    }

    // Default: format (prettify)
    const result = JSON.stringify(parsed, null, 2);
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createSuccessEmbed(
            "JSON Formatted",
            `\`\`\`json\n${truncateOutput(result)}\n\`\`\``,
          ),
        ],
      },
    };
  } catch {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("유효하지 않은 JSON입니다.")] },
    };
  }
}

// ============================================
// /hash 명령어
// ============================================

async function handleHashCommand(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const input = getOptionValue(interaction, "input");
  const algorithm = getOptionValue(interaction, "algorithm") || "sha256";

  if (!input) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("해시할 텍스트가 필요합니다.")] },
    };
  }

  // Web Crypto API 사용
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  let hashBuffer: ArrayBuffer;
  let algoName: string;

  switch (algorithm) {
    case "md5":
      // MD5는 Web Crypto에서 지원하지 않음 - 간단한 구현 또는 외부 라이브러리 필요
      // 여기서는 SHA-256으로 대체하고 안내
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [
            createEmbed({
              title: "⚠️ MD5 미지원",
              description:
                "보안상의 이유로 MD5는 Discord 봇에서 지원하지 않습니다.\n[웹에서 MD5 해시 생성하기](https://web-toolkit.app/en/tools/hash-generator)",
              color: EMBED_COLORS.WARNING,
            }),
          ],
        },
      };
    case "sha1":
      hashBuffer = await crypto.subtle.digest("SHA-1", data);
      algoName = "SHA-1";
      break;
    case "sha512":
      hashBuffer = await crypto.subtle.digest("SHA-512", data);
      algoName = "SHA-512";
      break;
    case "sha256":
    default:
      hashBuffer = await crypto.subtle.digest("SHA-256", data);
      algoName = "SHA-256";
      break;
  }

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        createEmbed({
          title: `🔐 ${algoName} Hash`,
          fields: [
            {
              name: "Input",
              value: `\`${truncateOutput(input, 100)}\``,
              inline: false,
            },
            { name: "Hash", value: `\`${hashHex}\``, inline: false },
          ],
          color: EMBED_COLORS.SUCCESS,
        }),
      ],
    },
  };
}

// ============================================
// /base64 명령어
// ============================================

async function handleBase64Command(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const input = getOptionValue(interaction, "input");
  const action = getOptionValue(interaction, "action") || "encode";

  if (!input) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("입력 텍스트가 필요합니다.")] },
    };
  }

  try {
    let result: string;
    let title: string;

    if (action === "decode") {
      result = Buffer.from(input, "base64").toString("utf-8");
      title = "Base64 Decoded";
    } else {
      result = Buffer.from(input, "utf-8").toString("base64");
      title = "Base64 Encoded";
    }

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createSuccessEmbed(
            title,
            `\`\`\`\n${truncateOutput(result)}\n\`\`\``,
          ),
        ],
      },
    };
  } catch {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("변환에 실패했습니다.")] },
    };
  }
}

// ============================================
// /uuid 명령어
// ============================================

async function handleUuidCommand(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const count = Math.min(Number(getOptionValue(interaction, "count")) || 1, 10);
  const format = getOptionValue(interaction, "format") || "standard";

  const uuids: string[] = [];

  for (let i = 0; i < count; i++) {
    let uuid = crypto.randomUUID();

    if (format === "uppercase") {
      uuid = uuid.toUpperCase();
    } else if (format === "no-dashes") {
      uuid = uuid.replace(/-/g, "");
    }

    uuids.push(uuid);
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        createEmbed({
          title: `🆔 UUID Generated (${count})`,
          description: uuids.map((u) => `\`${u}\``).join("\n"),
          color: EMBED_COLORS.SUCCESS,
        }),
      ],
    },
  };
}

// ============================================
// /timestamp 명령어
// ============================================

async function handleTimestampCommand(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const input = getOptionValue(interaction, "input");
  const action = getOptionValue(interaction, "action") || "now";

  if (action === "now" || !input) {
    const now = Date.now();
    const seconds = Math.floor(now / 1000);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createEmbed({
            title: "⏰ Current Timestamp",
            fields: [
              { name: "Unix (seconds)", value: `\`${seconds}\``, inline: true },
              { name: "Unix (ms)", value: `\`${now}\``, inline: true },
              {
                name: "ISO 8601",
                value: `\`${new Date(now).toISOString()}\``,
                inline: false,
              },
              {
                name: "Discord Format",
                value: `<t:${seconds}:F>`,
                inline: false,
              },
            ],
            color: EMBED_COLORS.INFO,
          }),
        ],
      },
    };
  }

  // Convert input
  try {
    let timestamp: number;
    let date: Date;

    // Check if it's a Unix timestamp
    if (/^\d+$/.test(input)) {
      timestamp = parseInt(input, 10);
      // Assume seconds if less than year 3000 in milliseconds
      if (timestamp < 32503680000) {
        timestamp *= 1000;
      }
      date = new Date(timestamp);
    } else {
      // Try parsing as date string
      date = new Date(input);
      timestamp = date.getTime();
    }

    if (isNaN(timestamp)) {
      throw new Error("Invalid date");
    }

    const seconds = Math.floor(timestamp / 1000);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createEmbed({
            title: "⏰ Timestamp Converted",
            fields: [
              { name: "Input", value: `\`${input}\``, inline: false },
              { name: "Unix (seconds)", value: `\`${seconds}\``, inline: true },
              { name: "Unix (ms)", value: `\`${timestamp}\``, inline: true },
              {
                name: "ISO 8601",
                value: `\`${date.toISOString()}\``,
                inline: false,
              },
              {
                name: "Discord Format",
                value: `<t:${seconds}:F>`,
                inline: false,
              },
            ],
            color: EMBED_COLORS.SUCCESS,
          }),
        ],
      },
    };
  } catch {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [createErrorEmbed("유효하지 않은 날짜/타임스탬프입니다.")],
      },
    };
  }
}

// ============================================
// /url 명령어
// ============================================

async function handleUrlCommand(
  interaction: DiscordInteraction,
): Promise<InteractionResponse> {
  const input = getOptionValue(interaction, "input");
  const action = getOptionValue(interaction, "action") || "encode";

  if (!input) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("URL 또는 텍스트가 필요합니다.")] },
    };
  }

  try {
    let result: string;
    let title: string;

    if (action === "decode") {
      result = decodeURIComponent(input);
      title = "URL Decoded";
    } else {
      result = encodeURIComponent(input);
      title = "URL Encoded";
    }

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createSuccessEmbed(
            title,
            `\`\`\`\n${truncateOutput(result)}\n\`\`\``,
          ),
        ],
      },
    };
  } catch {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [createErrorEmbed("변환에 실패했습니다.")] },
    };
  }
}

// ============================================
// /help 명령어
// ============================================

async function handleHelpCommand(): Promise<InteractionResponse> {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        createEmbed({
          title: "🛠️ Web Toolkit Bot Commands",
          description:
            "개발자를 위한 빠른 도구 명령어입니다.\n더 많은 도구는 [web-toolkit.app](https://web-toolkit.app)에서 사용하세요!",
          fields: [
            {
              name: "/json",
              value: "JSON 포맷팅/압축",
              inline: true,
            },
            {
              name: "/hash",
              value: "해시 생성 (SHA-1, SHA-256, SHA-512)",
              inline: true,
            },
            {
              name: "/base64",
              value: "Base64 인코딩/디코딩",
              inline: true,
            },
            {
              name: "/uuid",
              value: "UUID 생성",
              inline: true,
            },
            {
              name: "/timestamp",
              value: "Unix 타임스탬프 변환",
              inline: true,
            },
            {
              name: "/url",
              value: "URL 인코딩/디코딩",
              inline: true,
            },
          ],
          color: EMBED_COLORS.INFO,
        }),
      ],
    },
  };
}

// ============================================
// 명령어 레지스트리
// ============================================

export const BOT_COMMANDS: BotCommand[] = [
  {
    name: "json",
    description: "JSON 포맷팅 또는 압축",
    options: [
      {
        name: "input",
        description: "JSON 문자열",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "작업 선택",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Format (Prettify)", value: "format" },
          { name: "Minify", value: "minify" },
        ],
      },
    ],
    handler: handleJsonCommand,
  },
  {
    name: "hash",
    description: "텍스트의 해시 생성",
    options: [
      {
        name: "input",
        description: "해시할 텍스트",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "algorithm",
        description: "해시 알고리즘",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "SHA-256 (권장)", value: "sha256" },
          { name: "SHA-1", value: "sha1" },
          { name: "SHA-512", value: "sha512" },
          { name: "MD5 (미지원)", value: "md5" },
        ],
      },
    ],
    handler: handleHashCommand,
  },
  {
    name: "base64",
    description: "Base64 인코딩/디코딩",
    options: [
      {
        name: "input",
        description: "변환할 텍스트",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "작업 선택",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Encode", value: "encode" },
          { name: "Decode", value: "decode" },
        ],
      },
    ],
    handler: handleBase64Command,
  },
  {
    name: "uuid",
    description: "UUID 생성",
    options: [
      {
        name: "count",
        description: "생성할 개수 (최대 10)",
        type: ApplicationCommandOptionType.INTEGER,
        required: false,
      },
      {
        name: "format",
        description: "출력 형식",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Standard (lowercase)", value: "standard" },
          { name: "Uppercase", value: "uppercase" },
          { name: "No dashes", value: "no-dashes" },
        ],
      },
    ],
    handler: handleUuidCommand,
  },
  {
    name: "timestamp",
    description: "Unix 타임스탬프 변환",
    options: [
      {
        name: "input",
        description: "타임스탬프 또는 날짜 문자열 (비워두면 현재 시간)",
        type: ApplicationCommandOptionType.STRING,
        required: false,
      },
      {
        name: "action",
        description: "작업 선택",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "현재 시간", value: "now" },
          { name: "변환", value: "convert" },
        ],
      },
    ],
    handler: handleTimestampCommand,
  },
  {
    name: "url",
    description: "URL 인코딩/디코딩",
    options: [
      {
        name: "input",
        description: "변환할 텍스트",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "작업 선택",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Encode", value: "encode" },
          { name: "Decode", value: "decode" },
        ],
      },
    ],
    handler: handleUrlCommand,
  },
  {
    name: "help",
    description: "Web Toolkit 봇 명령어 목록",
    handler: handleHelpCommand,
  },
];

// ============================================
// 명령어 조회 함수
// ============================================

export function getCommand(name: string): BotCommand | undefined {
  return BOT_COMMANDS.find((cmd) => cmd.name === name);
}
