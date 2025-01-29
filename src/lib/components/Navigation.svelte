<script lang="ts">
    import { Menu, X } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import MenuItems from '$lib/components/ui/MenuItems.svelte';


    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  </script>

<nav class="bg-serg_purple text-white">
    <div class="container mx-auto px-8">
      <div class="flex justify-between items-center py-4">
        <button class="md:hidden" on:click={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {#if isMenuOpen}
            <X size={28} />
          {:else}
            <Menu size={28} />
          {/if}
        </button>
        <MenuItems {toggleMenu} />
      </div>
    </div>
    {#if isMenuOpen}
      <div transition:slide={{ duration: 300 }} class="md:hidden">
        <MenuItems isMobile={true} {toggleMenu} />
      </div>
    {/if}
  </nav>