"use client";

import { create } from "zustand";

export const useTimerStore = create((set, get) => ({
  mode: "pomodoro",
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  themeColor: "#F87070",
  fontSize: "80px",

  // Tek bir zamanlayıcı durumu
  seconds: 25 * 60,
  isRunning: false,

  // Mod değiştirme
  setMode: (newMode) => {
    // Önce mevcut zamanlayıcıyı durdur
    if (get().isRunning) {
      clearInterval(window.timerInterval);
    }

    // Yeni moda göre süreyi ayarla
    const newSeconds = {
      pomodoro: get().pomodoroTime,
      shortBreak: get().shortBreakTime,
      longBreak: get().longBreakTime
    }[newMode];

    set({
      mode: newMode,
      seconds: newSeconds,
      isRunning: false
    });
  },

  // Zamanlayıcıyı başlat/durdur
  toggleTimer: () => {
    const isRunning = !get().isRunning;

    if (isRunning) {
      // Zamanlayıcıyı başlat
      window.timerInterval = setInterval(() => {
        const currentSeconds = get().seconds;

        if (currentSeconds <= 1) {
          // Süre doldu, zamanlayıcıyı sıfırla
          clearInterval(window.timerInterval);
          set({
            seconds: {
              pomodoro: get().pomodoroTime,
              shortBreak: get().shortBreakTime,
              longBreak: get().longBreakTime
            }[get().mode],
            isRunning: false
          });
        } else {
          // Süreyi azalt
          set({ seconds: currentSeconds - 1 });
        }
      }, 1000);
    } else {
      // Zamanlayıcıyı durdur
      clearInterval(window.timerInterval);
    }

    set({ isRunning });
  },

  // Zamanlayıcıyı sıfırla
  resetTimer: () => {
    if (get().isRunning) {
      clearInterval(window.timerInterval);
    }

    set({
      seconds: {
        pomodoro: get().pomodoroTime,
        shortBreak: get().shortBreakTime,
        longBreak: get().longBreakTime
      }[get().mode],
      isRunning: false
    });
  },

  // Ayarları güncelle
  setPomodoroTime: (time) => {
    set({ pomodoroTime: time });
    if (get().mode === "pomodoro" && !get().isRunning) {
      set({ seconds: time });
    }
  },

  setShortBreakTime: (time) => {
    set({ shortBreakTime: time });
    if (get().mode === "shortBreak" && !get().isRunning) {
      set({ seconds: time });
    }
  },

  setLongBreakTime: (time) => {
    set({ longBreakTime: time });
    if (get().mode === "longBreak" && !get().isRunning) {
      set({ seconds: time });
    }
  },

  setThemeColor: (color) => set({ themeColor: color }),
  setFontSize: (size) => set({ fontSize: size })
})); 