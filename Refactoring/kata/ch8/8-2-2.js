/**
 * 외부에서 accountType 이 있는지 없는지 모르게 한다.
 */
class Account {
  constructor(number, type) {
    this._number = number;
    this._type = type;

  }

  get interestRate() {
    return this._type.interestRate
  }
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}
