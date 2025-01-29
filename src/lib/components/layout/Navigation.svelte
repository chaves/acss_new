<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
</script>

<header class="bg-white sticky top-0 z-50 pt-4 pb-2">
<Navbar>
  <NavBrand href="/">
    <img src="/images/logos/acss_logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl}>
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Dropdown<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <Dropdown class="w-44 z-20">
      <DropdownItem href="/">Dashboard</DropdownItem>
      <DropdownItem href="/docs/components/navbar">Settings</DropdownItem>
      <DropdownItem href="/">Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/">Sign out</DropdownItem>
    </Dropdown>
    <NavLi href="/settings">Setting</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>
</header>