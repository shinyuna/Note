import { acquireReading, enrichReading } from './6-10.js';

const rawReading = acquireReading();
const reading = enrichReading(rawReading);

// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

console.log(reading.baseCharge);
console.log(reading.taxableCharge);
