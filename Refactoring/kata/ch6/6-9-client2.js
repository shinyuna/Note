import { acquireReading, baseRate } from './6-9.js';

const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;

function taxThreshold(year) {
  return 0.1;
}

export const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
