"use client";

import { useState, useCallback } from "react";
import type { GenerateType } from "@/entities/generate-type";

interface UseGenerateTypeReturn {
  output: string;
  outputs: string[];
  generate: () => void;
  generateMultiple: (count: number) => void;
  clear: () => void;
  isProcessing: boolean;
  count: number;
  setCount: (count: number) => void;
  options: GeneratorOptions;
  setOptions: (options: GeneratorOptions) => void;
}

interface GeneratorOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  prefix?: string;
  separator?: string;
}

const DEFAULT_OPTIONS: GeneratorOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
  prefix: "",
  separator: "-",
};

export function useGenerateType(
  generatorType: GenerateType,
): UseGenerateTypeReturn {
  const [output, setOutput] = useState("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState<GeneratorOptions>(DEFAULT_OPTIONS);

  const generateUUID = useCallback((): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }, []);

  const generatePassword = useCallback((opts: GeneratorOptions): string => {
    let chars = "";
    if (opts.includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (opts.includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (opts.includeNumbers) chars += "0123456789";
    if (opts.includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    const length = opts.length || 16;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const generateLoremIpsum = useCallback((): string => {
    const words = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "do",
      "eiusmod",
      "tempor",
      "incididunt",
      "ut",
      "labore",
      "et",
      "dolore",
      "magna",
      "aliqua",
      "enim",
      "ad",
      "minim",
      "veniam",
      "quis",
      "nostrud",
      "exercitation",
      "ullamco",
      "laboris",
      "nisi",
      "aliquip",
      "ex",
      "ea",
      "commodo",
      "consequat",
      "duis",
      "aute",
      "irure",
      "in",
      "reprehenderit",
      "voluptate",
      "velit",
      "esse",
      "cillum",
      "fugiat",
      "nulla",
      "pariatur",
      "excepteur",
      "sint",
      "occaecat",
      "cupidatat",
      "non",
      "proident",
      "sunt",
      "culpa",
      "qui",
      "officia",
      "deserunt",
      "mollit",
      "anim",
      "id",
      "est",
      "laborum",
    ];

    const sentenceLength = Math.floor(Math.random() * 10) + 5;
    const sentence = [];
    for (let i = 0; i < sentenceLength; i++) {
      sentence.push(words[Math.floor(Math.random() * words.length)]);
    }
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    return sentence.join(" ") + ".";
  }, []);

  const generateColor = useCallback((): string => {
    const hex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${hex.toUpperCase()}`;
  }, []);

  const generateName = useCallback((): string => {
    const firstNames = [
      "James",
      "Mary",
      "John",
      "Patricia",
      "Robert",
      "Jennifer",
      "Michael",
      "Linda",
      "William",
      "Elizabeth",
      "David",
      "Barbara",
      "Richard",
      "Susan",
      "Joseph",
      "Jessica",
      "Thomas",
      "Sarah",
      "Charles",
      "Karen",
      "Min",
      "Jae",
      "Yuki",
      "Hana",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Gonzalez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Kim",
      "Park",
      "Lee",
      "Tanaka",
      "Yamamoto",
      "Suzuki",
    ];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }, []);

  const generateEmail = useCallback((): string => {
    const domains = [
      "example.com",
      "test.com",
      "mail.com",
      "demo.org",
      "sample.net",
    ];
    const name = generateName().toLowerCase().replace(" ", ".");
    return `${name}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }, [generateName]);

  const generatePhone = useCallback((): string => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const subscriber = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${exchange}-${subscriber}`;
  }, []);

  const generateAddress = useCallback((): string => {
    const streets = [
      "Main St",
      "Oak Ave",
      "Park Blvd",
      "Maple Dr",
      "Cedar Ln",
      "Elm St",
    ];
    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "San Francisco",
    ];
    const states = ["NY", "CA", "IL", "TX", "AZ", "CA"];
    const idx = Math.floor(Math.random() * cities.length);
    const streetNum = Math.floor(Math.random() * 9999) + 1;
    const zip = Math.floor(Math.random() * 90000) + 10000;
    return `${streetNum} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[idx]}, ${states[idx]} ${zip}`;
  }, []);

  const generateCreditCard = useCallback((): string => {
    // Generate test card numbers (Stripe test patterns)
    const prefixes = [
      "4242424242424242",
      "4000056655665556",
      "5555555555554444",
    ];
    return prefixes[Math.floor(Math.random() * prefixes.length)]
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }, []);

  const generateTimestamp = useCallback((): string => {
    return Math.floor(Date.now() / 1000).toString();
  }, []);

  const generateHash = useCallback((): string => {
    const chars = "abcdef0123456789";
    let hash = "";
    for (let i = 0; i < 64; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }, []);

  const generateSlug = useCallback((): string => {
    const words = [
      "how",
      "to",
      "create",
      "build",
      "generate",
      "make",
      "awesome",
      "great",
      "best",
      "top",
    ];
    const count = Math.floor(Math.random() * 3) + 3;
    const slug = [];
    for (let i = 0; i < count; i++) {
      slug.push(words[Math.floor(Math.random() * words.length)]);
    }
    return slug.join("-");
  }, []);

  const generateApiKey = useCallback((opts: GeneratorOptions): string => {
    const prefix = opts.prefix || "sk_live_";
    const keyLength = (opts.length || 32) - prefix.length;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < keyLength; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + key;
  }, []);

  const generateJWT = useCallback((): string => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: generateUUID(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    );
    const signature = generateHash().slice(0, 43);
    return `${header}.${payload}.${signature}`;
  }, [generateUUID, generateHash]);

  const generateNumber = useCallback((opts: GeneratorOptions): string => {
    const max = opts.length || 100;
    return Math.floor(Math.random() * max).toString();
  }, []);

  const generateString = useCallback(
    (opts: GeneratorOptions): string => {
      return generatePassword({
        ...opts,
        includeSymbols: false,
      });
    },
    [generatePassword],
  );

  const generateSingle = useCallback((): string => {
    switch (generatorType.slug) {
      case "uuid":
        return generateUUID();
      case "password":
        return generatePassword(options);
      case "lorem":
        return generateLoremIpsum();
      case "color":
        return generateColor();
      case "name":
        return generateName();
      case "email":
        return generateEmail();
      case "phone":
        return generatePhone();
      case "address":
        return generateAddress();
      case "credit-card":
        return generateCreditCard();
      case "timestamp":
        return generateTimestamp();
      case "hash":
        return generateHash();
      case "slug":
        return generateSlug();
      case "api-key":
        return generateApiKey(options);
      case "jwt":
        return generateJWT();
      case "number":
        return generateNumber(options);
      case "string":
        return generateString(options);
      default:
        return generateUUID();
    }
  }, [
    generatorType.slug,
    options,
    generateUUID,
    generatePassword,
    generateLoremIpsum,
    generateColor,
    generateName,
    generateEmail,
    generatePhone,
    generateAddress,
    generateCreditCard,
    generateTimestamp,
    generateHash,
    generateSlug,
    generateApiKey,
    generateJWT,
    generateNumber,
    generateString,
  ]);

  const generate = useCallback(() => {
    setIsProcessing(true);
    try {
      const result = generateSingle();
      setOutput(result);
      setOutputs([result]);
    } finally {
      setIsProcessing(false);
    }
  }, [generateSingle]);

  const generateMultiple = useCallback(
    (cnt: number) => {
      setIsProcessing(true);
      try {
        const results: string[] = [];
        for (let i = 0; i < cnt; i++) {
          results.push(generateSingle());
        }
        setOutput(results[0]);
        setOutputs(results);
      } finally {
        setIsProcessing(false);
      }
    },
    [generateSingle],
  );

  const clear = useCallback(() => {
    setOutput("");
    setOutputs([]);
  }, []);

  return {
    output,
    outputs,
    generate,
    generateMultiple,
    clear,
    isProcessing,
    count,
    setCount,
    options,
    setOptions,
  };
}
