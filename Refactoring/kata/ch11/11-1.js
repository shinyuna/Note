// 예제 1
function totalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}

// 예제 2
export function alertForMiscreant(people, alarm) {
  for (const p of people) {
    if (p === 'Don') {
      setOffAlarms(alarm, p);
      return 'Don';
    }
    if (p === 'John') {
      setOffAlarms(alarm, p);
      return 'John';
    }
  }
  return '';
}

function setOffAlarms(alarm, p) {
  alarm.setOff('Found Miscreant ' + p);
}
