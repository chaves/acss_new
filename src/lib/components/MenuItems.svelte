<script lang="ts">
    import { page } from "$app/stores";
    export let isMobile: boolean = false;
    export let toggleMenu: () => void;

    const menuItems = [
      { href: "/", label: "Home" },
      { href: "/news", label: "News" },
      { href: "/events", label: "Events" },
      { href: "/people", label: "People" },
      { href: "/publications", label: "Publications" },
      { href: "/working-papers", label: "Working Papers" },
      { href: "/prizes", label: "Prizes" }
    ];
  </script>

  <ul class={isMobile ? "py-2" : "hidden md:flex space-x-4"}>
    {#each menuItems as { href, label }}
      <li>
        <a
          href={href}
          class={isMobile ? "block py-2 px-4 transition-colors" : "transition-colors"}
          class:font-bold={$page.url.pathname === href}
          on:click={isMobile ? toggleMenu : undefined}
        >
          {label}
        </a>
      </li>
    {/each}
  </ul>