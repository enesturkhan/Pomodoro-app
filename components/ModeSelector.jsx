"use client";

import { useTimerStore } from "../store/timerStore";
const MODES = [
  { key: "pomodoro", label: "pomodoro" },
  { key: "shortBreak", label: "kısa mola" },
  { key: "longBreak", label: "uzun mola" },
];

export default function ModeSelector() {
  const { mode, setMode } = useTimerStore();
  return (
    <div className="flex bg-[#161932] rounded-full p-1 gap-2">
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => setMode(m.key)}
          className={`px-6 py-2 rounded-full font-bold transition ${
            mode === m.key
              ? "bg-[#F87070] text-[#23253A]"
              : "text-[#D7E0FF] hover:bg-[#23253A]"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
} 