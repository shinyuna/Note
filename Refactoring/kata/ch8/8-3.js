/**
 * [Note]
 * 타입이 없는 코드에선 인자의 이름을 명확하게 작성하는 것이 좋다.
 *
 * [해결]
 * 1. 연관있는 역할을 하고 있는 함수에 문단을 옮긴다.
 * - photoDiv 함수의 title 출력 부분
 * --> 목적에 알맞는 함수
 * 2. 불필요한 함수를 없앤다.
 * - emitPhotoData 내용을 emitPhotoData 함수에 옮기고 emitPhotoData 를 사용하는 부분을 emitPhotoData 로 수정 후 emitPhotoData 삭제
 * --> 불필요한 코드 삭제
 * 3. 목적에 알맞는 함수를 사용한다.
 * - renderPerson 함수에서 사용하는 renderPhoto 대신 photoDiv 사용
 * --> renderPerson 에서 사용되는 중복 코드 제거
 */

export function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(``);
  result.push(photoDiv(person.photo));
  return result.join('\n');
}

export function photoDiv(photo) {
  return ['<div>', renderPhoto(photo), '</div>'].join('\n');
}

function renderPhoto(photo) {
  const result = [];
  result.push(`<p>title: ${photo.title}</p>`);
  result.push(`<p>location: ${photo.location}</p>`);
  result.push(`<p>date: ${photo.date.toDateString()}</p>`);
  return result.join('\n');
}
