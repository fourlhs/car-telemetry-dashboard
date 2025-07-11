// ui.js: Navbar, animations and handlers

import { toggleTheme, applySavedTheme } from './theme.js';
import { applySettings, resetSettings } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const resetBtn = document.getElementById('reset-settings');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetSettings();
    });
  }
});

// on page load
applySavedTheme();
document.addEventListener('settingsChanged', () => {
  applySettings();
});

document.getElementById('open-settings')?.addEventListener('click', () => {
  document.getElementById('settings-panel')?.classList.add('active');
});

document.getElementById('close-settings')?.addEventListener('click', () => {
  document.getElementById('settings-panel')?.classList.remove('active');
});