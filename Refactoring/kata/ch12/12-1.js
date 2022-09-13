// 예시 1
class Employee {}

class Salesperson extends Employee {
  get name() {}
}

class Engineer extends Employee {
  get name() {}
}

// 예시 2
class Party {}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
