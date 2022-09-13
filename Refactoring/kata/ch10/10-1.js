function calculateCharge(date, quantity, plan) {
  let charge = 0;
  if (!date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
  else charge = quantity * plan.regularRate + plan.regularServiceCharge;
  return charge;
}
