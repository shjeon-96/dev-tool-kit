/**
 * Discord Interactions API Webhook Endpoint
 *
 * Discord 봇의 슬래시 명령어를 처리하는 서버리스 엔드포인트
 *
 * 설정 방법:
 * 1. Discord Developer Portal에서 애플리케이션 생성
 * 2. Bot 탭에서 봇 추가
 * 3. 환경변수 설정:
 *    - DISCORD_PUBLIC_KEY: 애플리케이션의 Public Key
 *    - DISCORD_APPLICATION_ID: 애플리케이션 ID
 *    - DISCORD_BOT_TOKEN: 봇 토큰
 * 4. Interactions Endpoint URL에 이 엔드포인트 URL 등록
 *    https://web-toolkit.app/api/discord/interactions
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyDiscordRequestFromHeaders } from "@/lib/discord-bot/verify";
import { getCommand } from "@/lib/discord-bot/commands";
import {
  InteractionType,
  InteractionResponseType,
  type DiscordInteraction,
  type InteractionResponse,
} from "@/lib/discord-bot/types";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 요청 본문 읽기
    const body = await request.text();

    // Discord 서명 검증
    const isValid = await verifyDiscordRequestFromHeaders(
      request.headers,
      body,
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // JSON 파싱
    const interaction: DiscordInteraction = JSON.parse(body);

    // PING 요청 처리 (Discord 엔드포인트 검증)
    if (interaction.type === InteractionType.PING) {
      return NextResponse.json({ type: InteractionResponseType.PONG });
    }

    // 애플리케이션 명령어 처리
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const commandName = interaction.data?.name;

      if (!commandName) {
        return NextResponse.json({ error: "Invalid command" }, { status: 400 });
      }

      // 명령어 핸들러 찾기
      const command = getCommand(commandName);

      if (!command) {
        const errorResponse: InteractionResponse = {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `❌ Unknown command: \`/${commandName}\``,
            flags: 64, // Ephemeral (본인만 볼 수 있음)
          },
        };
        return NextResponse.json(errorResponse);
      }

      // 명령어 실행
      const response = await command.handler(interaction);
      return NextResponse.json(response);
    }

    // 기타 인터랙션 타입 (버튼 클릭 등) - 현재는 미지원
    return NextResponse.json(
      { error: "Unsupported interaction type" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Discord interaction error:", error);

    // 에러 응답
    const errorResponse: InteractionResponse = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "❌ An error occurred while processing the command.",
        flags: 64,
      },
    };

    return NextResponse.json(errorResponse);
  }
}

// Discord는 OPTIONS 요청을 보내지 않지만, CORS를 위해 추가
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
