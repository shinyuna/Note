/**
 * :NOTE
 * - 하위 클래스에서 사용되는 공통된 메서드를 상위 클래스에서 관리한다.
 * - 하위 클래스에서 같은 클래스를 중구난방 다른 이름으로 사용하고 있는 것 보단, 상위 클래스에서 정의한 메서드를 동일하게 사용하고 있는 것이 재사용성/가독성 측면에서 더 좋다.
 */

// 예시 1
class Employee {
  get name() {}
}

class Salesperson extends Employee {
}

class Engineer extends Employee {
}

// 예시 2
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
}
class Employee extends Party {
}
