"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isInView: boolean;
  hasAnimated: boolean;
}

/**
 * Hook for triggering animations when elements enter the viewport
 * Uses Intersection Observer for performant scroll-based animations
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
): UseScrollAnimationReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasAnimated };
}

/**
 * Hook for staggered animations on multiple elements
 * Returns animation delay based on index
 */
export function useStaggeredAnimation(
  index: number,
  baseDelay: number = 0.1,
): { style: { animationDelay: string }; className: string } {
  return {
    style: { animationDelay: `${index * baseDelay}s` },
    className: "animate-fade-in-up opacity-0",
  };
}
