import {
  Binary,
  Braces,
  Calculator,
  CaseSensitive,
  Clock3,
  CodeXml,
  CopyMinus,
  FileCode2,
  Fingerprint,
  Hash,
  KeyRound,
  Link2,
  ListTree,
  LockKeyhole,
  Palette,
  Regex,
  SortAsc,
  Table2,
  TextCursorInput,
  WandSparkles,
} from "lucide-react";
import type { ToolIconName } from "@/shared/config/tools";

const ICONS = {
  binary: Binary,
  braces: Braces,
  clock: Clock3,
  fingerprint: Fingerprint,
  hash: Hash,
  link: Link2,
  key: KeyRound,
  code: CodeXml,
  palette: Palette,
  regex: Regex,
  text: TextCursorInput,
  case: CaseSensitive,
  wand: WandSparkles,
  lock: LockKeyhole,
  calculator: Calculator,
  table: Table2,
  list: ListTree,
  "file-code": FileCode2,
  sort: SortAsc,
  "copy-minus": CopyMinus,
} satisfies Record<ToolIconName, typeof Binary>;

export function ToolIcon({
  name,
  size = 24,
}: {
  name: ToolIconName;
  size?: number;
}) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}
