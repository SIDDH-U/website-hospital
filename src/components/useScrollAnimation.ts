"use client";

import { useEffect, useState } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    // 1. Enable iOS Safari :active state
    const handleTouchStart = () => {};
    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    // 2. Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }

    // 3. Fade-up 16px on scroll observer (plays once)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    // 4. Touch device middle-band observer (-35% 0px -35% 0px)
    let touchObserver: IntersectionObserver | null = null;
    const isTouch = window.matchMedia("(hover: none)").matches;

    if (isTouch) {
      touchObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("touch-middle-active");
            } else {
              entry.target.classList.remove("touch-middle-active");
            }
          });
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0.2 }
      );

      document.querySelectorAll(".touch-card-observer").forEach((el) => {
        touchObserver?.observe(el);
      });
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      revealObserver.disconnect();
      touchObserver?.disconnect();
    };
  }, []);
}

// Hook to track header compact state on scroll > 20px
export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}

// Counter animation hook
export function useCountUp(target: number, isVisible: boolean, duration: number = 1200, decimals: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Number((ease * target).toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, isVisible, duration, decimals]);

  return count;
}
