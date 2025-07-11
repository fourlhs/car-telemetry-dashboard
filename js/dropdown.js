// dropdown.js: Handles custom dropdowns for settings

import { setSetting } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Select all of the custom dropdowns
  const dropdowns = document.querySelectorAll('.custom-dropdown');

  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const optionsList = dropdown.querySelector('.dropdown-options');
    const options = optionsList.querySelectorAll('li');
    const settingKey = dropdown.getAttribute('data-setting');

    // Open/close dropdown
    selected.addEventListener('click', () => {
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });

    // Value option
    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const label = option.textContent;

        // Update UI
        selected.textContent = label;
        dropdown.classList.remove('open');

        // Update setting
        setSetting(settingKey, value);
        document.dispatchEvent(new Event('settingsChanged'));
      });
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
});