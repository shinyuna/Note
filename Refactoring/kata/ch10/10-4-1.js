/**
 *
 * :NOTE
 * - 리팩터링 추상화 레벨 : 객체 지향 관련 내용
 * - 프로젝트 전체 설계를 어떻게 할지? -> OOP 학습
 * - 객체들간의 공통된 특징을 찾아서 클래스 할 수 있다면 해라
 *
 * 유지보수성
 *
 * [문제]
 * - 조건이 추가 될 때 마다 추가 되는 switch case
 */

export function plumages(birds) {
  let map = birds.map((b) => [b.name, plumage(b)]);
  let map1 = new Map(map);
  return map1;
}
export function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
}
export function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 'average';
    case 'AfricanSwallow':
      return bird.numberOfCoconuts > 2 ? 'tired' : 'average';
    case 'NorwegianBlueParrot':
      return bird.voltage > 100 ? 'scorched' : 'beautiful';
    default:
      return 'unknown';
  }
}
export function airSpeedVelocity(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 35;
    case 'AfricanSwallow':
      return 40 - 2 * bird.numberOfCoconuts;
    case 'NorwegianBlueParrot':
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

class Bird {
  #name
  constructor(name) {
    this.#name = name
  }

  plumage() {
    return 'unknown'
  }

  airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  constructor() {
    super('EuropeanSwallow');
  }


}

