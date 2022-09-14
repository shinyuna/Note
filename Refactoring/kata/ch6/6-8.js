export function readingsOutsideRange(readings, range) {
  return readings.filter((r) => !range.contains(r.temp));
}

export class NumberRange {
  #min;
  #max;
  constructor(min, max) {
    this.#min = min
    this.#max = max
  }

  get min() {
    return this.#min
  }

  get max() {
    return this.#max
  }

  contains(number) {
    return number >= this.#min && number <= this.#max
  }

}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};
const operationPlan = new NumberRange(51, 53)

const result = readingsOutsideRange(
  station.readings,
  operationPlan
);
console.log(result)

// 함수의 매개변수를 객체로 전달
// 데이터 객체를 클래스로 구현하고, 클래스 내부에서 데이터를 처리하는 로직과 함께 두고 관리
