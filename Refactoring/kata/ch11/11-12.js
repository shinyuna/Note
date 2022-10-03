function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else return -23;
}
