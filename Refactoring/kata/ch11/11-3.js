/**
 * :NOTE
 * - 1. 플래그 인수로 함수의 행동이 달라지는 것보단, 그냥 함수로 따로 분리해라.
 * - 2. 분리한 함수의 내부 로직에 중복되는 부분이 많다면, 외부에서 사용되는 함수는 분리한 상태를 유지하고 내부 로직 함수를 따로 추출해서 사용한다.
 *      대신 내부 로직 함수는 무조건 private 일 것!
 * - 3. 제일 좋은 함수는 매개변수가 없는 것
 */

function setHeight(value) {
  this._height = value;
}

function setWidth(value) {
  this._width = value;
}


// 예제 2
class Concert {
  #book(customer, isPremium) {}
  basicBook(customer) {}
  premiumBook(customer) {}
}

// 예제 3
function switchOn() {}
function switchOff() {}
