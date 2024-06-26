import { redirect, type Handle } from "@sveltejs/kit";
import { userStore } from "$lib/stores/user.store";
import { get } from "svelte/store";


export const handle: Handle = async ({ event, resolve }) => {
    // Stage 1
    const {cookies} = event
    const loggedIn = get(userStore)?.loggedIn || cookies.get("loggedIn")
    const accessToken = get(userStore)?.accessToken || cookies.get("accessToken")
    if (event.url.pathname != "/login" && event.url.pathname != "/signup" && (!loggedIn || !accessToken)) {
        redirect(302, "/login")
    }

    if (accessToken && (event.url.pathname == "/login" || event.url.pathname == "/signup")) {
        redirect(302, "/")
    }

    const response = await resolve(event)

    // Stage 3
    return response
};