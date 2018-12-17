export function paddNum(size, num) {
    var sign = Math.sign(num) === -1 ? "-" : "";
    return (
      sign +
      new Array(size)
        .concat([Math.abs(num)])
        .join("0")
        .slice(-size)
    );
}