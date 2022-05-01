const Stack = require('../stack');

describe('Stack class test', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });

  it('초기 스택의 길이는 0이다', () => {
    expect(stack.size()).toBe(0);
  });

  it('스택에 데이터를 push 할 수 있다.', () => {
    stack.push('🍯');
    expect(stack.size()).toBe(1);
  });

  describe('pop method', () => {
    it('빈 stack에서 pop을 하면 throw Error. ', () => {
      expect(() => stack.pop()).toThrow('Empty Stack');
    });

    it('pop 하면 스택에 마지막으로 들어온 데이터를 꺼내서 확인할 수 있다.', () => {
      stack.push('🍀');
      expect(stack.pop()).toBe('🍀');
      expect(stack.size()).toBe(0);
    });
  });

  describe('peek method', () => {
    it('빈 stack에서 peek 하면 throw Error.', () => {
      expect(() => stack.peek()).toThrow('Empty Stack');
    });

    it('stack의 맨 마지막 데이터를 꺼내지 않고 확인할 수 있다.', () => {
      stack.push('🥛');
      expect(stack.peek()).toBe('🥛');
      expect(stack.size()).toBe(1);
    });
  });
});
