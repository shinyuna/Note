/**
 * [문제]
 * 함수 자체는 잘 작성했지만, **함수의 위치에서 냄새**가 난다.
 *
 * [Note]
 * - 중첩 함수에서의 캡슐화
 * --> 행동이 속성을 필요로 하고 있는지, 밀접하게 연관되어 있는지를 파악하며 캡슐화 한다.
 *
 * 코드의 응집도를 높일 땐, 서로 밀접하게 연관된 코드인지 확인하는 것이 중요하다.
 * --> 불필요하게 응집되어 있는 코드는 오히려 코드의 **재사용성을 떨어트리고** **중복 코드**를 낳게 된다.
 */

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distance(p1, p2) {
  // 포뮬라: http://www.movable-type.co.uk/scripts/latlong.html
  const EARTH_RADIUS = 3959; // in miles
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p2.lat)) *
    Math.cos(radians(p1.lat)) *
    Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function calculateDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

export function trackSummary(points) {
  const time = 10000;
  const distance = calculateDistance(points);
  const pace = time / 60 / distance;
  return {
    time,
    distance,
    pace,
  };
}

const newYork = {
  lat: 40.73061,
  lon: -73.935242,
};

const tokyo = {
  lat: 35.652832,
  lon: 139.839478,
};

const summary = trackSummary([newYork, tokyo]);
console.log(summary);
