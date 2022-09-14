import { acquireReading } from './6-9.js';

const reading = acquireReading();
// const base = reading.baseRate * reading.quantity;

// function taxThreshold(year) { // <- 쓰이지도 않는 매개변수?
//   return 0.1;
// }

// export const taxableCharge = Math.max(0, base - taxThreshold(reading.year));

console.log(reading.taxableCharge);
