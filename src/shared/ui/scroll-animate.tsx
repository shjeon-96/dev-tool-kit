"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { useScrollAnimation } from "@/shared/lib/hooks";
import { cn } from "@/shared/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "blur-in";

interface ScrollAnimateProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const animationClasses: Record<
  AnimationType,
  { initial: string; animate: string }
> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "blur-in": {
    initial: "opacity-0 blur-sm",
    animate: "opacity-100 blur-0",
  },
};

/**
 * Wrapper component for scroll-triggered animations
 * Uses Intersection Observer for performant viewport detection
 */
export function ScrollAnimate({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className,
  style,
  ...props
}: ScrollAnimateProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  const { initial, animate } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        isInView ? animate : initial,
        className,
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Staggered animation container for lists
 * Children are animated with increasing delays
 */
interface StaggerContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  staggerDelay?: number;
  variant?: "fade-up" | "slide-left" | "scale";
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  variant = "fade-up",
  className,
  ...props
}: StaggerContainerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.05,
    triggerOnce: true,
  });

  const variantClass = {
    "fade-up": "stagger-parent",
    "slide-left": "stagger-parent stagger-slide-left",
    scale: "stagger-parent stagger-scale",
  }[variant];

  return (
    <div
      ref={ref}
      className={cn(variantClass, className)}
      data-in-view={isInView}
      style={{ "--stagger-delay": `${staggerDelay}s` } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
