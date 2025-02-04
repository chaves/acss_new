<script lang="ts">
	let { post, index } = $props();

	function get_class(number: number) {
		if (number % 2 == 0) {
			return 'even';
		} else {
			return 'odd';
		}
	}
</script>

<div class="{get_class(index)} main">
	<a href=/blog/{post.Slug} class="flex items-center">
	<img
	class="post-img rounded-full object-center w-24 mr-6"
	src="https://cms.acss-psl.eu{post.Image.formats.thumbnail.url}"
	alt={post.Title}
/>
	<p>{post.Title}</p>
	</a>

</div>

<style>
	.main {
		@apply my-3 rounded-xl p-3 text-sm;
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
