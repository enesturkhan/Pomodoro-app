"use client";

import { useTimerStore } from "../store/timerStore";

export default function TimerControls() {
  const { mode, setIsRunning, reset } = useTimerStore();
  const isRunning = useTimerStore((state) => state[`${state.mode}IsRunning`]);

  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="bg-[#F87070] text-[#23253A] px-8 py-3 rounded-full font-bold text-lg shadow transition hover:scale-105 cursor-pointer"
      >
        {isRunning ? "Duraklat" : "Başlat"}
      </button>
      <button
        onClick={reset}
        className="bg-[#23253A] text-[#D7E0FF] px-6 py-3 rounded-full font-bold text-lg shadow transition hover:scale-105 cursor-pointer"
      >
        Sıfırla
      </button>
    </div>
  );
} 