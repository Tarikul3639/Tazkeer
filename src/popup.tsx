import "~style.css"

import { useEffect, useState } from "react"

import { NewTaskCard } from "~components/NewTaskCard"
import { ReminderCard } from "~components/ReminderCard"

import { Header } from "./components/Header"

interface ITask {
  id: string // crypto.randomUUID()
  title: string // Task title
  remindAt: string // ISO date-time
  date: string // ISO date
  type: "Daily" | "One-Time" // Task type
  createdAt: number // timestamp
}

const TASKS_KEY = "Tazkeer_Tasks"

function IndexPopup() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [deleting, setDeleting] = useState(false)

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
    <div className="w-[420px] bg-slate-50 font-sans">
      <Header />

      <div className="space-y-2 p-3">
        {tasks.map((task) => (
          <ReminderCard key={task.id} task={task} deleting={false} onDelete={deleteTask}  />
        ))}
      </div>

      <NewTaskCard onAdd={addTask} />
    </div>
  )
}
export default IndexPopup