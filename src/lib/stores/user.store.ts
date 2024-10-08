import { writable } from "svelte/store";

export const userStore = writable({
    loggedIn: false,
    accessToken: '',
    refreshToken: ''
})
