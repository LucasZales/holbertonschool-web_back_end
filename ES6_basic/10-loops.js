export default function appendToEachArrayValue(array, appendString) {
  const result = [];
  for (const item of array) {
    const newValue = appendString + item;
    result.push(newValue);
  }

  return result;
}
