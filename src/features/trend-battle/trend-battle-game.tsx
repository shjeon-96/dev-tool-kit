"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  categoryDefinitions,
  getCategoryConfig,
} from "@/entities/trend-item/data/categories";
import type { Locale } from "@/shared/config/site";
import { localizedPath } from "@/shared/config/site";
import { createRound, isCorrectAnswer } from "@/shared/lib/trend-battle/game";
import {
  calculateStreak,
  readCompletedDates,
  readDailyRecord,
  readPracticeBest,
  writeDailyRecord,
  writePracticeBest,
} from "@/shared/lib/trend-battle/storage";
import type {
  GameRound,
  TrendCategoryConfig,
  TrendGameMode,
  TrendItem,
} from "@/shared/types/trend";
import { TREND_COPY } from "./copy";

type Choice = "higher" | "lower";
type Outcome = "correct" | "wrong" | null;

interface TrendBattleGameProps {
  locale: Locale;
  config: TrendCategoryConfig;
  date: string;
  challengeNumber: number;
  dailyRounds: readonly GameRound[];
  items: readonly TrendItem[];
  initialPracticeRound: GameRound;
}

export function TrendBattleGame({
  locale,
  config,
  date,
  challengeNumber,
  dailyRounds,
  items,
  initialPracticeRound,
}: TrendBattleGameProps) {
  const copy = TREND_COPY[locale];
  const [mode, setMode] = useState<TrendGameMode>("daily");
  const [roundIndex, setRoundIndex] = useState(0);
  const [practiceRound, setPracticeRound] = useState(initialPracticeRound);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [outcomes, setOutcomes] = useState<boolean[]>([]);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState("");

  const currentRound =
    mode === "daily" ? dailyRounds[roundIndex] : practiceRound;
  const isRevealed = outcome !== null;
  const displayOutcomes = mode === "daily" ? outcomes : outcomes.slice(-5);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const dates = readCompletedDates();
      const saved = readDailyRecord(date, config.category);
      setCompletedDates(dates);
      setStreak(calculateStreak(dates, date));
      setBest(readPracticeBest(config.category));

      if (saved) {
        setOutcomes(saved.outcomes);
        setScore(saved.score);
        setIsComplete(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [config.category, date]);

  const resetDaily = useCallback(() => {
    const saved = readDailyRecord(date, config.category);
    setRoundIndex(0);
    setOutcome(null);
    setShareStatus("");
    setOutcomes(saved?.outcomes ?? []);
    setScore(saved?.score ?? 0);
    setIsComplete(Boolean(saved));
  }, [config.category, date]);

  const switchMode = (nextMode: TrendGameMode) => {
    setMode(nextMode);
    if (nextMode === "daily") {
      resetDaily();
      return;
    }

    setPracticeRound(createRound(items));
    setRoundIndex(0);
    setScore(0);
    setOutcomes([]);
    setOutcome(null);
    setIsComplete(false);
    setShareStatus("");
  };

  const choose = useCallback(
    (choice: Choice) => {
      if (isRevealed || isComplete) return;
      const selectedSide = choice === "higher" ? "right" : "left";
      const correct = isCorrectAnswer(currentRound, selectedSide);
      const nextScore = correct ? score + 1 : score;

      setOutcome(correct ? "correct" : "wrong");
      setScore(nextScore);
      setOutcomes((current) => [...current, correct]);

      if (mode === "practice" && !correct) {
        setBest(writePracticeBest(config.category, nextScore));
        setIsComplete(true);
      }
    },
    [config.category, currentRound, isComplete, isRevealed, mode, score],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "h") choose("higher");
      if (event.key.toLowerCase() === "l") choose("lower");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [choose]);

  const advance = () => {
    if (!outcome) return;

    if (mode === "daily") {
      if (roundIndex === dailyRounds.length - 1) {
        const record = {
          date,
          category: config.category,
          outcomes,
          score,
        };
        writeDailyRecord(record);
        const dates = readCompletedDates();
        setCompletedDates(dates);
        setStreak(calculateStreak(dates, date));
        setIsComplete(true);
        setOutcome(null);
        return;
      }

      setRoundIndex((current) => current + 1);
      setOutcome(null);
      return;
    }

    setPracticeRound(createRound(items));
    setOutcome(null);
  };

  const restartPractice = () => {
    setPracticeRound(createRound(items));
    setScore(0);
    setOutcomes([]);
    setOutcome(null);
    setIsComplete(false);
    setShareStatus("");
  };

  const share = async () => {
    const marks = displayOutcomes
      .map((correct) => (correct ? "🟩" : "⬛"))
      .join("");
    const title = `Trend Battle #${challengeNumber}`;
    const text = `${title} · ${config.shortLabel}\n${marks} ${score}/${mode === "daily" ? 5 : outcomes.length}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: window.location.href });
        setShareStatus(copy.shared);
        return;
      }

      // Desktop browsers often omit Web Share; clipboard keeps the specified share action usable.
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setShareStatus(copy.copied);
    } catch {
      setShareStatus(copy.shareUnavailable);
    }
  };

  const week = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(`${date}T00:00:00.000Z`);
      day.setUTCDate(day.getUTCDate() - (6 - index));
      return {
        date: day.toISOString().slice(0, 10),
        label: new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(
          day,
        ),
      };
    });
  }, [date, locale]);

  return (
    <main id="main-content" className="trend-page">
      <section className="trend-game-shell" aria-labelledby="trend-title">
        <div className="trend-game-main">
          <header className="trend-title-block">
            <div>
              <h1 id="trend-title">
                {copy.dailyTitle} <span>#{challengeNumber}</span>
              </h1>
              <p className="trend-date">{formatDate(date, locale)}</p>
              <p className="trend-category-line">
                {config.label} / {copy.comparisons}
              </p>
            </div>
          </header>

          <div className="trend-progress" aria-label={copy.rounds}>
            {Array.from({ length: 5 }, (_, index) => {
              const roundOutcome =
                mode === "daily" ? outcomes[index] : undefined;
              const active = !isComplete && index === Math.min(roundIndex, 4);
              return (
                <span
                  key={index}
                  className={`${roundOutcome === true ? "is-correct" : ""} ${roundOutcome === false ? "is-wrong" : ""} ${active ? "is-active" : ""}`}
                >
                  {String(index + 1).padStart(2, "0")}
                  {roundOutcome === true ? <Check size={18} /> : null}
                  {roundOutcome === false ? <X size={18} /> : null}
                </span>
              );
            })}
          </div>

          {isComplete ? (
            <section className="trend-complete" aria-live="polite">
              <p className="eyebrow">
                {mode === "daily" ? copy.complete : copy.practiceOver}
              </p>
              <h2>
                {score} / {mode === "daily" ? 5 : outcomes.length}
              </h2>
              <p>{mode === "daily" ? copy.completeBody : config.question}</p>
              <div className="trend-complete-actions">
                <button type="button" onClick={share}>
                  <Share2 size={18} /> {copy.shareResult}
                </button>
                {mode === "practice" ? (
                  <button type="button" onClick={restartPractice}>
                    <RotateCcw size={18} /> {copy.playAgain}
                  </button>
                ) : (
                  <button type="button" onClick={() => switchMode("practice")}>
                    <ArrowRight size={18} /> {copy.practiceMode}
                  </button>
                )}
              </div>
              {shareStatus ? (
                <p className="trend-share-status">{shareStatus}</p>
              ) : null}
            </section>
          ) : (
            <section className="trend-round" aria-live="polite">
              <article className="trend-card trend-card-known">
                <p>{copy.known}</p>
                <h2>{currentRound.leftItem.name}</h2>
                <strong>{currentRound.leftItem.displayValue}</strong>
                <span>{config.valueLabel}</span>
              </article>

              <ArrowRight className="trend-card-arrow" aria-hidden="true" />

              <article className="trend-card trend-card-unknown">
                <p>{copy.unknown}</p>
                <h2>{currentRound.rightItem.name}</h2>
                <strong>
                  {isRevealed ? currentRound.rightItem.displayValue : "?"}
                </strong>
                <span>{config.valueLabel}</span>
                {!isRevealed ? (
                  <div className="trend-answer-buttons">
                    <button type="button" onClick={() => choose("higher")}>
                      {copy.higher} <ArrowUp size={24} />
                    </button>
                    <button type="button" onClick={() => choose("lower")}>
                      {copy.lower} <ArrowDown size={24} />
                    </button>
                  </div>
                ) : null}
              </article>

              {isRevealed ? (
                <div
                  className={`trend-round-result is-${outcome}`}
                  role="status"
                >
                  <strong>
                    {outcome === "correct" ? copy.correct : copy.incorrect}
                  </strong>
                  <span>
                    {currentRound.leftItem.name}:{" "}
                    {currentRound.leftItem.displayValue}
                    {" / "}
                    {currentRound.rightItem.name}:{" "}
                    {currentRound.rightItem.displayValue}
                  </span>
                  {mode === "practice" && outcome === "wrong" ? null : (
                    <button type="button" onClick={advance}>
                      {mode === "daily" && roundIndex === 4
                        ? copy.finish
                        : copy.next}
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              ) : null}
            </section>
          )}

          <p className="trend-keyboard-note">{copy.keyboard}</p>
        </div>

        <aside className="trend-record" aria-label={copy.fieldRecord}>
          <h2>{copy.fieldRecord}</h2>
          <div className="trend-record-score">
            <p>{mode === "daily" ? copy.currentStreak : copy.score}</p>
            <strong>
              {mode === "daily" ? streak : score}
              <span>{mode === "daily" ? copy.days : ""}</span>
            </strong>
          </div>

          {mode === "daily" ? (
            <div className="trend-week">
              {week.map((day) => (
                <span key={day.date}>
                  <small>{day.label}</small>
                  <i
                    className={
                      completedDates.includes(day.date) ? "is-done" : ""
                    }
                  />
                </span>
              ))}
            </div>
          ) : (
            <div className="trend-practice-best">
              <span>{copy.best}</span>
              <strong>{best}</strong>
            </div>
          )}

          <button
            type="button"
            className="trend-share-button"
            onClick={share}
            disabled={displayOutcomes.length === 0}
          >
            <Share2 size={18} /> {copy.shareResult}
          </button>

          <div className="trend-share-preview" aria-label="Result preview">
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={
                    displayOutcomes[index] === true
                      ? "is-correct"
                      : displayOutcomes[index] === false
                        ? "is-wrong"
                        : ""
                  }
                />
              ))}
            </div>
            <strong>
              {displayOutcomes.filter(Boolean).length}/
              {mode === "daily" ? 5 : displayOutcomes.length || 5}
            </strong>
          </div>

          <button
            type="button"
            className="trend-practice-link"
            onClick={() => switchMode(mode === "daily" ? "practice" : "daily")}
          >
            {mode === "daily" ? copy.practiceMode : copy.dailyMode}
            <ArrowRight size={18} />
          </button>
        </aside>
      </section>

      <nav className="trend-categories" aria-label={copy.chooseCategory}>
        <p>{copy.chooseCategory}</p>
        {categoryDefinitions.map((definition) => {
          const category = getCategoryConfig(definition.slug, locale);
          if (!category) return null;
          const active = category.category === config.category;
          const path =
            definition.slug === "countries"
              ? "play"
              : `play/${definition.slug}`;
          return (
            <Link
              key={definition.slug}
              className={active ? "is-active" : ""}
              href={localizedPath(locale, path)}
            >
              {category.shortLabel}
            </Link>
          );
        })}
      </nav>

      <section className="shell trend-guide-grid">
        <article>
          <p className="eyebrow">01</p>
          <h2>{copy.gameGuideTitle}</h2>
          <p>{copy.gameGuide}</p>
        </article>
        <article>
          <p className="eyebrow">02</p>
          <h2>{copy.dataGuideTitle}</h2>
          <p>{copy.dataGuide}</p>
          <a
            href={currentRound.leftItem.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.source}: {currentRound.leftItem.sourceName}
            <ArrowRight size={15} />
          </a>
        </article>
      </section>
    </main>
  );
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T00:00:00.000Z`))
    .toUpperCase();
}
