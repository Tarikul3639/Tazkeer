// tasks load from storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["tasks"], ({ tasks = [] }) => {
    tasks.forEach(scheduleTask)
  })
})

// function to schedule alarm
function scheduleTask(task) {
  const [hour, minute] = task.remindAt.split(":").map(Number)
  const now = new Date()
  let target = new Date(task.date)
  target.setHours(hour, minute, 0, 0)

  // if daily, always next occurrence
  if (task.type === "Daily" && target <= now) {
    target.setDate(now.getDate() + 1)
  }

  const diffMs = target.getTime() - now.getTime()
  if (diffMs > 0) {
    chrome.alarms.create(task.id, { delayInMinutes: diffMs / 60000 })
  }
}

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["tasks"], ({ tasks = [] }) => {
    const task = tasks.find(t => t.id === alarm.name)
    if (!task) return

    // show notification
    chrome.notifications.create(task.id, {
      type: "basic",
      iconUrl: "icons/notification.png",
      title: "Reminder",
      message: `It's time for your task: ${task.title}`,
    })

    // reschedule if Daily
    if (task.type === "Daily") {
      scheduleTask(task)
    }
  })
})
