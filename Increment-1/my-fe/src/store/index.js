import { writable } from "svelte/store";

export const route = writable(0);
export const isLogin = writable(false);
export const apiURL = writable("http://localhost:10443");
