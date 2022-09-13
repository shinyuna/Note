import { statement } from '../statement.js';

describe('statement', () => {
  const playsJSON = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoicesJSON = [
    {
      customer: 'BigCo',
      performances: [
        {
          playID: 'hamlet',
          audience: 55,
        },
        {
          playID: 'as-like',
          audience: 35,
        },
        {
          playID: 'othello',
          audience: 40,
        },
      ],
    },
  ];
  it('should print a statement', () => {
    const expected =
      '청구 내역 (고객명: BigCo)\n' +
      '  Hamlet: $650.00 (55석)\n' +
      '  As You Like It: $580.00 (35석)\n' +
      '  Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n';

    expect(statement(invoicesJSON[0], playsJSON)).toBe(expected);
  });
});

{
  /* <h1>청구 내역 (고객명: BigCo)</h1>
      <table>
      <tr><th>play</th><th>석</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
        <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
        <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
      </table>
      <p>총액: <em>$1,730.00</em></p>
      <p>적립 포인트: <em>47</em>점</p> */
}
