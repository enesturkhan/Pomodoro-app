"use client";

import { useTimerStore } from "../store/timerStore";
import { motion } from "framer-motion";

const MODES = [
  { key: "pomodoro", label: "Pomodora" },
  { key: "shortBreak", label: "Kısa mola" },
  { key: "longBreak", label: "Uzun mola" },
];

export default function ModeSelector() {
  const { mode, setMode } = useTimerStore();
  const themeColor = useTimerStore((state) => state.themeColor);

  return (
    <div className="flex bg-[#161932] rounded-lg p-1 gap-1 relative w-full max-w-[500px] mx-auto">
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => setMode(m.key)}
          className={`flex-1 px-2 sm:px-3 md:px-4 py-3 rounded-md font-bold transition-all duration-300 relative z-10 text-xs sm:text-sm whitespace-nowrap ${
            mode === m.key
              ? "text-[#23253A]"
              : "text-[#D7E0FF] hover:text-white"
          }`}
        >
          {m.label}
        </button>
      ))}
      <motion.div
        className="absolute rounded-md"
        style={{
          backgroundColor: themeColor,
          top: "6px",
          height: "calc(100% - 12px)"
        }}
        initial={false}
        animate={{
          left: `calc(${(MODES.findIndex(m => m.key === mode) * (100 / MODES.length))}% + 4px)` ,
          width: `calc(${100 / MODES.length}% - 8px)`
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1
        }}
      />
    </div>
  );
}