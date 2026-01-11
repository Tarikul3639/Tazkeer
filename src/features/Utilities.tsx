"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckSquare, Clock, Sparkles, Timer } from "lucide-react"
import React from "react"

interface ToolsPageProps {
  page: "tools" | "tasks" | "timer" | "stopwatch"
  setPage: React.Dispatch<
    React.SetStateAction<"tools" | "tasks" | "timer" | "stopwatch">
  >
}

interface Tool {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: "stopwatch" | "timer" | "tasks"
  color: string
}

const tools: Tool[] = [
  {
    title: "Stopwatch",
    description: "Measure time precisely",
    icon: Timer,
    href: "stopwatch",
    color: "bg-blue-500"
  },
  {
    title: "Timer",
    description: "Set countdown timers",
    icon: Clock,
    href: "timer",
    color: "bg-indigo-500"
  },
  {
    title: "Tasks",
    description: "Manage your daily tasks",
    icon: CheckSquare,
    href: "tasks",
    color: "bg-cyan-500"
  }
]

export default function ToolsPage({ page, setPage }: ToolsPageProps) {
  return (
    <motion.div
      key={page}
      initial={{ height: 0, opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden">
      <div className="bg-blue-50/50 px-4 pb-6 pt-1 border-none">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="mb-6 px-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon with a subtle glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 blur-lg opacity-40 rounded-full" />
                <Sparkles size={24} className="relative text-blue-600" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-[17px] font-extrabold text-blue-950 opacity-90 tracking-tight leading-none">
                  Utility Tools
                </h1>
                <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">
                  Productivity Suite
                </p>
              </div>
            </div>
          </div>

          {/* Tools List */}
          <div className="grid grid-cols-1 gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <a
                  key={tool.title}
                  onClick={() => setPage(tool.href)}
                  className="group relative cursor-pointer overflow-hidden bg-blue-50 rounded-[20px] p-3.5 border border-blue-100 
             transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5 active:scale-[0.98]">
                  {/* Hover Glow */}
                  <div className="absolute -right-2 -top-2 w-20 h-20 bg-blue-50/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

                  <div className="flex items-center gap-4">
                    {/* Icon Container - Size 12 is the "Sweet Spot" */}
                    <div
                      className={`w-11 h-11 rounded-[14px] ${tool.color} flex items-center justify-center shadow-lg shadow-blue-200/50 transition-all group-hover:rotate-6 group-hover:scale-110 shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col min-w-0">
                      <h2 className="text-[16px] font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                        {tool.title}
                      </h2>
                      <p className="text-[11.5px] text-slate-500 font-medium leading-normal mt-0.5">
                        {tool.description}
                      </p>
                    </div>

                    {/* Simple Arrow - ml-auto keeps it to the right */}
                    <div className="ml-auto text-slate-300 group-hover:text-blue-600 transition-all translate-x-1 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Footer Accent */}
          <div className="mt-6 text-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-4" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              Tazkeer Productivity Suite
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
