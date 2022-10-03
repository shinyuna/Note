/**
 * :NOTE
 * - 공통적인 부분은 함수, 변경되는 부분은 매개변수로 받는다.
 * - 동일한 로직을 함수로 매번 분리하는 것도 중복이다.
 * - 리팩터링 전, 기존 로직에 대한 이해도가 높아야 안정성 있는 코드를 작성할 수 있다.
 */

// 예제 1
function raise(person, factor) {
  person.salary = person.salary.multiply(1 + factor);
}

// 예제 2
export function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 + withinBand(usage, 100, 200) * 0.05 + withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function usd(value) {
  return {
    currency: '$',
    currencyName: 'USD',
    value: value,
  };
}
