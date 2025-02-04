<script lang="ts">
	import * as m from '$lib/paraglide/messages.js'
</script>

<section class="py-10">
	<div class="container px-4 mx-auto">

		<div class="flex flex-col lg:flex-row items-center lg:justify-between mb-12">
			<h3>{m.partners()}</h3>

			<a href="https://www.cnrs.fr/">
				<img class="inline ml-12 h-24" src="/images/logos_autres/cnrs.png" alt="CNRS" />
			</a>
			<a href="https://dauphine.psl.eu/">
				<img
					class="inline ml-9 h-14"
					src="/images/logos_autres/logo_bleu_dauphine.png"
					alt="Dauphine"
				/>
			</a>
			<a href="https://insp.gouv.fr/">
				<img class="inline ml-9 h-20" src="/images/logos_autres/Logo_INSP.png" alt="INSP" />
			</a>
			<a href="https://www.minesparis.psl.eu/">
				<img class="inline ml-9 h-24" src="/images/logos_autres/mines.png" alt="Mines" />
			</a>
			<a href="http://www.institutnicod.org/">
				<img class="inline ml-9 h-24" src="/images/logos_autres/nicod.png" alt="Nicod" />
			</a>
		</div>
		<div class="flex flex-col lg:flex-row items-center lg:justify-between">
			<p class="text-sm text-blueGray-400">

				{m.copyright({year: new Date().getFullYear()})}

			</p>
			<p>
				Contact : <a class="underline site_red" href="mailto:bruno.chavesferreira@dauphine.psl.eu"
					>bruno.chavesferreira@dauphine.psl.eu</a
				>
			</p>
		</div>
	</div>
</section>

<style>
	h3 {
		@apply mb-6 text-xl font-semibold;
	}
</style>
