export type AIProvider = "openai" | "anthropic" | "google";

export interface AIProviderConfig {
  id: AIProvider;
  name: string;
  endpoint: string;
  models: string[];
  defaultModel: string;
  keyPrefix: string;
}

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openai: {
    id: "openai",
    name: "OpenAI",
    endpoint: "https://api.openai.com/v1/chat/completions",
    models: ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"],
    defaultModel: "gpt-4o-mini",
    keyPrefix: "sk-",
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    models: ["claude-3-haiku-20240307", "claude-3-5-sonnet-20241022"],
    defaultModel: "claude-3-haiku-20240307",
    keyPrefix: "sk-ant-",
  },
  google: {
    id: "google",
    name: "Google AI",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    models: ["gemini-1.5-flash", "gemini-1.5-pro"],
    defaultModel: "gemini-1.5-flash",
    keyPrefix: "AI",
  },
};

export function validateApiKey(provider: AIProvider, key: string): boolean {
  if (!key || key.length < 20) return false;
  const config = AI_PROVIDERS[provider];
  return key.startsWith(config.keyPrefix);
}

export interface AIRequestParams {
  provider: AIProvider;
  model: string;
  apiKey: string;
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
}

export async function callAI(params: AIRequestParams): Promise<string> {
  const {
    provider,
    model,
    apiKey,
    systemPrompt,
    userPrompt,
    maxTokens = 1024,
  } = params;
  const config = AI_PROVIDERS[provider];

  try {
    if (provider === "openai") {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "OpenAI API error");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    }

    if (provider === "anthropic") {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Anthropic API error");
      }

      const data = await response.json();
      return data.content[0].text;
    }

    if (provider === "google") {
      const url = `${config.endpoint}/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { maxOutputTokens: maxTokens },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Google AI API error");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error(`Unknown provider: ${provider}`);
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Failed to call AI API");
  }
}
