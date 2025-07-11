// telemetry.js: Fake or live data, values update in DOM

import { convertValue, getUnitsLabel } from './units.js';
import { showAlert } from './alerts.js';

let intervalId;

// Helper: Animate from → to over `duration`, calling `callback(value)`
function animateValue(from, to, duration, callback) {
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = from + (to - from) * progress;
    callback(value);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function startFakeTelemetry() {
  const speedEl = document.getElementById('speed-value');
  const tempEl = document.getElementById('temp-value');
  const speedUnitEl = document.getElementById('speed-unit');
  const tempUnitEl = document.getElementById('temp-unit');

  const rpmEl = document.getElementById('rpm-label');
  const fuelEl = document.getElementById('fuel-value');
  const tireEl = document.getElementById('tire-value');

  // Bar elements
  const speedBar = document.getElementById('speed-bar');
  const tempBar = document.getElementById('temp-bar');
  const rpmBar = document.getElementById('rpm-bar');
  const fuelBar = document.getElementById('fuel-bar');
  const tireBar = document.getElementById('tire-pressure-bar');

  // Exit early if any required element is missing
  if (!speedEl || !tempEl || !speedUnitEl || !tempUnitEl || !rpmEl || !fuelEl || !tireEl ||
      !speedBar || !tempBar || !rpmBar || !fuelBar || !tireBar) {
    console.warn('❌ Missing telemetry UI elements — skipping telemetry update');
    return;
  }

  // Store previous values for animation base
  let prevValues = {
    speed: 0,
    temp: 0,
    rpm: 0,
    fuel: 0,
    tire: 0
  };

  function update() {
    // Fake raw values
    const rawSpeed = Math.random() * 240;
    const rawTemp = Math.random() * 120;
    const rawRPM = Math.random() * 8000;
    const rawFuel = Math.random() * 100;
    const rawTire = 27 + Math.random() * 13;

    // Update units
    speedUnitEl.textContent = getUnitsLabel('speed');
    tempUnitEl.textContent = getUnitsLabel('temp');

    // Calculate converted values
    const speedVal = convertValue('speed', rawSpeed);
    const tempVal = convertValue('temp', rawTemp);

    // Animate values
    animateValue(prevValues.speed, speedVal, 500, val => {
      speedEl.textContent = Math.round(val);
    });

    animateValue(prevValues.temp, tempVal, 500, val => {
      tempEl.textContent = Math.round(val);
    });

    animateValue(prevValues.rpm, rawRPM, 500, val => {
      rpmEl.textContent = `${Math.round(val)} RPM`;
    });

    animateValue(prevValues.fuel, rawFuel, 500, val => {
      fuelEl.textContent = `${Math.round(val)}`;
    });

    animateValue(prevValues.tire, rawTire, 500, val => {
      tireEl.textContent = val.toFixed(1);
    });

    // Update bars (instantly — the transition is handled in CSS)
    speedBar.style.width = `${(rawSpeed / 240) * 100}%`;
    tempBar.style.width = `${(rawTemp / 120) * 100}%`;
    rpmBar.style.width = `${(rawRPM / 8000) * 100}%`;
    fuelBar.style.width = `${rawFuel}%`;
    tireBar.style.width = `${((rawTire - 27) / 13) * 100}%`;

    // ======== GLOW EFFECTS ========

    // Danger: Temp > 105°C
    if (rawTemp > 105) tempBar.classList.add('danger');
    else tempBar.classList.remove('danger');

    // Danger: RPM > 6000
    if (rawRPM > 6000) rpmBar.classList.add('danger');
    else rpmBar.classList.remove('danger');

    // Danger: Fuel < 20%
    if (rawFuel < 20) fuelBar.classList.add('danger');
    else fuelBar.classList.remove('danger');

    // Danger: Tire pressure abnormal
    if (rawTire < 29 || rawTire > 36) tireBar.classList.add('danger');
    else tireBar.classList.remove('danger');
    
    // Danger: RPM limit exceeded
    if (rawRPM > 6500) rpmBar.classList.add('danger');
    else rpmBar.classList.remove('danger');

    // M-performance glow: Speed > 180 km/h (or > 112 mph)
    const isImperial = getUnitsLabel('speed') === 'mph';
    const speedThreshold = isImperial ? 112 : 180;

    if (convertValue('speed', rawSpeed) > speedThreshold) {
      speedBar.classList.add('m-performance');
    } else {
      speedBar.classList.remove('m-performance');
    }

    // === ALERT CHECKS ===

    const now = new Date().toLocaleTimeString(); // π.χ. "22:44:17"

    // Temperature
    if (rawTemp > 110) {
      showAlert(`Engine overheating! ${Math.round(rawTemp)}°C`, 'engineTemp');
    } 

    // Fuel
    if (rawFuel < 18) {
      showAlert(`Fuel low: ${Math.round(rawFuel)}%`, 'fuel');
    }

    // Tire pressure
    if (rawTire < 29 || rawTire > 37.2) {
      showAlert(`Tire PSI: ${rawTire.toFixed(1)} (abnormal)`, 'tire');
    }

    // RPM warning
    if (rawRPM > 7200) {
      showAlert(`RPM limit exceeded: ${Math.round(rawRPM)}`, 'rpm');
    }

    // Save for next animation base
    prevValues = {
      speed: speedVal,
      temp: tempVal,
      rpm: rawRPM,
      fuel: rawFuel,
      tire: rawTire
    };
  }

  update(); // First instant update
  intervalId = setInterval(update, 2000); // Every 2s
}

export function stopTelemetry() {
  clearInterval(intervalId);
}
