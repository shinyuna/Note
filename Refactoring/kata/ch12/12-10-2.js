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
    return this._specialDelegate.plumage
  }

  get airSpeedVelocity() {
    return this._specialDelegate.airSpeedVelocity
  }

  selectSpecialDelegate(data) {
    switch (data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate(data, this)
      case '아프리카 제비':
        return new AfricanSwallowDelegate(data, this);
      case '노르웨이 파랑 앵무':
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpecialDelegate(data, this);
    }
  }
}

class SpecialDelegate {
  constructor(data, bird) {
    this._bird = bird
  }

  get plumage() {
    return this._bird._plumage || '보통이다';
  }
}

class EuropeanSwallowDelegate extends SpecialDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallowDelegate extends SpecialDelegate {
  constructor(data, bird) {
    super(data, bird)
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate extends SpecialDelegate {
  constructor(data, bird) {
    super(data, bird)
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
