"use client";

import { create } from "zustand";

export const useTimerStore = create((set) => ({
  seconds: 25 * 60,
  isRunning: false,
  mode: "pomodoro",
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  themeColor: "#F87070",
  fontSize: "80px",

  setSeconds: (seconds) => set({ seconds }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setMode: (mode) => set((state) => ({
    mode,
    seconds: mode === "pomodoro" 
      ? state.pomodoroTime 
      : mode === "shortBreak" 
      ? state.shortBreakTime 
      : state.longBreakTime,
    isRunning: false
  })),
  setPomodoroTime: (time) => set((state) => ({
    pomodoroTime: time,
    seconds: state.mode === "pomodoro" ? time : state.seconds
  })),
  setShortBreakTime: (time) => set((state) => ({
    shortBreakTime: time,
    seconds: state.mode === "shortBreak" ? time : state.seconds
  })),
  setLongBreakTime: (time) => set((state) => ({
    longBreakTime: time,
    seconds: state.mode === "longBreak" ? time : state.seconds
  })),
  setThemeColor: (color) => set({ themeColor: color }),
  setFontSize: (size) => set({ fontSize: size }),

  reset: () =>
    set((state) => ({
      seconds:
        state.mode === "pomodoro"
          ? state.pomodoroTime
          : state.mode === "shortBreak"
          ? state.shortBreakTime
          : state.longBreakTime,
      isRunning: false,
    })),
})); 