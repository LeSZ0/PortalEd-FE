<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { loginFormSchema, type LoginFormSchema } from "./login.schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<LoginFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(loginFormSchema),
    });

    const { form: formData, enhance } = form;

    const handleForgotPassword = async (event: MouseEvent) => {
        event.preventDefault()
        console.log("Handle Forgot Password")
    }

</script>

<form method="POST" use:enhance action="?/login">
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.username}
                class="text-white bg-gray-800 dark:text-black dark:bg-gray-100"
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input {...attrs} bind:value={$formData.password} type="password" class="text-white bg-gray-800 dark:text-black dark:bg-gray-100" />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <div class="w-full flex items-start justify-end mb-4">
        <a href="/forgot-password" class="cursor-pointer text-purple-700 dark:text-purple-400" on:click={handleForgotPassword}>¿Olvidó su contraseña?</a>
    </div>
    <Form.Button type="submit" class="w-full uppercase bg-purple-400 text-black hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-900">
        Iniciar Sesion
    </Form.Button>

    <div class="mt-4 flex items-center justify-center">
        <p>Necesitas una cuenta? 
            <a class="cursor-pointer text-purple-700 dark:text-purple-400" href="/sign-up">Únete aquí</a>
        </p>
    </div>
</form>
