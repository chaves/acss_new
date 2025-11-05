<script lang="ts">
	import { localizeUrl } from '$lib/utils';
	
	interface Props {
		href: string;
		class?: string;
		children?: import('svelte').Snippet;
	}
	
	let { href, class: className, children, ...restProps }: Props = $props();
	
	// Automatically localize internal links (starting with /)
	// External links (starting with http) are left as-is
	const localizedHref = href.startsWith('/') && !href.startsWith('//') 
		? localizeUrl(href) 
		: href;
</script>

<a href={localizedHref} class={className} {...restProps}>
	{@render children?.()}
</a>

