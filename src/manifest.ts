// src/manifest.ts
export const manifest = {
  manifest_version: 3,
  name: "Tazkeer",
  version: "0.0.1",
  description:
    "Tazkeer is a simple daily routine and task reminder extension.",
  action: {
    default_icon: {
      16: "icons/icon.png",
      32: "icons/icon.png",
      48: "icons/icon.png",
      128: "icons/icon.png" 
    },
    default_popup: "popup.html"
  },
  host_permissions: ["https://*/*"]
} as const
