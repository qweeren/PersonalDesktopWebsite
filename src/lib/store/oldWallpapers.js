import { writable } from 'svelte/store';

function localStorageStore(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const store = writable(initial);

    store.subscribe(($store) => {
        localStorage.setItem(key, JSON.stringify($store));
    });

    return store;
}

const oldWallpapersStore = localStorageStore("oldWallpapers", []);

export default oldWallpapersStore;