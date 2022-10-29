# GraphQL

## 📚 학습 계획

1. GraphQL 이 어떻게 동작하고, 이 기술을 통해 어떤 이점을 얻을 수 있는지 이해한다.
2. 프로젝트 진행을 통해 BFF(Backend For Front)가 뭔지 이해하고, 프런트로서 GraphQL의 이점을 직접 경험해본다.

### 🎃 공부 기록

|   DATE   |         TITLE         |                                                         REFERENCES                                                         |  NOTE  |
|:--------:|:---------------------:|:--------------------------------------------------------------------------------------------------------------------------:|:------:|
| 22/10/29 | Queries and Mutations | [graphQL 공식 문서](https://graphql.org/learn/queries/), [GraphQL 핵심 개념](https://www.howtographql.com/basics/2-core-concepts/) | [🌱]() |

---

## GraphQL 핵심 개념 잡기

### GraphQL 은 스키마 정의(SDL) 언어다

- 스키마 정의는 IDL(인터페이스 정의 언어)라고도 한다.
- tpye, fields 로 구성되어 있다.
  - field 간의 관계를 표현하는 것도 가능합니다. (예제 코드의 owner 객체)

| [nest.js 공식 문서 참고](https://docs.nestjs.com/graphql/resolvers#object-types)

```ts
/** 스키마 정의 in nest.js **/

@ObjectType()
class Repository {
    @Field(type => String)
    name: string;

    @Field(type => String)
    description: string

    @Field(type => Int)
    starCount: number

    @Field(type => Boolean)
    isPrivate: boolean

    @Field(type => User)
    owner: User
}
```

### Queries, Mutations

#### 서버에게 정보 요청, Queries

- REST API 는 특정 데이터를 가져오기 위해선 각 데이터마다 정해진 endpoint url이 필요합니다.
- REST API 와 달리 GraphQL은 단 하나의 endpoint 만으로 클라이언트가 필요한 데이터를 가져올 수 있습니다.
- 이 때, 필요한 데이터를 가져오기 위해 필요한 정보가 **쿼리**입니다.

```gql
query {
  repository(name:"Note", owner:"shinyuna") {
    id
    createdAt
    description
    owner {
      login
    }
  }
}

# 쿼리 response 값
{
  "data": {
    "repository": {
      "id": "R_kgDOHN5kgg",
      "createdAt": "2022-04-22T07:25:13Z",
      "description": "Yunadev TIL🍀",
      "owner": {
        "login": "shinyuna"
      }
    }
  }
}
```

#### 서버의 데이터를 변경, Mutations

- GraphQL에서는 Mutations 사용해 백엔드에 저장된 데이터를 변경합니다.
  - 새로운 데이터 생성
  - 기존 데이터 변경
  - 기존 데이터 삭제
- Queries 와 구문 구조는 같지만, query 대신 mutation 키워드로 시작합니다.

```gql
mutation {
  updateRepository(input:{ 
    repositoryId: "R_kgDOHN5kgg",
    description: "학습한 내용을 기록합니다.🍀"
  }) {
    repository {
      description 
    }
  }
}

# 뮤테이션 response 값
{
  "data": {
    "updateRepository": {
      "repository": {
        "description": "학습한 내용을 기록합니다.🍀"
      }
    }
  }
}
```

| [github playground](https://docs.github.com/en/graphql/overview/explorer)

### 스키마 정의

- API 가 클라이언트와 어떻게 데이터를 주고 받을건지를 정의하는 아주 중요한 개념입니다.
  - 종종 서버와 클라이언트 간의 계약으로 간주된다.
- field 의 모음이라고 생각하면 쉽습니다.
- API 용 스키마를 작성할 땐, 특별한 루트 유형이 있습니다.

```gql
type Query {
    repository(name: String!, owner:String!): Repository
}
type Mutation {
    updateRepository(repositoryId: String!,
    description: String): Repository!
}
```

- 위에서 보이는 것과 같이 repository 정보를 가져오는 쿼리의 API 루트 필드는 ```repository``` 가 됩니다. 추가로 ```repository```에는 인수가 있기 때문에 인수까지 나타내줍니다.
- 쿼리와 동일하게 repository 정보를 업데이트해주는 뮤테이션의 루트 필드는 ```updateRepository```의 입니다.
- 각 명령에 맞는 type을(Query, Mutation) 추가해주시면 됩니다.

```ts
// nest.js resolver에 API 스키마 정의
@Query(returns => GetRestaurantsOutput)
async getRestaurants(@Args('input') params: GetRestaurantsInput): Promise<GetRestaurantsOutput> {
  return this.restaurantService.getRestaurants(params);
}
```

---

🌈 참고

- [howtographql](https://www.howtographql.com/basics/2-core-concepts/)
