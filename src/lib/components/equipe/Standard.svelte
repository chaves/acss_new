<script>
    export let membre
    const no_pub = ['gabriel-benevides', 'andreas-hasudungan-priambodo'];
</script>


        <h3>Training and Experience:</h3>
        <ul>
            {#each membre.experiences as experience}
                <li class="mt-1">{@html experience}</li>
            {/each}
        </ul>

        <h3>Methodologies:</h3>
        <ul>
            {#each membre.methodologies as methodology}
                <li class="mt-1">{@html methodology}</li>
            {/each}
        </ul>

    <h3>Programming Languages and databases:</h3>
    <ul>
        {#each membre.databases as database}
            <li class="mt-1">{@html database}</li>
        {/each}
    </ul>

    {#if !no_pub.includes(membre.slug)}
        <h3>Publications:</h3>
        <ul>
            {#each membre.selected_publications as publication}
                <li class="mt-3 mb-3">{@html publication}</li>
            {/each}
        </ul>
    {/if}

<style>
	h3 {
		@apply uppercase font-semibold mb-3;
	}

	h3:not(:first-child) {
		margin-top: 12px;
	}

	ul li {
		@apply list-disc ml-6;
	}
</style>