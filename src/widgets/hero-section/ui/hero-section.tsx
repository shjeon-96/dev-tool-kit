"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui";
import { HeroSearchBar } from "@/widgets/hero-search-bar";

interface HeroSectionProps {
  locale: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HeroSection({
  locale,
  badge,
  title,
  subtitle,
  cta,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="text-center space-y-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            {badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={item} className="pt-4">
          <HeroSearchBar />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-lg shadow-primary/20"
          >
            <Link href={`/${locale}/tools`}>
              {cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 backdrop-blur-sm"
          >
            <a
              href="https://github.com/jsh-me/dev-tool-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              {ctaSecondary}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
