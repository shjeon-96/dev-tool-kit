import type { CheatsheetItem } from "../model/types";

export const nodejsSyntax: CheatsheetItem[] = [
  // Modules
  {
    code: "const fs = require('fs')",
    name: "CommonJS require",
    description: "Import CommonJS module",
    category: "Modules",
  },
  {
    code: "module.exports = { ... }",
    name: "CommonJS export",
    description: "Export CommonJS module",
    category: "Modules",
  },
  {
    code: "import fs from 'fs'",
    name: "ESM import",
    description: "ES module import",
    category: "Modules",
  },
  {
    code: "export default / export { ... }",
    name: "ESM export",
    description: "ES module export",
    category: "Modules",
  },
  {
    code: "import { readFile } from 'fs/promises'",
    name: "Named import",
    description: "Import specific exports",
    category: "Modules",
  },
  {
    code: "import * as fs from 'fs'",
    name: "Namespace import",
    description: "Import all as namespace",
    category: "Modules",
  },
  {
    code: "const mod = await import('./module.js')",
    name: "Dynamic import",
    description: "Runtime module loading",
    category: "Modules",
  },

  // File System
  {
    code: "fs.readFileSync(path, 'utf8')",
    name: "Read file sync",
    description: "Read file synchronously",
    category: "File System",
  },
  {
    code: "await fs.promises.readFile(path, 'utf8')",
    name: "Read file async",
    description: "Read file with promises",
    category: "File System",
  },
  {
    code: "fs.writeFileSync(path, data)",
    name: "Write file sync",
    description: "Write file synchronously",
    category: "File System",
  },
  {
    code: "await fs.promises.writeFile(path, data)",
    name: "Write file async",
    description: "Write file with promises",
    category: "File System",
  },
  {
    code: "fs.appendFileSync(path, data)",
    name: "Append file",
    description: "Append to file",
    category: "File System",
  },
  {
    code: "fs.existsSync(path)",
    name: "File exists",
    description: "Check if file exists",
    category: "File System",
  },
  {
    code: "fs.mkdirSync(path, { recursive: true })",
    name: "Create directory",
    description: "Create directory recursively",
    category: "File System",
  },
  {
    code: "fs.readdirSync(path)",
    name: "Read directory",
    description: "List directory contents",
    category: "File System",
  },
  {
    code: "fs.unlinkSync(path)",
    name: "Delete file",
    description: "Remove a file",
    category: "File System",
  },
  {
    code: "fs.rmSync(path, { recursive: true })",
    name: "Delete directory",
    description: "Remove directory recursively",
    category: "File System",
  },
  {
    code: "fs.renameSync(oldPath, newPath)",
    name: "Rename/Move",
    description: "Rename or move file",
    category: "File System",
  },
  {
    code: "fs.copyFileSync(src, dest)",
    name: "Copy file",
    description: "Copy a file",
    category: "File System",
  },
  {
    code: "fs.statSync(path)",
    name: "File stats",
    description: "Get file information",
    category: "File System",
  },
  {
    code: "fs.watchFile(path, callback)",
    name: "Watch file",
    description: "Watch for file changes",
    category: "File System",
  },
  {
    code: "fs.createReadStream(path)",
    name: "Read stream",
    description: "Stream file reading",
    category: "File System",
  },
  {
    code: "fs.createWriteStream(path)",
    name: "Write stream",
    description: "Stream file writing",
    category: "File System",
  },

  // Path
  {
    code: "path.join(dir, 'file.txt')",
    name: "path.join",
    description: "Join path segments",
    category: "Path",
  },
  {
    code: "path.resolve('./relative')",
    name: "path.resolve",
    description: "Resolve to absolute path",
    category: "Path",
  },
  {
    code: "path.basename('/dir/file.txt')",
    name: "path.basename",
    description: "Get filename from path",
    category: "Path",
  },
  {
    code: "path.dirname('/dir/file.txt')",
    name: "path.dirname",
    description: "Get directory from path",
    category: "Path",
  },
  {
    code: "path.extname('file.txt')",
    name: "path.extname",
    description: "Get file extension",
    category: "Path",
  },
  {
    code: "path.parse('/dir/file.txt')",
    name: "path.parse",
    description: "Parse path to object",
    category: "Path",
  },
  {
    code: "path.format({ dir, name, ext })",
    name: "path.format",
    description: "Create path from object",
    category: "Path",
  },
  {
    code: "path.isAbsolute('/path')",
    name: "path.isAbsolute",
    description: "Check if path is absolute",
    category: "Path",
  },
  {
    code: "path.relative(from, to)",
    name: "path.relative",
    description: "Get relative path",
    category: "Path",
  },
  {
    code: "__dirname / __filename",
    name: "Path globals",
    description: "Current directory/file (CJS)",
    category: "Path",
  },
  {
    code: "import.meta.url",
    name: "import.meta.url",
    description: "Current file URL (ESM)",
    category: "Path",
  },
  {
    code: "fileURLToPath(import.meta.url)",
    name: "fileURLToPath",
    description: "Convert URL to path (ESM)",
    category: "Path",
  },

  // Process
  {
    code: "process.argv",
    name: "process.argv",
    description: "Command line arguments",
    category: "Process",
  },
  {
    code: "process.env.NODE_ENV",
    name: "process.env",
    description: "Environment variables",
    category: "Process",
  },
  {
    code: "process.cwd()",
    name: "process.cwd",
    description: "Current working directory",
    category: "Process",
  },
  {
    code: "process.exit(0)",
    name: "process.exit",
    description: "Exit process with code",
    category: "Process",
  },
  {
    code: "process.pid",
    name: "process.pid",
    description: "Process ID",
    category: "Process",
  },
  {
    code: "process.platform",
    name: "process.platform",
    description: "Operating system platform",
    category: "Process",
  },
  {
    code: "process.version",
    name: "process.version",
    description: "Node.js version",
    category: "Process",
  },
  {
    code: "process.memoryUsage()",
    name: "process.memoryUsage",
    description: "Memory usage statistics",
    category: "Process",
  },
  {
    code: "process.stdin / process.stdout / process.stderr",
    name: "Standard streams",
    description: "Standard I/O streams",
    category: "Process",
  },
  {
    code: "process.on('exit', callback)",
    name: "Process events",
    description: "Process event handling",
    category: "Process",
  },
  {
    code: "process.nextTick(callback)",
    name: "process.nextTick",
    description: "Schedule for next tick",
    category: "Process",
  },

  // HTTP
  {
    code: "http.createServer((req, res) => {})",
    name: "Create server",
    description: "Create HTTP server",
    category: "HTTP",
  },
  {
    code: "server.listen(3000)",
    name: "server.listen",
    description: "Start listening on port",
    category: "HTTP",
  },
  {
    code: "req.method / req.url / req.headers",
    name: "Request properties",
    description: "Request object properties",
    category: "HTTP",
  },
  {
    code: "res.writeHead(200, { 'Content-Type': 'text/html' })",
    name: "res.writeHead",
    description: "Set response headers",
    category: "HTTP",
  },
  {
    code: "res.end('Hello World')",
    name: "res.end",
    description: "Send response and end",
    category: "HTTP",
  },
  {
    code: "res.setHeader('key', 'value')",
    name: "res.setHeader",
    description: "Set single header",
    category: "HTTP",
  },
  {
    code: "res.statusCode = 404",
    name: "res.statusCode",
    description: "Set response status code",
    category: "HTTP",
  },
  {
    code: "http.get(url, (res) => {})",
    name: "http.get",
    description: "Make GET request",
    category: "HTTP",
  },
  {
    code: "http.request(options, callback)",
    name: "http.request",
    description: "Make HTTP request",
    category: "HTTP",
  },

  // Fetch API (Node 18+)
  {
    code: "const res = await fetch(url)",
    name: "fetch",
    description: "Native fetch API",
    category: "Fetch",
  },
  {
    code: "const data = await res.json()",
    name: "res.json()",
    description: "Parse JSON response",
    category: "Fetch",
  },
  {
    code: "await res.text() / await res.blob()",
    name: "Response methods",
    description: "Other response formats",
    category: "Fetch",
  },
  {
    code: "fetch(url, { method: 'POST', body: JSON.stringify(data) })",
    name: "POST request",
    description: "Fetch with POST method",
    category: "Fetch",
  },

  // Events
  {
    code: "const emitter = new EventEmitter()",
    name: "EventEmitter",
    description: "Create event emitter",
    category: "Events",
  },
  {
    code: "emitter.on('event', callback)",
    name: "on",
    description: "Add event listener",
    category: "Events",
  },
  {
    code: "emitter.once('event', callback)",
    name: "once",
    description: "Listen once",
    category: "Events",
  },
  {
    code: "emitter.emit('event', data)",
    name: "emit",
    description: "Emit event",
    category: "Events",
  },
  {
    code: "emitter.off('event', callback)",
    name: "off",
    description: "Remove listener",
    category: "Events",
  },
  {
    code: "emitter.removeAllListeners('event')",
    name: "removeAllListeners",
    description: "Remove all listeners",
    category: "Events",
  },

  // Child Process
  {
    code: "exec('command', (err, stdout, stderr) => {})",
    name: "exec",
    description: "Execute shell command",
    category: "Child Process",
  },
  {
    code: "execSync('command')",
    name: "execSync",
    description: "Execute command synchronously",
    category: "Child Process",
  },
  {
    code: "spawn('command', ['args'])",
    name: "spawn",
    description: "Spawn child process",
    category: "Child Process",
  },
  {
    code: "fork('./worker.js')",
    name: "fork",
    description: "Fork Node process",
    category: "Child Process",
  },
  {
    code: "child.stdin / child.stdout / child.stderr",
    name: "Child streams",
    description: "Child process streams",
    category: "Child Process",
  },
  {
    code: "child.on('exit', (code) => {})",
    name: "Child events",
    description: "Child process events",
    category: "Child Process",
  },

  // Buffer
  {
    code: "Buffer.from('string')",
    name: "Buffer.from string",
    description: "Create buffer from string",
    category: "Buffer",
  },
  {
    code: "Buffer.from(array)",
    name: "Buffer.from array",
    description: "Create buffer from array",
    category: "Buffer",
  },
  {
    code: "Buffer.alloc(size)",
    name: "Buffer.alloc",
    description: "Allocate buffer with size",
    category: "Buffer",
  },
  {
    code: "buffer.toString('utf8')",
    name: "buffer.toString",
    description: "Convert buffer to string",
    category: "Buffer",
  },
  {
    code: "Buffer.concat([buf1, buf2])",
    name: "Buffer.concat",
    description: "Concatenate buffers",
    category: "Buffer",
  },
  {
    code: "buffer.length",
    name: "buffer.length",
    description: "Buffer byte length",
    category: "Buffer",
  },

  // Crypto
  {
    code: "crypto.randomBytes(16)",
    name: "randomBytes",
    description: "Generate random bytes",
    category: "Crypto",
  },
  {
    code: "crypto.randomUUID()",
    name: "randomUUID",
    description: "Generate random UUID",
    category: "Crypto",
  },
  {
    code: "crypto.createHash('sha256').update(data).digest('hex')",
    name: "createHash",
    description: "Create hash digest",
    category: "Crypto",
  },
  {
    code: "crypto.createHmac('sha256', key).update(data).digest('hex')",
    name: "createHmac",
    description: "Create HMAC digest",
    category: "Crypto",
  },
  {
    code: "crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha512')",
    name: "pbkdf2",
    description: "Password-based key derivation",
    category: "Crypto",
  },
  {
    code: "crypto.scryptSync(password, salt, keylen)",
    name: "scrypt",
    description: "Scrypt key derivation",
    category: "Crypto",
  },

  // OS
  {
    code: "os.platform()",
    name: "os.platform",
    description: "Operating system platform",
    category: "OS",
  },
  {
    code: "os.arch()",
    name: "os.arch",
    description: "CPU architecture",
    category: "OS",
  },
  {
    code: "os.cpus()",
    name: "os.cpus",
    description: "CPU information",
    category: "OS",
  },
  {
    code: "os.totalmem() / os.freemem()",
    name: "os.memory",
    description: "System memory info",
    category: "OS",
  },
  {
    code: "os.homedir()",
    name: "os.homedir",
    description: "User home directory",
    category: "OS",
  },
  {
    code: "os.tmpdir()",
    name: "os.tmpdir",
    description: "Temporary directory",
    category: "OS",
  },
  {
    code: "os.hostname()",
    name: "os.hostname",
    description: "System hostname",
    category: "OS",
  },
  {
    code: "os.networkInterfaces()",
    name: "os.networkInterfaces",
    description: "Network interface info",
    category: "OS",
  },

  // URL
  {
    code: "new URL('https://example.com/path?q=1')",
    name: "URL constructor",
    description: "Parse URL string",
    category: "URL",
  },
  {
    code: "url.href / url.origin / url.pathname",
    name: "URL properties",
    description: "URL component access",
    category: "URL",
  },
  {
    code: "url.searchParams.get('key')",
    name: "searchParams.get",
    description: "Get query parameter",
    category: "URL",
  },
  {
    code: "url.searchParams.set('key', 'value')",
    name: "searchParams.set",
    description: "Set query parameter",
    category: "URL",
  },
  {
    code: "new URLSearchParams({ key: 'value' })",
    name: "URLSearchParams",
    description: "Create query string",
    category: "URL",
  },

  // Util
  {
    code: "util.promisify(fs.readFile)",
    name: "util.promisify",
    description: "Convert callback to promise",
    category: "Util",
  },
  {
    code: "util.format('Hello %s', 'World')",
    name: "util.format",
    description: "Format string",
    category: "Util",
  },
  {
    code: "util.inspect(obj, { depth: null })",
    name: "util.inspect",
    description: "Inspect object for debugging",
    category: "Util",
  },
  {
    code: "util.types.isPromise(value)",
    name: "util.types",
    description: "Type checking utilities",
    category: "Util",
  },

  // Timers
  {
    code: "setTimeout(callback, ms)",
    name: "setTimeout",
    description: "Delay execution",
    category: "Timers",
  },
  {
    code: "setInterval(callback, ms)",
    name: "setInterval",
    description: "Repeat execution",
    category: "Timers",
  },
  {
    code: "setImmediate(callback)",
    name: "setImmediate",
    description: "Execute after I/O",
    category: "Timers",
  },
  {
    code: "clearTimeout / clearInterval / clearImmediate",
    name: "Clear timers",
    description: "Cancel timer",
    category: "Timers",
  },
  {
    code: "await setTimeout(ms)",
    name: "Async setTimeout",
    description: "Promise-based timer",
    category: "Timers",
  },

  // Console
  {
    code: "console.log() / console.error() / console.warn()",
    name: "Console output",
    description: "Output to console",
    category: "Console",
  },
  {
    code: "console.table(array)",
    name: "console.table",
    description: "Display as table",
    category: "Console",
  },
  {
    code: "console.time('label') / console.timeEnd('label')",
    name: "Console timer",
    description: "Measure execution time",
    category: "Console",
  },
  {
    code: "console.trace()",
    name: "console.trace",
    description: "Print stack trace",
    category: "Console",
  },
  {
    code: "console.dir(obj, { depth: null })",
    name: "console.dir",
    description: "Inspect object",
    category: "Console",
  },
];
