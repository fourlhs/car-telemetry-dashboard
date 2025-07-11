// alerts.js: Alerts control with accessibles focus & aria-live

const alertIcons = {
  engineTemp: `<svg viewBox="0 0 24 24" class="hud-icon"><path fill="currentColor" d="M12 2L15 5H9L12 2ZM12 22c1.1 0 2-.9 2-2v-7h-4v7c0 1.1.9 2 2 2zM5 10h14v2H5v-2z"/></svg>`,
  fuel: `<svg viewBox="0 0 24 24" class="hud-icon"><path fill="currentColor" d="M16 4h1c1.1 0 2 .9 2 2v7h-2V6h-1V4zM6 2h9a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 14h5v-2H8v2z"/></svg>`,
  tire: `<svg viewBox="0 0 24 24" class="hud-icon"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm-1-7h2v5h-2zm0-6h2v4h-2z"/></svg>`,
  rpm: `<svg viewBox="0 0 24 24" class="hud-icon"><path fill="currentColor" d="M13 2v2a8 8 0 0 1 7.9 7H23A10 10 0 0 0 13 2zM2 13h2a8 8 0 0 1 7 7v2a10 10 0 0 0-9-9z"/></svg>`,
  speed: `<svg viewBox="0 0 24 24" class="hud-icon"><path fill="currentColor" d="M12 3a9 9 0 0 0 0 18 9 9 0 0 0 0-18zm1 9h6a7 7 0 1 1-7-7v6z"/></svg>`
};

const alerts = new Set();

export function showAlert(message, type = "engineTemp", duration = 5000) {
  if (alerts.has(message)) return;

  const alertBox = document.createElement("div");
  alertBox.className = "alert-box";
  alertBox.setAttribute("role", "alert");

  // Icon div
  const icon = document.createElement("div");
  icon.innerHTML = alertIcons[type] || alertIcons.engineTemp;

  // Text div
  const text = document.createElement("div");
  text.textContent = message;

  // Combine
  alertBox.append(icon, text);

  // Append to alert container
  const container = document.getElementById("alert-container");
  if (!container) return;
  container.appendChild(alertBox);

  // Show animation
  requestAnimationFrame(() => alertBox.classList.add("visible"));

  // Track + remove after timeout
  alerts.add(message);
  setTimeout(() => {
    alertBox.classList.remove("visible");
    setTimeout(() => alertBox.remove(), 300);
    alerts.delete(message);
  }, duration);
}