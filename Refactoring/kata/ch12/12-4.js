class Employee {
}

class Engineer extends Employee {}
class Salesperson extends Employee {
  get quota() {}
}

/**
 * :NOTE
 * 특정한 서브 클래스에서만 사용된다면, 서브 클래스에서만 정의하는게 좋다.
 * 모든 서브 클래스에서 사용되는 것이 명확해질 때 상위 클래스에 올린다.
 */