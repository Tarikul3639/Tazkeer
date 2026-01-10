import React from "react"
import { Bell, LayoutGrid, Watch } from "lucide-react"

export const Header = () => {
  return (
    <header className="w-full px-4 py-3 bg-blue-50 border-b border-blue-100">
      <div className="flex items-center justify-between">
        
        {/* Left Side: Brand Section */}
        <div className="flex items-center gap-3">
          {/* Icon Container with arbitrary shadow and rotation */}
          <div className="bg-white rounded-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 shadow-[0_4px_12px_rgba(59,130,246,0.15)] p-2 border border-blue-100">
            <Watch size={24} className="text-blue-600" />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-blue-900 leading-none tracking-tight">
              Tazkeer
            </h1>
            <span className="text-[10px] text-slate-500 font-medium italic mt-1 uppercase tracking-wider">
              Reflect Remind
            </span>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1">
          {/* Notification Button */}
          <button className="p-2 text-blue-900/60 hover:text-blue-600 hover:bg-white rounded-xl transition-all relative group">
            <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
            {/* Notification Dot with Blue Pulse Ring */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-blue-50">
               <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
            </span>
          </button>
          
          {/* Settings/Grid Button */}
          <button className="p-2 text-blue-900/60 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>

      </div>
      
      {/* Bottom Gradient Divider using pure Tailwind */}
      <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </header>
  )
}