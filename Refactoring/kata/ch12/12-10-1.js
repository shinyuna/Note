/**
 * :NOTE
 * - 위임은 외부로부터 전달 받는 형태로 사용하는 것이 좋다.
 * - JS에는 인터페이스를 지원하지 않으니, Booking 이란 클래스를 상속하지 않고, Booking 이란 인터페이스를 만들어서 주입 받는 형태로 작업
 *
 * - ~Delegate 패턴은 옛날에 사용하던 방식이고, TS를 사용하면 인터페이스로 대체 가능하니 더 간편하게 구현 가능하다.
 * - Typescript 에서 주입 받는 클래스를 규격화 할 땐, extends Foo implements TTT 처럼 한다.
 */

class Booking {
  #premium;
  constructor(show) {
    this._show = show;
  }

  get hasTalkback() {
    return this.#premium
      ? this.#premium.hasTalkback()
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }

  get basePrice() {
    if (this.#premium) {
      return this.#premium.basePrice
    }

    let result = this._show.price;
    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }
    return result;
  }

  get hasDinner() {
    return this.#premium ? this.#premium.hasDinner() : undefined;
  }

  #bePremium(extras) {
    this.#premium = new PremiumBooking(this, extras)
  }

  static createBooking(show) {
    return new Booking(show)
  }

  static createPremiumBooking(show, extras) {
    return new PremiumBooking(show, extras)
  }
}

class PremiumBooking {
  constructor(show, extras) {
    this._show = show;
    this._extras = extras;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty('talkback');
  }

  get basePrice() {
    return Math.round(this.basePrice + this._extras.PremiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}


const booking = Booking.createBooking(show, date);
const premiumBooking = Booking.createPremiumBooking(show, date, extras);
