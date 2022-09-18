/**
 * 해결 방법: 레코드를 클래스로 만들어 캡슐화 한다.
 *
 * [중요 포인트]
 * 프로젝트 내부적에서 필요한 모델은 객체로 데이터를 전달하는 것 보단, 인자를 각각 전달하는 것이 좋다.
 * --> 백엔드에서 받은 JSON 데이터 또는 외부 라이브러리의 데이터를 한번 캡슐화하는 경우
 * 어떤 데이터가 읽기 전용인지 아닌지 청사진을 남겨두는 것이 다른 개발자들과의 협업을 할 때도 중요하다.
 */

class Organization {
  #name;
  #country;
  constructor(name, country) {
    this.#name = name
    this.#country = country
  }

  get name() {
    return this.#name
  }

  get country() {
    return this.#country;
  }

  set name(name) {
    this.#name = name
  }
}

const organization = new Organization('Acme Gooseberries', 'GB')

organization.name = 'Dream Coding';
console.log(organization.name);
console.log(organization.country);
