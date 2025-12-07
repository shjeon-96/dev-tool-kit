import { ReactNode } from "react";

interface CheatsheetLayoutProps {
  children: ReactNode;
}

export default function CheatsheetLayout({ children }: CheatsheetLayoutProps) {
  return <div className="container max-w-5xl py-8 px-4">{children}</div>;
}
