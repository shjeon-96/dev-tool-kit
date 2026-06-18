"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getRecommendedCategoryConfigs } from "@/entities/trend-item/data/categories";
import { AdSlot } from "@/widgets/trend-battle/ui/ad-slot";
import type {
  GameRound,
  AppLocale,
  TrendAnswer,
  TrendCategory,
  TrendCategoryConfig,
  TrendGameMode,
  TrendItem,
} from "@/shared/types/trend";
import { createRound, isCorrectAnswer } from "@/shared/lib/trend-battle/game";
import {
  formatRoundInsight,
  formatRoundResult,
  formatShareText,
} from "@/shared/lib/trend-battle/format";
import {
  readHighScore,
  writeHighScore,
  appendPlayedRound,
  writePreferredMode,
  writeRecentCategory,
} from "@/shared/lib/trend-battle/storage";
import { trackTrendEvent } from "@/shared/lib/trend-battle/analytics";
import { getLocalizedPath, messages } from "@/shared/lib/trend-battle/i18n";

type GameMode = TrendGameMode;
type ResultState = "idle" | "correct" | "wrong";
type ClassicAnswer = "higher" | "lower";

interface TrendBattleGameProps {
  items: readonly TrendItem[];
  config: TrendCategoryConfig;
  storageCategory: TrendCategory | "random";
  initialRound: GameRound;
  locale?: AppLocale;
  initialMode?: GameMode;
}

