import { acquireReading, baseRate } from './6-9.js';

const aReading = acquireReading();

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

const basicChargeAmount = calculateBaseCharge(aReading);
