const values = [];
function getValueForPeriod(periodNumber) {
  const value = values[periodNumber];
  if (!value) {
    throw new Error('value is undefined');
  }
  return value;
}

try {
  getValueForPeriod(-10);
} catch (error) {
  console.log('에러 발생!');
}
