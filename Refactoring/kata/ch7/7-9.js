/**
 * 캡슐화된 함수내에서도 복잡하게 설게된 코드나 좋지 않은 성능으로 작성된 알고리즘이 있으면 리팩터링 한다.
 *
 * [해결]
 * - 함수명에서 어떤 역할을 하는지 좀 더 자세히 드러낸다.
 * --> Person 보단 내부에서 지정한 Person인 Candidate로 수정
 * --> 불필요하게 복잡한 알고리즘 보단 한 눈에 읽히는 알고리즘으로 수정
 */
function foundCandidate(people) {
  const candidates = ['Don', 'John', 'Kent']
  return people.find(p => candidates.includes(p)) || ''
}

console.log(foundCandidate(['John']));
console.log(foundCandidate(['Don', 'John']));
console.log(foundCandidate(['Kent', 'Don', 'John']));
console.log(foundCandidate(['Lisa', 'Don', 'Tom']));
