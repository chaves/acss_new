<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import * as runtime from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';

	import { marked } from 'marked';
	import PostAuthors from '$lib/components/layout/PostAuthors.svelte';

	let { data }: { data: PageData } = $props();
	let post = data.post[0];
	const contentHtml = marked(post.Content);

	// Format the publishedAt date into a localized string
	const localizedPublishedAt = new Date(post.publishedAt).toLocaleDateString(
		runtime.languageTag(),
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}
	);
</script>

<Breadcrumb
	title={post.Title}
	title_path={post.Title}
	link="blog"
	link_text="blog"
	publishedAt={localizedPublishedAt}
/>
<!-- Container flex layout to place post content on the left and image on the right -->
<div class="flex flex-col md:flex-row">
	<div class="blogPost flex-1">
		<div class="prose max-w-none text-justify">{@html contentHtml}</div>
        <p class="italic text-gray-500 text-right">
            {m.published_at()} {localizedPublishedAt} <PostAuthors authors={post.authors} />
        </p>

	</div>
	<div class="flex items-start justify-center md:w-1/3 md:pl-4">
		<img
			src="https://cms.acss-psl.eu{post.Image.formats.medium.url}"
			alt="An alt text"
			class="w-72 rounded-lg object-cover"
		/>
	</div>
</div>