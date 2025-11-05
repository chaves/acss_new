<script lang="ts">
	import * as runtime from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import Link from '$lib/components/Link.svelte';
	import PostAuthors from '$lib/components/layout/PostAuthors.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';

	let { post, index } = $props();

	function get_class(number: number) {
		if (number % 2 == 0) {
			return 'even';
		} else {
			return 'odd';
		}
	}

	// Format the publishedAt date into a localized string
	function formatDate(publishedAt: string) {
		return new Date(publishedAt).toLocaleDateString(runtime.getLocale(), {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="{get_class(index)} main">
	{#if post.Image}
		<OptimizedImage
			image={post.Image}
			alt={post.Title}
			size="thumbnail"
			class="post-img mr-6 w-24 rounded-lg object-center"
		/>
	{/if}
	<p>
		<Link href="/blog/{post.Slug}">{post.Title}</Link> -
		<span class="font-light italic text-gray-500"
			>({m.published_at()} {formatDate(post.publishedAt)})</span
		>
		- <PostAuthors authors={post.authors} />
	</p>
</div>

<style>
	.main {
		@apply my-3 flex items-center rounded-xl p-3;
	}

	.even {
		@apply bg-white;
	}

	.odd {
		@apply bg-blueGray-100;
	}
	/* Custom styling for the image */
	.post-img {
		object-fit: cover; /* Ensures the image covers the container and stays centered */
		margin-left: 1rem; /* Optional spacing from the main text */
	}
</style>
