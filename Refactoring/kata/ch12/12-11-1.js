class List {}

class Stack {
  constructor() {
    this.storage = new List()
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
 */