/**
 * [Note]
 * 공통적으로 재사용되는 코드는 함수 내부에 두고 상황에 따라 다르게 사용되는 함수는 과감하게 바깥으로 뺀다.
 * - 데코레이터 패턴이나 콜백으로 상황에 따라 다르게 작동할 수 있도록 한다.
 * - 함수를 클래스로 변경하면 확장 가능성이 높아진다.
 *
 * [오잉]
 * - 시간이 지남에 따라 location을 사용하는 방법이 달라졌다고 하셨는데, 뭐가 달라졌는지 모르겠음..
 * [오잉 해결]
 * - 책에 나온 예제를 살펴보니 listRecentPhotos 함수에서 emitPhotoData 함수 내부의 location 만 상황에 따라 다르게 출력을 하는 문제가 있었다.
 * --> 간단한 상황에선 변경되야하는 코드만 꺼내 호출하는 곳에 인라인하면 된다.
 * --> 복잡한 상황에서는 1. 유지할 코드를 따로 다른 함수로 빼두고 2. 상황에 따라 다르게 사용되는 코드를 호출하는 곳에 인라인 한다. 3. 코드가 잘 작동하는지 확인 후 뺴둔 함수를 원래 함수명으로 수정한다.
 *
 * [해결]
 * 1. 문장을 호출한 곳으로 옮기기가... 데이터를 매개변수로 받음으로써 주석을 제거할 수 있는건가..?
 * 라고 생각해서 recentDateCutoff 함수에 있는 주석을 지우고 day 매개변수를 받아서 7 days ago라는 것을 호출함으로써 알 수 있게 했다.
 * 2. renderPhoto 는 매개변수 데이터를 받고서 사용도 안하고 그냥 빈 값을 출력하기만 해서
 * 왜 필요한지 모르겠다. 그래서 그냥 함수를 없애고 호출한 곳으로 내부 코드를 인라인했다.
 */

function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  outStream.write('');
  outStream.write(`<p>location: ${photo.location}</p>\n`);
  emitPhotoData(outStream, person.photo);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff(7))
    .forEach((p) => {
      outStream.write('<div>\n');
      emitPhotoData(outStream, p);
      outStream.write(`<p>location: ${photo.location}</p>\n`);
      outStream.write('</div>\n');
    });
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`);
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
}

function recentDateCutoff(day) {
  return new Date().setDate(new Date().getDate() - day);
}
