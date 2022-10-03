/**
 * :NOTE
 * - 특정한 데이터와 계산이 여러곳에서 사용된다면 클래스로 관리하는 것이 좋지만, 단 한번만 사용되는 로직을 클래스로 만들어서 인스턴스를 생성하는 것은 비효율적이다.
 *   ex. Math.max
 *
 * - 데이터를 영원히 간직할 필요 없고, 일시적으로만 사용되는 로직은 클래스보단 그냥 함수로 두는게 좋다.
 *
 * 🌱
 * - 코드를 작성하는 것엔 정답이 없다. 그떄 그떄 상황에 따라 최선의 선택을 하는 것이 중요하다.
 */

function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}