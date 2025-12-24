/**
 * 주간 트렌드 리포트 생성 Cron API
 *
 * Vercel Cron 또는 외부 스케줄러에서 호출
 * 매주 일요일 자정(UTC)에 실행 권장
 *
 * vercel.json 설정 예시:
 * {
 *   "crons": [{
 *     "path": "/api/cron/trends",
 *     "schedule": "0 0 * * 0"
 *   }]
 * }
 */

import { NextResponse } from "next/server";
import {
  generateWeeklyTrendReport,
  saveTrendReport,
  getWeekString,
  reportExists,
  cleanupOldReports,
} from "@/shared/lib/data-pipeline";

// Cron 인증 시크릿 (환경 변수)
const CRON_SECRET = process.env.CRON_SECRET;

export const runtime = "nodejs";
export const maxDuration = 60; // 최대 60초 (Vercel Pro 기준)

export async function GET(request: Request) {
  // 인증 검증
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    console.error("[Cron] 인증 실패");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const week = getWeekString();

  console.log(`[Cron] 트렌드 리포트 생성 시작: ${week}`);

  try {
    // 이미 해당 주차 리포트가 있는지 확인
    const exists = await reportExists(week);
    if (exists) {
      console.log(`[Cron] ${week} 리포트 이미 존재, 스킵`);
      return NextResponse.json({
        success: true,
        message: "Report already exists",
        week,
        skipped: true,
      });
    }

    // 리포트 생성
    const report = await generateWeeklyTrendReport();

    // 저장
    await saveTrendReport(report);

    // 오래된 리포트 정리 (52주 이상)
    const deletedCount = await cleanupOldReports(52);

    const duration = Date.now() - startTime;

    console.log(`[Cron] 완료: ${duration}ms`);

    return NextResponse.json({
      success: true,
      week: report.week,
      stats: {
        githubRepos: report.githubTrending.overall.length,
        developerTools: report.githubTrending.developerTools.length,
        redditPosts: report.redditDiscussions.topPosts.length,
        emergingTopics: report.redditDiscussions.emergingTopics.length,
        cleanedUp: deletedCount,
      },
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Cron] 에러:", error);

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        week,
        duration: `${duration}ms`,
      },
      { status: 500 },
    );
  }
}

// POST도 지원 (수동 트리거용)
export async function POST(request: Request) {
  return GET(request);
}
