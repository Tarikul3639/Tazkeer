"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckSquare, Clock, Sparkles, Timer } from "lucide-react"
import React from "react"
import type { ITask, IPage, ITool } from "../types"

interface ToolsPageProps {
  page: IPage
  setPage: React.Dispatch<React.SetStateAction<IPage>>
}

const tools: ITool[] = [
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
          <div className="mb-6 px-1 flex flex-col items-center justify-center relative select-none">
            {/* The Main Container with a Glassy Feel */}
            <div className="group flex items-center gap-4 border border-blue-100/60 rounded-[22px] bg-blue-50/50 backdrop-blur-sm px-5 py-3 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.1)] transition-all duration-300 hover:shadow-blue-200/30 hover:border-blue-200">
              {/* Icon with a refined glow and ring */}
              <div className="relative flex items-center justify-center">
                {/* Dynamic Pulse Glow */}
                <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 rounded-full animate-pulse group-hover:opacity-40 transition-opacity" />

                {/* Icon Background with Gradient */}
                <div className="relative h-11 w-11 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-500">
                  <Sparkles size={20} className="text-white drop-shadow-sm" />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-[18px] font-[1000] text-slate-800 tracking-tight leading-none">
                  Utility{" "}
                  <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                    Tools
                  </span>
                </h1>

                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                    <span className="h-1 w-3 rounded-full bg-blue-500/30"></span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.2em] leading-none">
                    Productivity Suite
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle shadow accent at the bottom */}
            <div className="absolute -bottom-2 w-1/2 h-4 bg-blue-500/5 blur-2xl rounded-full -z-10" />
          </div>

          {/* Tools List */}
          <div className="grid grid-cols-1 gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <a
                  key={tool.title}
                  onClick={() => setPage(tool.href)}
                  className="group relative cursor-pointer overflow-hidden bg-blue-50 rounded-2xl p-3.5 border border-blue-100 
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
