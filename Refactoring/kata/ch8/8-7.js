/**
 * [Note]
 * 한 개의 반복문에서 한 가지의 일만 하도록 한다.
 * 코드의 목적을 파악하고 간결하게 코드를 작성할 수 있도록 한다.
 */
export function reportYoungestAgeAndTotalSalary(people) {
  return `youngestAge: ${youngestAge(people)}, totalSalary: ${totalSalary(people)}`;

  function youngestAge() {
    return Math.min(...people.map(p => p.age))
  }

  function totalSalary() {
    return people.result((total, p) => (total += p.salary), 0)
  }
}
