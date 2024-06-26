<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { signUpFormSchema, type SignUpFormSchema } from "./signup.schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<SignUpFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(signUpFormSchema),
    });

    const { form: formData, enhance } = form;

</script>

<form method="POST" use:enhance action="?/signup">
    <div class="w-full flex items-start justify-between">
        <div class="w-[48%]">
            <h2 class="font-bold text-l upper mb-4">Credenciales</h2>
            <Form.Field {form} name="username">
                <Form.Control let:attrs>
                    <Form.Label>Usuario</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.username}
                        class="text-white bg-gray-800 dark:text-black dark:bg-gray-100"
                        type="text"
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="email">
                <Form.Control let:attrs>
                    <Form.Label>Email</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.email}
                        class="text-white bg-gray-800 dark:text-black dark:bg-gray-100"
                        type="email"
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label>Contraseña</Form.Label>
                    <Input {...attrs} bind:value={$formData.password} type="password" class="text-white bg-gray-800 dark:text-black dark:bg-gray-100" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="passwordConfirm">
                <Form.Control let:attrs>
                    <Form.Label>Repetir contraseña</Form.Label>
                    <Input {...attrs} bind:value={$formData.passwordConfirm} type="password" class="text-white bg-gray-800 dark:text-black dark:bg-gray-100" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div class="w-[48%]">
            <h2 class="font-bold text-l upper mb-4">Información Personal</h2>
            <Form.Field {form} name="fullname">
                <Form.Control let:attrs>
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.fullname}
                        class="text-white bg-gray-800 dark:text-black dark:bg-gray-100"
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="dni">
                <Form.Control let:attrs>
                    <Form.Label>DNI</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.dni}
                        class="text-white bg-gray-800 dark:text-black dark:bg-gray-100"
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="birth_date">
                <Form.Control let:attrs>
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Input {...attrs} bind:value={$formData.birth_date} class="text-white bg-gray-800 dark:text-black dark:bg-gray-100" type="date" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
    </div>
    <Form.Button class="w-full mt-4 uppercase bg-purple-400 text-black hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-900">
        Crear cuenta
    </Form.Button>
</form>