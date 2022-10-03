/**
 * :NOTE
 * - ⚠️
 * - 객체와 함수의 의존성 관계를 주의 깊게 생각해보고 전달하도록 한다.
 * - 객체를 통채로 넘기면서 불필요한 데이터까지 전달하게 되는건 아닌지? 모듈들간 tight coupling 이 발생된 것은 아닌지?
 */
export function temperatureAlerts(room, plan) {
  const alerts = [];

  if (!plan.withinRange(room.daysTempRange)) {
    alerts.push('room temperature went outside range');
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(range) {
    return (
      range.bottom >= this._temperatureRange.low && range.top <= this._temperatureRange.high
    );
  }
}
