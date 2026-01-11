"use client"

import { motion } from "framer-motion"

export function TimeInput({
  value,
  onChange
}: {
  value: { h: number; m: number; s: number }
  onChange: (v: { h: number; m: number; s: number }) => void
}) {
  const inputClass = `
    w-9 bg-transparent text-center text-3xl font-black tracking-tight
    leading-none outline-none border-none appearance-none
    [appearance:textfield] p-0 m-0
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
  `

  const handle =
    (key: "h" | "m" | "s", max: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (v === "") return // 👈 allow typing / deleting

      const n = Number(v)
      if (isNaN(n)) return

      onChange({
        ...value,
        [key]: Math.min(max, Math.max(0, n))
      })
    }

  return (
    <div className="flex items-center justify-center gap-[2px] text-slate-800">
      <motion.input
        type="number"
        value={value.h}
        onChange={handle("h", 23)}
        className={inputClass}
      />

      <span className="text-2xl font-black leading-none px-[1px]">:</span>

      <motion.input
        type="number"
        value={value.m}
        onChange={handle("m", 59)}
        className={inputClass}
      />

      <span className="text-2xl font-black leading-none px-[1px]">:</span>

      <motion.input
        type="number"
        value={value.s}
        onChange={handle("s", 59)}
        className={inputClass}
      />
    </div>
  )
}
