/**
 * :NOTE
 * - 내부 모듈간의 응집도가 높은 상태에선 매개변수보단 질의 함수로 직접 접근해서 값을 받아오는 것이 좋고,
 *   응집도가 떨어지는 외부 모듈끼린 필요한 데이터를 직접 접근해서 가져오는 것 보단 매개변수로 전달 받는 것이 좋다.
 */

targetTemperature(aPlan, thermostat.currentTemperature);

// 다른모듈에 있는 함수라고 가정
function targetTemperature(aPlan, currentTemperature) {
  currentTemperature = currentTemperature;
  // ...
}
