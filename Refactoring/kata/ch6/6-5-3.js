export function inNewEngland(state) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(state);
}

// 함수 안에서 필요한 정보만 매개변수로 받아 오는 것이 좋다.
// -> 외부 객체(데이터)에 대한 의존성을 낮출 수 있다.