"use client";

import { create } from "zustand";

export const useTimerStore = create((set, get) => ({
  mode: "pomodoro",
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  themeColor: "#F87070",
  fontSize: "80px",

  // Her mod için ayrı zamanlayıcı durumları
  timers: {
    pomodoro: {
      seconds: 25 * 60,
      isRunning: false,
      interval: null
    },
    shortBreak: {
      seconds: 5 * 60,
      isRunning: false,
      interval: null
    },
    longBreak: {
      seconds: 15 * 60,
      isRunning: false,
      interval: null
    }
  },

  // Mod değiştirme
  setMode: (newMode) => {
    set({ mode: newMode });
  },

  // Zamanlayıcıyı başlat/durdur
  toggleTimer: () => {
    const currentMode = get().mode;
    const timer = get().timers[currentMode];
    const isRunning = !timer.isRunning;

    const timers = { ...get().timers };

    if (isRunning) {
      // Zamanlayıcıyı başlat
      const interval = setInterval(() => {
        const currentTimer = get().timers[currentMode];

        if (currentTimer.seconds <= 1) {
          // Süre doldu, zamanlayıcıyı sıfırla
          clearInterval(currentTimer.interval);
          set({
            timers: {
              ...get().timers,
              [currentMode]: {
                ...currentTimer,
                seconds: get()[`${currentMode}Time`],
                isRunning: false,
                interval: null
              }
            }
          });
        } else {
          // Süreyi azalt
          set({
            timers: {
              ...get().timers,
              [currentMode]: {
                ...currentTimer,
                seconds: currentTimer.seconds - 1
              }
            }
          });
        }
      }, 1000);

      timers[currentMode] = {
        ...timer,
        isRunning: true,
        interval
      };
    } else {
      // Zamanlayıcıyı durdur
      if (timer.interval) {
        clearInterval(timer.interval);
      }
      timers[currentMode] = {
        ...timer,
        isRunning: false,
        interval: null
      };
    }

    set({ timers });
  },

  // Zamanlayıcıyı sıfırla
  resetTimer: () => {
    const currentMode = get().mode;
    const timer = get().timers[currentMode];

    if (timer.interval) {
      clearInterval(timer.interval);
    }

    set({
      timers: {
        ...get().timers,
        [currentMode]: {
          ...timer,
          seconds: get()[`${currentMode}Time`],
          isRunning: false,
          interval: null
        }
      }
    });
  },

  // Ayarları güncelle
  setPomodoroTime: (time) => {
    set({ 
      pomodoroTime: time,
      timers: {
        ...get().timers,
        pomodoro: {
          ...get().timers.pomodoro,
          seconds: time
        }
      }
    });
  },

  setShortBreakTime: (time) => {
    set({ 
      shortBreakTime: time,
      timers: {
        ...get().timers,
        shortBreak: {
          ...get().timers.shortBreak,
          seconds: time
        }
      }
    });
  },

  setLongBreakTime: (time) => {
    set({ 
      longBreakTime: time,
      timers: {
        ...get().timers,
        longBreak: {
          ...get().timers.longBreak,
          seconds: time
        }
      }
    });
  },

  setThemeColor: (color) => set({ themeColor: color }),
  setFontSize: (size) => set({ fontSize: size })
})); 