const TASKS_KEY = "Tazkeer_Tasks"

// Schedule task alarm
function scheduleTask(task) {
  const [hour, minute] = task.remindAt.split(":").map(Number)
  const now = new Date()
  let target = new Date(task.date)
  target.setHours(hour, minute, 0, 0)

  if (task.type === "Daily" && target <= now) {
    target.setDate(target.getDate() + 1)
  }

  const when = target.getTime()

  if (when > Date.now()) {
    chrome.alarms.clear(task.id, () => {
      chrome.alarms.create(task.id, { when })
    })
    console.log(
      `⏰ Alarm scheduled for "${task.title}" at ${target.toLocaleString()}`
    )
  } else {
    console.log(`⚠️ Skipped "${task.title}" - time passed`)
  }
}

// On install or startup, schedule existing tasks
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get([TASKS_KEY], (result) => {
    const tasks = result[TASKS_KEY] || []
    tasks.forEach(scheduleTask)
  })
})

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get([TASKS_KEY], (result) => {
    const tasks = result[TASKS_KEY] || []
    tasks.forEach(scheduleTask)
  })
})

// Listen for new task messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SCHEDULE_TASK") {
    console.log("📨 New task received:", msg.task.title)
    scheduleTask(msg.task)
  }
})

// Alarm trigger
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get([TASKS_KEY], (result) => {
    const tasks = result[TASKS_KEY] || []
    const task = tasks.find((t) => t.id === alarm.name)
    if (!task) return

    // use packaged extension icon (hashed filename) to avoid download errors
    const manifest = chrome.runtime.getManifest()
    const iconPath =
      manifest.action?.default_icon?.["128"] || manifest.icons?.["128"]
    const iconUrl = iconPath ? chrome.runtime.getURL(iconPath) : undefined

    chrome.notifications.create(`notification_${task.id}_${Date.now()}`, {
      type: "basic",
      iconUrl,
      title: "Reminder",
      message: `It's time for your task: ${task.title}`,
      requireInteraction: true
    })

    if (task.type === "Daily") {
      scheduleTask(task)
    }
  })
})
