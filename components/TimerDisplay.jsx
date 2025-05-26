"use client";

import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../formatTime";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function TimerDisplay({ onSettingsClick }) {
  const mode = useTimerStore((state) => state.mode);
  const seconds = useTimerStore((state) => state.seconds);
  const isRunning = useTimerStore((state) => state.isRunning);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const themeColor = useTimerStore((state) => state.themeColor);
  const fontSize = useTimerStore((state) => state.fontSize);

  const total = {
    pomodoro: useTimerStore.getState().pomodoroTime,
    shortBreak: useTimerStore.getState().shortBreakTime,
    longBreak: useTimerStore.getState().longBreakTime,
  }[mode];
  const percent = total ? ((total - seconds) / total) * 100 : 0;

  return (
    <motion.div
      className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full bg-[#161932] shadow-2xl cursor-pointer mx-auto"
      onClick={toggleTimer}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="absolute w-full h-full" viewBox="0 0 340 340">
        <circle
          cx="170"
          cy="170"
          r="150"
          stroke="#23253A"
          strokeWidth="16"
          fill="none"
        />
        <motion.circle
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
          initial={{ strokeDashoffset: 2 * Math.PI * 150 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 150 * (1 - percent / 100) }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="font-bold text-[#ebedff] dark:text-[#d3d5db] text-4xl sm:text-5xl md:text-6xl" style={{ fontSize }}>
          {formatTime(seconds)}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={isRunning ? "pause" : "start"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-[#d3d5e9] dark:text-[#ced0d8] tracking-[.3em] text-base sm:text-lg mt-2"
          >
            {isRunning ? "DURAKLAT" : "BAŞLAT"}
          </motion.span>
        </AnimatePresence>
        <div className="flex flex-row items-center gap-2 mt-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              resetTimer();
            }}
            className="text-[#eff0ff] dark:text-[#D7E0FF] hover:text-[#F87070] dark:hover:text-[#F87070] transition-colors cursor-pointer"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSettingsClick) onSettingsClick();
            }}
            className="text-[#eff0ff] dark:text-[#D7E0FF] hover:text-[#F87070] dark:hover:text-[#F87070] transition-colors cursor-pointer"
            aria-label="Ayarlar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 