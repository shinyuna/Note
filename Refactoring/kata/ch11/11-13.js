const values = [];
function getValueForPeriod(periodNumber) {
  // if (periodNumber < 0 || periodNumber >= values.length) {
  //   return 0;
  // }
  return values[periodNumber] ?? 0;
}

getValueForPeriod(-10);

/**
 * :NOTE
 * - 예외는 예상하지 못한 상황에서 사용하는 것이다. (ex. 네트워크 에러)
 * -> 예외 남용 NOPE!!!
 * -> 불필요한 예외 처리로 오히려 사용하는 쪽의 코드가 더러워질 수 있다.
 *
 * - Expected = 예상할 수 있는 에러는 상황에 맞게 각각의 코드를 작성해서 처리한다.
 */