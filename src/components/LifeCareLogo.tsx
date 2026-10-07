import React from "react";
import Link from "next/link";

interface LifeCareLogoProps {
  variant?: "dark" | "light"; // "dark" = for light background (teal text), "light" = for dark background (white text)
  className?: string;
  showSubtitle?: boolean;
}

export function LifeCareLogo({
  variant = "dark",
  className = "",
  showSubtitle = true,
}: LifeCareLogoProps) {
  const isLight = variant === "light";

  const textColor = isLight ? "#FFFFFF" : "#0F3D3E";
  const crossColor = isLight ? "#FFFFFF" : "#0F3D3E";
  const leafColor1 = "#2DA870"; // vibrant medical leaf green
  const leafColor2 = isLight ? "#CDEBD8" : "#8FBFA3"; // soft mint / sage
  const subtextColor = isLight ? "#CDEBD8" : "#536462";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3E] rounded-lg p-0.5 ${className}`}
      aria-label="LifeCare Hospital home"
    >
      {/* Leaf and Cross Emblem */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Background soft circular glow */}
        <circle
          cx="20"
          cy="20"
          r="19"
          fill={isLight ? "rgba(205, 235, 216, 0.12)" : "rgba(205, 235, 216, 0.35)"}
        />

        {/* Natural Leaves on Left */}
        {/* Upper Leaf */}
        <path
          d="M17.5 13C12.5 13.5 10 17.5 11 22C13.5 22 17.5 20.5 18.5 16.5C18.8 15.2 18.5 13.8 17.5 13Z"
          fill={leafColor1}
        />
        {/* Lower Leaf */}
        <path
          d="M13.5 22C9.5 23 8 26.5 9.5 30C11.5 29.5 14.5 28 15 25C15.2 23.8 14.5 22.8 13.5 22Z"
          fill={leafColor2}
        />

        {/* Medical Cross on Right */}
        {/* Vertical Bar */}
        <rect
          x="22"
          y="11"
          width="6"
          height="18"
          rx="3"
          fill={crossColor}
        />
        {/* Horizontal Bar */}
        <rect
          x="16"
          y="17"
          width="18"
          height="6"
          rx="3"
          fill={crossColor}
        />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span
            className="text-xl sm:text-2xl font-extrabold tracking-tight"
            style={{ color: textColor }}
          >
            LifeCare
          </span>
        </div>
        {showSubtitle && (
          <span
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase mt-0.5"
            style={{ color: subtextColor }}
          >
            Hospital
          </span>
        )}
      </div>
    </Link>
  );
}
