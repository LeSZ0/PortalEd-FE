<script lang="ts">
    import type { PageData } from "./$types";
    import * as Card from "$lib/components/ui/card";
    import LoginForm from "./login-form.svelte";

    export let data: PageData;
</script>

<div class="w-full h-screen mx-auto flex items-center justify-center bg-gray-200 dark:bg-gray-600">
    <Card.Root class="w-[900px] light:bg-gray-100 light:text-black dark:bg-gray-800 dark:text-gray-200">
        <div class="flex justify-between items-start">
            <div class="w-[49%]">
                <Card.Header>
                    <Card.Title>Inicio de sesión</Card.Title>
                    <Card.Description>Bienvenido/a de nuevo</Card.Description>
                </Card.Header>
                <Card.Content class="grid gap-4">
                    <LoginForm data={data.form} />
                </Card.Content>
                <Card.Footer>
                    <h4>Card Footer</h4>
                </Card.Footer>
            </div>
            <div class="p-6 w-[49%]">
                <h4>Right side</h4>
            </div>
        </div>
    </Card.Root>
</div>

<style></style>