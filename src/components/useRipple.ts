"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function useRipple(variant: "teal" | "mint" = "mint") {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  const createRipple = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      // Respect prefers-reduced-motion
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 1.5;

      const rippleColor =
        variant === "teal"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(15, 61, 62, 0.15)";

      const newRipple: RippleItem = {
        id: Date.now() + Math.random(),
        x,
        y,
        size,
        color: rippleColor,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    },
    [variant]
  );

  return { ripples, createRipple, containerRef };
}

/**
 * Global Idle Animation Viewport Controller
 * Keeps maximum 2 idle animations running concurrently and only when in viewport.
 */
let activeIdleCount = 0;
const MAX_CONCURRENT_IDLE = 2;

export function useIdleAnimationObserver(elementRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("anim-idle-disabled");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (activeIdleCount < MAX_CONCURRENT_IDLE) {
            activeIdleCount++;
            el.classList.remove("anim-idle-disabled");
          } else {
            el.classList.add("anim-idle-disabled");
          }
        } else {
          if (!el.classList.contains("anim-idle-disabled")) {
            activeIdleCount = Math.max(0, activeIdleCount - 1);
          }
          el.classList.add("anim-idle-disabled");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        el.classList.add("anim-idle-disabled");
      } else {
        if (activeIdleCount < MAX_CONCURRENT_IDLE) {
          el.classList.remove("anim-idle-disabled");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (el && !el.classList.contains("anim-idle-disabled")) {
        activeIdleCount = Math.max(0, activeIdleCount - 1);
      }
    };
  }, [elementRef]);
}
