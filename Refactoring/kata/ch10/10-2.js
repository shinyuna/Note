function disabilityAmount(employee) {
  if (employee.seniority < 2) return 0;
  if (employee.monthsDisabled > 12) return 0;
  if (employee.isPartTime) return 0;
  return 1;
}
