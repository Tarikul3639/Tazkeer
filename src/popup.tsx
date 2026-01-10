import "~style.css"

function IndexPopup() {
  return (
    <div className="w-80 p-4 bg-slate-50 font-sans">
      <h1 className="text-xl font-bold text-teal-600 mb-4">Tazkeer</h1>
      <div className="space-y-2">
        {/* Task Item */}
        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm font-medium">Morning Adhkar</p>
          <span className="text-xs text-slate-400">Scheduled for 07:00 AM</span>
        </div>
      </div>
      <button className="mt-4 w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
        + Add New Task
      </button>
    </div>
  )
}

export default IndexPopup
