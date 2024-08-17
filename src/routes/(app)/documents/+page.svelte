<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Dialog from "$lib/components/ui/dialog";
    import type { Document } from "./interfaces";
    import { downloadFile } from "./utils";
    import { ChevronsRight, Download, Heart, Plus, CircleX } from 'lucide-svelte';
    import { writable, type Writable } from "svelte/store";
    
    let favDocuments: Writable<Document[]>;
    let showDocumentDialog: boolean = false;

    onMount(() => {
        favDocuments = writable<Document[]>($page.data.documents)
    })


    const handleDocumentClick = async (documentUrl: string, action: string) => {
        if (action === "download") {
            downloadFile(documentUrl)
        } else {
            console.log(documentUrl, action)
        }
    }

    const toggleFavorite = async (id: string) => {
        favDocuments.update((docs) => {
            const index = docs.findIndex((doc) => doc.id === id);
            if (index !== -1) {
                docs[index].is_favorite = !docs[index].is_favorite;
            }
            return docs;
        });
    }

    const openNewDocumentDialog = async () => {
        showDocumentDialog = true;
    }

    const closeNewDocumentDialog = () => {
        showDocumentDialog = false
    }

</script>

<div class="w-full h-full px-7 py-4">
    <h2>Documentos</h2>
    <div class="w-90 mx-auto px-7 py-4">
        <section class="w-full mt-4 flex items-center justify-between">
            <h4>Resultados de búsqueda ({$favDocuments?.length})</h4>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button variant="outline" size="default">
                        <Plus class="mr-3" /> Agregar Documento
                    </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Agregar documento</Dialog.Title>
                    <Dialog.Description>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div class="w-full">
                    <h4>Testing</h4>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
        </section>
        <section class="w-full mt-4 flex items-center">
            {#if $favDocuments}
                {#each $favDocuments as document}
                    <Card.Root class="w-[400px]">
                        <Card.Header>
                            <div class="flex items-center justify-between w-full h-full">
                                <div>
                                    <Card.Title>{document.name}</Card.Title>
                                    <Card.Description>{document.short_description}</Card.Description>
                                </div>
                                <div class="flex items-center justify-end">
                                    <Button variant="ghost" size="icon" on:click={toggleFavorite.bind(null, document.id)} class="hover:bg-secondary hover:text-card-foreground">
                                        <Heart size={22} class={`transition ease-in-out duration-400 ${document.is_favorite ? 'text-destructive fill-destructive' : ''}`}/>
                                    </Button>
                                    <Button variant="ghost" size="icon" on:click={handleDocumentClick.bind(null, document.url, "download")} class="hover:bg-secondary hover:text-card-foreground">
                                        <Download size={22} />
                                    </Button>
                                </div>
                            </div>
                            <div class="w-full flex align-center justify-start">
                                <p class="m-0 py-1 px-3 rounded bg-secondary text-foreground uppercase text-[.75rem] font-bold">
                                    {document.category.name}
                                </p>
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <p class="mb-4">{document.description}</p>
                        </Card.Content>
                        <Card.Footer class="flex align-center justify-between">
                            <Button variant="link" size="sm" href={document.url} target="_blank" class="p-0 flex items-center text-link hover:text-link-hover hover:bg-card transition-color transition-decoration ease-in-out duration-200 uppercase text-[.9rem]">
                                Aprender Mas
                                <ChevronsRight class="ml-1"></ChevronsRight>
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                {/each}
            {/if}
        </section>
    </div>
</div>

{#if showDocumentDialog}
    Show Dialog Here <Button variant="ghost" size="icon" on:click={closeNewDocumentDialog}><CircleX size="24"/></Button>
{/if}

<style>
</style>