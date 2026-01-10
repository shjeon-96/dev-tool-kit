"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Check, X } from "lucide-react";

interface ShareButtonProps {
  title: string;
  label: string;
}

export function ShareButton({ title, label }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    }
  };

  const shareToX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420",
    );
    setIsOpen(false);
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420",
    );
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full border bg-card hover:bg-secondary transition-colors"
        aria-label={label}
        aria-expanded={isOpen}
      >
        <Share2 className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-48 rounded-xl border bg-card shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="p-1">
            <button
              onClick={shareToX}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <X className="h-4 w-4" />
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>

            <div className="h-px bg-border my-1" />

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-left"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">복사됨!</span>
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" />
                  <span>링크 복사</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
