import "~style.css"

import { AnimatePresence } from "framer-motion"
import { Tag } from "lucide-react"
import { useEffect, useState } from "react"

import { NewTaskCard } from "~features/NewTaskCard"
import { ReminderCard } from "~features/ReminderCard"

import { Header } from "./components/Header"
import Stopwatch from "./features/Stopwatch"
import Timer from "./features/Timer"
import ToolsPage from "./features/Utilities"
import type { IPage, ITask } from "./types"

const TASKS_KEY = "Tazkeer_Tasks"

function IndexPopup() {
  const [tasks, setTasks] = useState<ITask[]>([])
  // const [deleting, setDeleting] = useState(false)
  const [page, setPage] = useState<IPage>("tasks")

  useEffect(() => {
    // request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TASKS_KEY)
      if (stored) setTasks(JSON.parse(stored))
    } catch {}
  }, [])

  const addTask = (task: ITask) => {
    const updated = [task, ...tasks]
    setTasks(updated)
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated))
  }

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id)
    setTasks(updated)
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated))
  }

  const notifyTask = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, isNotified: true }
      }
      return t
    })
    setTasks(updated)
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated))
  }

  return (
    <div className="w-[420px] bg-blue-50 font-sans">
      <Header page={page} setPage={setPage} />
      <AnimatePresence initial={false}>
        {page === "tools" && <ToolsPage page={page} setPage={setPage} />}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {page === "tasks" && (
          <>
            <div className="space-y-2 p-3 border-t border-b border-blue-100">
              {/* Header Section */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                    Task <span className="text-blue-600">Reminders</span>
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-0.5">
                    Manage your daily goals
                  </p>
                </div>

                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
                    <Tag size={20} />
                    {tasks.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                        {tasks.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {tasks.map((task) => (
                <ReminderCard
                  key={task.id}
                  task={task}
                  deleting={false}
                  onDelete={deleteTask}
                  onNotify={notifyTask}
                />
              ))}
            </div>
            <NewTaskCard onAdd={addTask} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {page === "timer" && <Timer />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {page === "stopwatch" && <Stopwatch />}
      </AnimatePresence>
    </div>
  )
}
export default IndexPopup
