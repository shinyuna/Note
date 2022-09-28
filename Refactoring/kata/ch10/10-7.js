/**
 * :NOTE
 * - 최대한 boolean 타입의 변수를 사용하지 않는 것이 좋다.
 * - for, while 문에서 boolean 타입의 변수로 조건문을 추가하는 것 보단, break/continue 를 사용하도록 한다. / 함수에선 얼리 리턴으로 함수 밖으로 퇴출 시켜버리기
 */
for (const p of people) {
  if (p === 'Don') {
    sendAlert();
    break; // 찾았으니 get out!
  }
}
