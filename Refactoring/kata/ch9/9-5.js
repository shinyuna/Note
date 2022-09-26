/**
 * :NOTE
 * - 동일한 데이터인데 여러가지 버전이 있으면 복잡성 증가...💩
 * - 하나의 인스턴스 안에서 특정 값이 변경될 때, 이 값에 접근하는 모든 곳에 변경 사항이 반영되어야 하는 상황에선 참조가 유용하다.
 *
 * Repository Pattern
 * - 데이터가 있는 여러 저장소를 추상화해 중앙 집중처리 방식을 구성하고, 데이터를 사용하는 로직을 분리시키기 위한 패턴
 * 🍕 하나의 인스턴스 안에서 고유한 값을 찾아서 리턴할 때 사용하면 좋다.
 *
 * [요약]
 * - 불변성은 프로그래밍의 안정성을 높여주지만, 데이터가 변경될 때 마다 새로운 인스턴스를 만들게 되면 이전 인스턴스를 갖고 있는 데이터는 업데이트 된 값이 반영되지 않아 또 다른 버그가 발생할 수 있다.
 * - 값이 즉각적으로 변경되야 하는 상황에선 가변성 클래스(참조)를 사용하는게 좋다.
 *
 */
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customerId);
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }
}
