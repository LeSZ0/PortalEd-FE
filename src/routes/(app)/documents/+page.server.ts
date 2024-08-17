import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { APIS_ENDPOINTS, AUTH_ENDPOINTS } from "$env/static/private";
import { userStore } from "$lib/stores/user.store";
import { get } from "svelte/store";
import type { Document, DocumentFromAPI } from "./interfaces";
import { verifyToken } from "$lib/utils";

export const load: PageServerLoad = async (event) => {
    const {cookies} = event
    const accessToken = get(userStore)?.accessToken || cookies.get("accessToken")

    let validToken: boolean = false

    if (accessToken) {
        validToken = await verifyToken(accessToken, AUTH_ENDPOINTS)
    }

    if (!validToken) {
        cookies.delete("accessToken", {
            path: "/"
        })
        userStore.set({loggedIn: false, refreshToken: '', accessToken: ''})
        redirect(302, `/?next=${event.url.pathname}`)
    }

    const response = await fetch(`${APIS_ENDPOINTS}/documents`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if (!response.ok) {
        console.error(response.statusText)
        return
    }

    const documentsResponse: DocumentFromAPI[] = await response.json()

    const documents: Document[] = documentsResponse.map((docs) => ({
        ...docs,
        is_favorite: false
    }))

    return { documents }
}

export const actions: Actions = {}
