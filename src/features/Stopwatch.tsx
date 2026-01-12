"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Flag, Pause, Play, RotateCcw, Timer } from "lucide-react"
import React, { useRef, useState } from "react"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Timer toggle
  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - time
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10) // Update every 10 milliseconds
    }
    setIsRunning(!isRunning)
  }

  // Reset timer logic
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  // Record lap logic
  const recordLap = () => {
    if (isRunning) {
      setLaps([time, ...laps])
    }
  }

  // Format time into mm:ss:ms
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const millisecond = Math.floor((ms % 1000) / 10)

    return {
      min: minutes.toString().padStart(2, "0"),
      sec: seconds.toString().padStart(2, "0"),
      ms: millisecond.toString().padStart(2, "0")
    }
  }

  const { min, sec, ms } = formatTime(time)

  return (
    <motion.div
      initial={{ height: 0, opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center">
      {/* Main Display Area */}
      <div className="w-full max-w-sm mt-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-extrabold uppercase tracking-[0.2em]">
          <Timer size={12} /> Stopwatch Mode
        </div>

        {/* The Big Clock Face */}
        <div className="relative py-10 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <motion.span className="text-5xl font-black text-slate-800 tabular-nums">
              {min}:{sec}
            </motion.span>
            <span className="text-3xl font-bold text-blue-500 w-12 tabular-nums text-left">
              .{ms}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-8 mt-8 px-6">
          {/* Reset Button */}
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-blue-50 text-blue-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center">
            <RotateCcw size={16} />
          </button>

          {/* Start/Pause Button */}
          <button
            onClick={toggleTimer}
            className={`p-4 rounded-[18px] flex items-center justify-center shadow-xl transition-all active:scale-95 ${
              isRunning
                ? "bg-rose-500 text-white shadow-rose-200"
                : "bg-blue-600 text-white shadow-blue-200"
            }`}>
            {isRunning ? (
              <Pause size={28} fill="white" />
            ) : (
              <Play size={28} fill="white" className="ml-1" />
            )}
          </button>

          {/* Lap Button */}
          <button
            onClick={recordLap}
            disabled={!isRunning && time === 0}
            className="p-3 rounded-full bg-blue-50 border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-blue-100 active:scale-90 transition-all duration-300 hover:text-slate-500 shadow-sm shadow-blue-200 hover:border-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <Flag size={16} />
          </button>
        </div>

        {/* Lap List Section */}
        <div className="mt-12 w-full">
          <div className="flex justify-between items-center px-4 mb-4 border-b border-slate-200 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Laps
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Split Time
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto pr-2 space-y-2 scrollbar-hide">
            <AnimatePresence initial={false}>
              {laps.map((lapTime, index) => {
                const lapFormatted = formatTime(lapTime)
                return (
                  <motion.div
                    key={lapTime}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100/50 shadow-sm">
                    <span className="text-[13px] font-bold text-slate-400">
                      #{laps.length - index}
                    </span>
                    <span className="text-sm font-black text-slate-700 tabular-nums">
                      {lapFormatted.min}:{lapFormatted.sec}.
                      <span className="text-blue-500">{lapFormatted.ms}</span>
                    </span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
