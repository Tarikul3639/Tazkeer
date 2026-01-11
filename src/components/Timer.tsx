"use client"

import { motion } from "framer-motion"
import { BellRing, Hourglass, Pause, Play, RotateCcw } from "lucide-react"
import React, { useEffect, useState } from "react"

import { TimeInput } from "./TimeInput"

export default function TimerPage() {
  const [seconds, setSeconds] = useState(0)
  const [initialTime, setInitialTime] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive || seconds <= 0) return
    const i = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(i)
  }, [isActive, seconds])

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600)
    const m = Math.floor((t % 3600) / 60)
    const s = t % 60
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }
  const handleTimeChange = (v: { h: number; m: number; s: number }) => {
    const totalSeconds = v.h * 3600 + v.m * 60 + v.s
    setSeconds(totalSeconds)
    setInitialTime(totalSeconds)
  }

  const percent = initialTime ? (seconds / initialTime) * 100 : 0

  return (
    <div className="flex items-center justify-center p-3 bg-blue-50/30">
      <div className="w-full max-w-[380px] bg-white rounded-[28px] p-5 border border-blue-50 shadow text-center">
        {/* Header */}
        <h2 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
          <Hourglass size={12} /> Countdown Timer
        </h2>

        {/* Progress */}
        <div className="relative w-40 h-40 mx-auto mb-5 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="74"
              stroke="#3B82F6"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="465"
              animate={{
                strokeDashoffset: 465 - (465 * percent) / 100
              }}
            />
          </svg>

          {/* Time */}
          {isActive ? (
            <motion.div
              key={seconds}
              className="text-3xl font-black text-slate-800 tracking-tight">
              {formatTime(seconds)}
            </motion.div>
          ) : (
            <TimeInput
              value={{
                h: Math.floor(initialTime / 3600),
                m: Math.floor((initialTime % 3600) / 60),
                s: initialTime % 60
              }}
              onChange={handleTimeChange}
            />
          )}
        </div>

        <p className="text-[10px] font-bold text-slate-400 mb-4">REMAINING</p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setSeconds(0)
              setIsActive(false)
            }}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <RotateCcw size={16} />
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow transition-all ${
              isActive
                ? "bg-amber-100 text-amber-600"
                : "bg-blue-600 text-white"
            }`}>
            {isActive ? (
              <Pause size={22} />
            ) : (
              <Play size={22} className="ml-1" />
            )}
          </button>

          <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <BellRing size={16} />
          </button>
        </div>

        {/* Presets */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[5, 10, 15, 30, 60].map((m) => (
            <button
              key={m}
              onClick={() => {
                setSeconds(m * 60)
                setInitialTime(m * 60)
                setIsActive(false)
              }}
              className="py-2 rounded-xl bg-slate-100 text-[11px] font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition">
              {m}m
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
