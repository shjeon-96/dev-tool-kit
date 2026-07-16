"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CEO_TRAITS,
  getActionCard,
  getIncident,
} from "@/shared/lib/company-survival/rules";
import {
  COMPANY_PROFILES,
  getCompanyProfile,
} from "@/entities/company-scenario/data/profiles";
import {
  LOCALE_LABELS,
  LOCALES,
  localizedPath,
  type Locale,
} from "@/shared/config/site";
import {
  calculateCompanyScore,
  createInitialGameState,
  getTurnHand,
  playActionCard,
  selectCeoTrait,
} from "@/shared/lib/company-survival/game";
import { isAnonymousId } from "@/shared/lib/company-survival/identity";
import {
  clearStoredRun,
  deriveCareerStats,
  readCompanyArchive,
  readOrCreatePlayerId,
  readOrCreateReferralId,
  readStoredProfile,
  readStoredRun,
  recordCompletedRun,
  writeStoredProfile,
  writeStoredRun,
} from "@/shared/lib/company-survival/storage";
import { recordCompanyActivity, trackGameEvent } from "@/shared/lib/analytics";
import type {
  CeoTrait,
  CompanyCareerStats,
  CompanyGameState,
  CompanyIndustry,
  CompanyMetric,
  Department,
} from "@/shared/types/company-survival";
import { COMPANY_COPY } from "./copy";
import { GameOverAd } from "./game-over-ad";
import { createResultCardSvg, saveResultCard } from "./share-card";

const METRICS: readonly CompanyMetric[] = [
  "cash",
  "morale",
  "trust",
  "momentum",
];
const DEPARTMENTS: readonly Department[] = [
  "engineering",
  "design",
  "sales",
  "operations",
];
const SPRITES: Record<Department, string> = {
  engineering: "/game/engineer-sheet-v1.png",
  design: "/game/designer-sheet-v1.png",
  sales: "/game/sales-sheet-v1.png",
  operations: "/game/operator-sheet-v1.png",
};
const EMPTY_CAREER: CompanyCareerStats = {
  daysPlayed: 0,
  daysSurvived: 0,
  currentStreak: 0,
  bestStreak: 0,
  bestScore: 0,
};
const UI = {
  ko: {
    title: "망하기 전에, 회사를 만들어라.",
    deck: "매달 세 장의 액션 중 하나를 실행하세요. 팀을 배치하고, 연쇄 효과를 만들고, 6개월 뒤 데모데이에 도달하세요.",
    choose: "회사와 CEO 성향 선택",
    start: "첫 달 시작",
    resume: "워룸 복귀",
    month: "MONTH",
    hand: "이번 달 액션",
    burn: "기본 고정비 -10",
    incident: "긴급 속보",
    next: "다음 달",
    synergy: "부서 연쇄 +5 성장",
    trait: "CEO 보너스 적용",
    final: "데모데이 결과",
    retry: "같은 시드 재도전",
    change: "새 회사 선택",
    score: "기업가치",
    locked: "완주 기록으로 해금",
    unlock1: "1회 플레이",
    unlock2: "2회 플레이",
    select: "선택",
    project: "부서 레벨",
    noUndo: "카드를 실행하면 이번 달은 되돌릴 수 없습니다.",
  },
  en: {
    title: "Build the company before it breaks.",
    deck: "Play one of three actions each month. Staff the office, chain departments, and reach Demo Day after six months.",
    choose: "Choose company and CEO trait",
    start: "Start month one",
    resume: "Return to war room",
    month: "MONTH",
    hand: "THIS MONTH'S ACTIONS",
    burn: "BASE BURN -10",
    incident: "BREAKING",
    next: "Next month",
    synergy: "Department chain: +5 growth",
    trait: "CEO bonus applied",
    final: "DEMO DAY RESULT",
    retry: "Retry same seed",
    change: "Choose new company",
    score: "COMPANY VALUE",
    locked: "Unlock with completed runs",
    unlock1: "1 completed run",
    unlock2: "2 completed runs",
    select: "SELECT",
    project: "DEPARTMENT LEVEL",
    noUndo: "Playing a card commits the month.",
  },
  ja: {
    title: "壊れる前に、会社を作れ。",
    deck: "毎月3枚から1枚を実行。チームを配置し、連鎖を作り、6か月後のデモデイを目指す。",
    choose: "会社とCEO特性を選択",
    start: "1か月目を開始",
    resume: "作戦室へ戻る",
    month: "MONTH",
    hand: "今月のアクション",
    burn: "固定費 -10",
    incident: "緊急速報",
    next: "次の月",
    synergy: "部門連鎖：成長 +5",
    trait: "CEOボーナス適用",
    final: "デモデイ結果",
    retry: "同じシードで再挑戦",
    change: "会社を変更",
    score: "企業価値",
    locked: "完走記録で解除",
    unlock1: "1回完走",
    unlock2: "2回完走",
    select: "選択",
    project: "部門レベル",
    noUndo: "カード実行後は今月を戻せません。",
  },
} as const;

