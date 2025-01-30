<script>
	import { t, locale } from 'svelte-intl-precompile';
	export let title;
</script>

<section class="py-3 mb-6 bg-blueGray-100 rounded-xl">
	<div class="container text-center">
		<h1 class="text-2xl lg:text-3xl font-bold wow animate__animated animate__fadeInUp animated">
			{@html title}
		</h1>

		<ul
			class="mx-auto text-gray-500 text-sm mt-5 lg:text-sm wow animate__animated animate__fadeInUp animated"
		>
			<li class="inline-flex items-center">
				<a href="/{$locale}" class="hover:text-blue-500 text-gray-800">{$t('home')}</a>
				<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
			<li class="inline-flex items-center">
				<a href="/{$locale}/seminaires" class="hover:text-blue-500 text-gray-800">{$t('seminars')}</a>
				<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
			<li class="inline-flex items-center text-gray-400">
				<span>{title}</span>
			</li>
		</ul>
	</div>
</section>
