// units.js: Unit convertion & return of correct screen unit

import { getSetting } from './config.js';

export function getUnitsLabel(id) {
  const units = getSetting('units');
  return {
    speed: units === 'imperial' ? 'mph' : 'km/h',
    temp: units === 'imperial' ? '°F' : '°C'
  }[id] || '';
}

export function convertValue(type, value) {
  const toImp = getSetting('units') === 'imperial';
  if (!toImp) return value;
  if (type === 'speed') return Math.round(value / 1.609);
  if (type === 'temp') return Math.round((value * 9) / 5 + 32);
  return value;
}