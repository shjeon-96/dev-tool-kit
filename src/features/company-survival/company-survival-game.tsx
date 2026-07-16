"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ImageDown,
  RotateCcw,
  Share2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  COMPANY_SCENARIOS,
  getScenario,
} from "@/entities/company-scenario/data/scenarios";
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
  RUN_LENGTH_POLICY,
  applyDecision,
  calculateCompanyScore,
  createDailyScenarioOrder,
  createInitialGameState,
  getRunLength,
} from "@/shared/lib/company-survival/game";
import {
  clearStoredRunsForDate,
  clearCompanyArchive,
  clearStoredProfile,
  clearStoredRun,
  createEmptyArchive,
  deriveCareerStats,
  readCompanyArchive,
  readOrCreatePlayerId,
  readOrCreateReferralId,
  readStoredProfile,
  readStoredRun,
  recordCompletedRun,
  writeStoredRun,
  writeStoredProfile,
} from "@/shared/lib/company-survival/storage";
import { isAnonymousId } from "@/shared/lib/company-survival/identity";
import { recordCompanyActivity, trackGameEvent } from "@/shared/lib/analytics";
import type {
  CompanyCareerStats,
  CompanyGameState,
  CompanyIndustry,
  CompanyMetric,
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

interface Resolution {
  scenarioId: string;
  choiceId: string;
}

type LeaderboardState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; percentile: number; total: number };

const EMPTY_CAREER: CompanyCareerStats = {
  daysPlayed: 0,
  daysSurvived: 0,
  currentStreak: 0,
  bestStreak: 0,
  bestScore: 0,
};
const DEFAULT_INDUSTRY: CompanyIndustry = "saas";

