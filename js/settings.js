// settings.js: Direct setting application on the UI

import { getSetting, defaultSettings } from './config.js';
import { getUnitsLabel } from './units.js';
import { applySavedTheme } from './theme.js';

export function loadSettings() {
  const u = getSetting('units');
  const unitSelect = document.getElementById('units-select');
  if (unitSelect) {
    const selected = unitSelect.querySelector('.dropdown-selected');
    if (selected) {
      const item = unitSelect.querySelector(`li[data-value="${u}"]`);
      if (item) selected.textContent = item.textContent;
    }
  }
  applySettings();
}

export function applySettings() {
  const speedUnit = document.getElementById('speed-unit');
  const tempUnit = document.getElementById('temp-unit');

  if (speedUnit) speedUnit.textContent = getUnitsLabel('speed');
  if (tempUnit) tempUnit.textContent = getUnitsLabel('temp');

  applySavedTheme();
  const animSpeed = getSetting('animation-speed') || 'normal';

  const speedMap = {
    slow: '2s',
    normal: '1s',
    fast: '0.5s'
  };
  document.documentElement.style.setProperty('--bar-animation-speed', speedMap[animSpeed] || '1s');
}

export function resetSettings() {
  document.getElementById('settings-panel')?.classList.remove('active');

  Object.keys(defaultSettings).forEach(key => {
    localStorage.removeItem(key);
  });

  for (const [key, value] of Object.entries(defaultSettings)) {
    const dropdown = document.querySelector(`.custom-dropdown[data-setting="${key}"]`);
    if (dropdown) {
      const selected = dropdown.querySelector('.dropdown-selected');
      const item = dropdown.querySelector(`li[data-value="${value}"]`);
      if (selected && item) {
        selected.textContent = item.textContent;
      }
    }
  }

  applySettings();
}
