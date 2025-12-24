/**
 * Slack Slash Commands Webhook Endpoint
 *
 * Slack 봇의 슬래시 명령어를 처리하는 서버리스 엔드포인트
 *
 * 설정 방법:
 * 1. Slack API에서 앱 생성
 * 2. Slash Commands 추가:
 *    - /wt-json, /wt-hash, /wt-base64, /wt-uuid, /wt-timestamp, /wt-url, /wt-help
 *    - Request URL: https://web-toolkit.app/api/slack/commands
 * 3. 환경변수 설정:
 *    - SLACK_SIGNING_SECRET: App Credentials의 Signing Secret
 *    - SLACK_BOT_TOKEN: OAuth & Permissions의 Bot User OAuth Token
 */

import { NextRequest, NextResponse } from "next/server";
import { verifySlackRequestFromHeaders } from "@/lib/slack-bot/verify";
import { getSlackCommand } from "@/lib/slack-bot/commands";
import type { SlackSlashCommand, SlackResponse } from "@/lib/slack-bot/types";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 요청 본문 읽기 (URL-encoded form data)
    const body = await request.text();

    // Slack 서명 검증
    const isValid = await verifySlackRequestFromHeaders(request.headers, body);

    if (!isValid) {
      console.error("Slack signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // URL-encoded form data 파싱
    const params = new URLSearchParams(body);
    const command: SlackSlashCommand = {
      token: params.get("token") || "",
      team_id: params.get("team_id") || "",
      team_domain: params.get("team_domain") || "",
      channel_id: params.get("channel_id") || "",
      channel_name: params.get("channel_name") || "",
      user_id: params.get("user_id") || "",
      user_name: params.get("user_name") || "",
      command: params.get("command") || "",
      text: params.get("text") || "",
      api_app_id: params.get("api_app_id") || "",
      is_enterprise_install: params.get("is_enterprise_install") || "false",
      response_url: params.get("response_url") || "",
      trigger_id: params.get("trigger_id") || "",
    };

    // 명령어 핸들러 찾기
    const handler = getSlackCommand(command.command);

    if (!handler) {
      const errorResponse: SlackResponse = {
        response_type: "ephemeral",
        text: `❌ Unknown command: \`${command.command}\`\n\nUse \`/wt-help\` to see available commands.`,
      };
      return NextResponse.json(errorResponse);
    }

    // 명령어 실행
    const response = await handler.handler(command);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Slack command error:", error);

    const errorResponse: SlackResponse = {
      response_type: "ephemeral",
      text: "❌ An error occurred while processing the command.",
    };

    return NextResponse.json(errorResponse);
  }
}
