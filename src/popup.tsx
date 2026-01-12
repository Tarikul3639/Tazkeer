import "~style.css"

import { AnimatePresence } from "framer-motion"
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
  const [deleting, setDeleting] = useState(false)
  const [page, setPage] = useState<IPage>("tools")

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

  return (
    <div className="w-[420px] bg-blue-50 font-sans">
      <Header page={page} setPage={setPage} />
      <AnimatePresence initial={false}>
        {page === "tools" && <ToolsPage page={page} setPage={setPage} />}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {page === "tasks" && (
          <>
            {" "}
            <div className="space-y-2 p-3">
              {tasks.map((task) => (
                <ReminderCard
                  key={task.id}
                  task={task}
                  deleting={false}
                  onDelete={deleteTask}
                />
              ))}
            </div>
            <NewTaskCard onAdd={addTask} />{" "}
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
