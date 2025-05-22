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
    let interval;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      reset();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds, setSeconds, reset, mode]);

  return null;
} 