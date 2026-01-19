// src/manifest.ts
export const manifest = {
  manifest_version: 3,
  name: "Tazkeer",
  version: "0.0.1",
  description:
    "Tazkeer is a simple daily routine and task reminder extension.",
  action: {
    default_popup: "popup.html"
  },
  permissions: ["alarms", "notifications", "storage"],
  host_permissions: ["https://*/*"],
  background: {
    service_worker: "background.js"
  }
} as const
