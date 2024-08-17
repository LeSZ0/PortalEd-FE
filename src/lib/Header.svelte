<script lang="ts">
    import { writable, get } from "svelte/store";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let isMenuOpen = false;
    let activeLink = ""

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        document.body.classList.toggle('overflow-hidden');
    };

    const handleLinkClick = (href: string) => {
        activeLink = href;
    }

    const handleSignOut = async () => {}

    onMount(() => {
        activeLink = get(page).url.pathname; // Set activeLink based on initial URL
    });
</script>

<div class="w-full">
    <nav class="mx-auto flex justify-between items-center py-1 px-6 w-full bg-gray-300 bg-primary text-primary-foreground shadow-xl z-10">
        <a href="/" class="font-bold text-xl">PortalEd</a>
        <ul class="nav-menu lg:flex space-x-4">
            <li><a href="/" class={`nav-link hover:text-accent hover:font-bold ${activeLink == '/' ? 'text-accent font-bold' : ''}`} on:click={handleLinkClick.bind(null, '/')}>Inicio</a></li>
            <li><a href="/documents" class={`nav-link hover:text-accent hover:font-bold ${activeLink == '/documents' ? 'text-accent font-bold' : ''}`} on:click={handleLinkClick.bind(null, '/documents')}>Documentos</a></li>
            <li><a href="/blog" class={`nav-link hover:text-accent hover:font-bold ${activeLink == '/blog' ? 'text-accent font-bold' : ''}`} on:click={handleLinkClick.bind(null, '/blog')}>Blog</a></li>
            <li><a href="/campus" class={`nav-link hover:text-accent hover:font-bold ${activeLink == '/campus' ? 'text-accent font-bold' : ''}`} on:click={handleLinkClick.bind(null, '/campus')}>Campus</a></li>
            <li><button class="nav-link hover:text-accent hover:font-bold" on:click={handleSignOut}>Cerrar Sesion</button></li>
        </ul>
    
        <button type="button" class="nav-toggle lg:hidden focus:outline-none" on:click={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-white w-6 h-6">
              <path fill-rule="evenodd" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" clip-rule="evenodd" />
            </svg>
        </button>
    </nav>
    
    {#if isMenuOpen }
        <ul class="mobile-menu absolute top-8 left-0 w-full shadow-md rounded px-4 py-2 transition transform duration-300 ease-in-out light:bg-gray-100 text-black dark:bg-gray-800 text-gray-200">
            <li><a href="/" class={`nav-link hover:text-white hover:font-bold ${activeLink == '/' ? 'text-accent font-bold' : ''}`} on:click={handleLinkClick.bind(null, '/')}>Inicio</a></li>
            <li><a href="/documents" class="nav-link hover:text-white hover:font-bold" class:active={activeLink == '/documents'} on:click={handleLinkClick.bind(null, '/documents')}>Documentos</a></li>
            <li><a href="/home3" class="nav-link hover:text-white hover:font-bold {activeLink === '/home3' ? 'text-white font-bold' : ''}" on:click={handleLinkClick.bind(null, "/home3")}>Home3</a></li>
        </ul>
    {/if}
</div>

<style>
    .active {
        color: var(--accent);
        font-weight: 600;
    }

    .nav-link {
        text-transform: uppercase;
        text-decoration: none;
        font-size: .9rem;
        transition: color, font-weight .15s ease-in-out;
    }

    @media (max-width: 768px) {
        .nav-menu { /* Hide horizontal menu on small screens */
            display: none;
        }

        .mobile-menu { /* Show and position vertical menu on small screens */
            transform: translateY(0);
        }
    }
</style>