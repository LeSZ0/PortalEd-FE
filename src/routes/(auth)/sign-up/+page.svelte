<script lang="ts">
    import type { PageData } from "./$types";
    import * as Card from "$lib/components/ui/card";
    import SignupForm from "./signup-form.svelte";

    export let data: PageData;
</script>

<div class="w-full h-screen mx-auto flex items-center justify-center bg-gray-200 dark:bg-gray-600">
    <Card.Root class="w-[900px] light:bg-gray-100 light:text-black dark:bg-gray-800 dark:text-gray-200">
            <Card.Header class="flex flex-row items-center">
                <div class="mr-4">
                    <a href="/login"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[15px] fill-dark dark:fill-white">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg></a>
                </div>
                <div>
                    <Card.Title>Crea tu cuenta</Card.Title>
                    <Card.Description>Por favor completa los datos</Card.Description>
                </div>
            </Card.Header>
        <Card.Content>
            <SignupForm data={data.form} />
        </Card.Content>
        <Card.Footer>
            <h4>Card Footer</h4>
        </Card.Footer>
    </Card.Root>
</div>

<style></style>