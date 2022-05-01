const Calculator = require('../calculator.js');

describe('Calculator calss', () => {
  let 계산기;

  beforeEach(() => {
    /**
     * @NOTE 독립적인 테스트를 위함, 모든 테스트 코드 실행 전 이 작업을 실행한다.
     */
    계산기 = new Calculator();
  });

  it('inits with 0', () => {
    expect(계산기.value).toBe(0);
  });

  describe('add method', () => {
    it('excuted add method, 8 넘기면 value will be 8', () => {
      계산기.add(8);
      expect(계산기.value).toBe(8);
    });

    it('add 메소드 실행 전 값을 2로 set, 8 넘기면 value will be 10', () => {
      계산기.set(2);
      계산기.add(8);
      expect(계산기.value).toBe(10);
    });

    it('값이 100이 넘으면 더하기 메소드에서 오류 메세지 던지기', () => {
      계산기.set(98);

      /**
       * @NOTE 에러가 던져지길 예상하는 코드는 expect에 callback 함수를 전달한다.
       */
      expect(() => 계산기.add(10)).toThrow('Value can not be greater than 100');
    });
  });

  describe('subract method', () => {
    it('excuted subract method, 5 넘기면 value will be -5', () => {
      계산기.subtract(5);
      expect(계산기.value).toBe(-5);
    });

    it('subract 메소드 실행 전 값을 87로 set, 80 메소드에 넘기면 value will be 7', () => {
      계산기.set(87);
      계산기.subtract(80);
      expect(계산기.value).toBe(7);
    });
  });

  describe('multiply method', () => {
    it('excuted multiply method, 3 넘기면 value will be 0', () => {
      계산기.multiply(3);
      expect(계산기.value).toBe(0);
    });

    it('multiply 메소드 실행 전 값을 2으로 set, 메소드에 2 넘기면 value will be 4', () => {
      계산기.set(2);
      계산기.multiply(2);
      expect(계산기.value).toBe(4);
    });
  });

  describe('divide method', () => {
    it('0/0 === NaN', () => {
      계산기.divide(0);
      expect(계산기.value).toBe(NaN);
    });

    it('2/0 === Infinity', () => {
      계산기.set(2);
      계산기.divide(0);
      expect(계산기.value).toBe(Infinity);
    });

    it('2/2 === 1', () => {
      계산기.set(2);
      계산기.divide(2);
      expect(계산기.value).toBe(1);
    });

    it('excuted divide method, 3 넘기면 value will be 0', () => {
      계산기.divide(3);
      expect(계산기.value).toBe(0);
    });

    it('divide 메소드 실행 전 값을 50으로 set, 메소드에 2 넘기면 value will be 25', () => {
      계산기.set(50);
      계산기.divide(2);
      expect(계산기.value).toBe(25);
    });
  });

  describe('clear method', () => {
    it('excuted clear method, value will be 0', () => {
      계산기.set(50);
      계산기.clear();
      expect(계산기.value).toBe(0);
    });
  });
});
