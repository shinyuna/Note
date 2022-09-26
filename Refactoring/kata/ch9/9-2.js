/**
 * :NOTE vsocde 에서 필드 명 수정할 때 단축키 F2
 */
/**
 * :NOTE
 * - 필드명은 정확한 의도나 값을 나타낼 수 있도록 짓는 것이 중요하다.
 * - 조금 애매한데? 싶으면 과감하게 리팩터링하기!
 */

// 외부에선 데이터의 의도를 드러낼 수 있는 title이란 이름을 사용하고 내부에선 수정 없이 name을 사용할 수 있다.
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get title() {
    return this._name;
  }
  set title(value) {
    this._name = value;
  }
  get country() {
    return this._country;
  }
  set country(value) {
    this._country = value;
  }
}
const organization = new Organization({
  name: '드림코딩',
  country: '대한민국',
});
