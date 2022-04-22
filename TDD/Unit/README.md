# Unit Test(단위 테스트)

    - 독립적인 함수 모듈 클래스를 테스트 (자동차로 비유를 하자면, 바퀴에 대한 테스트)

#### Test Runner

- 테스트 실행 후 결과 생성
- **Mocah** 라는 라이브러리가 대표적으로 사용됨

#### Assertion

- 테스트에 대한 조건, 비교를 통한 로직
- **Chai** 라는 라이브러리가 대표적으로 사용됨

## 🃟 Jest

- Test Runner, Assertion 모두 수행하는 자바스크립트 테스팅 라이브러리
- [Jest 공식 문서](https://jestjs.io/)

### Jest 장점

- **zero config**, 별 다른 설정 없이 사용 가능!
- **snapshots**, 브라우저 UI 환경에서 테스트 할 때 사용, 큰 오브젝트 현재의 상태 찰칵
- **isolated**, 테스트가 각각의 프로세스에서 진행되기 때문에 성능, 속도가 좋다.
- **great api**, 사용하기 쉬운 라이브러리가 내장되어 있다.

### Jest 환경 설정

```shell

"test": "jest --(watch|watchAll)"

```

- **watchAll** : 코드가 변경 될 때 마다, 모든 테스트를 재실행한다.
- **watch** : 이미 git에 커밋된 파일 X, 수정 중인 파일만 테스트를 재실행한다.
