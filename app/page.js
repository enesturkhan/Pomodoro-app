"use client";

import { useState } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import ModeSelector from '../components/ModeSelector';
import Settings from '../components/Settings';

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-[95%] sm:w-[90%] md:w-[80%] max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex justify-center items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white">
            Pomodoro Zamanlayıcı
          </h1>
        </div>
        <TimerDisplay onSettingsClick={() => setIsSettingsOpen(true)} />
        <ModeSelector />
      </div>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
