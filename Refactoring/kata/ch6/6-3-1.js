export function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const discount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);

  return basePrice - discount + shipping;
}

// 문맥상으로만 맞다면, 짧은 단어로 작성된 변수를 사용해도 괜찮다.
// ex. quantitiyDiscount -> discount, shippingCount -> shipping