/**
 * :NOTE
 * Side Effect : 예상하지 못한 행동을 하는 함수
 * 질의 함수 : 연산을 통해 값을 구하는 함수. 내부 또는 외부의 값을 변경해 부수효과를 발생해서는 안된다. (= Query)
 */


// 예제 1
/**
 * - And 가 문제다. 함수는 한 가지의 일만 해야한다.
 * - totalOutStanding 을 구하는 함수와 sendBill 하는 함수를 분리한다.
*/
function totalOutstanding() {
  return customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
}

function sendBill() {
  // send Bill logic ...
}


// 예제 2
/**
 * 악당을 찾는 함수와 알람을 보내는 로직을 분리한다.
 * - 각 역할을 하고 있는 함수가 분리 되어 있어 필요한 로직만 가져다가 사용할 수 있어 재사용성이 높아지고 가독성 또한 좋아진다.
 */
export function alertForMiscreant(people, alarm) {
  const miscreant = findMiscreant(people)

  if (!miscreant) {
    return;
  }
  setOffAlarms(alarm, miscreant);
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === 'Don') {
      return 'Don';
    }
    if (p === 'John') {
      return 'John';
    }
  }
  return '';
}

function setOffAlarms(alarm, p) {
  alarm.setOff('Found Miscreant ' + p);
}
