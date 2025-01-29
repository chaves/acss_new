<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n'; // Import the translation function
  export let isMobile: boolean = false;
  export let toggleMenu: () => void;

  const menuItems = [
    { href: "/", label: "home" },
    {
      href: "/news",
      label: "news",
      children: [
        { href: "/news/local", label: "local_news" },
        { href: "/news/international", label: "international_news" },
      ]
    },
    { href: "/events", label: "events" },
    {
      href: "/people",
      label: "people",
      children: [
        { href: "/people/staff", label: "staff" },
        { href: "/people/alumni", label: "alumni" },
      ]
    },
    { href: "/publications", label: "publications" },
    { href: "/working-papers", label: "working_papers" },
    { href: "/prizes", label: "prizes" }
  ];
</script>

<ul class={isMobile ? "py-2" : "hidden md:flex space-x-4"}>
  {#each menuItems as { href, label, children }}
    <li class="relative group">
      <a
        href={href}
        class={isMobile ? "block py-2 px-4 transition-colors" : "transition-colors"}
        class:font-bold={page.url.pathname === href}
        on:click={isMobile ? toggleMenu : undefined}
        aria-haspopup={children ? "true" : "false"}
        aria-expanded={children && isMobile ? "false" : undefined}
      >
        {t(label)}
      </a>
      {#if children && !isMobile}
        <!-- Dropdown for Desktop -->
        <ul class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300">
          {#each children as { href: childHref, label: childLabel }}
            <li>
              <a
                href={childHref}
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                on:click={isMobile ? toggleMenu : undefined}
              >
                {t(childLabel)}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
      {#if children && isMobile}
        <!-- Nested List for Mobile -->
        <ul class="mt-2 pl-4">
          {#each children as { href: childHref, label: childLabel }}
            <li>
              <a
                href={childHref}
                class="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                on:click={toggleMenu}
              >
                {t(childLabel)}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>