"use client"

import { motion } from "framer-motion"
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MoreVertical,
  Timer,
  Trash2
} from "lucide-react"
import React, { useEffect, useState } from "react"

import type { ITask } from "../types"

interface ReminderCardProps {
  task: ITask
  deleting: boolean
  onDelete: (id: string) => void
}

export function ReminderCard({ task, deleting, onDelete }: ReminderCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  // Time Formatting
  const [hour, minute] = task.remindAt.split(":").map(Number)
  const time = new Date()
  time.setHours(hour, minute, 0, 0)

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const [year, month, day] = task.date.split("-").map(Number)
      const [hours, minutes] = task.remindAt.split(":").map(Number)

      let targetTime = new Date(year, month - 1, day, hours, minutes, 0, 0)

      if (targetTime.getTime() <= now.getTime() && task.type === "Daily") {
        targetTime.setDate(targetTime.getDate() + 1)
      }

      const diffMs = targetTime.getTime() - now.getTime()
      if (diffMs <= 0 && task.type === "One-Time") {
        setTimeLeft("Passed")
        return
      }

      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)

      if (diffHrs > 0) setTimeLeft(`${diffHrs}h ${diffMins}m`)
      else if (diffMins > 0) setTimeLeft(`${diffMins}m ${diffSecs}s`)
      else if (diffSecs >= 0) setTimeLeft(`${diffSecs}s`)
      else setTimeLeft("Now")
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [task.remindAt, task.date, task.type])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group relative mx-4 mt-3 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_4px_20px_-4px_rgba(186,210,255,0.2)] border border-blue-50 transition-all hover:shadow-[0_10px_30px_-5px_rgba(186,210,255,0.4)] hover:border-blue-200">
      {/* Dynamic Progress Indicator Bar */}
      <div
        className={`absolute left-0 top-0 h-full w-[6px] transition-all duration-500 ${timeLeft === "Passed" ? "bg-slate-300" : "bg-blue-500"}`}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Status Icon / Action */}
          <button className="group/check mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-blue-100 bg-blue-50/30 transition-all hover:border-blue-500 hover:bg-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <CheckCircle2
              size={16}
              className="text-blue-200 group-hover/check:text-white transition-colors"
              strokeWidth={3}
            />
          </button>

          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-[15px] font-black text-slate-950 leading-tight tracking-tight truncate group-hover:text-blue-700 transition-colors">
              {task.title}
            </h3>

            {/* Tags & Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-lg border border-blue-100/50">
                <Clock size={10} className="text-blue-500" />
                <span className="text-[10px] font-black text-blue-600 uppercase">
                  {formattedTime}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-colors ${
                  timeLeft === "Passed"
                    ? "bg-slate-50 border-slate-100 text-slate-400"
                    : "bg-amber-50 border-amber-100 text-amber-600"
                }`}>
                <Timer
                  size={10}
                  strokeWidth={2.5}
                  className={timeLeft !== "Passed" ? "animate-pulse" : ""}
                />
                <span className="text-[10px] font-black uppercase tabular-nums">
                  {timeLeft}
                </span>
              </div>

              {task.type === "Daily" ? (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">
                    Repeat Daily
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <CalendarDays size={10} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase">
                    {task.date.split("-").slice(1).join("/")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 self-start">
          <button
            onClick={() => onDelete(task.id)}
            disabled={deleting}
            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50">
            {deleting ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
          {/* <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreVertical size={16} />
          </button> */}
        </div>
      </div>
    </motion.div>
  )
}
