class Party {
  get name() {}
  get annualCost() {}
}

class Department extends Party{
  get headCount() {}
}

class Employee extends Party {
  get id() {}
}

// 공통적으로 사용되는 것이 있다면 슈퍼 클래스를 사용해볼수 없는지 고민하고 적용해보기