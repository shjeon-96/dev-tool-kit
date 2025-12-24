/**
 * Discord 슬래시 명령어 등록 스크립트
 *
 * 사용법:
 * 1. 환경변수 설정:
 *    - DISCORD_APPLICATION_ID
 *    - DISCORD_BOT_TOKEN
 *
 * 2. 실행:
 *    npx tsx scripts/register-discord-commands.ts
 *
 * 참고: 글로벌 명령어는 등록 후 최대 1시간까지 반영될 수 있습니다.
 *      테스트용으로는 길드(서버) 명령어 사용을 권장합니다.
 */

import { ApplicationCommandOptionType } from "../src/lib/discord-bot/types";

const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID; // 선택적: 특정 서버에만 등록

if (!DISCORD_APPLICATION_ID || !DISCORD_BOT_TOKEN) {
  console.error("❌ Missing required environment variables:");
  console.error("   - DISCORD_APPLICATION_ID");
  console.error("   - DISCORD_BOT_TOKEN");
  process.exit(1);
}

// 등록할 슬래시 명령어 정의
const commands = [
  {
    name: "json",
    description: "Format or minify JSON data",
    options: [
      {
        name: "input",
        description: "JSON string to process",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "Action to perform",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Format (Pretty Print)", value: "format" },
          { name: "Minify", value: "minify" },
        ],
      },
    ],
  },
  {
    name: "hash",
    description: "Generate hash from text",
    options: [
      {
        name: "text",
        description: "Text to hash",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "algorithm",
        description: "Hash algorithm to use",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "SHA-256 (default)", value: "sha256" },
          { name: "SHA-1", value: "sha1" },
          { name: "SHA-512", value: "sha512" },
        ],
      },
    ],
  },
  {
    name: "base64",
    description: "Encode or decode Base64",
    options: [
      {
        name: "input",
        description: "Text or Base64 string",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "Action to perform",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Encode (default)", value: "encode" },
          { name: "Decode", value: "decode" },
        ],
      },
    ],
  },
  {
    name: "uuid",
    description: "Generate UUID(s)",
    options: [
      {
        name: "count",
        description: "Number of UUIDs to generate (1-10)",
        type: ApplicationCommandOptionType.INTEGER,
        required: false,
        min_value: 1,
        max_value: 10,
      },
    ],
  },
  {
    name: "timestamp",
    description: "Convert or display Unix timestamp",
    options: [
      {
        name: "input",
        description:
          "Unix timestamp (seconds or milliseconds) or 'now' for current time",
        type: ApplicationCommandOptionType.STRING,
        required: false,
      },
    ],
  },
  {
    name: "url",
    description: "Encode or decode URL",
    options: [
      {
        name: "input",
        description: "URL or text to process",
        type: ApplicationCommandOptionType.STRING,
        required: true,
      },
      {
        name: "action",
        description: "Action to perform",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: "Encode (default)", value: "encode" },
          { name: "Decode", value: "decode" },
        ],
      },
    ],
  },
  {
    name: "help",
    description: "Show all available Web Toolkit commands",
  },
];

async function registerCommands() {
  // API 엔드포인트 결정 (길드 명령어 vs 글로벌 명령어)
  const url = DISCORD_GUILD_ID
    ? `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/guilds/${DISCORD_GUILD_ID}/commands`
    : `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`;

  console.log("🚀 Registering Discord slash commands...");
  console.log(
    `   Target: ${DISCORD_GUILD_ID ? `Guild ${DISCORD_GUILD_ID}` : "Global"}`,
  );
  console.log(`   Commands: ${commands.length}`);
  console.log();

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Failed to register commands:");
      console.error(JSON.stringify(error, null, 2));
      process.exit(1);
    }

    const registeredCommands = await response.json();
    console.log("✅ Commands registered successfully!\n");

    for (const cmd of registeredCommands) {
      console.log(`   /${cmd.name} - ${cmd.description}`);
    }

    console.log();
    if (!DISCORD_GUILD_ID) {
      console.log("ℹ️  Note: Global commands may take up to 1 hour to appear.");
      console.log(
        "   For instant testing, set DISCORD_GUILD_ID to register to a specific server.",
      );
    }
  } catch (error) {
    console.error("❌ Error registering commands:", error);
    process.exit(1);
  }
}

registerCommands();
