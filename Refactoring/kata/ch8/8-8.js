/**
 * 함수형 프로그래밍을 통해 직관적, 단언적, 간편하게 프로그래밍을 할 수 있다.
 */
export function acquireData(input) {
  return input
    .split('\n')
    .slice(1)
    .filter(line => !!line.trim())
    .map(line => line.split(','))
    .filter(record => record[1].trim() === 'India')
    .map(line => ({ city: lin기e[0].trim(), phone: line[2].trim() }))
}

const input = `office, country, telephone\n
Chicago, USA, +1 312 373 1000\n
Beijing, China, +86 4008 900 505\n
Bangalore, India, +91 80 4064 9570\n
Porto Alegre, Brazil, +55 51 3079 3550\n
Chennai, India, +91 44 660 44766`;
console.log(acquireData(input));