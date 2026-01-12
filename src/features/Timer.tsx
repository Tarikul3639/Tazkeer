"use client"

import { AnimatePresence, motion } from "framer-motion"
import { BellRing, Hourglass, Pause, Play, RotateCcw } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import { TimeInput } from "../components/TimeInput"

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [initialTime, setInitialTime] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev <= 50 ? 0 : prev - 50))
      }, 50)
    } else {
      if (timeLeft === 0) setIsActive(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, timeLeft])

  const formatTime = (totalMs: number) => {
    const hours = Math.floor(totalMs / 3600000)
    const minutes = Math.floor((totalMs % 3600000) / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    const milliseconds = Math.floor((totalMs % 1000) / 10)

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0")
    }
  }

  const handleTimeChange = (v: { h: number; m: number; s: number }) => {
    const totalMs = (v.h * 3600 + v.m * 60 + v.s) * 1000
    setTimeLeft(totalMs)
    setInitialTime(totalMs)
  }

  const percent = initialTime ? (timeLeft / initialTime) * 100 : 0
  const timeStrings = formatTime(timeLeft)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center p-2 bg-transparent">
      <div className="w-full bg-white rounded-[32px] p-5 shadow-[0_20px_40px_-10px_rgba(186,210,255,0.25)] border border-blue-50 text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/50 rounded-full">
            <Hourglass
              size={10}
              className={`text-blue-500 ${isActive ? "animate-spin" : ""}`}
            />
            <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">
              Nexion Cooldown
            </span>
          </div>
          <button className="text-blue-200 hover:text-blue-400 transition-colors">
            <BellRing size={16} />
          </button>
        </div>

        {/* Circular Progress Area (180px) */}
        <div className="relative w-[180px] h-[180px] mx-auto mb-6 flex items-center justify-center">
          <svg
            className={`${isActive ? "opacity-100" : "opacity-30"} absolute inset-0 w-full h-full -rotate-90`}
            viewBox="0 0 180 180"
            style={{ overflow: "visible" }}>
            <circle
              cx="90"
              cy="90"
              r="80"
              stroke="#F1F5F9"
              strokeWidth="14"
              fill="none"
            />
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              stroke="#3B82F6"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="502.6"
              animate={{ strokeDashoffset: 502.6 - (502.6 * percent) / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="drop-shadow-[0_0_4px_rgba(59,130,246,0.2)]"
            />
          </svg>

          <AnimatePresence mode="wait">
            {!isActive && (timeLeft === initialTime || timeLeft === 0) ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="z-10">
                <TimeInput
                  value={{
                    h: Math.floor(timeLeft / 3600000),
                    m: Math.floor((timeLeft % 3600000) / 60000),
                    s: Math.floor((timeLeft % 60000) / 1000)
                  }}
                  onChange={handleTimeChange}
                />
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative flex flex-col items-center justify-center z-10">
                <div className="text-3xl font-black text-slate-800 tracking-tighter tabular-nums">
                  {timeStrings.hours}:{timeStrings.minutes}:
                  {timeStrings.seconds}
                </div>
                <div className="absolute top-9 text-lg font-bold text-blue-500/60 tabular-nums">
                  .{timeStrings.milliseconds}S
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compact Controls */}
        <div className="flex items-center justify-center gap-5 mb-6">
          <button
            onClick={() => {
              setTimeLeft(0)
              setInitialTime(0)
              setIsActive(false)
            }}
            className="w-10 h-10 border border-blue-50 rounded-full bg-blue-50 text-blue-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center">
            <RotateCcw size={16} />
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            disabled={timeLeft === 0}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
              isActive
                ? "bg-amber-100 text-amber-600 shadow-amber-100"
                : "bg-blue-600 text-white shadow-blue-200"
            } disabled:opacity-30`}>
            {isActive ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <div className="w-10 h-10" />
        </div>

        {/* Grid Presets */}
        <div className="grid grid-cols-4 gap-2">
          {[5, 15, 30, 60].map((m) => (
            <button
              key={m}
              onClick={() => {
                const ms = m * 60 * 1000
                setTimeLeft(ms)
                setInitialTime(ms)
                setIsActive(false)
              }}
              className="py-2 rounded-xl bg-blue-50/50 text-[10px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:translate-y-0.5">
              {m}M
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
