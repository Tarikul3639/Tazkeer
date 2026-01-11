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
          <div className="mb-4 pb-2 px-1 flex flex-col items-center justify-center relative">
            <div className="flex items-center gap-3.5 ">
              {/* Icon with a more refined glow and ring */}
              <div className="relative flex items-center justify-center">
                {/* Outer Rotating/Soft Glow */}
                <div className="absolute inset-0 bg-blue-400 blur-md opacity-20 rounded-full animate-pulse" />

                {/* Icon Background */}
                <div className="relative h-10 w-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <Sparkles size={18} className="text-white" />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-[17px] font-[900] text-slate-800 tracking-tight leading-none">
                  Utility <span className="text-blue-600">Tools</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-[2px] w-3 bg-blue-500 rounded-full"></span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                    Productivity Suite
                  </p>
                </div>
              </div>
            </div>
             <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
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