export function TrendBattleGame({
  items,
  config,
  storageCategory,
  initialRound,
  locale = "en",
  initialMode = "duel",
}: TrendBattleGameProps) {
  const copy = messages[locale];
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [round, setRound] = useState<GameRound>(initialRound);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    readHighScore(storageCategory),
  );
  const [resultState, setResultState] = useState<ResultState>("idle");
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    trackTrendEvent("game_start", {
      category: config.category,
      mode,
    });
    trackTrendEvent("category_page_view", {
      category: config.category,
    });
    writeRecentCategory(storageCategory);
  }, [config.category, mode, storageCategory]);

  const resultLines = useMemo(() => formatRoundResult(round), [round]);
  const resultInsight = useMemo(
    () => formatRoundInsight(round, locale),
    [locale, round],
  );
  const recommendedCategories = useMemo(
    () => getRecommendedCategoryConfigs(storageCategory, locale),
    [locale, storageCategory],
  );
  const isFinished = resultState === "wrong";

  const startNextRound = (nextScore = score) => {
    setRound(createRound(items));
    setScore(nextScore);
    setResultState("idle");
    setShareStatus("");
  };

  const handleAnswer = (answer: TrendAnswer) => {
    if (resultState !== "idle") return;

    trackTrendEvent("answer_selected", {
      category: config.category,
      mode,
      answer,
      score,
    });

    const wasCorrect = isCorrectAnswer(round, answer);
    const nextScore = wasCorrect ? score + 1 : score;

    appendPlayedRound({
      category: storageCategory,
      mode,
      leftItemId: round.leftItem.id,
      rightItemId: round.rightItem.id,
      selectedAnswer: answer,
      correctAnswer: round.correctAnswer,
      wasCorrect,
      score: nextScore,
      playedAt: Date.now(),
    });

    if (wasCorrect) {
      const nextHighScore = writeHighScore(storageCategory, nextScore);

      setScore(nextScore);
      setHighScore(nextHighScore);
      setResultState("correct");
      trackTrendEvent("answer_correct", {
        category: config.category,
        mode,
        score: nextScore,
      });
      return;
    }

    const nextHighScore = writeHighScore(storageCategory, score);
    setHighScore(nextHighScore);
    setResultState("wrong");
    trackTrendEvent("answer_wrong", {
      category: config.category,
      mode,
      score,
    });
    trackTrendEvent("game_over", {
      category: config.category,
      mode,
      score,
    });
  };

  const handleClassicAnswer = (answer: ClassicAnswer) => {
    const side: TrendAnswer = answer === "higher" ? "right" : "left";
    handleAnswer(side);
  };

  const handleRestart = () => {
    trackTrendEvent("restart_game", {
      category: config.category,
      mode,
      score,
    });
    startNextRound(0);
  };

  const handleShare = async () => {
    const text = formatShareText(score, config.label, locale);
    trackTrendEvent("share_result", {
      category: config.category,
      mode,
      score,
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Trend Battle",
          text,
          url: window.location.href,
        });
        setShareStatus(copy.shared);
        return;
      }

      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setShareStatus(copy.copied);
    } catch {
      setShareStatus(copy.shareUnavailable);
    }
  };

  const switchMode = (nextMode: GameMode) => {
    setMode(nextMode);
    setResultState("idle");
    setShareStatus("");
    setRound(createRound(items));
    writePreferredMode(nextMode);
  };

  return (
    <section className="mx-auto grid min-h-[calc(100svh-96px)] w-full max-w-5xl content-center gap-5 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase text-cyan-700">
            {config.label}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-5xl">
            {copy.heroTitle}
          </h1>
        </div>
        <div className="flex rounded-full border border-slate-300 bg-white p-1">
          <button
            type="button"
            onClick={() => switchMode("duel")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "duel" ? "bg-slate-950 text-white" : "text-slate-600"
            }`}
            aria-pressed={mode === "duel"}
          >
            {copy.duel}
          </button>
          <button
            type="button"
            onClick={() => switchMode("classic")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "classic" ? "bg-slate-950 text-white" : "text-slate-600"
            }`}
            aria-pressed={mode === "classic"}
          >
            {copy.classic}
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-600">
          <span>
            {copy.score} {score}
          </span>
          <span>
            {copy.best} {highScore}
          </span>
        </div>

        <p className="text-center text-xl font-bold text-slate-950 sm:text-2xl">
          {mode === "duel" ? config.question : config.classicPrompt}
        </p>

        {mode === "classic" ? (
          <ClassicRound
            round={round}
            locale={locale}
            resultState={resultState}
            onChoose={handleClassicAnswer}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
            <AnswerCard
              item={round.leftItem}
              locale={locale}
              side="left"
              resultState={resultState}
              correctAnswer={round.correctAnswer}
              onChoose={handleAnswer}
            />
            <div className="flex items-center justify-center text-sm font-black uppercase text-slate-400">
              vs
            </div>
            <AnswerCard
              item={round.rightItem}
              locale={locale}
              side="right"
              resultState={resultState}
              correctAnswer={round.correctAnswer}
              onChoose={handleAnswer}
            />
          </div>
        )}

        {resultState !== "idle" ? (
          <div
            className={`rounded-lg border p-4 text-center ${
              resultState === "correct"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
            role="status"
          >
            <p className="text-lg font-bold">
              {resultState === "correct" ? copy.correct : copy.gameOver}
            </p>
            <div className="mt-2 grid gap-1 text-sm font-semibold">
              {resultLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-3 text-sm font-bold">{resultInsight}</p>
            {isFinished ? (
              <p className="mt-3 text-sm">
                {copy.scored} {score}. {copy.bestScore}: {highScore}.
              </p>
            ) : null}
            {isFinished ? (
              <div className="mt-4 border-t border-current/20 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide">
                  {copy.tryAnotherCategory}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {recommendedCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={getLocalizedPath(category.slug, locale)}
                      className="rounded-full border border-current/30 px-3 py-1.5 text-xs font-bold"
                    >
                      {category.shortLabel}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {resultState === "correct" ? (
            <button
              type="button"
              onClick={() => startNextRound()}
              className="min-h-12 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              {copy.next}
            </button>
          ) : null}
          {isFinished ? (
            <button
              type="button"
              onClick={handleRestart}
              className="min-h-12 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              {copy.playAgain}
            </button>
          ) : null}
          {resultState !== "idle" ? (
            <button
              type="button"
              onClick={handleShare}
              className="min-h-12 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-950"
            >
              {copy.shareResult}
            </button>
          ) : null}
        </div>
        {shareStatus ? (
          <p className="text-center text-sm font-semibold text-slate-600">
            {shareStatus}
          </p>
        ) : null}

        {isFinished ? (
          <AdSlot
            label={`${config.label} game over ad`}
            text={copy.advertisement}
            placement={`game-over:${storageCategory}`}
          />
        ) : null}

        <p className="text-center text-xs text-slate-500">
          {copy.data}:{" "}
          <a
            href={round.leftItem.sourceUrl}
            className="font-semibold underline"
            target="_blank"
            rel="noreferrer"
          >
            {round.leftItem.sourceName}
          </a>
          {" / "}
          <a
            href={round.rightItem.sourceUrl}
            className="font-semibold underline"
            target="_blank"
            rel="noreferrer"
          >
            {round.rightItem.sourceName}
          </a>
        </p>
      </div>
    </section>
  );
}

interface AnswerCardProps {
  item: TrendItem;
  locale: AppLocale;
  side: TrendAnswer;
  resultState: ResultState;
  correctAnswer: TrendAnswer;
  onChoose: (answer: TrendAnswer) => void;
}

function AnswerCard({
  item,
  locale,
  side,
  resultState,
  correctAnswer,
  onChoose,
}: AnswerCardProps) {
  const copy = messages[locale];
  const isRevealed = resultState !== "idle";
  const isCorrect = correctAnswer === side;
  const resultStatus = !isRevealed ? "idle" : isCorrect ? "correct" : "chosen";
  const stateClass = isRevealed
    ? isCorrect
      ? "animate-trend-correct border-emerald-500 bg-emerald-50 shadow-emerald-200/70"
      : "animate-trend-chosen border-rose-200 bg-rose-50/80 opacity-80"
    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-lg";

  return (
    <button
      type="button"
      onClick={() => onChoose(side)}
      disabled={isRevealed}
      data-result-state={resultStatus}
      className={`group flex min-h-64 flex-col overflow-hidden rounded-lg border text-left shadow-sm transition duration-300 ${stateClass}`}
    >
      <CardVisual item={item} />
      <span className="flex flex-1 flex-col justify-between p-5">
        <span className="text-xs font-bold uppercase text-slate-500">
          {side === "left" ? copy.thisSide : copy.thatSide}
        </span>
        <span className="mt-4 text-3xl font-black text-slate-950">
          {item.name}
        </span>
        <span className="mt-6 text-sm font-semibold text-slate-500">
          {isRevealed ? item.displayValue : copy.tapToChoose}
        </span>
      </span>
    </button>
  );
}

function CardVisual({ item }: { item: TrendItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) return null;
  if (!item.imageUrl) return null;

  return (
    <span
      data-card-visual
      className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-200"
    >
      <Image
        src={item.imageUrl}
        alt={item.imageAlt ?? ""}
        fill
        sizes="(max-width: 640px) 100vw, 480px"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        priority
        onError={() => setImageFailed(true)}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/10" />
    </span>
  );
}

interface ClassicRoundProps {
  round: GameRound;
  locale: AppLocale;
  resultState: ResultState;
  onChoose: (answer: ClassicAnswer) => void;
}

function ClassicRound({
  round,
  locale,
  resultState,
  onChoose,
}: ClassicRoundProps) {
  const copy = messages[locale];
  const isRevealed = resultState !== "idle";

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        <CardVisual item={round.leftItem} />
        <div className="p-5">
          <p className="text-xs font-bold uppercase text-slate-500">
            {copy.knownValue}
          </p>
          <p className="mt-4 text-3xl font-black text-slate-950">
            {round.leftItem.name}
          </p>
          <p className="mt-4 text-lg font-bold text-slate-700">
            {round.leftItem.displayValue}
          </p>
        </div>
      </div>
      <div
        data-result-state={isRevealed ? "chosen" : "idle"}
        className={`overflow-hidden rounded-lg border border-slate-200 bg-white ${
          isRevealed ? "animate-trend-correct" : ""
        }`}
      >
        <CardVisual item={round.rightItem} />
        <div className="p-5">
          <p className="text-xs font-bold uppercase text-slate-500">
            {copy.mysteryValue}
          </p>
          <p className="mt-4 text-3xl font-black text-slate-950">
            {round.rightItem.name}
          </p>
          {isRevealed ? (
            <p className="mt-4 text-lg font-bold text-slate-700">
              {round.rightItem.displayValue}
            </p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChoose("higher")}
                className="min-h-14 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {copy.higher}
              </button>
              <button
                type="button"
                onClick={() => onChoose("lower")}
                className="min-h-14 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {copy.lower}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
