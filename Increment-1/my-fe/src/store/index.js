import { writable } from "svelte/store";

export const route = writable(0);
export const isLogin = writable(false);
export const isUsername = writable(null);
export const apiURL = writable(
   process.ENV.production
      ? "https://lppmuisiapi.dififa.com"
      : "http://localhost:10443"
);
