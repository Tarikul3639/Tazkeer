import { CheckCircle2, Clock, MoreVertical, Timer, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"

interface ReminderCardProps {
  task: {
    id: string // crypto.randomUUID()
    title: string // Task title
    remindAt: string // ISO date-time
    date: string // ISO date
    type: "Daily" | "One-Time" // Task type
    createdAt: number // timestamp
    isNotified?: boolean
  }
  deleting: boolean
  onDelete: (id: string) => void
}

export function ReminderCard({ task, deleting, onDelete }: ReminderCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [audio] = useState(
    () => new Audio(chrome.runtime.getURL("alarms/subhanallah.mp3"))
  )

  useEffect(() => {
  audio.load()
}, [])

  const [hour, minute] = task.remindAt.split(":").map(Number)
  const time = new Date()
  time.setHours(hour)
  time.setMinutes(minute)
  time.setSeconds(0)
  time.setMilliseconds(0)

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })

//   useEffect(() => {
//     const triggerTime = new Date(`${task.date}T${task.remindAt}`).getTime()
    
//     // শুধু যদি ভবিষ্যৎ সময় হয় তখনই অ্যালার্ম সেট হবে
//     if (triggerTime > Date.now()) {
//       chrome.alarms.create(task.id, {
//         when: triggerTime,
//         periodInMinutes: task.type === "Daily" ? 1440 : undefined // Daily হলে ২৪ ঘণ্টা পর পর
//       })
//     }

//     // ২. অ্যালার্ম লিসেনার (অ্যালার্ম বাজলে যা হবে)
//     const alarmListener = (alarm: chrome.alarms.Alarm) => {
//       if (alarm.name === task.id) {
//         // নোটিফিকেশন দেখানো
//         chrome.notifications.create(task.id, {
//           type: "basic",
//           title: "Tazkeer Reminder",
//           message: task.title,
//           iconUrl: "icons/48.png", // আপনার আইকন পাথ নিশ্চিত করুন
//           priority: 2
//         })

//         // অডিও প্লে করা
//         audio.play().catch(() => console.log("Audio playback blocked by browser policy"))
//       }
//     }

//     chrome.alarms.onAlarm.addListener(alarmListener)
//     return () => chrome.alarms.onAlarm.removeListener(alarmListener)
//   }, [task.id, task.date, task.remindAt, task.type, audio])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()

      // task.date + task.remindAt
      const [year, month, day] = task.date.split("-").map(Number)
      const [hours, minutes] = task.remindAt.split(":").map(Number)

      const targetTime = new Date(year, month - 1, day, hours, minutes, 0, 0)

      // If Daily and target time has passed, shift to next day
      if (targetTime.getTime() <= now.getTime() && task.type === "Daily") {
        targetTime.setDate(targetTime.getDate() + 1)
      }

      const diffMs = targetTime.getTime() - now.getTime()

      if (diffMs <= 0) {
        setTimeLeft("Passed")

        if (!task.isNotified) {
          audio.play()
          if (Notification.permission === "granted") {
            new Notification("Tazkeer Reminder", {
              body: task.title
            })
          }
          task.isNotified = true
        }
        return
      }

      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)

      if (diffHrs > 0) {
        setTimeLeft(`${diffHrs}:${diffMins}:${diffSecs}`)
      } else if (diffMins > 0) {
        setTimeLeft(`${diffMins}:${diffSecs}`)
      } else {
        setTimeLeft(`0:${diffSecs}`)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000) // update every second
    return () => clearInterval(timer)
  }, [task.remindAt, task.date, task.type, task.isNotified, audio])

  return (
    <div className="group relative mx-3 mt-2 overflow-hidden rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100 transition-all hover:ring-blue-300">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <button className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-300 transition hover:border-blue-500 hover:text-blue-500 focus:bg-blue-50">
            <CheckCircle2 size={14} />
          </button>

          <div className="flex flex-col min-w-0">
            <h3 className="truncate text-[13px] font-semibold text-slate-700 leading-tight">
              {task.title}
            </h3>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-blue-600 uppercase">
                <Clock size={10} />
                {formattedTime}
              </span>

              {/*  */}
              <span className="flex items-center gap-0.5 rounded-full bg-orange-50 px-1.5 py-0.5 text-xs font-bold text-orange-600 border border-orange-100">
                <Timer size={14} />
                {timeLeft}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
            {deleting ? (
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>
          <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
