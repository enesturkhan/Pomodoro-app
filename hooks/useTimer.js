"use client";

import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";

export function useTimer() {
  const mode = useTimerStore((state) => state.mode);
  const seconds = useTimerStore((state) => state[`${mode}Seconds`]);
  const isRunning = useTimerStore((state) => state[`${mode}IsRunning`]);
  const setSeconds = useTimerStore((state) => state.setSeconds);
  const reset = useTimerStore((state) => state.reset);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds === 0) {
      reset();
      return;
    }
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds, setSeconds, reset]);
} 