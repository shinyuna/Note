/**
 * :NOTE
 * - **질의 함수**: 실시간으로 계산되는 함수
 * - **파생변수**: 기존의 변수를 조합하여 새로운 변수를 만들어 내는 것. 사용자가 특정 조건을 만족하거나 특정 함수에 의해 값을 만들어 의미를 부여하는 변수로 매우 주관적일 수 있으므로 논리적 타당성을 갖출 필요가 있다.
 * - - - - -
 * - 변할 수 있는 값을 담고 있는 클래스는 한 필드에서 여러 필드의 값에 영향을 미치지 않도록 주의해야 한다.
 * 💩 --> 값이 어디서 변하는지 예측하기 어렵고, 과거 데이터를 갖고 계산하는 일이 발생할 수도 있다.
 *
 * [문제점]
 * - discountedTotal 필드가 데이터를 리턴만 하고 있다. So, 해당 값을 업데이트 하기 위해선 다른 필드에서 값을 수정하는 일이 발생한다.
 *
 * [해결]
 * - discountedTotal 필드를 질의 함수로 수정해 값을 불러오는 즉시 계산해서 값을 리턴한다.
 */

// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    return this._basePrice - this._discount;
  }
  set discount(value) {
    this._discount = value;
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get production() {
    return this._adjustment.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(adjustment) {
    this._adjustments.push(adjustment);
  }
}
