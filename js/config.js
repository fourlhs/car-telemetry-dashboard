// config.js: Control of default settings and localStorage

export const defaultSettings = {
  dashboardTheme: 'dark',
  theme: 'dark',
  units: 'metric',
  'animation-speed': 'normal'
};

export function getSetting(key) {
  return localStorage.getItem(key) || defaultSettings[key];
}

export function setSetting(key, value) {
  localStorage.setItem(key, value);
}