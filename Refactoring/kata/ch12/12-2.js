// 상속을 하기 전, 공통적으로 사용되는 필드/메서드가 무엇인지 설계한 뒤 상속을 사용하는 것이 중요하다.
// 공통적으로 사용되는 필드는 슈퍼(상위) 클래스에 정의하고 변형이 필요하다면 서브 클래스에서 오버라이딩해서 사용한다.

class Employee {
  #name;
}

class Salesperson extends Employee {
}

class Engineer extends Employee {
}
