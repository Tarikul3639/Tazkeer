import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Clock, Plus, Tag } from "lucide-react"
import React, { useState } from "react"

interface NewTaskCard {
  id: string // crypto.randomUUID()
  title: string // Task title
  remindAt: string // ISO date-time
  date: string // ISO date
  type: "Daily" | "One-Time" // Task type
  createdAt: number // timestamp
  isNotified?: boolean
}

const TASKS_KEY = "Tazkeer_Tasks"

export const NewTaskCard = ({
  onAdd
}: {
  onAdd: (task: NewTaskCard) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    id: "",
    title: "",
    remindAt: "12:00",
    date: new Date().toISOString().split("T")[0],
    type: "Daily",
    createdAt: Date.now(),
    isNotified: false
  } as NewTaskCard)

  const handleSave = async () => {
    if (!data.title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!data.remindAt) {
      alert("Please select time")
      return
    }

    if (!data.date) {
      alert("Please select date")
      return
    }

    setIsLoading(true)
    try {
      const newTask = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        isNotified: false
      }

      const stored = localStorage.getItem(TASKS_KEY)
      const tasks = stored ? JSON.parse(stored) : []

      localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, newTask]))

      onAdd(newTask)

      setData({
        id: "",
        title: "",
        remindAt: "12:00",
        date: new Date().toISOString().split("T")[0],
        type: "Daily",
        createdAt: 0,
        isNotified: false
      })

      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        height: "auto",
        padding: isOpen ? "20px" : "10px"
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-4 mt-6 bg-white rounded-3xl border-2 border-dashed border-blue-200 shadow-xl shadow-blue-500/5 overflow-hidden">
      {/* The Toggle Button - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all duration-300 active:scale-[0.98] hover:scale-[1.01] ${
          isOpen
            ? "bg-slate-100 text-slate-500 mb-4 hover:bg-pink-50 hover:text-pink-600 shadow-inner"
            : "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        }`}>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          {isOpen ? (
            <ChevronDown size={20} />
          ) : (
            <Plus size={20} className="group-hover:rotate-6" />
          )}
        </motion.div>
        <span>{isOpen ? "Close Form" : "Assign New Task"}</span>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4">
            {/* Task Title Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="What should we remind you of?"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full pr-4 py-2 pl-2 bg-transparent border-b border-slate-200 focus:border-blue-500 outline-none text-slate-700 placeholder:text-slate-300 transition-all font-medium"
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 flex-1 flex items-center gap-2 px-3 py-2.5 bg-blue-50/50 rounded-xl border border-blue-100 focus-within:border-blue-500 transition-colors group">
                <Clock size={16} className="text-blue-500" />
                <input
                  type="time"
                  required
                  value={data.remindAt}
                  onChange={(e) =>
                    setData({ ...data, remindAt: e.target.value })
                  }
                  className="bg-transparent text-xs font-semibold text-blue-900 outline-none w-full"
                />
              </div>
              <div className="col-span-1 flex-1 flex items-center gap-2 px-3 py-2.5 bg-blue-50/50 rounded-xl border border-blue-100 focus-within:border-blue-500 transition-colors group">
                <Tag size={16} className="text-blue-500" />
                <select
                  value={data.type}
                  required
                  onChange={(e) =>
                    setData({
                      ...data,
                      type: e.target.value as "Daily" | "One-Time"
                    })
                  }
                  className="bg-transparent text-xs font-semibold text-slate-600 outline-none w-full appearance-none px-2">
                  <option value="Daily">Daily</option>
                  <option value="One-Time">One-Time</option>
                </select>
              </div>
              <div className="col-span-2 flex-1 flex items-center gap-2 px-3 py-2.5 bg-blue-50/50 rounded-xl border border-blue-100 focus-within:border-blue-500 transition-colors group">
                <Clock size={16} className="text-blue-500" />
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  value={data.date}
                  required
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="bg-transparent text-xs font-semibold text-blue-900 outline-none w-full uppercase"
                />
              </div>
            </div>

            {/* Final Save Button */}
            <button
              disabled={
                isLoading || !data.title.trim() || !data.remindAt || !data.date
              }
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed">
              {isLoading ? <span>Saving...</span> : <span>Save Reminder</span>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <p className="text-[10px] text-center text-slate-400 mt-2 italic">
          "Reminders benefit the believers."
        </p>
      )}
    </motion.div>
  )
}
