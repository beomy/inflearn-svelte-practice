import _ from 'lodash';
import { multiply } from 'mathjs';

export function getSolution () {
  const s = _.chunk(_.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]), 3);
  const x1 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
  const x2 = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
  const x1s = multiply(x1, s);
  const x2s = multiply(x2, s);
  const sx1 = multiply(s, x1);
  const sx2 = multiply(s, x2);
  const x1sx1 = multiply(x1s, x1);
  const x2sx1 = multiply(x2s, x1);
  const x1sx2 = multiply(x1s, x2);
  const x2sx2 = multiply(x2s, x2);
  return [
    [...s[0], ...x1s[0], ...x2s[0]],
    [...s[1], ...x1s[1], ...x2s[1]],
    [...s[2], ...x1s[2], ...x2s[2]],
    [...sx1[0], ...x1sx1[0], ...x2sx1[0]],
    [...sx1[1], ...x1sx1[1], ...x2sx1[1]],
    [...sx1[2], ...x1sx1[2], ...x2sx1[2]],
    [...sx2[0], ...x1sx2[0], ...x2sx2[0]],
    [...sx2[1], ...x1sx2[1], ...x2sx2[1]],
    [...sx2[2], ...x1sx2[2], ...x2sx2[2]],
  ]
}