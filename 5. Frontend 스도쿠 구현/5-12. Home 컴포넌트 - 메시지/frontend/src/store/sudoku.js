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
