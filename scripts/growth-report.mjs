const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
if (!url || !token) throw new Error("Vercel KV is not configured");

const endArgument = process.argv.find((value) => value.startsWith("--end="));
const end = endArgument?.slice(6) ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(end)) throw new Error("Use --end=YYYY-MM-DD");

function shiftDate(date, days) {
  const value = new Date(`${date}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

async function pipeline(commands) {
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Vercel KV returned ${response.status}`);
  const results = await response.json();
  const failure = results.find((result) => result.error);
  if (failure) throw new Error(failure.error);
  return results.map((result) => result.result);
}

function rate(numerator, denominator) {
  return denominator ? `${((numerator / denominator) * 100).toFixed(1)}%` : "—";
}

const dates = Array.from({ length: 14 }, (_, index) =>
  shiftDate(end, index - 13),
);
const values = await pipeline(
  dates.flatMap((date) => [
    ["SCARD", `runway10:cohort:first:v1:${date}`],
    ["SCARD", `runway10:cohort:d1:v1:${date}`],
    ["SCARD", `runway10:cohort:d7:v1:${date}`],
    ["SCARD", `runway10:activity:start:v1:${date}`],
    ["SCARD", `runway10:activity:complete:v1:${date}`],
    ["SCARD", `runway10:activity:share:v1:${date}`],
    ["SCARD", `runway10:referral:landed:v1:${date}`],
    ["SCARD", `runway10:referral:started:v1:${date}`],
    ["SCARD", `runway10:experiment:run-length:v1:start:6:${date}`],
    ["SCARD", `runway10:experiment:run-length:v1:complete:6:${date}`],
    ["SCARD", `runway10:experiment:run-length:v1:start:10:${date}`],
    ["SCARD", `runway10:experiment:run-length:v1:complete:10:${date}`],
  ]),
);

const rows = dates.map((date, index) => {
  const [first, d1, d7, starts, completed, shares, landed, referredStarts] =
    values.slice(index * 12, index * 12 + 8);
  return {
    date,
    new: first,
    starts,
    completed,
    completion: rate(completed, starts),
    d1: date < end ? rate(d1, first) : "pending",
    d7: date <= shiftDate(end, -7) ? rate(d7, first) : "pending",
    shares,
    shareRate: rate(shares, completed),
    referrals: `${referredStarts}/${landed}`,
  };
});
console.table(rows);

const totals = {
  6: { starts: 0, complete: 0 },
  10: { starts: 0, complete: 0 },
};
dates.forEach((_, index) => {
  totals[6].starts += values[index * 12 + 8];
  totals[6].complete += values[index * 12 + 9];
  totals[10].starts += values[index * 12 + 10];
  totals[10].complete += values[index * 12 + 11];
});
console.table(
  [6, 10].map((variant) => ({
    variant,
    starts: totals[variant].starts,
    completed: totals[variant].complete,
    completion: rate(totals[variant].complete, totals[variant].starts),
  })),
);

const completedPlayers = await pipeline(
  dates
    .slice(-7)
    .map((date) => ["SMEMBERS", `runway10:activity:complete:v1:${date}`]),
);
const completionDays = new Map();
for (const players of completedPlayers) {
  for (const player of players) {
    completionDays.set(player, (completionDays.get(player) ?? 0) + 1);
  }
}
const repeatCompleters = [...completionDays.values()].filter(
  (days) => days >= 3,
).length;
console.log(`7-day repeat completers (3+ days): ${repeatCompleters}`);
