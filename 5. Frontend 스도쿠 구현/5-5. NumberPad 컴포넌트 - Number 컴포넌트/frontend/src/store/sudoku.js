import { writable } from 'svelte/store';

export const memoFlag = writable(false);

export const remainHint = writable(3);
