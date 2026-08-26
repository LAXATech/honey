"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {},
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
}

export function useStaggeredScrollAnimation<T extends HTMLElement = HTMLElement>(
  itemCount: number,
  options: ScrollAnimationOptions = {},
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          const items = Array.from({ length: itemCount }, (_, i) => i);
          items.forEach((i) => {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]));
            }, i * 100);
          });
          if (triggerOnce) {
            observer.unobserve(container);
          }
        } else if (!triggerOnce) {
          setVisibleItems(new Set());
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin, triggerOnce]);

  return { ref: containerRef, visibleItems };
}
