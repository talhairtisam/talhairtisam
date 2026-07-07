"use client";

import { Fragment, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { letterReveal } from "@/lib/motion";

export function LetterReveal({ text, className }: { text: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  const wordOffsets = useMemo(() => {
    return words.reduce<number[]>((acc, word, wordIndex) => {
      const start =
        wordIndex === 0
          ? 0
          : acc[wordIndex - 1]! +
            words[wordIndex - 1]!.length +
            (wordIndex - 1 < words.length - 1 ? 1 : 0);
      acc.push(start);
      return acc;
    }, []);
  }, [words]);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                custom={wordOffsets[wordIndex] + i}
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
      ))}
    </span>
  );
}
