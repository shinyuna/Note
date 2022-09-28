/**
 * :NOTE
 * - 객체 지향을 공부할 땐 혼자 객체를 상상하면서 연습하는 편 - 앨리
 * - 비어 있는 값을 나타낼 땐 null 보단, 비어 있는 값이라는 것을 나타내는 특이 케이스 객체를 추가하는 편이 좋다.
 * -> 다형성, 유지보수성, 확장
 * ->
 */
export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  let customerName;
  if (aCustomer === 'unknown') customerName = 'occupant';
  else customerName = aCustomer.name;

  return customerName;
}
