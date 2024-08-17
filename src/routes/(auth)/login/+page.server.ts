	
import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { loginFormSchema } from "./login.schema";
import { zod } from "sveltekit-superforms/adapters";
import { AUTH_ENDPOINTS, NODE_ENV } from "$env/static/private";
import { userStore } from "$lib/stores/user.store";
import { redirect } from "@sveltejs/kit";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginFormSchema)),
  };
};

export const actions: Actions = {
    login: async ({request, cookies, url, fetch}) => {
        const formData = await request.formData()
        const username = formData.get("username")
        const password = formData.get("password")

        const form = {
            username,
            password
        }

        const response = await fetch(`${AUTH_ENDPOINTS}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            console.error("Error submitting form", response.statusText)
        }

        else {
            const {access_token, refresh_token} = await response.json()
            userStore.update((state) => ({ ...state, loggedIn: true, accessToken: access_token, refreshToken: refresh_token}))
    
            await cookies.set("loggedIn", "true", {secure: NODE_ENV === "production", path: "/"})
            await cookies.set("accessToken", access_token, {secure: NODE_ENV === "production", path: "/"})
            await cookies.set("refreshToken", access_token, {secure: NODE_ENV === "production", path: "/"})
            redirect(300, url.searchParams.get("next") || "/")
        }
    }

}