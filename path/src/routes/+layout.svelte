<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';

  import Navigation from '$lib/components/layout/Navigation.svelte';
  import Footer from '$lib/ui_old/Footer.svelte';

  import { onMount } from 'svelte';

  let { children } = $props();

  // Example language switcher state
  let currentLanguage = 'fr';

  function changeLanguage(lang: string) {
    i18n.setLanguage(lang);
    currentLanguage = lang;
  }
</script>

<ParaglideJS {i18n}>
  <!--Header-->
  <header class="bg-white sticky top-0 z-50 pt-4 pb-2">
    <Navigation />
  </header>

  <section class="py-9 bg-blueGray-50">
    <div class="container main">
      <div class="mx-auto mb-6">
        {@render children()}
      </div>
      <!-- Language Switcher -->
      <div class="text-right mt-4">
        <button on:click={() => changeLanguage('fr')} class="mr-2 px-4 py-2 bg-gray-200 rounded">
          Français
        </button>
        <button on:click={() => changeLanguage('en')} class="px-4 py-2 bg-gray-200 rounded">
          English
        </button>
      </div>
    </div>
  </section>

  <Footer />
</ParaglideJS>