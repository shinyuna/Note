/**
 * :NOTE
 * - 내부에서 전달 받은 값이나 외부 값을 변경하는 것은 사이드 이펙트를 발생한다.
 */

export function ascentVelocity(points, totalMinutes) {

  function calculateAscent(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      const verticalChange = points[i].elevation - points[i - 1].elevation;
      result += verticalChange > 0 ? verticalChange : 0;
    }
    return result;
  }

  const totalAscent = calculateAscent([{ elevation: 10 }, { elevation: 20 }]);

  return totalAscent / totalMinutes;
}
