import exp from "constants"
import type { I } from "framer-motion/dist/types.d-a9pt5qxk"

export interface ITask {
  id: string // crypto.randomUUID()
  title: string // Task title
  remindAt: string // ISO date-time
  date: string // ISO date
  type: "Daily" | "One-Time" // Task type
  createdAt: number // timestamp
  isNotified?: boolean
}

export type IPage = "tools" | "tasks" | "timer" | "stopwatch"

export interface ITool {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: IPage
  color: string
}