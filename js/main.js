// main.js: Entry point — modules load & settings setup

import { loadSettings, applySettings } from './settings.js';
import { startFakeTelemetry } from './telemetry.js';
import { setupMap } from './map.js';
import './dropdown.js';
import './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupMap();
  startFakeTelemetry();
});

window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');

      const children = card.querySelectorAll(':scope > *');
      children.forEach((child, j) => {
        child.style.transitionDelay = `${j * 200}ms`;
        void child.offsetWidth; 
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });

    }, i * 350);
  });
});

document.addEventListener('settingsChanged', () => {
  applySettings();
});