/**
 * :NOTE
 * - 에러 코드는 프로그래밍에서 제공해주는 에러 클래스를 반환한다.
 * - 에러 코드는 일반적인 값보단, 에러의 의미를 정확하게 알 수 있는 객체를 사용한다.
 */

function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23)
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super();
    this.errorCode = errorCode
  }
}

try {
  const result = localShippingRules(data)
} catch (e) {
  if (e instanceof OrderProcessingError) {
    console.log(e)
  }
}