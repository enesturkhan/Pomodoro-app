"use client";

import { useTimerStore } from "../store/timerStore";
import { useState, useEffect } from "react";

const COLOR_THEMES = [
  { name: "Kırmızı", value:  "#70F3F8"},
  { name: "Mavi", value: "#F87070" },
  { name: "Mor", value: "#D881F8" },
];

const FONT_SIZES = [
  { name: "Küçük", value: "70px" },
  { name: "Orta", value: "80px" },
  { name: "Büyük", value: "90px" },
];

export default function Settings({ isOpen, onClose }) {
  const { 
    pomodoroTime, 
    shortBreakTime, 
    longBreakTime,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    themeColor,
    setThemeColor,
    fontSize,
    setFontSize
  } = useTimerStore();

  // Geçici ayarlar için state'ler
  const [tempPomodoroTime, setTempPomodoroTime] = useState(pomodoroTime);
  const [tempShortBreakTime, setTempShortBreakTime] = useState(shortBreakTime);
  const [tempLongBreakTime, setTempLongBreakTime] = useState(longBreakTime);
  const [tempThemeColor, setTempThemeColor] = useState(themeColor);
  const [tempFontSize, setTempFontSize] = useState(fontSize);

  // Modal açıldığında mevcut ayarları geçici state'lere kopyala
  useEffect(() => {
    if (isOpen) {
      setTempPomodoroTime(pomodoroTime);
      setTempShortBreakTime(shortBreakTime);
      setTempLongBreakTime(longBreakTime);
      setTempThemeColor(themeColor);
      setTempFontSize(fontSize);
    }
  }, [isOpen, pomodoroTime, shortBreakTime, longBreakTime, themeColor, fontSize]);

  const handleSave = () => {
    // Sadece zaman ayarları değiştiyse süreyi güncelle
    if (tempPomodoroTime !== pomodoroTime) setPomodoroTime(tempPomodoroTime);
    if (tempShortBreakTime !== shortBreakTime) setShortBreakTime(tempShortBreakTime);
    if (tempLongBreakTime !== longBreakTime) setLongBreakTime(tempLongBreakTime);
    
    // Tema ve font boyutu değişiklikleri
    if (tempThemeColor !== themeColor) setThemeColor(tempThemeColor);
    if (tempFontSize !== fontSize) setFontSize(tempFontSize);
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ayarlar</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Zaman Ayarları */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Zaman Ayarları (dakika)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Pomodoro</label>
                <input
                  type="number"
                  value={tempPomodoroTime / 60}
                  onChange={(e) => setTempPomodoroTime(Number(e.target.value) * 60)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="1"
                  max="60"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Kısa Mola</label>
                <input
                  type="number"
                  value={tempShortBreakTime / 60}
                  onChange={(e) => setTempShortBreakTime(Number(e.target.value) * 60)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="1"
                  max="30"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Uzun Mola</label>
                <input
                  type="number"
                  value={tempLongBreakTime / 60}
                  onChange={(e) => setTempLongBreakTime(Number(e.target.value) * 60)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="1"
                  max="60"
                />
              </div>
            </div>
          </div>

          {/* Font Boyutu */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Font Boyutu</h3>
            <div className="flex gap-4">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setTempFontSize(size.value)}
                  className={`px-4 py-2 rounded-full ${
                    tempFontSize === size.value
                      ? "bg-[#70F3F8] text-black"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Renk Teması */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Renk Teması</h3>
            <div className="flex gap-4">
              {COLOR_THEMES.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTempThemeColor(color.value)}
                  className={`w-12 h-12 rounded-full border-2 ${
                    tempThemeColor === color.value ? "border-gray-800 dark:border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-[#70F3F8] text-black py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 