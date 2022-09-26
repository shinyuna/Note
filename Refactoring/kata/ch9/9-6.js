/**
 * :NOTE
 * - **매직 넘버/리터럴**: 프로그래밍에서 비즈니스적 의미를 가진 숫자나 문자를 그대로 표현한 것을 칭한다.
 * - 코드에서 특정한 숫자를 그대로 입력하는 것 보단, 이 숫자의 의미에 해당하는 이름을 상수로 지정해주는게 좋다.
 */

const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
