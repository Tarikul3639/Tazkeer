import { Bell, LayoutGrid, Watch } from "lucide-react"
import React from "react"

interface HeaderProps {
  page: "tools" | "tasks" | "timer" | "stopwatch"
  setPage: React.Dispatch<
    React.SetStateAction<"tools" | "tasks" | "timer" | "stopwatch">
  >
}

export const Header = ({ page, setPage }: HeaderProps) => {
  return (
    <header className="w-full px-4 py-3 bg-blue-50 border-blue-100">
      <div className="flex items-center justify-between">
        {/* Left Side: Brand Section */}
        <div className="group flex items-center gap-3 cursor-default">
          {/* Icon Container with subtle glow and refined transition */}
          <div className="relative">
            {/* Inner Glow Effect on Hover */}
            <div className="absolute inset-0 bg-blue-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />

            <div
              className="relative bg-white rounded-[18px] flex items-center justify-center 
                  shadow-[0_4px_15px_rgba(59,130,246,0.12)] p-2.5 
                  border border-blue-50/50 transition-all duration-500 ease-out
                  group-hover:rotate-[10deg] group-hover:scale-110 group-hover:shadow-blue-200">
              <Watch
                size={26}
                className="text-blue-600 group-hover:text-blue-700 transition-colors"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[19px] font-[900] text-slate-800 leading-none tracking-tight">
              Tazkeer<span className="text-blue-600">.</span>
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.18em]">
                Reflect
              </span>
              <span className="h-[2px] w-[2px] rounded-full bg-blue-300"></span>
              <span className="text-[9px] text-blue-500/70 font-bold uppercase tracking-[0.18em]">
                Remind
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1">
          {/* Settings/Grid Button */}
          <button
            onClick={() => setPage("tools")}
            className="p-2 text-blue-900/60 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
            <LayoutGrid size={24} />
          </button>
        </div>
      </div>

      {/* Bottom Gradient Divider using pure Tailwind */}
      <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </header>
  )
}
