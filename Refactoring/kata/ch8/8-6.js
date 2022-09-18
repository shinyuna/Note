/**
 * 예제 1: 변수를 선언한 곳과 사용하는 곳을 가깝게 두는 것이 코드를 읽는 흐름을 깨트리지 않는데 도움을 준다.
 * 예제 2: 조건문과 상관 없이 반복되는 코드는 조건문 밖으로 꺼내고, 조건에 따라 할당하는 값이 달라지는 것은 if 문 대신 삼항 연산자를 사용한다.
 */

// 예제 1
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;

// 예제 2
function someFunc() {
  const result = availableResources.length === 0
    ? createResource()
    : availableResources.pop();
  allocatedResources.push(result);
  return result;
}
