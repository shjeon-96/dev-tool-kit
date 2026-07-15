"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clipboard,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  COMPANY_SCENARIOS,
  getScenario,
} from "@/entities/company-scenario/data/scenarios";
import {
  LOCALE_LABELS,
  LOCALES,
  localizedPath,
  type Locale,
} from "@/shared/config/site";
import {
  GAME_LENGTH,
  applyDecision,
  calculateCompanyScore,
  createDailyScenarioOrder,
  createInitialGameState,
  isCompanyGameState,
} from "@/shared/lib/company-survival/game";
import type {
  CompanyGameState,
  CompanyMetric,
} from "@/shared/types/company-survival";
import { COMPANY_COPY } from "./copy";

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

function storageKey(date: string) {
  return `runway-10:company:${date}`;
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
  const scenarioOrder = useMemo(
    () => createDailyScenarioOrder(date, COMPANY_SCENARIOS),
    [date],
  );
  const [game, setGame] = useState<CompanyGameState>(() =>
    createInitialGameState(date),
  );
  const [started, setStarted] = useState(false);
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [showFinal, setShowFinal] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(storageKey(date));
      if (!saved) return;

      try {
        const parsed: unknown = JSON.parse(saved);
        if (!isCompanyGameState(parsed, date)) {
          setStorageError(true);
          return;
        }
        setGame(parsed);
        setStarted(parsed.turn > 0);
        setShowFinal(parsed.status !== "playing");
      } catch {
        setStorageError(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [date]);

  const scenario =
    game.turn < GAME_LENGTH ? getScenario(scenarioOrder[game.turn]) : null;
  const resolvedScenario = resolution
    ? getScenario(resolution.scenarioId)
    : null;
  const resolvedChoice = resolvedScenario?.choices.find(
    (choice) => choice.id === resolution?.choiceId,
  );

  const decide = (choiceId: string) => {
    if (!scenario || resolution || game.status !== "playing") return;
    const next = applyDecision(game, scenario, choiceId);
    window.localStorage.setItem(storageKey(date), JSON.stringify(next));
    setGame(next);
    setResolution({ scenarioId: scenario.id, choiceId });
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
    const fresh = createInitialGameState(date);
    window.localStorage.removeItem(storageKey(date));
    setGame(fresh);
    setResolution(null);
    setShowFinal(false);
    setStarted(true);
    setCopyStatus("");
  };

  const clearCorruptedData = () => {
    window.localStorage.removeItem(storageKey(date));
    setGame(createInitialGameState(date));
    setStorageError(false);
    setStarted(false);
  };

  const copyResult = async () => {
    const status = game.status === "playing" ? "survived" : game.status;
    const blocks = METRICS.map(
      (metric) => `${copy.metrics[metric]} ${game.metrics[metric]}`,
    ).join(" · ");
    const result = `${copy.brand} #${challengeNumber}\n${copy.status[status].title}\n${blocks}\n${copy.score} ${calculateCompanyScore(game)}\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(result);
      setCopyStatus(copy.copied);
    } catch {
      setCopyStatus(copy.copyFailed);
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
            <button
              className="company-primary-action"
              type="button"
              onClick={() => setStarted(true)}
            >
              {game.turn > 0 ? copy.resume : copy.start}
              <ArrowRight aria-hidden="true" />
            </button>
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
            <div className="company-final-actions">
              <button type="button" onClick={copyResult}>
                <Clipboard aria-hidden="true" />
                {copy.copyResult}
              </button>
              <button type="button" onClick={restart}>
                <RotateCcw aria-hidden="true" />
                {copy.restart}
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
        </section>
      ) : (
        <section className="company-boardroom">
          <div
            className="company-progress"
            aria-label={`${copy.turn} ${game.turn + (resolution ? 0 : 1)} ${copy.of} ${GAME_LENGTH}`}
          >
            <div>
              <span>{copy.turn}</span>
              <strong>
                {String(
                  Math.min(game.turn + (resolution ? 0 : 1), GAME_LENGTH),
                ).padStart(2, "0")}
              </strong>
              <i>
                {copy.of} {GAME_LENGTH}
              </i>
            </div>
            <div className="company-progress-line">
              <i style={{ width: `${(game.turn / GAME_LENGTH) * 100}%` }} />
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
