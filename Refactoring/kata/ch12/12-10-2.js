function createBird(bird) {
  return new Bird(bird);
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._specialDelegate = this.selectSpecialDelegate(data)
  }

  get name() {
    return this._name;
  }

  get plumage() {
    if (this._specialDelegate) {
      return this._specialDelegate.plumage
    }
    return this._plumage || '보통이다';
  }

  get airSpeedVelocity() {
    return this._specialDelegate ? this._specialDelegate.airSpeedVelocity : null;
  }

  selectSpecialDelegate(data) {
    switch (data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate()
      case '아프리카 제비':
        return new AfricanSwallowDelegate(data);
      case '노르웨이 파랑 앵무':
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return null;
    }
  }
}

class EuropeanSwallowDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return this._specialDelegate.airSpeedVelocity;
  }
}

class AfricanSwallowDelegate {
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class AfricanSwallow extends Bird {
  get airSpeedVelocity() {
    return this._specialDelegate.airSpeedVelocity;
  }
}

class NorwegianBlueParrotDelegate {
  constructor(data, bird) {
    this._bird = bird
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    return this._voltage > 100 ? '그을렸다' : (this._bird._plumage || '예쁘다')
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

class NorwegianBlueParrot extends Bird {
  get airSpeedVelocity() {
    return this._specialDelegate.airSpeedVelocity;
  }
}
