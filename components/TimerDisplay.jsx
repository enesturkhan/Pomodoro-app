"use client";

import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../formatTime";
import { useTimer } from "../hooks/useTimer";

export default function TimerDisplay() {
  const { seconds, isRunning, mode, setIsRunning, themeColor, fontSize, reset } = useTimerStore();
  useTimer();

  const total = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  }[mode];
  const percent = ((total - seconds) / total) * 100;

  return (
    <div 
      className="relative flex items-center justify-center w-[340px] h-[340px] rounded-full bg-[#161932] shadow-lg cursor-pointer"
      onClick={() => setIsRunning(!isRunning)}
    >
      <svg className="absolute" width="340" height="340">
        <circle
          cx="170"
          cy="170"
          r="150"
          stroke="#23253A"
          strokeWidth="16"
          fill="none"
        />
        <circle
          cx="170"
          cy="170"
          r="150"
          stroke={themeColor}
          strokeWidth="16"
          fill="none"
          strokeDasharray={2 * Math.PI * 150}
          strokeDashoffset={2 * Math.PI * 150 * (1 - percent / 100)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="font-bold text-[#D7E0FF]" style={{ fontSize }}>{formatTime(seconds)}</span>
        <span className="text-[#D7E0FF] tracking-[.3em] text-lg mt-2">
          {isRunning ? "DURAKLAT" : "BAŞLAT"}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            reset();
          }}
          className="mt-2 text-[#D7E0FF] hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
} 