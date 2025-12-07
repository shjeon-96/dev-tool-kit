import type { CheatsheetItem } from "../model/types";

export const javascriptSyntax: CheatsheetItem[] = [
  // Variables
  {
    code: "const name = value",
    name: "Constant",
    description: "Declare a constant (cannot be reassigned)",
    category: "Variables",
  },
  {
    code: "let name = value",
    name: "Let",
    description: "Declare a block-scoped variable",
    category: "Variables",
  },
  {
    code: "var name = value",
    name: "Var",
    description: "Declare a function-scoped variable (legacy)",
    category: "Variables",
  },

  // Data Types
  {
    code: "typeof value",
    name: "Type check",
    description: "Returns type of value as string",
    category: "Data Types",
  },
  {
    code: "Array.isArray(value)",
    name: "Array check",
    description: "Check if value is an array",
    category: "Data Types",
  },
  {
    code: "value instanceof Class",
    name: "Instance check",
    description: "Check if value is instance of class",
    category: "Data Types",
  },

  // String Methods
  {
    code: "str.length",
    name: "String length",
    description: "Get the length of a string",
    category: "Strings",
  },
  {
    code: "str.toUpperCase()",
    name: "Uppercase",
    description: "Convert string to uppercase",
    category: "Strings",
  },
  {
    code: "str.toLowerCase()",
    name: "Lowercase",
    description: "Convert string to lowercase",
    category: "Strings",
  },
  {
    code: "str.trim()",
    name: "Trim",
    description: "Remove whitespace from both ends",
    category: "Strings",
  },
  {
    code: "str.split(separator)",
    name: "Split",
    description: "Split string into array",
    category: "Strings",
  },
  {
    code: "str.slice(start, end)",
    name: "Slice",
    description: "Extract portion of string",
    category: "Strings",
  },
  {
    code: "str.includes(search)",
    name: "Includes",
    description: "Check if string contains substring",
    category: "Strings",
  },
  {
    code: "str.replace(search, replace)",
    name: "Replace",
    description: "Replace first occurrence",
    category: "Strings",
  },
  {
    code: "str.replaceAll(search, replace)",
    name: "Replace all",
    description: "Replace all occurrences",
    category: "Strings",
  },
  {
    code: "`Hello ${name}`",
    name: "Template literal",
    description: "String interpolation with backticks",
    category: "Strings",
  },

  // Array Methods
  {
    code: "arr.length",
    name: "Array length",
    description: "Get the length of an array",
    category: "Arrays",
  },
  {
    code: "arr.push(item)",
    name: "Push",
    description: "Add item to end of array",
    category: "Arrays",
  },
  {
    code: "arr.pop()",
    name: "Pop",
    description: "Remove and return last item",
    category: "Arrays",
  },
  {
    code: "arr.shift()",
    name: "Shift",
    description: "Remove and return first item",
    category: "Arrays",
  },
  {
    code: "arr.unshift(item)",
    name: "Unshift",
    description: "Add item to beginning of array",
    category: "Arrays",
  },
  {
    code: "arr.slice(start, end)",
    name: "Slice",
    description: "Return shallow copy of portion",
    category: "Arrays",
  },
  {
    code: "arr.splice(start, count, ...items)",
    name: "Splice",
    description: "Change array by removing/adding items",
    category: "Arrays",
  },
  {
    code: "arr.concat(arr2)",
    name: "Concat",
    description: "Merge two or more arrays",
    category: "Arrays",
  },
  {
    code: "[...arr1, ...arr2]",
    name: "Spread merge",
    description: "Merge arrays using spread operator",
    category: "Arrays",
  },
  {
    code: "arr.indexOf(item)",
    name: "Index of",
    description: "Find index of item (-1 if not found)",
    category: "Arrays",
  },
  {
    code: "arr.includes(item)",
    name: "Includes",
    description: "Check if array contains item",
    category: "Arrays",
  },
  {
    code: "arr.find(fn)",
    name: "Find",
    description: "Return first element matching condition",
    category: "Arrays",
  },
  {
    code: "arr.findIndex(fn)",
    name: "Find index",
    description: "Return index of first matching element",
    category: "Arrays",
  },

  // Array Iteration
  {
    code: "arr.forEach(fn)",
    name: "ForEach",
    description: "Execute function for each element",
    category: "Array Iteration",
  },
  {
    code: "arr.map(fn)",
    name: "Map",
    description: "Create new array with transformed elements",
    category: "Array Iteration",
  },
  {
    code: "arr.filter(fn)",
    name: "Filter",
    description: "Create new array with elements passing test",
    category: "Array Iteration",
  },
  {
    code: "arr.reduce(fn, init)",
    name: "Reduce",
    description: "Reduce array to single value",
    category: "Array Iteration",
  },
  {
    code: "arr.every(fn)",
    name: "Every",
    description: "Check if all elements pass test",
    category: "Array Iteration",
  },
  {
    code: "arr.some(fn)",
    name: "Some",
    description: "Check if any element passes test",
    category: "Array Iteration",
  },
  {
    code: "arr.sort((a, b) => a - b)",
    name: "Sort",
    description: "Sort array (numeric ascending)",
    category: "Array Iteration",
  },
  {
    code: "arr.reverse()",
    name: "Reverse",
    description: "Reverse array in place",
    category: "Array Iteration",
  },
  {
    code: "arr.flat(depth)",
    name: "Flat",
    description: "Flatten nested arrays",
    category: "Array Iteration",
  },
  {
    code: "arr.flatMap(fn)",
    name: "FlatMap",
    description: "Map then flatten result",
    category: "Array Iteration",
  },

  // Objects
  {
    code: "{ key: value }",
    name: "Object literal",
    description: "Create object with key-value pairs",
    category: "Objects",
  },
  {
    code: "{ key }",
    name: "Shorthand property",
    description: "Property shorthand when key equals variable name",
    category: "Objects",
  },
  {
    code: "obj.key or obj['key']",
    name: "Access property",
    description: "Access object property",
    category: "Objects",
  },
  {
    code: "obj?.key",
    name: "Optional chaining",
    description: "Safe property access (returns undefined if null)",
    category: "Objects",
  },
  {
    code: "Object.keys(obj)",
    name: "Keys",
    description: "Get array of object keys",
    category: "Objects",
  },
  {
    code: "Object.values(obj)",
    name: "Values",
    description: "Get array of object values",
    category: "Objects",
  },
  {
    code: "Object.entries(obj)",
    name: "Entries",
    description: "Get array of [key, value] pairs",
    category: "Objects",
  },
  {
    code: "Object.assign(target, source)",
    name: "Assign",
    description: "Copy properties to target object",
    category: "Objects",
  },
  {
    code: "{ ...obj1, ...obj2 }",
    name: "Spread merge",
    description: "Merge objects using spread operator",
    category: "Objects",
  },
  {
    code: "const { a, b } = obj",
    name: "Destructuring",
    description: "Extract properties into variables",
    category: "Objects",
  },
  {
    code: "'key' in obj",
    name: "In operator",
    description: "Check if property exists in object",
    category: "Objects",
  },
  {
    code: "obj.hasOwnProperty('key')",
    name: "Has own property",
    description: "Check if object has own property",
    category: "Objects",
  },

  // Functions
  {
    code: "function name(params) { }",
    name: "Function declaration",
    description: "Declare a named function",
    category: "Functions",
  },
  {
    code: "const fn = function() { }",
    name: "Function expression",
    description: "Assign anonymous function to variable",
    category: "Functions",
  },
  {
    code: "const fn = () => { }",
    name: "Arrow function",
    description: "ES6 arrow function syntax",
    category: "Functions",
  },
  {
    code: "const fn = (a, b = 10) => a + b",
    name: "Default parameter",
    description: "Set default value for parameter",
    category: "Functions",
  },
  {
    code: "const fn = (...args) => { }",
    name: "Rest parameters",
    description: "Collect remaining arguments into array",
    category: "Functions",
  },
  {
    code: "fn(...arr)",
    name: "Spread arguments",
    description: "Spread array as function arguments",
    category: "Functions",
  },

  // Async/Await
  {
    code: "async function fn() { }",
    name: "Async function",
    description: "Declare an async function",
    category: "Async",
  },
  {
    code: "await promise",
    name: "Await",
    description: "Wait for promise to resolve",
    category: "Async",
  },
  {
    code: "Promise.all([p1, p2])",
    name: "Promise.all",
    description: "Wait for all promises to resolve",
    category: "Async",
  },
  {
    code: "Promise.race([p1, p2])",
    name: "Promise.race",
    description: "Resolve with first settled promise",
    category: "Async",
  },
  {
    code: "Promise.allSettled([p1, p2])",
    name: "Promise.allSettled",
    description: "Wait for all promises to settle",
    category: "Async",
  },
  {
    code: "new Promise((resolve, reject) => { })",
    name: "Promise constructor",
    description: "Create a new promise",
    category: "Async",
  },
  {
    code: "promise.then(fn).catch(fn).finally(fn)",
    name: "Promise chain",
    description: "Chain promise handlers",
    category: "Async",
  },

  // Classes
  {
    code: "class Name { constructor() { } }",
    name: "Class",
    description: "Declare a class with constructor",
    category: "Classes",
  },
  {
    code: "class Child extends Parent { }",
    name: "Extends",
    description: "Create a subclass",
    category: "Classes",
  },
  {
    code: "super()",
    name: "Super",
    description: "Call parent constructor or method",
    category: "Classes",
  },
  {
    code: "static methodName() { }",
    name: "Static method",
    description: "Define a static method",
    category: "Classes",
  },
  {
    code: "get propName() { }",
    name: "Getter",
    description: "Define a getter",
    category: "Classes",
  },
  {
    code: "set propName(value) { }",
    name: "Setter",
    description: "Define a setter",
    category: "Classes",
  },
  {
    code: "#privateField",
    name: "Private field",
    description: "Private class field (ES2022)",
    category: "Classes",
  },

  // Control Flow
  {
    code: "if (cond) { } else if { } else { }",
    name: "If/else",
    description: "Conditional statement",
    category: "Control Flow",
  },
  {
    code: "cond ? valueIfTrue : valueIfFalse",
    name: "Ternary operator",
    description: "Conditional expression",
    category: "Control Flow",
  },
  {
    code: "value ?? defaultValue",
    name: "Nullish coalescing",
    description: "Default for null/undefined only",
    category: "Control Flow",
  },
  {
    code: "value || defaultValue",
    name: "Logical OR",
    description: "Default for any falsy value",
    category: "Control Flow",
  },
  {
    code: "value && expression",
    name: "Logical AND",
    description: "Short-circuit evaluation",
    category: "Control Flow",
  },
  {
    code: "switch (val) { case x: break; }",
    name: "Switch",
    description: "Multiple condition branches",
    category: "Control Flow",
  },
  {
    code: "for (let i = 0; i < n; i++) { }",
    name: "For loop",
    description: "Classic for loop",
    category: "Control Flow",
  },
  {
    code: "for (const item of arr) { }",
    name: "For...of",
    description: "Iterate over iterable values",
    category: "Control Flow",
  },
  {
    code: "for (const key in obj) { }",
    name: "For...in",
    description: "Iterate over object keys",
    category: "Control Flow",
  },
  {
    code: "while (cond) { }",
    name: "While",
    description: "While loop",
    category: "Control Flow",
  },
  {
    code: "try { } catch (e) { } finally { }",
    name: "Try/catch",
    description: "Error handling",
    category: "Control Flow",
  },
  {
    code: "throw new Error('message')",
    name: "Throw",
    description: "Throw an error",
    category: "Control Flow",
  },

  // Modules
  {
    code: "import { x } from 'module'",
    name: "Named import",
    description: "Import named exports",
    category: "Modules",
  },
  {
    code: "import x from 'module'",
    name: "Default import",
    description: "Import default export",
    category: "Modules",
  },
  {
    code: "import * as name from 'module'",
    name: "Namespace import",
    description: "Import all exports as namespace",
    category: "Modules",
  },
  {
    code: "export { x }",
    name: "Named export",
    description: "Export named values",
    category: "Modules",
  },
  {
    code: "export default x",
    name: "Default export",
    description: "Export default value",
    category: "Modules",
  },
  {
    code: "import('module').then(m => { })",
    name: "Dynamic import",
    description: "Dynamically import module",
    category: "Modules",
  },
];
