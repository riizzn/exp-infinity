"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedUnderline() {
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Trigger only once
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (pathRef.current) {
      observer.observe(pathRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      className="absolute -bottom-2 left-0 w-full h-3"
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M2 10C50 5 100 2 198 8"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        className={isVisible ? "animate-dash" : ""}
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isVisible ? 0 : 1000,
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8A61A" />
          <stop offset="100%" stopColor="#FDCE7E" />
        </linearGradient>
      </defs>
    </svg>
  );
}