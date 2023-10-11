import { writable } from 'svelte/store';

export const settings = writable({
    rows: 9,
    cols: 10,
    safeZone: 4,
    cellSize: 30,
    mines: 30,
});

export const hideSettings = writable(true);