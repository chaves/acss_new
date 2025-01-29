<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import MenuItems from '$lib/components/MenuItems.svelte';
  import { t } from '$lib/i18n'; // Import the translation function

  $: activeUrl = $page.url.pathname;

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-white sticky top-0 z-50 pt-4 pb-2">
  <Navbar>
    <NavBrand href="/">
      <img src="/images/logos/acss_logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
    </NavBrand>
    <NavHamburger />
    <div class="ml-auto">
      <MenuItems isMobile={false} toggleMenu={toggleMenu} />
    </div>
    <NavUl {activeUrl}>
      <NavLi href="/">{t('home')}</NavLi>
      <NavLi class="cursor-pointer">
        {t('dropdown')}<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem href="/">{t('dashboard')}</DropdownItem>
        <DropdownItem href="/docs/components/navbar">{t('settings')}</DropdownItem>
        <DropdownItem href="/">{t('earnings')}</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/">{t('sign_out')}</DropdownItem>
      </Dropdown>
      <NavLi href="/settings">{t('setting')}</NavLi>
      <NavLi href="/pricing">{t('pricing')}</NavLi>
      <NavLi href="/contact">{t('contact')}</NavLi>
    </NavUl>
  </Navbar>
</header>