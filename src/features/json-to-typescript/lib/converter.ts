export interface ConvertResult {
  success: boolean;
  output: string;
  error?: string;
}

export interface ConvertOptions {
  rootName: string;
  useInterface: boolean;
  optionalProperties: boolean;
  addExport: boolean;
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const types = [...new Set(value.map(getType))];
    if (types.length === 1) return `${types[0]}[]`;
    return `(${types.join(" | ")})[]`;
  }
  if (typeof value === "object") return "object";
  return typeof value;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sanitizeName(name: string): string {
  // Remove invalid characters and convert to camelCase
  return name
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function generateInterface(
  obj: Record<string, unknown>,
  name: string,
  options: ConvertOptions,
  interfaces: Map<string, string>,
): string {
  const keyword = options.useInterface ? "interface" : "type";
  const exportKeyword = options.addExport ? "export " : "";
  const optional = options.optionalProperties ? "?" : "";

  const properties: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
      ? key
      : `"${key}"`;

    if (value === null) {
      properties.push(`  ${sanitizedKey}${optional}: null;`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        properties.push(`  ${sanitizedKey}${optional}: unknown[];`);
      } else if (typeof value[0] === "object" && value[0] !== null) {
        const itemName = capitalize(sanitizeName(key)) + "Item";
        generateInterface(
          value[0] as Record<string, unknown>,
          itemName,
          options,
          interfaces,
        );
        properties.push(`  ${sanitizedKey}${optional}: ${itemName}[];`);
      } else {
        const types = [...new Set(value.map(getType))];
        const typeStr =
          types.length === 1 ? types[0] : `(${types.join(" | ")})`;
        properties.push(`  ${sanitizedKey}${optional}: ${typeStr}[];`);
      }
    } else if (typeof value === "object") {
      const nestedName = capitalize(sanitizeName(key));
      generateInterface(
        value as Record<string, unknown>,
        nestedName,
        options,
        interfaces,
      );
      properties.push(`  ${sanitizedKey}${optional}: ${nestedName};`);
    } else {
      properties.push(`  ${sanitizedKey}${optional}: ${typeof value};`);
    }
  }

  const interfaceStr =
    keyword === "interface"
      ? `${exportKeyword}${keyword} ${name} {\n${properties.join("\n")}\n}`
      : `${exportKeyword}${keyword} ${name} = {\n${properties.join("\n")}\n};`;

  interfaces.set(name, interfaceStr);
  return interfaceStr;
}

export function jsonToTypescript(
  jsonString: string,
  options: ConvertOptions,
): ConvertResult {
  try {
    const parsed = JSON.parse(jsonString);

    if (typeof parsed !== "object" || parsed === null) {
      return {
        success: false,
        output: "",
        error: "Input must be a JSON object or array",
      };
    }

    const interfaces = new Map<string, string>();

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return {
          success: true,
          output: `${options.addExport ? "export " : ""}type ${options.rootName} = unknown[];`,
        };
      }
      if (typeof parsed[0] === "object" && parsed[0] !== null) {
        generateInterface(
          parsed[0] as Record<string, unknown>,
          options.rootName + "Item",
          options,
          interfaces,
        );
        const exportKeyword = options.addExport ? "export " : "";
        interfaces.set(
          options.rootName,
          `${exportKeyword}type ${options.rootName} = ${options.rootName}Item[];`,
        );
      } else {
        const types = [...new Set(parsed.map(getType))];
        const typeStr =
          types.length === 1 ? types[0] : `(${types.join(" | ")})`;
        return {
          success: true,
          output: `${options.addExport ? "export " : ""}type ${options.rootName} = ${typeStr}[];`,
        };
      }
    } else {
      generateInterface(
        parsed as Record<string, unknown>,
        options.rootName,
        options,
        interfaces,
      );
    }

    // Sort interfaces: nested first, root last
    const sortedInterfaces = Array.from(interfaces.entries())
      .sort(([a], [b]) => {
        if (a === options.rootName) return 1;
        if (b === options.rootName) return -1;
        return a.localeCompare(b);
      })
      .map(([, value]) => value);

    return {
      success: true,
      output: sortedInterfaces.join("\n\n"),
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}
