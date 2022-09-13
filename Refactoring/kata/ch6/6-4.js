export function isDeliveryFree(anOrder) {
  return anOrder.basePrice > 1000;
}

// 한 눈에 봐도 이해 가능한 짧은 변수는 인라인 하는 것이 더 좋다.
// 불필요한 변수는 인라인 해 🛼