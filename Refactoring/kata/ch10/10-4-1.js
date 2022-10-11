/**
 *
 * :NOTE
 * - 리팩터링 추상화 레벨 : 객체 지향 프로그래밍에 관련 내용
 * - 프로젝트 전체 설계를 어떻게 개선할 수 있을지? => OOP 학습
 * - 객체들간의 공통된 특징을 찾아서 클래스 할 수 있다면 해라
 *
 * #다형성
 * - 추상화를 통해 공통된 특징을 추출해서 Super 클래스로 만들고, 공통되지 않는 내용을 추출해 각자 타입(클래스에)에 맞게 관리한다.
 * - 이때, 중요 포인트는 Super 클래스의 특징이 모든 클래스의 특징과 일치해야 한다는 점.
 * - 내부 로직, 반환 값은 달라도 시그니처가 같아야 한다(?)
 * -> 유지보수하기 좋아진다.
 *
 * [문제]
 * - 조건이 추가 될 때 마다 추가 되는 switch case
 */

export function plumages(birds) {
  let map = birds.map(b => [b.name, b.plumage]);
  let map1 = new Map(map);
  return map1;
}

export function speeds(birds) {
  return new Map(birds.map(b => [b.name, b.airSpeedVelocity]));
}

class Bird {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get plumage() {
    return 'unknown';
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  constructor() {
    super('EuropeanSwallow');
  }

  get plumage() {
    return 'average';
  }

  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallow extends Bird {
  constructor() {
    super('AfricanSwallow');
  }

  get plumage() {
    return bird.numberOfCoconuts > 2 ? 'tired' : 'average';
  }

  get airSpeedVelocity() {
    return 40 - 2 * bird.numberOfCoconuts;
  }
}
class NorwegianBlueParrot extends Bird {
  constructor() {
    super('NorwegianBlueParrot');
  }

  get plumage() {
    return bird.voltage > 100 ? 'scorched' : 'beautiful';
  }

  get airSpeedVelocity() {
    return bird.isNailed ? 0 : 10 + bird.voltage / 10;
  }
}