function reportActivity(activity: Parameters<typeof recordCompanyActivity>[0]) {
  void recordCompanyActivity(activity).catch((error: unknown) => {
    console.error("RUNWAY 10 activity tracking failed", error);
  });
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
  const copy = COMPANY_COPY[locale];
  const [playerId, setPlayerId] = useState("");
  const [incomingReferralId, setIncomingReferralId] = useState<string>();
  const [canShare, setCanShare] = useState(false);
  const [industry, setIndustry] = useState<CompanyIndustry>(DEFAULT_INDUSTRY);
  const [game, setGame] = useState<CompanyGameState>(() =>
    createInitialGameState(
      date,
      DEFAULT_INDUSTRY,
      RUN_LENGTH_POLICY.variants[1],
    ),
  );
  const scenarioOrder = useMemo(
    () =>
      createDailyScenarioOrder(
        date,
        industry,
        COMPANY_SCENARIOS,
        game.targetTurns,
      ),
    [date, game.targetTurns, industry],
  );
  const [started, setStarted] = useState(false);
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [showFinal, setShowFinal] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [career, setCareer] = useState<CompanyCareerStats>(EMPTY_CAREER);
  const [leaderboard, setLeaderboard] = useState<LeaderboardState>({
    kind: "idle",
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedProfile = readStoredProfile(window.localStorage);
      const savedArchive = readCompanyArchive(window.localStorage);
      if (savedProfile.kind === "invalid" || savedArchive.kind === "invalid") {
        setStorageError(true);
        return;
      }
      const activeIndustry =
        savedProfile.kind === "valid" ? savedProfile.value : DEFAULT_INDUSTRY;
      const activePlayerId = readOrCreatePlayerId(window.localStorage);
      const targetTurns = getRunLength(activePlayerId);
      const savedRun = readStoredRun(
        window.localStorage,
        date,
        activeIndustry,
        targetTurns,
      );
      if (savedRun.kind === "invalid") {
        setStorageError(true);
        return;
      }
      const archive =
        savedArchive.kind === "valid"
          ? savedArchive.value
          : createEmptyArchive();
      setCareer(deriveCareerStats(archive, date));
      setPlayerId(activePlayerId);
      setIndustry(activeIndustry);
      setCanShare(typeof navigator.share === "function");
      const ref = new URLSearchParams(window.location.search).get("ref");
      const validRef = isAnonymousId(ref) ? ref : undefined;
      setIncomingReferralId(validRef);
      trackGameEvent("session_started", { locale });
      reportActivity({
        event: "session_started",
        date,
        playerId: activePlayerId,
      });
      if (validRef) {
        trackGameEvent("referral_landed", { referral: validRef });
        reportActivity({
          event: "referral_landed",
          date,
          playerId: activePlayerId,
          referralId: validRef,
        });
      }

      if (savedRun.kind === "valid") {
        setGame(savedRun.value);
        setStarted(savedRun.value.turn > 0);
        setShowFinal(savedRun.value.status !== "playing");
      } else {
        setGame(createInitialGameState(date, activeIndustry, targetTurns));
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [date, locale]);

  useEffect(() => {
    if (
      !showFinal ||
      game.status === "playing" ||
      leaderboard.kind !== "idle"
    ) {
      return;
    }
    const submit = async () => {
      setLeaderboard({ kind: "loading" });
      try {
        const response = await fetch("/api/company-survival/results", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            date: game.date,
            industry: game.industry,
            history: game.history,
            playerId: readOrCreatePlayerId(window.localStorage),
          }),
        });
        if (!response.ok)
          throw new Error(`Leaderboard returned ${response.status}`);
        const result = (await response.json()) as {
          percentile: number;
          total: number;
        };
        setLeaderboard({ kind: "ready", ...result });
        trackGameEvent("game_completed", {
          industry: game.industry,
          status: game.status,
          score: calculateCompanyScore(game),
          turns: game.turn,
          variant: game.targetTurns,
        });
      } catch {
        setLeaderboard({ kind: "error" });
      }
    };
    void submit();
  }, [game, leaderboard.kind, showFinal]);

  const selectIndustry = (nextIndustry: CompanyIndustry) => {
    const stored = readStoredRun(
      window.localStorage,
      date,
      nextIndustry,
      game.targetTurns,
    );
    if (stored.kind === "invalid") {
      setStorageError(true);
      return;
    }
    writeStoredProfile(window.localStorage, nextIndustry);
    trackGameEvent("profile_selected", { industry: nextIndustry });
    setIndustry(nextIndustry);
    setGame(
      stored.kind === "valid"
        ? stored.value
        : createInitialGameState(date, nextIndustry, game.targetTurns),
    );
    setShowFinal(stored.kind === "valid" && stored.value.status !== "playing");
    setResolution(null);
    setCopyStatus("");
    setLeaderboard({ kind: "idle" });
  };

  const startGame = () => {
    if (!playerId) return;
    writeStoredProfile(window.localStorage, industry);
    setShowFinal(game.status !== "playing");
    setStarted(true);
    trackGameEvent("game_started", {
      challenge: challengeNumber,
      industry,
      resumed: game.turn > 0,
      variant: game.targetTurns,
    });
    reportActivity({
      event: "game_started",
      date,
      playerId,
      industry,
      targetTurns: game.targetTurns,
      referralId: incomingReferralId,
    });
  };

  const scenario =
    game.turn < game.targetTurns ? getScenario(scenarioOrder[game.turn]) : null;
  const resolvedScenario = resolution
    ? getScenario(resolution.scenarioId)
    : null;
  const resolvedChoice = resolvedScenario?.choices.find(
    (choice) => choice.id === resolution?.choiceId,
  );

  const decide = (choiceId: string) => {
    if (!scenario || resolution || game.status !== "playing") return;
    const next = applyDecision(game, scenario, choiceId);
    try {
      writeStoredRun(window.localStorage, next);
      if (next.status !== "playing") {
        const archive = recordCompletedRun(window.localStorage, next);
        setCareer(deriveCareerStats(archive, date));
      }
    } catch {
      setStorageError(true);
      return;
    }
    setGame(next);
    setResolution({ scenarioId: scenario.id, choiceId });
    trackGameEvent("choice_made", {
      industry,
      turn: next.turn,
      scenario: scenario.id,
      choice: choiceId,
    });
  };

  const advance = () => {
    if (game.status === "playing") {
      setResolution(null);
      return;
    }
    setResolution(null);
    setShowFinal(true);
  };

  const restart = () => {
    const fresh = createInitialGameState(date, industry, game.targetTurns);
    clearStoredRun(window.localStorage, date, industry);
    setGame(fresh);
    setResolution(null);
    setShowFinal(false);
    setStarted(true);
    setCopyStatus("");
    setLeaderboard({ kind: "idle" });
  };

  const clearCorruptedData = () => {
    clearStoredRunsForDate(window.localStorage, date);
    clearStoredProfile(window.localStorage);
    clearCompanyArchive(window.localStorage);
    setIndustry(DEFAULT_INDUSTRY);
    setGame(createInitialGameState(date, DEFAULT_INDUSTRY, game.targetTurns));
    setCareer(EMPTY_CAREER);
    setStorageError(false);
    setStarted(false);
  };

  const saveCard = async () => {
    try {
      const svg = createResultCardSvg({
        locale,
        challengeNumber,
        game,
        streak: career.currentStreak,
      });
      await saveResultCard(svg, challengeNumber);
      setCopyStatus(copy.savedCard);
      trackGameEvent("card_downloaded", {
        industry,
        score: calculateCompanyScore(game),
      });
    } catch {
      setCopyStatus(copy.saveFailed);
    }
  };

  const shareResult = async () => {
    if (!navigator.share || !playerId) return;
    const referralId = readOrCreateReferralId(window.localStorage);
    const profile = getCompanyProfile(game.industry);
    const url = new URL(localizedPath(locale), window.location.origin);
    url.searchParams.set("ref", referralId);
    url.searchParams.set("utm_source", "share");
    url.searchParams.set("utm_medium", "web_share");
    trackGameEvent("share_opened", {
      industry,
      score: calculateCompanyScore(game),
    });
    try {
      await recordCompanyActivity({
        event: "share_opened",
        date,
        playerId,
        referralId,
      });
      await navigator.share({
        title: `RUNWAY 10 #${challengeNumber}`,
        text: copy.shareText({
          challengeNumber,
          companyCode: profile.code,
          score: calculateCompanyScore(game),
          status:
            copy.status[game.status === "playing" ? "survived" : game.status]
              .title,
          turns: game.targetTurns,
        }),
        url: url.toString(),
      });
      setCopyStatus(copy.sharedResult);
      trackGameEvent("share_sheet_completed", {
        industry,
        score: calculateCompanyScore(game),
      });
      reportActivity({
        event: "share_sheet_completed",
        date,
        playerId,
        referralId,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setCopyStatus(copy.shareFailed);
    }
  };

  return (
    <main id="main-content" className="company-game">
      <div className="company-grid" aria-hidden="true" />
      <header className="company-topbar">
        <Link className="company-brand" href={localizedPath(locale)}>
          <span>R10</span>
          <strong>{copy.brand}</strong>
        </Link>
        <div className="company-seed">
          <span>{copy.today}</span>
          <strong>
            #{challengeNumber} · {date}
            {` · ${getCompanyProfile(industry).code}`}
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
        </nav>
      </header>

      {storageError ? (
        <section className="company-error" role="alert">
          <TriangleAlert aria-hidden="true" />
          <h1>{copy.storageError}</h1>
          <button type="button" onClick={clearCorruptedData}>
            {copy.clearData}
          </button>
        </section>
      ) : !started ? (
        <section className="company-briefing">
          <div className="company-briefing-copy">
            <p className="company-kicker">
              {copy.edition} / #{challengeNumber}
            </p>
            <h1>{copy.title}</h1>
            <p className="company-deck">{copy.subtitle}</p>
            <fieldset className="company-profile-picker">
              <legend>{copy.chooseCompany}</legend>
              <p>{copy.companyNote}</p>
              <div>
                {COMPANY_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    aria-pressed={profile.id === industry}
                    onClick={() => selectIndustry(profile.id)}
                  >
                    <span>{profile.code}</span>
                    <strong>{profile.label[locale]}</strong>
                    <small>{profile.description[locale]}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              className="company-primary-action"
              type="button"
              onClick={startGame}
            >
              {game.turn > 0 ? copy.resume : copy.start}
              <ArrowRight aria-hidden="true" />
            </button>
            {career.currentStreak > 0 ? (
              <p className="company-streak-chip">
                {copy.currentStreak} <strong>{career.currentStreak}</strong>
                {copy.dayUnit}
              </p>
            ) : null}
          </div>
          <aside className="company-rules">
            <span className="company-stamp">CONFIDENTIAL</span>
            <p>{copy.briefing}</p>
            <ol>
              {copy.rules.map((rule, index) => (
                <li key={rule}>
                  <b>0{index + 1}</b>
                  {rule}
                </li>
              ))}
            </ol>
            <small>{copy.dailyNotice}</small>
            <div className="company-legal-links">
              <Link href={localizedPath(locale, "privacy")}>
                {copy.privacy}
              </Link>
              <Link href={localizedPath(locale, "terms")}>{copy.terms}</Link>
            </div>
          </aside>
        </section>
      ) : showFinal ? (
        <section className={`company-final is-${game.status}`}>
          <div className="company-final-copy">
            <p className="company-kicker">
              {copy.finalReport} / #{challengeNumber}
            </p>
            <h1>
              {
                copy.status[
                  game.status === "playing" ? "survived" : game.status
                ].title
              }
            </h1>
            <p>
              {
                copy.status[
                  game.status === "playing" ? "survived" : game.status
                ].body
              }
            </p>
            <div className="company-score">
              <span>{copy.score}</span>
              <strong>{calculateCompanyScore(game)}</strong>
            </div>
            <CareerRecord locale={locale} career={career} />
            <LeaderboardRecord locale={locale} state={leaderboard} />
            <div className="company-final-actions">
              {canShare ? (
                <button type="button" onClick={shareResult}>
                  <Share2 aria-hidden="true" />
                  {copy.shareResult}
                </button>
              ) : null}
              <button type="button" onClick={saveCard}>
                <ImageDown aria-hidden="true" />
                {copy.saveCard}
              </button>
              <button type="button" onClick={restart}>
                <RotateCcw aria-hidden="true" />
                {copy.restart}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStarted(false);
                  setShowFinal(false);
                  setResolution(null);
                }}
              >
                {copy.changeCompany}
              </button>
            </div>
            {copyStatus ? (
              <p className="company-copy-status" role="status">
                {copyStatus}
              </p>
            ) : null}
          </div>
          <MetricPanel
            locale={locale}
            metrics={game.metrics}
            turn={game.turn}
          />
          <GameOverAd locale={locale} />
        </section>
      ) : (
        <section className="company-boardroom">
          <div
            className="company-progress"
            aria-label={`${copy.turn} ${game.turn + (resolution ? 0 : 1)} ${copy.of} ${game.targetTurns}`}
          >
            <div>
              <span>{copy.turn}</span>
              <strong>
                {String(
                  Math.min(game.turn + (resolution ? 0 : 1), game.targetTurns),
                ).padStart(2, "0")}
              </strong>
              <i>
                {copy.of} {game.targetTurns}
              </i>
            </div>
            <div className="company-progress-line">
              <i
                style={{ width: `${(game.turn / game.targetTurns) * 100}%` }}
              />
            </div>
          </div>

          <MetricPanel
            locale={locale}
            metrics={game.metrics}
            turn={game.turn}
          />

          {resolution && resolvedScenario && resolvedChoice ? (
            <article className="company-resolution">
              <p className="company-kicker">
                {copy.consequence} / {resolvedScenario.department[locale]}
              </p>
              <div className="company-resolution-mark">
                <Check aria-hidden="true" />
              </div>
              <h1>{resolvedChoice.label[locale]}</h1>
              <p className="company-result-copy">
                {resolvedChoice.result[locale]}
              </p>
              <div className="company-effects">
                {METRICS.filter((metric) => resolvedChoice.effects[metric]).map(
                  (metric) => {
                    const value = resolvedChoice.effects[metric] ?? 0;
                    return (
                      <span
                        key={metric}
                        className={value > 0 ? "is-up" : "is-down"}
                      >
                        {copy.effectLabels[metric]}{" "}
                        <b>
                          {value > 0 ? "+" : ""}
                          {value}
                        </b>
                      </span>
                    );
                  },
                )}
              </div>
              <button
                className="company-primary-action"
                type="button"
                onClick={advance}
              >
                {game.status === "playing" ? copy.next : copy.finalReport}
                <ArrowRight aria-hidden="true" />
              </button>
            </article>
          ) : scenario ? (
            <article className="company-decision-card">
              <header>
                <p className="company-kicker">
                  {copy.decision} / {scenario.department[locale]}
                </p>
                <span>
                  {copy.boardMemo} · {String(game.turn + 1).padStart(2, "0")}
                </span>
              </header>
              <h1>{scenario.title[locale]}</h1>
              <p className="company-situation">{scenario.body[locale]}</p>
              <div className="company-choices">
                {scenario.choices.map((choice, index) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => decide(choice.id)}
                  >
                    <span>0{index + 1}</span>
                    <strong>{choice.label[locale]}</strong>
                    <small>{choice.detail[locale]}</small>
                    <ArrowRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      )}
    </main>
  );
}

function LeaderboardRecord({
  locale,
  state,
}: {
  locale: Locale;
  state: LeaderboardState;
}) {
  const copy = COMPANY_COPY[locale];
  if (state.kind === "idle" || state.kind === "loading") {
    return <p className="company-global-rank is-loading">{copy.rankLoading}</p>;
  }
  if (state.kind === "error") {
    return <p className="company-global-rank is-error">{copy.rankError}</p>;
  }
  return (
    <section className="company-global-rank" aria-label={copy.globalRank}>
      <span>{copy.globalRank}</span>
      <strong>
        {copy.topPercent} {Math.max(1, 101 - state.percentile)}%
      </strong>
      <small>
        {state.total.toLocaleString(locale)} {copy.players}
      </small>
    </section>
  );
}

function CareerRecord({
  locale,
  career,
}: {
  locale: Locale;
  career: CompanyCareerStats;
}) {
  const copy = COMPANY_COPY[locale];
  const survivalRate = career.daysPlayed
    ? Math.round((career.daysSurvived / career.daysPlayed) * 100)
    : 0;
  return (
    <section className="company-career" aria-labelledby="career-record-title">
      <h2 id="career-record-title">{copy.careerTitle}</h2>
      <div>
        <span>{copy.currentStreak}</span>
        <strong>
          {career.currentStreak}
          <small>{copy.dayUnit}</small>
        </strong>
      </div>
      <div>
        <span>{copy.daysPlayed}</span>
        <strong>{career.daysPlayed}</strong>
      </div>
      <div>
        <span>{copy.survivalRate}</span>
        <strong>{survivalRate}%</strong>
      </div>
      <div>
        <span>{copy.bestScore}</span>
        <strong>{career.bestScore}</strong>
      </div>
    </section>
  );
}

function MetricPanel({
  locale,
  metrics,
  turn,
}: {
  locale: Locale;
  metrics: CompanyGameState["metrics"];
  turn: number;
}) {
  const copy = COMPANY_COPY[locale];
  return (
    <aside className="company-metrics" aria-label="Company metrics">
      {METRICS.map((metric) => (
        <div
          key={metric}
          className={metrics[metric] <= 20 ? "is-critical" : ""}
        >
          <span>{copy.metrics[metric]}</span>
          <strong>{String(metrics[metric]).padStart(2, "0")}</strong>
          <i>
            <b style={{ width: `${metrics[metric]}%` }} />
          </i>
        </div>
      ))}
      <small>MONTH {String(turn).padStart(2, "0")} / RUNWAY CONTROL</small>
    </aside>
  );
}
