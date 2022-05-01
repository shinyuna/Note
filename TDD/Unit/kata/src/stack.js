class Stack {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  push(value) {
    this.data.push(value);
  }

  pop() {
    if (this.size() === 0) {
      throw new Error('Empty Stack');
    }
    return this.data.pop();
  }

  peek() {
    if (this.size() === 0) {
      throw new Error('Empty Stack');
    }
    return this.data[this.size() - 1];
  }
}

module.exports = Stack;
