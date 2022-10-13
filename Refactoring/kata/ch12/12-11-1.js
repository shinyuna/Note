class List {}

class Stack {
  constructor() {
    this.storage = new List() // 캡슐화를 위함
  }

  push() {
    this.storage.push()
  }

  pop() {
    this.storage.pop()
  }
}

/**
 * - 원하는 동작들만 외부에 노출하고, 내부에서 필요한 클래스를 사용한다.
 *
 * TIP
 * - 위 예제에서는 캡슐화를 위해 생성자에서 인스턴스를 생성하지만, DI를 사용해서 의존성을 낮출 수 있다.
 * - "모든 것은 선택이다. 상황에 맞게 잘 선택하면 된다."
 */