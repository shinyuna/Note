/**
 *
 * :NOTE
 * - 조건부 로직은 다형성으로 바꿀 때 가장 중요한 것은 추상화. 코드에서 중복적으로 사용되는 로직이 무엇인지 판단하고 조건에 따라 다른 부분은 상속 후 오버라이딩.
 * - 개발을 하다보면 상속보단 합성을 하는 것이 더 나을 때가 있는데 이것은 많은 경험 끝에서 스스로 느껴봐야 한다.
 */

export function rating(voyage, history) {
  // 투자 등급
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return 'A';
  else return 'B';
}

function voyageRisk(voyage) {
  // 항해 경로 위험요소
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (['china', 'east-indies'].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  // 선장의 항해 이력 위험 요소
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === 'china' && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

function hasChina(history) {
  // 중국을 경유하는가?
  return history.some((v) => 'china' === v.zone);
}

function voyageProfitFactor(voyage, history) {
  // 수익 요인
  let result = 2;
  if (voyage.zone === 'china') result += 1;
  if (voyage.zone === 'east-indies') result += 1;
  if (voyage.zone === 'china' && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}

const voyage = { zone: 'west-indies', length: 10 };
const history = [
  { zone: 'east-indies', profit: 5 },
  { zone: 'west-indies', profit: 15 },
  { zone: 'china', profit: -2 },
  { zone: 'west-africa', profit: 7 },
];

const rate = rating(voyage, history);
console.log(rate);
