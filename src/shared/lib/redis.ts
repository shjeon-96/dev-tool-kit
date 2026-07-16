import "server-only";

interface RedisResult {
  result?: unknown;
  error?: string;
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Vercel KV is not configured");
  return { url, token };
}

export async function runRedisPipeline(commands: (string | number)[][]) {
  const { url, token } = redisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Vercel KV returned ${response.status}`);
  const results = (await response.json()) as RedisResult[];
  const failure = results.find((result) => result.error);
  if (failure?.error) throw new Error(failure.error);
  return results;
}
