import _ from 'lodash';

/**
 * 앨리 선생님은 클래스 묶기를 더 선호하심
 * 변환 함수는 예전에 많이 사용됨
 * ------------------------------
 * 클래스는 get 하는 시점에 계산하고 데이터를 반환한다.
 * 반환 함수는 호출하는 시점의 데이터를 저장하고 업데이트 되지 않는다.
 * 업데이트 된 데이터를 원할 땐, 다시 한번 호출해야 한다.
 *
 * - 모듈 안에 데이터가 변환되는지 아닌지에 따라 사용여부가 결정되지만, 그냥 클래스를 쓰는게 심플하다.
 */

const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

export function acquireReading() {
  return reading;
}

export function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(0, result.baseCharge - 0.1);
  return result
}

function baseRate(month, year) {
  if (year === 2017 && month === 5) {
    return 0.1;
  }
  return 0.2;
}

function calculateBaseCharge(reading) {
  return baseRate(reading.month, reading.year) * reading.quantity;
}