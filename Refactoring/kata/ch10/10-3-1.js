/**
 * [문제]
 * - 하나만 있어도 읽기 어려운 조건문이 중첩으로 되어 있다. 😵
 * - **보호 구문** : 조건이 비정상이면 함수 밖으로 빠져 나온다.
 */

export function payAmount(employee) {
  if (employee.isSeparated) {
    return  { amount: 0, reasonCode: 'SEP' };
  }

  if (employee.isRetired) {
    return { amount: 0, reasonCode: 'RET' };
  }

  return someFinalComputation();
}

function someFinalComputation() {
  return { amount: 999, reasonCode: 'UNICORN' };
}
