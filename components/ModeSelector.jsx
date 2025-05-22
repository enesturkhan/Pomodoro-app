"use client";

import { useTimerStore } from "../store/timerStore";
import { motion } from "framer-motion";

const MODES = [
  { key: "pomodoro", label: "pomodoro" },
  { key: "shortBreak", label: "kısa mola" },
  { key: "longBreak", label: "uzun mola" },
];

export default function ModeSelector() {
  const { mode, setMode } = useTimerStore();
  
  return (
    <div className="flex bg-[#161932] rounded-full p-1.5 gap-1.5 relative">
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => setMode(m.key)}
          className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 relative z-10 ${
            mode === m.key
              ? "text-[#23253A]"
              : "text-[#D7E0FF] hover:text-white"
          }`}
        >
          {m.label}
        </button>
      ))}
      <motion.div
        className="absolute bg-[#F87070] rounded-full h-[calc(100%-3px)]"
        initial={false}
        animate={{
          x: `${(MODES.findIndex(m => m.key === mode) * 100) / MODES.length}%`,
          width: `${100 / MODES.length}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.8
        }}
        style={{
          left: 0,
          right: 'auto'
        }}
      />
    </div>
  );
} 