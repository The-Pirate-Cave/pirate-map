import BigNumber from 'bignumber.js';

export function noOp() {}

export function bnum(val) {
  let number: string;
  if (typeof val === 'string') {
    number = val;
  } else {
    number = val ? val.toString() : '0';
  }
  return new BigNumber(number);
}
