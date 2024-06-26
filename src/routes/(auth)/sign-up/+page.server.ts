	
import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { signUpFormSchema } from "./signup.schema";
import { zod } from "sveltekit-superforms/adapters";
import { APIS_ENDPOINTS } from "$env/static/private";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signUpFormSchema)),
  };
};

export const actions: Actions = {
    signup: async ({request}) => {
        const formData = await request.formData()
        const username = formData.get("username");
        const password = formData.get("password")
        const email = formData.get("email")
        const full_name = formData.get("fullname")
        const dni = formData.get("dni")
        const birth_date = formData.get("birth_date")

        const form = {
            username,
            password,
            email,
            full_name,
            dni,
            birth_date
        }

        const response = await fetch(`${APIS_ENDPOINTS}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            console.error("Error submitting form", response.statusText)
        }

        const responseData = await response.json()
        console.log(responseData)
    }
}
