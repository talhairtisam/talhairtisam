"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

type HumanoidCharacterProps = {
  accent: string;
  lookX?: MotionValue<number>;
  lookY?: MotionValue<number>;
  leftArmRotate?: number;
  rightArmRotate?: number;
  wave?: boolean;
  blink?: boolean;
};

export function HumanoidCharacter({
  accent,
  lookX,
  lookY,
  leftArmRotate = 0,
  rightArmRotate = 0,
  wave = false,
  blink = false,
}: HumanoidCharacterProps) {
  const skin = "#c4895a";
  const skinShadow = "#a67248";
  const hair = "#1c1814";
  const suit = "#12151c";
  const shirt = "#f4f4f2";

  const zero = useMotionValue(0);
  const lx = lookX ?? zero;
  const ly = lookY ?? zero;
  const headX = useTransform(lx, (v) => v * 0.45);
  const headY = useTransform(ly, (v) => v * 0.35);
  const headRotate = useTransform(lx, (v) => v * 0.85);
  const eyeX = useTransform(lx, (v) => v * 1.15);
  const eyeY = useTransform(ly, (v) => v * 1.1);

  return (
    <svg viewBox="0 0 72 96" className="h-[88px] w-[66px] sm:h-[104px] sm:w-[78px]" aria-hidden>
      <defs>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e2430" />
          <stop offset="100%" stopColor="#0c0e14" />
        </linearGradient>
        <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8cc6a" />
          <stop offset="100%" stopColor="#b8942e" />
        </linearGradient>
      </defs>

      <motion.g animate={wave ? { rotate: [0, 4, -4, 0] } : undefined} transition={{ duration: 0.5 }}>
        {/* Legs */}
        <rect x="26" y="78" width="8" height="14" rx="3" fill={suit} />
        <rect x="38" y="78" width="8" height="14" rx="3" fill={suit} />
        <ellipse cx="30" cy="93" rx="6" ry="2.5" fill="#0a0c10" />
        <ellipse cx="42" cy="93" rx="6" ry="2.5" fill="#0a0c10" />

        {/* Body / suit */}
        <path d="M 18 52 L 14 78 L 58 78 L 54 52 Z" fill="url(#suitGrad)" />
        <path d="M 28 52 L 36 68 L 44 52 Z" fill={shirt} />
        <path d="M 34 52 L 36 68 L 38 52 Z" fill="url(#tieGrad)" />
        <path d="M 33 68 L 36 76 L 39 68 Z" fill="url(#tieGrad)" />
        <rect x="22" y="50" width="28" height="4" rx="1" fill={shirt} />

        {/* Left arm */}
        <motion.g
          style={{ transformOrigin: "22px 54px" }}
          animate={{ rotate: leftArmRotate }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        >
          <path d="M 22 54 L 10 66 L 12 70 L 24 58 Z" fill="url(#suitGrad)" />
          <ellipse cx="10" cy="70" rx="4" ry="3.5" fill={skin} />
        </motion.g>

        {/* Right arm */}
        <motion.g
          style={{ transformOrigin: "50px 54px" }}
          animate={{ rotate: rightArmRotate }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        >
          <path d="M 50 54 L 62 66 L 60 70 L 48 58 Z" fill="url(#suitGrad)" />
          <ellipse cx="62" cy="70" rx="4" ry="3.5" fill={skin} />
        </motion.g>

        {/* Neck */}
        <rect x="31" y="44" width="10" height="8" fill={skinShadow} />

        <motion.g
          style={{
            transformOrigin: "36px 38px",
            x: lookX && lookY ? headX : undefined,
            y: lookX && lookY ? headY : undefined,
            rotate: lookX && lookY ? headRotate : undefined,
          }}
        >
          {/* Head */}
          <ellipse cx="36" cy="30" rx="17" ry="19" fill={skin} />

          {/* Ears */}
          <ellipse cx="19" cy="30" rx="2.5" ry="4" fill={skinShadow} />
          <ellipse cx="53" cy="30" rx="2.5" ry="4" fill={skinShadow} />

          {/* Hair */}
          <path
            d="M 20 22 C 22 8, 50 6, 52 20 C 50 14, 24 14, 20 22 Z"
            fill={hair}
          />
          <path
            d="M 19 26 C 18 18, 28 12, 36 14 C 44 12, 54 18, 53 26"
            fill={hair}
            opacity="0.9"
          />

          {/* Beard */}
          <path
            d="M 22 34 C 22 48, 30 54, 36 54 C 42 54, 50 48, 50 34 C 46 42, 26 42, 22 34 Z"
            fill={hair}
          />
          <path
            d="M 28 38 Q 36 44 44 38 L 44 36 Q 36 40 28 36 Z"
            fill={hair}
            opacity="0.85"
          />

          {/* Glasses */}
          <rect x="24" y="26" width="11" height="8" rx="1.5" fill="none" stroke="#b8bcc4" strokeWidth="1.2" />
          <rect x="37" y="26" width="11" height="8" rx="1.5" fill="none" stroke="#b8bcc4" strokeWidth="1.2" />
          <line x1="35" y1="30" x2="37" y2="30" stroke="#b8bcc4" strokeWidth="1" />

          {/* Eyes */}
          <motion.g style={lookX && lookY ? { x: eyeX, y: eyeY } : undefined}>
            {!blink ? (
              <>
                <ellipse cx="29.5" cy="30" rx="2.2" ry="2.5" fill="#1a1510" />
                <ellipse cx="42.5" cy="30" rx="2.2" ry="2.5" fill="#1a1510" />
                <circle cx="30" cy="29.5" r="0.7" fill="#fff" opacity="0.7" />
                <circle cx="43" cy="29.5" r="0.7" fill="#fff" opacity="0.7" />
              </>
            ) : (
              <>
                <line x1="27" y1="30" x2="32" y2="30" stroke="#1a1510" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="40" y1="30" x2="45" y2="30" stroke="#1a1510" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </motion.g>

          {/* Subtle smile */}
          <path
            d="M 30 40 Q 36 43 42 40"
            fill="none"
            stroke={skinShadow}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Accent ring — reacts to section color */}
          <circle
            cx="36"
            cy="30"
            r="21"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            opacity="0.35"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}
