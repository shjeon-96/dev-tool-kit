import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-4 border-t bg-muted/30">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-muted-foreground px-6">
        <p>© 2025 Web Toolkit. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="hover:underline hover:text-foreground transition-colors"
          >
            개인정보처리방침
          </Link>
          <Link
            href="https://github.com/shjeon-96"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
