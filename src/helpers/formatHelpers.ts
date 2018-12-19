export function paddNum(size, num) {
  var sign = Math.sign(num) === -1 ? '-' : '';
  return (
    sign +
    new Array(size)
      .concat([Math.abs(num)])
      .join('0')
      .slice(-size)
  );
}

export function castValue(value) {
  if (!isNaN(parseFloat(value))) {
    if (new Date(value).getTime() > 0) {
      return new Date(value);
    }
    if (value.indexOf('.') !== -1) {
      return parseFloat(value);
    }
    return parseInt(value);
  }
  if (new Date(value).getTime() > 0) {
    return new Date(value);
  }
  return value;
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z ]/gi, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
      idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
    )
    .replace(/\s+/g, '');
}
