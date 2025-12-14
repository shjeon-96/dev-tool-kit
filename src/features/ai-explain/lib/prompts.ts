export type ExplainContext = "regex" | "json" | "error" | "code" | "general";

export interface PromptTemplate {
  system: string;
  userPrefix: string;
}

export const EXPLAIN_PROMPTS: Record<ExplainContext, PromptTemplate> = {
  regex: {
    system: `You are a regex expert. Explain regular expressions in a clear, educational way.
Break down each component of the regex pattern and explain what it matches.
Use examples to illustrate. Keep explanations concise but thorough.
Format your response in markdown with sections for: Overview, Components, Examples, and Common Use Cases.`,
    userPrefix: "Explain this regular expression pattern:\n\n",
  },
  json: {
    system: `You are a JSON expert. Analyze JSON data structures and explain them clearly.
Describe the schema, data types, nesting structure, and potential use cases.
Point out any unusual patterns or best practices.
Format your response in markdown.`,
    userPrefix: "Analyze and explain this JSON structure:\n\n",
  },
  error: {
    system: `You are a debugging expert. Analyze error messages and provide helpful explanations.
Explain what the error means, its common causes, and how to fix it.
Provide code examples if relevant.
Format your response in markdown with sections for: Error Meaning, Common Causes, and Solutions.`,
    userPrefix: "Explain this error and how to fix it:\n\n",
  },
  code: {
    system: `You are a code reviewer and educator. Explain code snippets clearly.
Describe what the code does, its structure, and any important concepts.
Point out potential improvements if relevant.
Format your response in markdown.`,
    userPrefix: "Explain this code:\n\n",
  },
  general: {
    system: `You are a helpful technical assistant. Explain the given content clearly and concisely.
Adapt your explanation to the type of content provided.
Format your response in markdown.`,
    userPrefix: "Explain this:\n\n",
  },
};

export function detectContext(input: string): ExplainContext {
  // Check for regex patterns
  if (
    /^\/.*\/[gimsuvy]*$/.test(input.trim()) ||
    (/[\^$.*+?\[\]{}()|\\]/.test(input) && input.length < 200)
  ) {
    return "regex";
  }

  // Check for JSON
  try {
    JSON.parse(input);
    return "json";
  } catch {
    // Not JSON
  }

  // Check for error messages
  const errorPatterns = [
    /error:/i,
    /exception/i,
    /failed to/i,
    /cannot /i,
    /undefined is not/i,
    /typeerror/i,
    /syntaxerror/i,
    /referenceerror/i,
    /traceback/i,
    /at line \d+/i,
  ];
  if (errorPatterns.some((p) => p.test(input))) {
    return "error";
  }

  // Check for code patterns
  const codePatterns = [
    /function\s+\w+/,
    /const\s+\w+\s*=/,
    /let\s+\w+\s*=/,
    /var\s+\w+\s*=/,
    /class\s+\w+/,
    /import\s+.*from/,
    /export\s+(default\s+)?/,
    /def\s+\w+\(/,
    /async\s+/,
    /=>\s*{/,
  ];
  if (codePatterns.some((p) => p.test(input))) {
    return "code";
  }

  return "general";
}

export function buildPrompt(
  input: string,
  context?: ExplainContext,
): { system: string; user: string } {
  const detectedContext = context || detectContext(input);
  const template = EXPLAIN_PROMPTS[detectedContext];

  return {
    system: template.system,
    user: template.userPrefix + input,
  };
}
