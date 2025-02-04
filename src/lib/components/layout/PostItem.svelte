<script lang="ts">
	import * as runtime from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import PostAuthors from '$lib/components/layout/PostAuthors.svelte';
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
		return new Date(publishedAt).toLocaleDateString(runtime.languageTag(), {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="{get_class(index)} main">
	<img
		class="post-img mr-6 w-24 rounded-full object-center"
		src="https://cms.acss-psl.eu{post.Image.formats.thumbnail.url}"
		alt={post.Title}
	/>
	<p>
		<a href="/blog/{post.Slug}">{post.Title}</a> -
		<span class="font-light italic text-gray-500"
			>({m.published_at()} {formatDate(post.publishedAt)})</span
		>
		- <PostAuthors authors={post.authors} />
	</p>
</div>

<style>
	.main {
		@apply my-3 flex items-center rounded-xl p-3 text-sm;
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
