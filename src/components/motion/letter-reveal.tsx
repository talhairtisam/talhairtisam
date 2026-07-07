"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { letterReveal } from "@/lib/motion";

export function LetterReveal({ text, className }: { text: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  let charOffset = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => {
        const wordStart = charOffset;
        charOffset += word.length + (wordIndex < words.length - 1 ? 1 : 0);

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={wordStart + i}
                  initial="hidden"
                  animate="visible"
                  variants={letterReveal}
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
