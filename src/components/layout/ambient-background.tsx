"use client";

import { motion, useReducedMotion } from "motion/react";

const glows = [
  { className: "left-[8%] top-[10%] h-56 w-56 bg-[rgba(91,77,141,0.28)]" },
  { className: "right-[6%] top-[20%] h-72 w-72 bg-[rgba(159,181,217,0.18)]" },
  { className: "left-1/3 bottom-[12%] h-64 w-64 bg-[rgba(110,41,75,0.18)]" },
];

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(159,181,217,0.1),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(91,77,141,0.18),_transparent_30%),linear-gradient(180deg,_rgba(6,7,11,0.95),_rgba(5,7,16,1))]" />
      <div className="noise-overlay absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.07]" />
      {glows.map((glow) => (
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -24, 0],
                  x: [0, 16, 0],
                }
          }
          className={`absolute rounded-full blur-3xl ${glow.className}`}
          key={glow.className}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
