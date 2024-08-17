import { redirect, type Handle } from "@sveltejs/kit";
import { userStore } from "$lib/stores/user.store";
import { get } from "svelte/store";
import { AUTH_ENDPOINTS } from "$env/static/private";
import { sequence } from "@sveltejs/kit/hooks";

export const pagesGuard: Handle = async ({ event, resolve }) => {
    // Stage 1
    const {cookies} = event
    const loggedIn = get(userStore)?.loggedIn || cookies.get("loggedIn")
    const accessToken = get(userStore)?.accessToken || cookies.get("accessToken")
    if (event.url.pathname != "/login" && event.url.pathname != "/sign-up" && (!loggedIn || !accessToken)) {
        redirect(302, `/login?next=${event.url.pathname}`)
    }

    if (accessToken && (event.url.pathname == "/login" || event.url.pathname == "/signup")) {
        redirect(302, event.url.searchParams.get("next") || "/")
    }

    const response = await resolve(event)

    // Stage 3
    return response
};

export const handle: Handle = pagesGuard;
