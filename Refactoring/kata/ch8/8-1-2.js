/**
 * [문제]
 * 1. 책에선 AccountType에 따라 daysOverdrawn 값이 변하기 때문에 AccountType 클래스에 해당 함수가 있는게 적합하다고 함
 * - But, 난 현재 코드만 봤을 땐 AccountType은 딱 AccountType에 관련된 것만 갖고 있는게 맞을 것 같고, 계좌의 값을 다루고 있으니 Account 클래스에 있는게 좋을 것 같음.
 *
 * [수정한 부분]
 * - 한 줄로 리턴해주는 코드는 코드가 짧다는 장점이 있지만, 코드가 헷갈리다는 단점이 있어서 코드가 길어지더라도 다음 줄에 리턴 문을 작성해주는 것이 더 깔끔하다.
 * - private 값에 접근 할 수 있도록 daysOverdrawn getter 함수를 만들어두고 사용하고 있지 않아서 getter 를 사용하도록 수정
 */

export class AccountType {
  constructor(type) {
    this._type = type;
  }
  get isPremium() {
    return this._type === 'Premium';
  }
}

export class Account {
  constructor(accountType, daysOverdrawn) {
    this.type = accountType;
    this._daysOverdrawn = daysOverdrawn; // 일일 한도?
  }

  get daysOverdrawn() {
    return this._daysOverdrawn;
  }

  get bankCharge() {
    let result = 4.5;
    if (this.daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }

  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      return this.daysOverdrawn <= 7 ? baseCharge : baseCharge + (this.daysOverdrawn - 7) * 0.85;
    }
    return this.daysOverdrawn * 1.75;
  }
}

const account = new Account(new AccountType('Premium'), 12)
console.log(account.overdraftCharge)