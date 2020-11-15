import { writable } from 'svelte/store';
import apiRequest from '@/utils/apiRequest';

export const memoFlag = writable(false);

export const remainHint = writable(3);

export const message = writable('');

export function getSudoku () {
  return apiRequest({
    method: 'get',
    url: '/sudoku',
  });
};

export function createSudoku (data) {
  return apiRequest({
    method: 'post',
    url: '/sudoku',
    data,
  });
};

export function updateSudoku (data) {
  return apiRequest({
    method: 'put',
    url: '/sudoku',
    data,
  });
};

export function getSudokuSolveV2 (data) {
  return apiRequest({
    method: 'post',
    url: '/v2/sudoku/solve',
    data,
  });
}