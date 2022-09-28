/**
 * [문제]
 * - 동일한 결과 값이 필요한 조건식을 따로 따로 분리하는 것은 가독성을 떨어트린다. -> 하나의 조건 식으로 통일
 */
function disabilityAmount(employee) {
  const isNotDisability = employee.seniority < 2 || employee.monthsDisabled > 12 || employee.isPartTime

  return isNotDisability ? 0 : 1;
}
