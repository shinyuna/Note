import { getDefaultOwner } from './6-6.js';

const owner = getDefaultOwner();
owner.firstName = '엘리'; // error <- private field
console.log(owner.firstName);
console.log(getDefaultOwner());
