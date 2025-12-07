import type { CheatsheetItem } from "../model/types";

export const typescriptSyntax: CheatsheetItem[] = [
  // Basic Types
  {
    code: "string",
    name: "String",
    description: "Text values",
    category: "Basic Types",
  },
  {
    code: "number",
    name: "Number",
    description: "All numeric values (int and float)",
    category: "Basic Types",
  },
  {
    code: "boolean",
    name: "Boolean",
    description: "true or false",
    category: "Basic Types",
  },
  {
    code: "null",
    name: "Null",
    description: "Intentionally empty value",
    category: "Basic Types",
  },
  {
    code: "undefined",
    name: "Undefined",
    description: "Value not yet assigned",
    category: "Basic Types",
  },
  {
    code: "any",
    name: "Any",
    description: "Disable type checking (avoid)",
    category: "Basic Types",
  },
  {
    code: "unknown",
    name: "Unknown",
    description: "Type-safe any (requires narrowing)",
    category: "Basic Types",
  },
  {
    code: "void",
    name: "Void",
    description: "No return value",
    category: "Basic Types",
  },
  {
    code: "never",
    name: "Never",
    description: "Never returns (throws or infinite)",
    category: "Basic Types",
  },
  {
    code: "object",
    name: "Object",
    description: "Non-primitive type",
    category: "Basic Types",
  },
  {
    code: "bigint",
    name: "BigInt",
    description: "Large integers",
    category: "Basic Types",
  },
  {
    code: "symbol",
    name: "Symbol",
    description: "Unique identifiers",
    category: "Basic Types",
  },

  // Type Annotations
  {
    code: "let x: string = 'hello'",
    name: "Variable annotation",
    description: "Annotate variable type",
    category: "Annotations",
  },
  {
    code: "function fn(a: string): number",
    name: "Function annotation",
    description: "Annotate parameters and return",
    category: "Annotations",
  },
  {
    code: "const fn = (a: string): number => { }",
    name: "Arrow function annotation",
    description: "Annotate arrow function",
    category: "Annotations",
  },
  {
    code: "let x: string | number",
    name: "Union type",
    description: "Value can be multiple types",
    category: "Annotations",
  },
  {
    code: "let x: string & HasId",
    name: "Intersection type",
    description: "Value has all types",
    category: "Annotations",
  },
  {
    code: "let x: 'a' | 'b' | 'c'",
    name: "Literal type",
    description: "Exact value types",
    category: "Annotations",
  },

  // Arrays & Tuples
  {
    code: "string[]",
    name: "Array type",
    description: "Array of strings",
    category: "Arrays & Tuples",
  },
  {
    code: "Array<string>",
    name: "Array generic",
    description: "Array of strings (generic syntax)",
    category: "Arrays & Tuples",
  },
  {
    code: "[string, number]",
    name: "Tuple",
    description: "Fixed-length array with types",
    category: "Arrays & Tuples",
  },
  {
    code: "[string, ...number[]]",
    name: "Rest tuple",
    description: "Tuple with rest elements",
    category: "Arrays & Tuples",
  },
  {
    code: "readonly string[]",
    name: "Readonly array",
    description: "Immutable array",
    category: "Arrays & Tuples",
  },

  // Interfaces
  {
    code: "interface Name { prop: type }",
    name: "Interface",
    description: "Define object shape",
    category: "Interfaces",
  },
  {
    code: "interface A extends B { }",
    name: "Extends interface",
    description: "Extend existing interface",
    category: "Interfaces",
  },
  {
    code: "interface A extends B, C { }",
    name: "Multiple extends",
    description: "Extend multiple interfaces",
    category: "Interfaces",
  },
  {
    code: "prop?: type",
    name: "Optional property",
    description: "Property may be undefined",
    category: "Interfaces",
  },
  {
    code: "readonly prop: type",
    name: "Readonly property",
    description: "Property cannot be changed",
    category: "Interfaces",
  },
  {
    code: "[key: string]: type",
    name: "Index signature",
    description: "Dynamic property names",
    category: "Interfaces",
  },
  {
    code: "(arg: type): returnType",
    name: "Call signature",
    description: "Interface for functions",
    category: "Interfaces",
  },
  {
    code: "new (arg: type): Type",
    name: "Construct signature",
    description: "Interface for constructors",
    category: "Interfaces",
  },

  // Type Aliases
  {
    code: "type Name = { prop: type }",
    name: "Type alias",
    description: "Create named type",
    category: "Type Aliases",
  },
  {
    code: "type Union = A | B | C",
    name: "Union type alias",
    description: "Named union type",
    category: "Type Aliases",
  },
  {
    code: "type Callback = (x: T) => void",
    name: "Function type alias",
    description: "Named function type",
    category: "Type Aliases",
  },
  {
    code: "type Obj = { [K in Keys]: V }",
    name: "Mapped type",
    description: "Transform existing type",
    category: "Type Aliases",
  },
  {
    code: "type Result = T extends U ? X : Y",
    name: "Conditional type",
    description: "Type based on condition",
    category: "Type Aliases",
  },

  // Generics
  {
    code: "function fn<T>(arg: T): T",
    name: "Generic function",
    description: "Function with type parameter",
    category: "Generics",
  },
  {
    code: "interface Box<T> { value: T }",
    name: "Generic interface",
    description: "Interface with type parameter",
    category: "Generics",
  },
  {
    code: "class Container<T> { }",
    name: "Generic class",
    description: "Class with type parameter",
    category: "Generics",
  },
  {
    code: "<T extends Constraint>",
    name: "Constrained generic",
    description: "Generic with constraint",
    category: "Generics",
  },
  {
    code: "<T extends keyof U>",
    name: "Keyof constraint",
    description: "T must be key of U",
    category: "Generics",
  },
  {
    code: "<T = DefaultType>",
    name: "Default generic",
    description: "Generic with default type",
    category: "Generics",
  },
  {
    code: "<T, K extends keyof T>",
    name: "Multiple generics",
    description: "Multiple type parameters",
    category: "Generics",
  },

  // Utility Types
  {
    code: "Partial<T>",
    name: "Partial",
    description: "Make all properties optional",
    category: "Utility Types",
  },
  {
    code: "Required<T>",
    name: "Required",
    description: "Make all properties required",
    category: "Utility Types",
  },
  {
    code: "Readonly<T>",
    name: "Readonly",
    description: "Make all properties readonly",
    category: "Utility Types",
  },
  {
    code: "Record<K, V>",
    name: "Record",
    description: "Object with keys K and values V",
    category: "Utility Types",
  },
  {
    code: "Pick<T, K>",
    name: "Pick",
    description: "Pick properties K from T",
    category: "Utility Types",
  },
  {
    code: "Omit<T, K>",
    name: "Omit",
    description: "Remove properties K from T",
    category: "Utility Types",
  },
  {
    code: "Exclude<T, U>",
    name: "Exclude",
    description: "Remove types U from union T",
    category: "Utility Types",
  },
  {
    code: "Extract<T, U>",
    name: "Extract",
    description: "Extract types U from union T",
    category: "Utility Types",
  },
  {
    code: "NonNullable<T>",
    name: "NonNullable",
    description: "Remove null and undefined",
    category: "Utility Types",
  },
  {
    code: "ReturnType<T>",
    name: "ReturnType",
    description: "Get function return type",
    category: "Utility Types",
  },
  {
    code: "Parameters<T>",
    name: "Parameters",
    description: "Get function parameters as tuple",
    category: "Utility Types",
  },
  {
    code: "InstanceType<T>",
    name: "InstanceType",
    description: "Get class instance type",
    category: "Utility Types",
  },
  {
    code: "Awaited<T>",
    name: "Awaited",
    description: "Unwrap Promise type",
    category: "Utility Types",
  },

  // Type Operators
  {
    code: "keyof T",
    name: "Keyof",
    description: "Union of property names",
    category: "Type Operators",
  },
  {
    code: "typeof value",
    name: "Typeof",
    description: "Get type of value",
    category: "Type Operators",
  },
  {
    code: "T[K]",
    name: "Indexed access",
    description: "Get property type",
    category: "Type Operators",
  },
  {
    code: "T['prop']",
    name: "Property access",
    description: "Get specific property type",
    category: "Type Operators",
  },
  {
    code: "T[number]",
    name: "Array element type",
    description: "Get array element type",
    category: "Type Operators",
  },

  // Type Guards
  {
    code: "typeof x === 'string'",
    name: "Typeof guard",
    description: "Narrow with typeof",
    category: "Type Guards",
  },
  {
    code: "x instanceof Class",
    name: "Instanceof guard",
    description: "Narrow with instanceof",
    category: "Type Guards",
  },
  {
    code: "'prop' in obj",
    name: "In guard",
    description: "Narrow by property existence",
    category: "Type Guards",
  },
  {
    code: "x is Type",
    name: "Type predicate",
    description: "Custom type guard return",
    category: "Type Guards",
  },
  {
    code: "function isType(x): x is Type { }",
    name: "Custom type guard",
    description: "User-defined type guard",
    category: "Type Guards",
  },
  {
    code: "x as Type",
    name: "Type assertion",
    description: "Assert type (use carefully)",
    category: "Type Guards",
  },
  {
    code: "x!",
    name: "Non-null assertion",
    description: "Assert non-null (use carefully)",
    category: "Type Guards",
  },
  {
    code: "x satisfies Type",
    name: "Satisfies",
    description: "Validate type without widening",
    category: "Type Guards",
  },

  // Classes
  {
    code: "class Name { prop: type }",
    name: "Class property",
    description: "Typed class property",
    category: "Classes",
  },
  {
    code: "public / private / protected",
    name: "Access modifiers",
    description: "Control property visibility",
    category: "Classes",
  },
  {
    code: "#privateField",
    name: "Private field",
    description: "Runtime private field",
    category: "Classes",
  },
  {
    code: "static prop: type",
    name: "Static property",
    description: "Class-level property",
    category: "Classes",
  },
  {
    code: "abstract class Name { }",
    name: "Abstract class",
    description: "Cannot be instantiated",
    category: "Classes",
  },
  {
    code: "abstract method(): type",
    name: "Abstract method",
    description: "Must be implemented in subclass",
    category: "Classes",
  },
  {
    code: "implements Interface",
    name: "Implements",
    description: "Class implements interface",
    category: "Classes",
  },
  {
    code: "constructor(public prop: T) { }",
    name: "Parameter property",
    description: "Shorthand property declaration",
    category: "Classes",
  },

  // Enums
  {
    code: "enum Name { A, B, C }",
    name: "Numeric enum",
    description: "Enum with numeric values",
    category: "Enums",
  },
  {
    code: "enum Name { A = 'a', B = 'b' }",
    name: "String enum",
    description: "Enum with string values",
    category: "Enums",
  },
  {
    code: "const enum Name { A, B }",
    name: "Const enum",
    description: "Inlined at compile time",
    category: "Enums",
  },
  {
    code: "type Dir = 'up' | 'down'",
    name: "Union alternative",
    description: "String union instead of enum",
    category: "Enums",
  },
  {
    code: "as const",
    name: "Const assertion",
    description: "Make literal types readonly",
    category: "Enums",
  },

  // Modules
  {
    code: "import type { T } from 'mod'",
    name: "Import type",
    description: "Import only types (erased)",
    category: "Modules",
  },
  {
    code: "export type { T }",
    name: "Export type",
    description: "Export only types",
    category: "Modules",
  },
  {
    code: "import { type T, fn } from 'mod'",
    name: "Inline type import",
    description: "Mix type and value imports",
    category: "Modules",
  },
  {
    code: "declare module 'name' { }",
    name: "Module declaration",
    description: "Augment external module types",
    category: "Modules",
  },
  {
    code: "declare global { }",
    name: "Global declaration",
    description: "Add to global scope",
    category: "Modules",
  },

  // Advanced
  {
    code: "infer U",
    name: "Infer",
    description: "Infer type in conditional",
    category: "Advanced",
  },
  {
    code: "type T = { [P in K]: V }",
    name: "Mapped type",
    description: "Transform object type",
    category: "Advanced",
  },
  {
    code: "+readonly / -readonly",
    name: "Modifier mapping",
    description: "Add/remove modifiers in mapped type",
    category: "Advanced",
  },
  {
    code: "as NewKey",
    name: "Key remapping",
    description: "Rename keys in mapped type",
    category: "Advanced",
  },
  {
    code: "type T = T extends ... ? ... : ...",
    name: "Conditional type",
    description: "Type-level conditionals",
    category: "Advanced",
  },
  {
    code: "T extends (...args: infer P) => any",
    name: "Function inference",
    description: "Infer function parameter types",
    category: "Advanced",
  },
  {
    code: "template literal types",
    name: "Template literals",
    description: "`${A}${B}` type patterns",
    category: "Advanced",
  },
  {
    code: "const assertions",
    name: "Const context",
    description: "as const for literal types",
    category: "Advanced",
  },
];
