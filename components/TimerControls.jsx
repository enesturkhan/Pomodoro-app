"use client";

import { useTimerStore } from "../store/timerStore";

export default function TimerControls() {
  const mode = useTimerStore((state) => state.mode);
  const timers = useTimerStore((state) => state.timers);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const currentTimer = timers[mode];
  const { isRunning } = currentTimer;

  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={() => toggleTimer()}
        className="bg-[#F87070] text-[#23253A] px-8 py-3 rounded-full font-bold text-lg shadow transition hover:scale-105 cursor-pointer"
      >
        {isRunning ? "Duraklat" : "Başlat"}
      </button>
      <button
        onClick={resetTimer}
        className="bg-[#23253A] text-[#D7E0FF] px-6 py-3 rounded-full font-bold text-lg shadow transition hover:scale-105 cursor-pointer"
      >
        Sıfırla
      </button>
    </div>
  );
} 