function beep(muted: boolean, success = false) {
  if (muted) return;
  const AudioContextClass = window.AudioContext;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = success ? "triangle" : "square";
  oscillator.frequency.setValueAtTime(success ? 520 : 180, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    success ? 780 : 120,
    context.currentTime + 0.12,
  );
  gain.gain.setValueAtTime(0.05, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.14);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.15);
}

export function CompanySurvivalGame({
  locale,
  date,
  challengeNumber,
}: {
  locale: Locale;
  date: string;
  challengeNumber: number;
}) {
  const ui = UI[locale];
  const copy = COMPANY_COPY[locale];
  const [industry, setIndustry] = useState<CompanyIndustry>("saas");
  const [game, setGame] = useState(() => createInitialGameState(date, "saas"));
  const [career, setCareer] = useState(EMPTY_CAREER);
  const [playerId, setPlayerId] = useState("");
  const [started, setStarted] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rank, setRank] = useState<string>("");
  const [incomingReferralId, setIncomingReferralId] = useState<string>();
  const hand = useMemo(
    () =>
      game.status === "playing" ? getTurnHand(date, industry, game.turn) : [],
    [date, game.status, game.turn, industry],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const profile = readStoredProfile(localStorage);
      const activeIndustry = profile.kind === "valid" ? profile.value : "saas";
      const archive = readCompanyArchive(localStorage);
      const stats =
        archive.kind === "valid"
          ? deriveCareerStats(archive.value, date)
          : EMPTY_CAREER;
      const stored = readStoredRun(localStorage, date, activeIndustry);
      const id = readOrCreatePlayerId(localStorage);
      setPlayerId(id);
      setCareer(stats);
      setIndustry(activeIndustry);
      const referral = new URLSearchParams(location.search).get("ref");
      if (isAnonymousId(referral)) {
        setIncomingReferralId(referral);
        void recordCompanyActivity({
          event: "referral_landed",
          date,
          playerId: id,
          referralId: referral,
        });
      }
      if (stored.kind === "valid") {
        setGame(stored.value);
        setStarted(stored.value.turn > 0);
        setShowReport(Boolean(stored.value.lastReport));
      }
      trackGameEvent("session_started", { locale });
      void recordCompanyActivity({
        event: "session_started",
        date,
        playerId: id,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [date, locale]);

  useEffect(() => {
    if (game.status === "playing" || !showReport || !playerId || rank) return;
    void fetch("/api/company-survival/results", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        date,
        industry,
        trait: game.trait,
        history: game.history,
        playerId,
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<{
          percentile: number;
          total: number;
        }>;
      })
      .then((result) => {
        setRank(
          `${copy.topPercent} ${Math.max(1, 101 - result.percentile)}% · ${result.total} ${copy.players}`,
        );
        trackGameEvent("game_completed", {
          industry,
          status: game.status,
          score: calculateCompanyScore(game),
          turns: game.turn,
        });
      })
      .catch(() => setRank(copy.rankError));
  }, [
    copy.players,
    copy.rankError,
    copy.topPercent,
    date,
    game,
    industry,
    playerId,
    rank,
    showReport,
  ]);

  const chooseIndustry = (value: CompanyIndustry) => {
    setIndustry(value);
    writeStoredProfile(localStorage, value);
    const stored = readStoredRun(localStorage, date, value);
    setGame(
      stored.kind === "valid"
        ? stored.value
        : createInitialGameState(date, value),
    );
    setShowReport(stored.kind === "valid" && Boolean(stored.value.lastReport));
  };
  const chooseTrait = (trait: CeoTrait) => {
    setGame((state) => selectCeoTrait(state, trait));
  };
  const start = () => {
    setStarted(true);
    trackGameEvent("game_started", {
      challenge: challengeNumber,
      industry,
      trait: game.trait,
    });
    if (playerId)
      void recordCompanyActivity({
        event: "game_started",
        date,
        playerId,
        industry,
        targetTurns: 6,
        referralId: incomingReferralId,
      });
  };
  const play = (cardId: string) => {
    const next = playActionCard(game, cardId);
    writeStoredRun(localStorage, next);
    if (next.status !== "playing") {
      const archive = recordCompletedRun(localStorage, next);
      setCareer(deriveCareerStats(archive, date));
    }
    setGame(next);
    setShowReport(true);
    beep(muted, next.status === "survived");
    trackGameEvent("choice_made", {
      card: cardId,
      turn: next.turn,
      trait: next.trait,
    });
  };
  const next = () => setShowReport(false);
  const retry = () => {
    clearStoredRun(localStorage, date, industry);
    setGame(createInitialGameState(date, industry, game.trait));
    setShowReport(false);
    setRank("");
    beep(muted);
  };
  const canUseTrait = (trait: CeoTrait) =>
    trait === "builder" || career.daysPlayed >= (trait === "rainmaker" ? 1 : 2);

  return (
    <main id="main-content" className="company-game roguelike-game">
      <header className="company-topbar">
        <Link className="company-brand" href={localizedPath(locale)}>
          <span>R10</span>
          <strong>RUNWAY 10</strong>
        </Link>
        <div className="company-seed">
          <span>DAILY SEED</span>
          <strong>
            #{challengeNumber} · {date} · {getCompanyProfile(industry).code}
          </strong>
        </div>
        <nav className="company-locales" aria-label="Language">
          {LOCALES.map((item) => (
            <Link
              key={item}
              href={localizedPath(item)}
              aria-current={item === locale ? "page" : undefined}
            >
              {LOCALE_LABELS[item]}
            </Link>
          ))}
          <button
            type="button"
            className="sound-toggle"
            onClick={() => setMuted((value) => !value)}
            aria-label="Sound"
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
        </nav>
      </header>

      {!started ? (
        <section className="game-lobby">
          <div className="lobby-hero">
            <p className="company-kicker">
              MANAGEMENT ROGUELIKE / DAILY #{challengeNumber}
            </p>
            <h1>{ui.title}</h1>
            <p>{ui.deck}</p>
            <button
              className="company-primary-action"
              type="button"
              onClick={start}
            >
              {game.turn ? ui.resume : ui.start}
              <ArrowRight />
            </button>
          </div>
          <div className="lobby-office" aria-hidden="true">
            <Image
              src="/game/office-board-v1.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1050px) 100vw, 58vw"
            />
          </div>
          <div className="lobby-controls">
            <h2>{ui.choose}</h2>
            <div className="profile-strip">
              {COMPANY_PROFILES.map((profile) => (
                <button
                  type="button"
                  key={profile.id}
                  aria-pressed={industry === profile.id}
                  onClick={() => chooseIndustry(profile.id)}
                >
                  <b>{profile.code}</b>
                  <span>{profile.label[locale]}</span>
                </button>
              ))}
            </div>
            <div className="trait-strip">
              {CEO_TRAITS.map((trait, index) => {
                const open = canUseTrait(trait.id);
                return (
                  <button
                    type="button"
                    key={trait.id}
                    disabled={!open}
                    aria-pressed={game.trait === trait.id}
                    onClick={() => chooseTrait(trait.id)}
                  >
                    {!open && <LockKeyhole />}
                    <b>{trait.title[locale]}</b>
                    <span>
                      {open
                        ? trait.detail[locale]
                        : `${ui.locked} · ${index === 1 ? ui.unlock1 : ui.unlock2}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : game.status !== "playing" && showReport ? (
        <FinalScreen
          game={game}
          locale={locale}
          challengeNumber={challengeNumber}
          rank={rank}
          playerId={playerId}
          streak={career.currentStreak}
          onRetry={retry}
          onChange={() => {
            setStarted(false);
            setShowReport(false);
          }}
        />
      ) : (
        <section className="war-room">
          <div className="war-hud">
            <div>
              <span>{ui.month}</span>
              <strong>
                {Math.min(game.turn + (showReport ? 0 : 1), 6)} / 6
              </strong>
            </div>
            <div className="hud-track">
              <i style={{ width: `${(game.turn / 6) * 100}%` }} />
            </div>
            <MetricPanel locale={locale} game={game} />
          </div>
          <OfficeBoard
            game={game}
            active={showReport ? game.lastReport?.cardId : undefined}
            locale={locale}
          />
          {showReport && game.lastReport ? (
            <TurnReport game={game} locale={locale} onNext={next} />
          ) : (
            <div className="action-dock">
              <header>
                <div>
                  <span>{ui.hand}</span>
                  <small>{ui.burn}</small>
                </div>
                <p>{ui.noUndo}</p>
              </header>
              <div className="card-hand">
                {hand.map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    className={`action-card dept-${card.department}`}
                    onClick={() => play(card.id)}
                  >
                    <span>{card.department}</span>
                    <h2>{card.title[locale]}</h2>
                    <p>{card.detail[locale]}</p>
                    <dl>
                      <div>
                        <dt>COST</dt>
                        <dd>{-10 - card.cost}</dd>
                      </div>
                      {Object.entries(card.effects).map(([metric, value]) => (
                        <div key={metric}>
                          <dt>{copy.effectLabels[metric as CompanyMetric]}</dt>
                          <dd className={(value ?? 0) > 0 ? "up" : "down"}>
                            {(value ?? 0) > 0 ? "+" : ""}
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <b className="play-label">
                      {ui.select}
                      <ArrowRight />
                    </b>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function OfficeBoard({
  game,
  active,
  locale,
}: {
  game: CompanyGameState;
  active?: string;
  locale: Locale;
}) {
  const ui = UI[locale];
  const activeDepartment = active
    ? getActionCard(active).department
    : undefined;
  return (
    <section className="office-board" aria-label="Office board">
      <Image
        className="office-bg"
        src="/game/office-board-v1.png"
        alt="Late-night startup office"
        fill
        priority
        sizes="(max-width: 1050px) 100vw, 70vw"
      />
      {DEPARTMENTS.map((department) => (
        <div
          key={department}
          className={`office-unit unit-${department} ${activeDepartment === department ? "is-working" : ""}`}
        >
          <div
            className="sprite"
            style={{ backgroundImage: `url(${SPRITES[department]})` }}
          />
          <span>
            {department}
            <b>LV.{game.departments[department]}</b>
          </span>
          {game.departments[department] > 1 && (
            <i>
              <Zap />
              {ui.project} {game.departments[department]}
            </i>
          )}
        </div>
      ))}
    </section>
  );
}

function TurnReport({
  game,
  locale,
  onNext,
}: {
  game: CompanyGameState;
  locale: Locale;
  onNext: () => void;
}) {
  const ui = UI[locale];
  const report = game.lastReport!;
  const card = getActionCard(report.cardId);
  const incident = getIncident(report.incidentId);
  return (
    <aside className="turn-report">
      <p className="report-kicker">{ui.incident}</p>
      <h2>{incident.title[locale]}</h2>
      <p>{incident.body[locale]}</p>
      <div className="report-divider" />
      <strong>{card.title[locale]}</strong>
      <div className="report-effects">
        {Object.entries(report.effects)
          .filter(([, value]) => value)
          .map(([metric, value]) => (
            <span key={metric} className={value > 0 ? "up" : "down"}>
              {COMPANY_COPY[locale].effectLabels[metric as CompanyMetric]}{" "}
              {value > 0 ? "+" : ""}
              {value}
            </span>
          ))}
      </div>
      {report.synergy && (
        <p className="synergy">
          <Zap />
          {ui.synergy}
        </p>
      )}
      <button type="button" onClick={onNext}>
        {ui.next}
        <ArrowRight />
      </button>
    </aside>
  );
}

function MetricPanel({
  locale,
  game,
}: {
  locale: Locale;
  game: CompanyGameState;
}) {
  const copy = COMPANY_COPY[locale];
  return (
    <div className="hud-metrics">
      {METRICS.map((metric) => (
        <div
          key={metric}
          className={game.metrics[metric] <= 20 ? "critical" : ""}
        >
          <span>{copy.metrics[metric]}</span>
          <strong>{game.metrics[metric]}</strong>
          <i>
            <b style={{ width: `${game.metrics[metric]}%` }} />
          </i>
        </div>
      ))}
    </div>
  );
}

function FinalScreen({
  game,
  locale,
  challengeNumber,
  rank,
  playerId,
  streak,
  onRetry,
  onChange,
}: {
  game: CompanyGameState;
  locale: Locale;
  challengeNumber: number;
  rank: string;
  playerId: string;
  streak: number;
  onRetry: () => void;
  onChange: () => void;
}) {
  const copy = COMPANY_COPY[locale];
  const ui = UI[locale];
  const state =
    copy.status[game.status === "playing" ? "survived" : game.status];
  const share = async () => {
    const referralId = readOrCreateReferralId(localStorage);
    const url = new URL(localizedPath(locale), location.origin);
    url.searchParams.set("ref", referralId);
    url.searchParams.set("utm_source", "share");
    url.searchParams.set("utm_medium", "web_share");
    trackGameEvent("share_opened", {
      industry: game.industry,
      score: calculateCompanyScore(game),
    });
    await recordCompanyActivity({
      event: "share_opened",
      date: game.date,
      playerId,
      referralId,
    });
    await navigator.share({
      title: `RUNWAY 10 #${challengeNumber}`,
      text: `${state.title} · ${calculateCompanyScore(game)}`,
      url: url.toString(),
    });
    trackGameEvent("share_sheet_completed", { industry: game.industry });
    await recordCompanyActivity({
      event: "share_sheet_completed",
      date: game.date,
      playerId,
      referralId,
    });
  };
  const save = async () => {
    await saveResultCard(
      createResultCardSvg({ locale, challengeNumber, game, streak }),
      challengeNumber,
    );
    trackGameEvent("card_downloaded", {
      industry: game.industry,
      score: calculateCompanyScore(game),
    });
  };
  return (
    <section className={`rogue-final is-${game.status}`}>
      <p className="company-kicker">
        {ui.final} / #{challengeNumber}
      </p>
      <h1>{state.title}</h1>
      <p>{state.body}</p>
      <div className="final-score">
        <span>{ui.score}</span>
        <strong>{calculateCompanyScore(game)}</strong>
      </div>
      <MetricPanel locale={locale} game={game} />
      <p className="rank-line">{rank || copy.rankLoading}</p>
      <div className="final-actions">
        <button type="button" onClick={onRetry}>
          <RotateCcw />
          {ui.retry}
        </button>
        {typeof navigator !== "undefined" &&
          typeof navigator.share === "function" && (
            <button type="button" onClick={() => void share()}>
              <Share2 />
              {copy.shareResult}
            </button>
          )}
        <button type="button" onClick={() => void save()}>
          {copy.saveCard}
        </button>
        <button type="button" onClick={onChange}>
          {ui.change}
        </button>
      </div>
      <GameOverAd locale={locale} />
    </section>
  );
}
