"use client";

import { create } from "zustand";

export const useTimerStore = create((set) => ({
  mode: "pomodoro",
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  themeColor: "#F87070",
  fontSize: "80px",
  
  // Her mod için ayrı süre ve durum takibi
  pomodoroSeconds: 25 * 60,
  shortBreakSeconds: 5 * 60,
  longBreakSeconds: 15 * 60,
  pomodoroIsRunning: false,
  shortBreakIsRunning: false,
  longBreakIsRunning: false,
  lastModeChangeTime: Date.now(),

  setSeconds: (seconds) => set((state) => ({
    [`${state.mode}Seconds`]: seconds
  })),

  setIsRunning: (isRunning) => set((state) => ({
    [`${state.mode}IsRunning`]: isRunning
  })),

  setMode: (newMode) => set((state) => {
    const now = Date.now();
    const timeSpent = Math.floor((now - state.lastModeChangeTime) / 1000);
    
    // Eğer önceki mod çalışıyorsa, geçen süreyi diğer modlardan düş
    if (state[`${state.mode}IsRunning`]) {
      const updates = {};
      if (state.mode !== "pomodoro") {
        updates.pomodoroSeconds = Math.max(0, state.pomodoroSeconds - timeSpent);
      }
      if (state.mode !== "shortBreak") {
        updates.shortBreakSeconds = Math.max(0, state.shortBreakSeconds - timeSpent);
      }
      if (state.mode !== "longBreak") {
        updates.longBreakSeconds = Math.max(0, state.longBreakSeconds - timeSpent);
      }
      return {
        ...updates,
        mode: newMode,
        lastModeChangeTime: now
      };
    }

    return {
      mode: newMode,
      lastModeChangeTime: now
    };
  }),

  setPomodoroTime: (time) => set((state) => ({
    pomodoroTime: time,
    pomodoroSeconds: time,
    [`${state.mode}IsRunning`]: false
  })),

  setShortBreakTime: (time) => set((state) => ({
    shortBreakTime: time,
    shortBreakSeconds: time,
    [`${state.mode}IsRunning`]: false
  })),

  setLongBreakTime: (time) => set((state) => ({
    longBreakTime: time,
    longBreakSeconds: time,
    [`${state.mode}IsRunning`]: false
  })),

  setThemeColor: (color) => set({ themeColor: color }),
  setFontSize: (size) => set({ fontSize: size }),

  reset: () =>
    set((state) => ({
      [`${state.mode}Seconds`]: state[`${state.mode}Time`],
      [`${state.mode}IsRunning`]: false
    })),
})); 