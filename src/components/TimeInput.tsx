"use client"

import React from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface TimeInputProps {
  value: { h: number; m: number; s: number }
  onChange: (v: { h: number; m: number; s: number }) => void
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const updateValue = (unit: "h" | "m" | "s", delta: number) => {
    const newValue = { ...value }
    if (unit === "h") newValue.h = (value.h + delta + 24) % 24
    else if (unit === "m") newValue.m = (value.m + delta + 60) % 60
    else newValue.s = (value.s + delta + 60) % 60
    onChange(newValue)
  }

  const UnitColumn = ({ label, val, unit }: { label: string; val: number; unit: "h" | "m" | "s" }) => (
    <div className="flex flex-col items-center group z-20">
      <button 
        onClick={() => updateValue(unit, 1)}
        className="opacity-0 group-hover:opacity-100 transition-all text-blue-400 hover:scale-110"
      >
        <ChevronUp size={14} />
      </button>
      
      <div className="w-12 h-14 bg-white border border-blue-50 rounded-xl flex flex-col items-center justify-center shadow-sm group-hover:border-blue-200 transition-colors">
        <span className="text-xl font-black text-slate-700 leading-none">
          {val.toString().padStart(2, "0")}
        </span>
        <span className="text-[7px] font-bold text-blue-400/60 uppercase tracking-tighter mt-1">
          {label}
        </span>
      </div>

      <button 
        onClick={() => updateValue(unit, -1)}
        className="opacity-0 group-hover:opacity-100 transition-all text-blue-400 hover:scale-110"
      >
        <ChevronDown size={14} />
      </button>
    </div>
  )

  return (
    <div className="flex items-center justify-center gap-1.5">
      <UnitColumn label="Hrs" val={value.h} unit="h" />
      <span className="text-lg font-bold text-blue-200 mt-2">:</span>
      <UnitColumn label="Min" val={value.m} unit="m" />
      <span className="text-lg font-bold text-blue-200 mt-2">:</span>
      <UnitColumn label="Sec" val={value.s} unit="s" />
    </div>
  )
}