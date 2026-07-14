import { Binary, Braces, Clock3, Fingerprint, Hash, Link2 } from "lucide-react";
import type { ToolIconName } from "@/shared/config/tools";

const ICONS = {
  binary: Binary,
  braces: Braces,
  clock: Clock3,
  fingerprint: Fingerprint,
  hash: Hash,
  link: Link2,
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
