/**
 * @see https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee
 * @see https://overreacted.io/algebraic-effects-for-the-rest-of-us/#what-does-this-have-to-do-with-algebraic-effects
 * -> 대수 효과는 던진 시점으로 다시 돌아가서 복구값으로 “재개(resume)”할 수 있습니다. 즉, 실행 스택을 거슬러 올라가 핸들러가 값을 주면 해당 지점에서 계속 진행이 가능하다.
 */


/** -------------------------------------------------------
 * 1) fetch 모킹 (데모용)
 *    - 실제 네트워크 대신, URL에 따라 지연 후 문자열 반환
 * ------------------------------------------------------*/
function mockFetch(url) {
  const routes = {
    '/users/123': { delay: 500, body: JSON.stringify({ id: 123, name: 'Seb' }) },
    '/greeting' : { delay: 800, body: 'Hello' },
  };

  const hit = routes[url];

  if (!hit) {
    return Promise.reject(new Error(`404: ${url}`));
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: async () => hit.body
      });
    }, hit.delay);
  });
}

const fetchImpl = mockFetch;

/** -------------------------------------------------------
 * 2) Infrastructure: fetchTextSync
 *    - 캐시(cache)/진행중(pending) 2가지 맵으로 상태 관리
 *    - 값이 준비 안 되었으면 Promise를 throw (흐름을 바깥으로 넘김)
 * ------------------------------------------------------*/
const cache = new Map();
const pending = new Map();

function fetchTextSync(url) {
  if (cache.has(url)) {
    // 이미 받아온 응답
    console.log(`[fetchTextSync] cache hit: ${url}`);
    return cache.get(url);
  }
  if (pending.has(url)) {
    // 진행중인 요청이 있다면 그 Promise를 던져서 바깥에서 await 하도록
    console.log(`[fetchTextSync] pending -> throw Promise: ${url}`);
    throw pending.get(url);
  }

  console.log(`[fetchTextSync] new request: ${url}`);
  const p = fetchImpl(url)
    .then((res) => res.text())
    .then((text) => {
      pending.delete(url);
      cache.set(url, text);
      console.log(`[fetchTextSync] resolved & cached: ${url}`);
      return text;
    })
    .catch((err) => {
      pending.delete(url);
      throw err;
    });

  pending.set(url, p);
  // 아직 결과가 없으니 Promise를 던져 제어를 바깥(runPureTask)으로 넘김
  throw p;
}

/** -------------------------------------------------------
 * 3) Executor: runPureTask
 *    - task()를 실행하다가 Promise가 던져지면 await하고 재시도
 *    - 값이 반환될 때까지 반복
 * ------------------------------------------------------*/
async function runPureTask(task) {
  for (;;) {
    try {
      return task();
    } catch (thrown) {
      if (thrown instanceof Promise) {
        // 아직 준비 안 된 비동기 작업 -> 여기서 기다린 뒤 루프 재시도
        await thrown;
      } else {
        // 진짜 에러면 던진다
        throw thrown;
      }
    }
  }
}

/** -------------------------------------------------------
 * 4) “동기처럼 보이는” 애플리케이션 코드
 *    - 내부에서 fetchTextSync를 호출하지만, 외부(runPureTask)가
 *      비동기를 알아서 기다려줌
 * ------------------------------------------------------*/
function getUserName(id) {
  const json = fetchTextSync(`/users/${id}`); // 값이 없으면 throw Promise
  const user = JSON.parse(json);
  return user.name;
}

function getGreeting(name) {
  if (name === 'Seb') {
    // 조건에 따라 즉시 문자열 반환(완전히 동기)
    return 'Hey';
  }
  // 아니라면 비동기 리소스(문자열) 동기처럼 긁어오기
  return fetchTextSync('/greeting'); // 값이 없으면 throw Promise
}

function getMessage() {
  const name = getUserName(123);
  const greet = getGreeting(name);
  return `${greet}, ${name}!`;
}

/** -------------------------------------------------------
 * 5) 실행
 * ------------------------------------------------------*/
(async () => {
  console.time('run');
  const message = await runPureTask(getMessage);
  console.timeEnd('run');
  console.log('>>> RESULT:', message);
})();
