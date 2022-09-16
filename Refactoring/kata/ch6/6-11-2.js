import fs from 'fs';

/**
 * [스크립팅 작업 단계]
 * 1. 사용자 입력
 * 2. 사용자 입력에 대한 유효성 검사
 * 3. 필요한 로직 처리
 * --------------------------
 * [중요 포인트]
 * - 의미 있는 함수 단위로 함수를 쪼개면 얻는 이점은? 의미있는 이름을 짓게 되면서 자동 문서화 효과, 빠르게 흐름 읽기 가능
 * - 이름 짓기의 중요성, 긴 코드가 아닌 짧은 단위의 함수 작성
 */

// 1. run 함수를 만들어 노드의 process 디펜던시 제거
run(process.argv);

function run(args) {
  const command = parseCommand(args);
  countOrders(command);
}

// 2. 사용자 입력 유효성 검사
function parseCommand(args) {
  if (!args[2]) {
    throw new Error('파일 이름을 입력하세요');
  }

  const fileName = `./${process.argv[2]}.json`;
  if (!fs.existsSync(fileName)) {
    throw new Error('파일이 존재하지 않습니다');
  }

  const countReadyOnly = process.argv.includes('-r');

  return {
    fileName,
    countReadyOnly,
  };
}

function countOrders({ fileName, countReadyOnly }) {
  const rawData = fs.readFileSync(fileName);
  const orders = JSON.parse(rawData);
  const filtered = countReadyOnly ? orders.filter(order => order.status === 'ready') : orders;
  console.log(filtered.length);
}
