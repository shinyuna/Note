import _ from 'lodash';
/**
 * 해결 방법: 레코드를 클래스로 만들어 캡슐화 한다.
 *
 * [중요 포인트]
 * 프로젝트 내부적에서 필요한 모델은 객체로 데이터를 전달하는 것 보단, 인자를 각각 전달하는 것이 좋다.
 * --> 백엔드에서 받은 JSON 데이터 또는 외부 라이브러리의 데이터를 한번 캡슐화하는 경우
 * 어떤 데이터가 읽기 전용인지 아닌지 청사진을 남겨두는 것이 다른 개발자들과의 협업을 할 때도 중요하다.
 */

class Organization {
  #data;
  #name;
  #country;
  constructor(data) {
    this.#data = data
    this.#name = data.name
    this.#country = data.country
  }

  get name() {
    return this.#name
  }

  get country() {
    return this.#country
  }

  set name(value) {
    if (!value) {
      return;
    }
    this.#name = value
  }

  get originData() {
    // return {...this.#data} // <- 얕은 복사
    return _.cloneDeep(this.#data)
  }

  get rowData() {
    return { name: this.name, country: this.#country }
  }
}

const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' })

organization.name = '';
console.log(organization.name)
console.log(organization.originData);
console.log(organization.rowData);
