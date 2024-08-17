<script lang="ts">
  import { School, BookOpenText, ListChecks, CalendarRange } from 'lucide-svelte';
  let isExpanded = true;
  let showToggler = false;
  let activeLink = "/"

  function toggleSidebar() {
    isExpanded = !isExpanded;
  }

  const handleSidebarMouseInteraction = (event: MouseEvent) => {
    if (event.type === "mouseenter" || event.type === "focus") {
      showToggler = true
    } else {
      showToggler = false
    }
  }

  const handleLinkClick = (event: Event) => {
    // Get the clicked link element
    const clickedLink = event.currentTarget as HTMLLinkElement;

    // Access the data-active attribute
    const newActiveLink = clickedLink.dataset.active;

    // Update the activeLink state variable
    activeLink = newActiveLink || activeLink;
  }
</script>
  
<aside on:mouseenter={handleSidebarMouseInteraction} on:mouseleave={handleSidebarMouseInteraction} class={`sidebar h-screen overflow-y-auto transition duration-300 ease-in-out bg-primary text-primary-foreground shadow-xl ${isExpanded ? 'w-64' : 'w-16'}`}>
  <div class={`expandable-toggler transition duration-200 ease-in-out bg-secondary text-foreground ${isExpanded ? 'left-[14.5rem]' : 'left-[2.5rem]'}`}>
    <button type="button" on:click={toggleSidebar} class="w-full h-full  focus:outline-none">
      <i class={`fa-solid fa-chevron-left transition-transform duration-200 ease-in-out ${!isExpanded ? 'rotate-180' : ''}`}></i>
    </button>
  </div>
  <nav class="mt-4 flex flex-col">
    <a href="/campus" data-active="/" on:click={handleLinkClick} 
      class={`
        px-4 py-2 transition duration-300 ease-in-out uppercase hover:bg-active hover:text-active-foreground 
        hover:font-bold flex items-center transition ease-in-out duration-100
        ${activeLink === '/'? 'text-active-foreground bg-active font-bold border-r-3 border-accent' : ''}
      `
      }
    >
      <School class={`text-[1.5rem] ${isExpanded ? 'mr-4' : ''}`} />
      <span class:hidden={!isExpanded}>Inicio</span>
    </a>
    <a href="/campus/subjects" data-active="/subjects" on:click={handleLinkClick} 
      class={`
        px-4 py-2 transition duration-300 ease-in-out uppercase hover:bg-active hover:text-active-foreground 
        hover:font-bold flex items-center
        ${activeLink === '/subjects'? 'text-active-foreground bg-active font-bold border-r-3 border-accent' : ''}
      `
      }
    >
      <BookOpenText class={`text-[1.5rem] ${isExpanded ? 'mr-4' : ''}`} />
      <span class:hidden={!isExpanded}>Asignaturas</span>
    </a>
    <a href="/campus/assignments" data-active="/assignments" on:click={handleLinkClick}
      class={`
        px-4 py-2 transition duration-300 ease-in-out uppercase hover:bg-active hover:text-active-foreground 
        hover:font-bold flex items-center
        ${activeLink === '/assignments'? 'text-active-foreground bg-active font-bold border-r-3 border-accent' : ''}`
      }
    >
      <ListChecks class={`text-[1.5rem] ${isExpanded ? 'mr-4' : ''}`} />
      <span class:hidden={!isExpanded}>Evaluaciones</span>
    </a>
    <a href="/campus/events" data-active="/events" on:click={handleLinkClick}
      class={`
        px-4 py-2 transition duration-300 ease-in-out uppercase hover:bg-active hover:text-active-foreground 
        hover:font-bold flex items-center
        ${activeLink === '/events'? 'text-active-foreground bg-active font-bold border-r-3 border-accent' : ''}`
      }
    >
      <CalendarRange class={`text-[1.5rem] ${isExpanded ? 'mr-4' : ''}`} />
      <span class:hidden={!isExpanded}>Eventos</span>
    </a>
  </nav>
</aside>

<style>
  .expandable-toggler {
      position: absolute;
      z-index: 90;
      align-items: center;
      justify-content: center;
      top: 50%;
      border-radius: 9999px;
      width: 2.5rem;
      height: 2.5rem;
      box-shadow: 0 0 20px 3px rgba(10, 10, 10, 0.25);
      /** box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); */
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
</style>