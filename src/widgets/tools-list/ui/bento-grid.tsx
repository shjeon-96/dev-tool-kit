"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Crown } from "lucide-react";
import { tools, type ToolSlug } from "@/entities/tool";
import { cn } from "@/shared/lib/utils";

interface BentoCardProps {
  slug: ToolSlug;
  size?: "normal" | "large" | "wide";
  index: number;
}

const sizeClasses = {
  normal: "col-span-1 row-span-1",
  large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  wide: "col-span-1 md:col-span-2 row-span-1",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
  tap: { scale: 0.98 },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
      scale: {
        type: "spring" as const,
        stiffness: 300,
      },
    },
  },
};

const glowVariants = {
  rest: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export function BentoCard({ slug, size = "normal", index }: BentoCardProps) {
  const locale = useLocale();
  const t = useTranslations("tools");
  const tool = tools[slug];

  // Spotlight effect state
  const divRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  if (!tool) return null;

  const Icon = tool.icon;
  const isLarge = size === "large";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(sizeClasses[size])}
    >
      <Link href={`/${locale}/tools/${slug}`} className="block h-full">
        <motion.div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          variants={hoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className={cn(
            "group relative h-full overflow-hidden rounded-2xl border bg-card p-6",
            "transition-colors duration-300",
            "hover:border-primary/50 hover:bg-card/80",
            isLarge && "flex flex-col justify-between",
          )}
        >
          {/* Spotlight Effect - Hidden on mobile for performance */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hidden md:block"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
            }}
          />
          {/* Spotlight Light Mode override */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 dark:hidden hidden md:block"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,.05), transparent 40%)`,
            }}
          />

          {/* Glow effect */}
          <motion.div
            variants={glowVariants}
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
          />

          {/* Glassmorphism overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02]" />

          {/* Premium Badge */}
          {tool.isPremium && (
            <div className="absolute top-3 right-3 z-20">
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                <Crown className="h-3 w-3" />
                <span>PRO</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={cn("relative z-10", isLarge && "flex-1")}>
            {/* Icon */}
            <motion.div
              variants={iconVariants}
              className={cn(
                "mb-4 inline-flex items-center justify-center rounded-xl bg-muted/80 backdrop-blur-sm",
                isLarge ? "h-16 w-16" : "h-12 w-12",
              )}
            >
              <Icon
                className={cn(
                  "text-muted-foreground transition-colors group-hover:text-primary",
                  isLarge ? "h-8 w-8" : "h-6 w-6",
                )}
              />
            </motion.div>

            {/* Title & Description */}
            <h3
              className={cn(
                "font-semibold tracking-tight transition-colors group-hover:text-primary",
                isLarge ? "text-xl mb-2" : "text-base mb-1",
              )}
            >
              {t(`${slug}.title`)}
            </h3>
            <p
              className={cn(
                "text-muted-foreground",
                isLarge ? "text-sm line-clamp-3" : "text-xs line-clamp-2",
              )}
            >
              {t(`${slug}.description`)}
            </p>
          </div>

          {/* Arrow indicator (large cards only) */}
          {isLarge && (
            <motion.div
              className="relative z-10 mt-4 flex items-center text-xs text-muted-foreground"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <span className="group-hover:text-primary transition-colors">
                Open tool
              </span>
              <motion.svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>
          )}

          {/* Bottom gradient (for depth effect) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface BentoGridProps {
  slugs: ToolSlug[];
  className?: string;
}

// Define which tools should be featured (larger)
const featuredTools: ToolSlug[] = [
  "json-formatter",
  "jwt-decoder",
  "qr-generator",
  "color-picker",
];

const wideTools: ToolSlug[] = ["image-resizer", "diff-checker"];

export function BentoGrid({ slugs, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        "auto-rows-fr",
        className,
      )}
    >
      {slugs.map((slug, index) => {
        let size: "normal" | "large" | "wide" = "normal";

        // First item in each category can be large
        if (index === 0 && featuredTools.includes(slug)) {
          size = "large";
        } else if (wideTools.includes(slug)) {
          size = "wide";
        }

        return <BentoCard key={slug} slug={slug} size={size} index={index} />;
      })}
    </div>
  );
}
