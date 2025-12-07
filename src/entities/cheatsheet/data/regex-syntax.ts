import type { CheatsheetItem } from "../model/types";

export const regexSyntax: CheatsheetItem[] = [
  // Metacharacters
  {
    code: ".",
    name: "Any character",
    description: "Matches any single character except newline",
    example: "a.c → abc, a1c",
    category: "Metacharacters",
  },
  {
    code: "^",
    name: "Start of line",
    description: "Matches the beginning of a line",
    example: "^Hello → Hello world",
    category: "Metacharacters",
  },
  {
    code: "$",
    name: "End of line",
    description: "Matches the end of a line",
    example: "world$ → Hello world",
    category: "Metacharacters",
  },
  {
    code: "\\",
    name: "Escape",
    description: "Escapes a special character",
    example: "\\. → matches literal .",
    category: "Metacharacters",
  },
  {
    code: "|",
    name: "Alternation",
    description: "Matches either expression",
    example: "cat|dog → cat or dog",
    category: "Metacharacters",
  },

  // Quantifiers
  {
    code: "*",
    name: "Zero or more",
    description: "Matches 0 or more of the preceding element",
    example: "ab*c → ac, abc, abbc",
    category: "Quantifiers",
  },
  {
    code: "+",
    name: "One or more",
    description: "Matches 1 or more of the preceding element",
    example: "ab+c → abc, abbc (not ac)",
    category: "Quantifiers",
  },
  {
    code: "?",
    name: "Zero or one",
    description: "Matches 0 or 1 of the preceding element",
    example: "colou?r → color, colour",
    category: "Quantifiers",
  },
  {
    code: "{n}",
    name: "Exactly n",
    description: "Matches exactly n occurrences",
    example: "a{3} → aaa",
    category: "Quantifiers",
  },
  {
    code: "{n,}",
    name: "n or more",
    description: "Matches n or more occurrences",
    example: "a{2,} → aa, aaa, aaaa",
    category: "Quantifiers",
  },
  {
    code: "{n,m}",
    name: "Between n and m",
    description: "Matches between n and m occurrences",
    example: "a{2,4} → aa, aaa, aaaa",
    category: "Quantifiers",
  },
  {
    code: "*?",
    name: "Lazy zero or more",
    description: "Non-greedy version of *",
    example: "a.*?b → shortest match",
    category: "Quantifiers",
  },

  // Character Classes
  {
    code: "[abc]",
    name: "Character set",
    description: "Matches any character in the set",
    example: "[aeiou] → vowels",
    category: "Character Classes",
  },
  {
    code: "[^abc]",
    name: "Negated set",
    description: "Matches any character not in the set",
    example: "[^0-9] → non-digits",
    category: "Character Classes",
  },
  {
    code: "[a-z]",
    name: "Range",
    description: "Matches any character in the range",
    example: "[a-z] → lowercase letters",
    category: "Character Classes",
  },
  {
    code: "\\d",
    name: "Digit",
    description: "Matches any digit [0-9]",
    example: "\\d{3} → 123, 456",
    category: "Character Classes",
  },
  {
    code: "\\D",
    name: "Non-digit",
    description: "Matches any non-digit [^0-9]",
    example: "\\D+ → abc",
    category: "Character Classes",
  },
  {
    code: "\\w",
    name: "Word character",
    description: "Matches [a-zA-Z0-9_]",
    example: "\\w+ → hello_123",
    category: "Character Classes",
  },
  {
    code: "\\W",
    name: "Non-word",
    description: "Matches [^a-zA-Z0-9_]",
    example: "\\W → @, #, space",
    category: "Character Classes",
  },
  {
    code: "\\s",
    name: "Whitespace",
    description: "Matches space, tab, newline",
    example: "a\\sb → a b",
    category: "Character Classes",
  },
  {
    code: "\\S",
    name: "Non-whitespace",
    description: "Matches any non-whitespace",
    example: "\\S+ → word",
    category: "Character Classes",
  },

  // Anchors
  {
    code: "\\b",
    name: "Word boundary",
    description: "Matches a word boundary",
    example: "\\bword\\b → word only",
    category: "Anchors",
  },
  {
    code: "\\B",
    name: "Non-word boundary",
    description: "Matches where \\b doesn't match",
    example: "\\Bword\\B → inwordly",
    category: "Anchors",
  },

  // Groups
  {
    code: "(abc)",
    name: "Capturing group",
    description: "Groups and captures the match",
    example: "(ab)+ → ab, abab",
    category: "Groups",
  },
  {
    code: "(?:abc)",
    name: "Non-capturing group",
    description: "Groups without capturing",
    example: "(?:ab)+ → groups only",
    category: "Groups",
  },
  {
    code: "(?<name>abc)",
    name: "Named group",
    description: "Named capturing group",
    example: "(?<year>\\d{4})",
    category: "Groups",
  },
  {
    code: "\\1",
    name: "Backreference",
    description: "Matches the nth captured group",
    example: "(a)\\1 → aa",
    category: "Groups",
  },

  // Lookahead/Lookbehind
  {
    code: "(?=abc)",
    name: "Positive lookahead",
    description: "Matches if followed by abc",
    example: "a(?=b) → a in ab",
    category: "Lookaround",
  },
  {
    code: "(?!abc)",
    name: "Negative lookahead",
    description: "Matches if not followed by abc",
    example: "a(?!b) → a in ac",
    category: "Lookaround",
  },
  {
    code: "(?<=abc)",
    name: "Positive lookbehind",
    description: "Matches if preceded by abc",
    example: "(?<=a)b → b in ab",
    category: "Lookaround",
  },
  {
    code: "(?<!abc)",
    name: "Negative lookbehind",
    description: "Matches if not preceded by abc",
    example: "(?<!a)b → b in cb",
    category: "Lookaround",
  },

  // Flags
  {
    code: "i",
    name: "Case insensitive",
    description: "Case insensitive matching",
    example: "/abc/i → ABC, abc",
    category: "Flags",
  },
  {
    code: "g",
    name: "Global",
    description: "Find all matches",
    example: "/a/g → all a's",
    category: "Flags",
  },
  {
    code: "m",
    name: "Multiline",
    description: "^ and $ match line boundaries",
    example: "/^a/m → each line",
    category: "Flags",
  },
  {
    code: "s",
    name: "Dotall",
    description: "Dot matches newlines too",
    example: "/a.b/s → a\\nb",
    category: "Flags",
  },
  {
    code: "u",
    name: "Unicode",
    description: "Enable Unicode matching",
    example: "/\\p{L}/u → letters",
    category: "Flags",
  },
];
