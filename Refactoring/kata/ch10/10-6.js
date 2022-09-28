/**
 * :NOTE
 * - 디버깅 시 개발자의 실수를 방지할 때 사용하는 함수
 * - 실제 서비스를 제공할 땐, assert 를 그대로 제공하면 서비스가 죽어버리니깐, 정상 작동할 수 있도록 대처하는 코드를 작성하는 것이 좋다.
 */
class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    return this.discountRate ? number - this.discountRate * number : number;
  }
}
