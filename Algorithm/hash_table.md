# hash 테이블

- 효율적인(빠른) 탐색을 위해 고안된 자료구조, hash function을 사용하여 key-value 쌍을 저장
- key를 hash function에 넣어 얻은 해시 값(hash value)을 이용해 데이터를 저장할 위치(index)를 결정
- 저장/삭제/검색 모두 시간 복잡도는 모두 O(1), 그러나 충돌 발생 시 최악의 경우 O(n)이 될 수 있음
- 데이터 저장 전 미리 저장공간(slot, bucket)을 확보해야 하기 때문에 공간효율성이 떨어짐

## collision(충돌) 해결 방법

1. Open Addressing(개방 주소법)
    - 충돌이 발생하면 다른 빈 슬롯을 찾아 데이터를 저장
    - 선형 탐사(linear probing), 이차 탐사(quadratic probing), 이중 해싱(double hashing) 등이 있음
    - 선형, 이차 탐사는 클러스터링 현상이 발생할 수 있음

2. Separate Chaining(분리 연결법)
    - 각 슬롯이 연결 리스트(linked list)나 다른 자료구조를 가리키도록 하여 충돌이 발생한 데이터를 해당 슬롯의 리스트에 추가

## 좋은 hash function의 조건

- 상황마다 달라짐. 대략적인 기준으로는 연산 속도가 빠르고, 해시 값이 균등하게 분포되어야 함