// theme.js: Theme toggle with smooth transition & setting save

import { getSetting, setSetting } from './config.js';

export function toggleTheme() {
  const cur = document.body.getAttribute('data-theme');
  const nxt = cur === 'dark' ? 'light' : 'dark';
  setSetting('dashboardTheme', nxt);

  const overlay = document.createElement('div');
  overlay.className = 'theme-transition';
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('active');
    setTimeout(() => {
      document.body.setAttribute('data-theme', nxt);
      setTimeout(() => overlay.remove(), 600);
    }, 300);
  });
}

export function applySavedTheme() {
  const saved = getSetting('dashboardTheme');
  document.body.setAttribute('data-theme', saved);
}