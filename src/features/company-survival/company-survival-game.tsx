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
  ACTION_CARDS,
  CARD_UNLOCKS,
  CEO_TRAITS,
  INDUSTRY_RULES,
  getActionCard,
  getIncident,
  isCardUnlocked,
  isCeoTraitUnlocked,
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
  getDepartmentLevel,
  getPlacementDepartments,
  getTurnHand,
  isValidDeck,
  playActionCard,
  selectCeoTrait,
  selectGameDeck,
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
import {
  COMPANY_DEPARTMENTS,
  type CeoTrait,
  type CompanyCareerStats,
  type CompanyGameState,
  type CompanyIndustry,
  type CompanyMetric,
  type Department,
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
const SPRITES: Record<Department, string> = {
  engineering: "/game/engineer-sheet-v2.webp",
  design: "/game/designer-sheet-v2.webp",
  sales: "/game/sales-sheet-v2.webp",
  operations: "/game/operator-sheet-v2.webp",
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
    hand: "카드 1장을 선택하세요",
    burn: "목표: 6개월 생존 · 고정비 -10",
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
    noUndo: "카드 실행 → 팀 생산 → 돌발 사건",
    placing: "배치할 부서를 선택하세요",
    placeHint: "빛나는 부서를 클릭하면 이번 달이 실행됩니다.",
    selected: "선택됨",
    place: "배치",
    departments: {
      engineering: "개발",
      design: "디자인",
      sales: "영업",
      operations: "운영",
    },
    deckTitle: "시작 덱 구성",
    deckRule: "8장 선택 · 직원/프로젝트/자금 각 1장 이상",
    deckKinds: { employee: "직원", project: "프로젝트", funding: "자금" },
    countered: "이전 투자가 위기를 막았습니다",
    completed: "프로젝트 완료",
    production: "이번 달 팀 생산",
  },
  en: {
    title: "Build the company before it breaks.",
    deck: "Play one of three actions each month. Staff the office, chain departments, and reach Demo Day after six months.",
    choose: "Choose company and CEO trait",
    start: "Start month one",
    resume: "Return to war room",
    month: "MONTH",
    hand: "CHOOSE ONE CARD",
    burn: "GOAL: SURVIVE 6 MONTHS · BURN -10",
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
    noUndo: "PLAY CARD → TEAM PRODUCES → CRISIS HITS",
    placing: "CHOOSE A DEPARTMENT",
    placeHint: "Click a glowing team to commit this month.",
    selected: "SELECTED",
    place: "PLACE",
    departments: {
      engineering: "ENGINEERING",
      design: "DESIGN",
      sales: "SALES",
      operations: "OPERATIONS",
    },
    deckTitle: "BUILD STARTING DECK",
    deckRule: "Choose 8 · include employee, project, and funding",
    deckKinds: { employee: "EMPLOYEE", project: "PROJECT", funding: "FUNDING" },
    countered: "A prior investment countered the crisis",
    completed: "PROJECT COMPLETED",
    production: "TEAM PRODUCTION",
  },
  ja: {
    title: "壊れる前に、会社を作れ。",
    deck: "毎月3枚から1枚を実行。チームを配置し、連鎖を作り、6か月後のデモデイを目指す。",
    choose: "会社とCEO特性を選択",
    start: "1か月目を開始",
    resume: "作戦室へ戻る",
    month: "MONTH",
    hand: "カードを1枚選択",
    burn: "目標：6か月生存・固定費 -10",
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
    noUndo: "カード実行 → チーム生産 → 緊急事態",
    placing: "配置する部門を選択",
    placeHint: "光る部門をクリックすると今月を実行します。",
    selected: "選択中",
    place: "配置",
    departments: {
      engineering: "開発",
      design: "デザイン",
      sales: "営業",
      operations: "運営",
    },
    deckTitle: "開始デッキ編成",
    deckRule: "8枚選択・社員/プロジェクト/資金を各1枚以上",
    deckKinds: { employee: "社員", project: "プロジェクト", funding: "資金" },
    countered: "以前の投資が危機を防ぎました",
    completed: "プロジェクト完了",
    production: "今月のチーム生産",
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
  const [draftDeck, setDraftDeck] = useState<string[]>(game.deck);
  const [selectedCardId, setSelectedCardId] = useState<string>();
  const hand = useMemo(
    () =>
      game.status === "playing"
        ? getTurnHand(
            date,
            industry,
            game.turn,
            game.deck,
            game.completedProjects,
          )
        : [],
    [date, game.completedProjects, game.deck, game.status, game.turn, industry],
  );
  const selectedCard = selectedCardId
    ? getActionCard(selectedCardId)
    : undefined;

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
        setDraftDeck(stored.value.deck);
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
        deck: game.deck,
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
    setDraftDeck(
      stored.kind === "valid"
        ? stored.value.deck
        : createInitialGameState(date, value).deck,
    );
    setShowReport(stored.kind === "valid" && Boolean(stored.value.lastReport));
    setSelectedCardId(undefined);
  };
  const chooseTrait = (trait: CeoTrait) => {
    setGame((state) => selectCeoTrait(state, trait));
  };
  const start = () => {
    if (!isValidDeck(draftDeck)) return;
    setGame((state) => selectGameDeck(state, draftDeck));
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
  const play = (cardId: string, department: Department) => {
    const next = playActionCard(game, cardId, department);
    writeStoredRun(localStorage, next);
    if (next.status !== "playing") {
      const archive = recordCompletedRun(localStorage, next);
      setCareer(deriveCareerStats(archive, date));
    }
    setGame(next);
    setSelectedCardId(undefined);
    setShowReport(true);
    beep(muted, next.status === "survived");
    trackGameEvent("choice_made", {
      card: cardId,
      department,
      turn: next.turn,
      trait: next.trait,
    });
  };
  const next = () => {
    setSelectedCardId(undefined);
    setShowReport(false);
  };
  const retry = () => {
    clearStoredRun(localStorage, date, industry);
    setGame(
      selectGameDeck(
        createInitialGameState(date, industry, game.trait),
        game.deck,
      ),
    );
    setShowReport(false);
    setSelectedCardId(undefined);
    setRank("");
    beep(muted);
  };
  const toggleDeckCard = (cardId: string) => {
    setDraftDeck((deck) =>
      deck.includes(cardId)
        ? deck.filter((id) => id !== cardId)
        : deck.length < 8
          ? [...deck, cardId]
          : deck,
    );
  };

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
              disabled={!isValidDeck(draftDeck)}
            >
              {game.turn ? ui.resume : ui.start}
              <ArrowRight />
            </button>
          </div>
          <div className="lobby-office" aria-hidden="true">
            <Image
              src="/game/office-board-v2.webp"
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
                  <small>{INDUSTRY_RULES[profile.id].passive[locale]}</small>
                </button>
              ))}
            </div>
            <div className="trait-strip">
              {CEO_TRAITS.map((trait, index) => {
                const open = isCeoTraitUnlocked(trait.id, career.daysPlayed);
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
            <div className="deck-builder">
              <header>
                <h2>{ui.deckTitle}</h2>
                <span className={isValidDeck(draftDeck) ? "is-ready" : ""}>
                  {draftDeck.length} / 8 · {ui.deckRule}
                </span>
              </header>
              <div>
                {ACTION_CARDS.map((card) => {
                  const requiredRuns = CARD_UNLOCKS[card.id] ?? 0;
                  const open = isCardUnlocked(card.id, career.daysPlayed);
                  return (
                    <button
                      type="button"
                      key={card.id}
                      disabled={!open}
                      aria-pressed={draftDeck.includes(card.id)}
                      onClick={() => toggleDeckCard(card.id)}
                    >
                      {!open && <LockKeyhole />}
                      <span>{ui.deckKinds[card.kind]}</span>
                      <b>{card.title[locale]}</b>
                      <small>
                        {open
                          ? card.detail[locale]
                          : `${ui.locked} · ${requiredRuns}`}
                      </small>
                    </button>
                  );
                })}
              </div>
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
            active={showReport ? game.lastReport?.department : undefined}
            selectedCardId={selectedCardId}
            locale={locale}
            onPlace={(department) => {
              if (selectedCardId) play(selectedCardId, department);
            }}
          />
          {showReport && game.lastReport ? (
            <TurnReport game={game} locale={locale} onNext={next} />
          ) : (
            <div className="action-dock">
              <header>
                <div>
                  <span>{selectedCard ? ui.placing : ui.hand}</span>
                  <small>
                    {selectedCard ? selectedCard.title[locale] : ui.burn}
                  </small>
                </div>
                <p>{selectedCard ? ui.placeHint : ui.noUndo}</p>
              </header>
              <div className="card-hand">
                {hand.map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    className={`action-card dept-${card.department} ${selectedCardId === card.id ? "is-selected" : ""}`}
                    aria-pressed={selectedCardId === card.id}
                    onClick={() =>
                      setSelectedCardId((selected) =>
                        selected === card.id ? undefined : card.id,
                      )
                    }
                  >
                    <span>{ui.deckKinds[card.kind]}</span>
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
                      {selectedCardId === card.id ? ui.selected : ui.select}
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
  selectedCardId,
  locale,
  onPlace,
}: {
  game: CompanyGameState;
  active?: Department;
  selectedCardId?: string;
  locale: Locale;
  onPlace: (department: Department) => void;
}) {
  const ui = UI[locale];
  const targets = selectedCardId
    ? getPlacementDepartments(game, selectedCardId)
    : [];
  return (
    <section
      className={`office-board ${selectedCardId ? "is-placing" : ""}`}
      aria-label="Office board"
    >
      <Image
        className="office-bg"
        src="/game/office-board-v2.webp"
        alt="Late-night startup office"
        fill
        priority
        sizes="(max-width: 1050px) 100vw, 70vw"
      />
      {COMPANY_DEPARTMENTS.map((department) => (
        <button
          type="button"
          key={department}
          className={`office-unit unit-${department} ${game.employees[department] === 0 ? "is-empty" : ""} ${active === department ? "is-working" : ""} ${targets.includes(department) ? "is-target" : ""}`}
          disabled={!targets.includes(department)}
          aria-label={`${ui.place} · ${ui.departments[department]}`}
          onClick={() => onPlace(department)}
        >
          <div
            className="sprite"
            style={
              game.employees[department]
                ? { backgroundImage: `url(${SPRITES[department]})` }
                : undefined
            }
          />
          <span>
            {ui.departments[department]}
            <b>LV.{getDepartmentLevel(game, department)}</b>
            <em>×{game.employees[department]}</em>
          </span>
          {getDepartmentLevel(game, department) > 1 && (
            <i>
              <Zap />
              {ui.project} {getDepartmentLevel(game, department)}
            </i>
          )}
        </button>
      ))}
      <div className="project-rack">
        {game.deck
          .map(getActionCard)
          .filter((card) => card.kind === "project")
          .map((card) => (
            <span
              key={card.id}
              className={
                game.completedProjects.includes(card.id) ? "is-complete" : ""
              }
            >
              {card.title[locale]}
              <b>
                {game.projects[card.id] ?? 0}/{card.projectTarget}
              </b>
              {game.projectDepartments[card.id] && (
                <em>{ui.departments[game.projectDepartments[card.id]]}</em>
              )}
            </span>
          ))}
      </div>
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
      <p>
        {report.incidentCountered && incident.counterBody
          ? incident.counterBody[locale]
          : incident.body[locale]}
      </p>
      {report.incidentCountered && <p className="countered">{ui.countered}</p>}
      <div className="report-divider" />
      <strong>
        {card.title[locale]} → {ui.departments[report.department]}
      </strong>
      {report.projectCompleted && (
        <p className="completed-project">{ui.completed}</p>
      )}
      {Object.values(report.production).some(Boolean) && (
        <p className="production-line">
          {ui.production} ·{" "}
          {Object.entries(report.production)
            .filter(([, value]) => value)
            .map(
              ([metric, value]) =>
                `${COMPANY_COPY[locale].effectLabels[metric as CompanyMetric]} ${value > 0 ? "+" : ""}${value}`,
            )
            .join(" / ")}
        </p>
      )}
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
