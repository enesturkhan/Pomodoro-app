"use client";

import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";

export function useTimer() {
  const { isRunning, seconds, setSeconds, reset } = useTimerStore();

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