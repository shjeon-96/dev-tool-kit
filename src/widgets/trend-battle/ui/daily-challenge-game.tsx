"use client";

import { useEffect, useState } from "react";
import type { AppLocale, GameRound, TrendAnswer } from "@/shared/types/trend";
import { isCorrectAnswer } from "@/shared/lib/trend-battle/game";
import {
  formatRoundResult,
  formatShareText,
} from "@/shared/lib/trend-battle/format";
import { messages } from "@/shared/lib/trend-battle/i18n";
import { getDailyChallengeStorageKey } from "@/shared/lib/trend-battle/daily";
import { trackTrendEvent } from "@/shared/lib/trend-battle/analytics";
import {
  appendPlayedRound,
  writeRecentCategory,
} from "@/shared/lib/trend-battle/storage";

type DailyResultState = "idle" | "correct" | "wrong";

interface DailyChallengeGameProps {
  date: string;
  rounds: readonly GameRound[];
  locale?: AppLocale;
}

export function DailyChallengeGame({
  date,
  rounds,
  locale = "en",
}: DailyChallengeGameProps) {
  const copy = messages[locale];
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => readDailyScore(date));
  const [resultState, setResultState] = useState<DailyResultState>("idle");
  const [isComplete, setIsComplete] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const round = rounds[roundIndex];
  const resultLines = formatRoundResult(round);

  useEffect(() => {
    trackTrendEvent("game_start", {
      category: "daily",
      date,
    });
    trackTrendEvent("category_page_view", {
      category: "daily",
      date,
    });
    writeRecentCategory("daily");
  }, [date]);

  const finish = (finalScore: number) => {
    const savedScore = Math.max(bestScore, finalScore);

    window.localStorage.setItem(
      getDailyChallengeStorageKey(date),
      String(savedScore),
    );
    setBestScore(savedScore);
    setIsComplete(true);
    trackTrendEvent("game_over", {
      category: "daily",
      score: finalScore,
      date,
    });
  };

  const answer = (side: TrendAnswer) => {
    if (resultState !== "idle" || isComplete) return;

    trackTrendEvent("answer_selected", {
      category: "daily",
      question: roundIndex + 1,
      answer: side,
      score,
      date,
    });

    const isCorrect = isCorrectAnswer(round, side);
    const nextScore = isCorrect ? score + 1 : score;

    appendPlayedRound({
      category: "daily",
      mode: "daily",
      leftItemId: round.leftItem.id,
      rightItemId: round.rightItem.id,
      selectedAnswer: side,
      correctAnswer: round.correctAnswer,
      wasCorrect: isCorrect,
      score: nextScore,
      playedAt: Date.now(),
      date,
    });

    setScore(nextScore);
    setResultState(isCorrect ? "correct" : "wrong");
    trackTrendEvent(isCorrect ? "answer_correct" : "answer_wrong", {
      category: "daily",
      question: roundIndex + 1,
      score: nextScore,
      date,
    });
  };

  const next = () => {
    if (roundIndex >= rounds.length - 1) {
      finish(score);
      return;
    }

    setRoundIndex(roundIndex + 1);
    setResultState("idle");
    setShareStatus("");
  };

  const restart = () => {
    setRoundIndex(0);
    setScore(0);
    setResultState("idle");
    setIsComplete(false);
    setShareStatus("");
    trackTrendEvent("restart_game", {
      category: "daily",
      date,
    });
  };

  const share = async () => {
    const text = formatShareText(score, copy.dailyTitle, locale);

    trackTrendEvent("share_result", {
      category: "daily",
      score,
      date,
    });

    if (navigator.share) {
      await navigator.share({
        title: "Trend Battle Daily",
        text,
        url: window.location.href,
      });
      setShareStatus(copy.shared);
      return;
    }

    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setShareStatus(copy.copied);
  };

  return (
    <section className="mx-auto grid min-h-[calc(100svh-96px)] w-full max-w-5xl content-center gap-5 px-4 py-4">
      <div>
        <p className="text-sm font-semibold uppercase text-cyan-700">{date}</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-5xl">
          {copy.dailyTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {copy.dailySubtitle}
        </p>
      </div>

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-600">
          <span>
            {copy.questionProgress} {roundIndex + 1}/{rounds.length}
          </span>
          <span>
            {copy.score} {score}
          </span>
          <span>
            {copy.best} {bestScore}
          </span>
        </div>

        {isComplete ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-900">
            <p className="text-2xl font-black">{copy.dailyComplete}</p>
            <p className="mt-2 text-sm">
              {copy.scored} {score}. {copy.bestScore}: {bestScore}.
            </p>
            <p className="mt-1 text-sm font-semibold">{copy.dailySaved}</p>
          </div>
        ) : (
          <>
            <p className="text-center text-xl font-bold text-slate-950 sm:text-2xl">
              {messages[locale].randomQuestion}
            </p>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
              <DailyAnswerCard
                itemName={round.leftItem.name}
                displayValue={round.leftItem.displayValue}
                label={copy.thisSide}
                isRevealed={resultState !== "idle"}
                isCorrect={round.correctAnswer === "left"}
                tapLabel={copy.tapToChoose}
                onChoose={() => answer("left")}
              />
              <div className="flex items-center justify-center text-sm font-black uppercase text-slate-400">
                vs
              </div>
              <DailyAnswerCard
                itemName={round.rightItem.name}
                displayValue={round.rightItem.displayValue}
                label={copy.thatSide}
                isRevealed={resultState !== "idle"}
                isCorrect={round.correctAnswer === "right"}
                tapLabel={copy.tapToChoose}
                onChoose={() => answer("right")}
              />
            </div>

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
              </div>
            ) : null}
          </>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {!isComplete && resultState !== "idle" ? (
            <button
              type="button"
              onClick={next}
              className="min-h-12 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              {roundIndex >= rounds.length - 1 ? copy.finishDaily : copy.next}
            </button>
          ) : null}
          {isComplete ? (
            <button
              type="button"
              onClick={restart}
              className="min-h-12 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              {copy.playDailyAgain}
            </button>
          ) : null}
          {isComplete || resultState !== "idle" ? (
            <button
              type="button"
              onClick={share}
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
      </div>
    </section>
  );
}

interface DailyAnswerCardProps {
  itemName: string;
  displayValue: string;
  label: string;
  isRevealed: boolean;
  isCorrect: boolean;
  tapLabel: string;
  onChoose: () => void;
}

function DailyAnswerCard({
  itemName,
  displayValue,
  label,
  isRevealed,
  isCorrect,
  tapLabel,
  onChoose,
}: DailyAnswerCardProps) {
  const stateClass = isRevealed
    ? isCorrect
      ? "border-emerald-500 bg-emerald-50"
      : "border-slate-200 bg-slate-50"
    : "border-slate-200 bg-white hover:border-cyan-500 hover:bg-cyan-50";

  return (
    <button
      type="button"
      onClick={onChoose}
      disabled={isRevealed}
      className={`flex min-h-44 flex-col justify-between rounded-lg border p-5 text-left transition ${stateClass}`}
    >
      <span className="text-xs font-bold uppercase text-slate-500">
        {label}
      </span>
      <span className="mt-4 text-3xl font-black text-slate-950">
        {itemName}
      </span>
      <span className="mt-6 text-sm font-semibold text-slate-500">
        {isRevealed ? displayValue : tapLabel}
      </span>
    </button>
  );
}

function readDailyScore(date: string) {
  if (typeof window === "undefined") return 0;

  const saved = window.localStorage.getItem(getDailyChallengeStorageKey(date));
  const parsed = saved === null ? 0 : Number.parseInt(saved, 10);

  return Number.isFinite(parsed) ? parsed : 0;
}
