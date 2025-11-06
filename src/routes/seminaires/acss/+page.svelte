<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<Breadcrumb
	title="ACSS-PSL Institute Research Seminar"
	title_path="ACSS-PSL Institute Research Seminar"
	link="seminaires"
	link_text={m.seminars()}
/>

<svelte:head>
	<title>ACSS Research seminar on LLMs in Finance</title>
	<meta
		name="description"
		content="L’Institut constitue une plateforme pour les chercheurs de PSL dont l’objectif fondamental
				est de permettre une mutualisation ciblée de ressources."
	/>
</svelte:head>

<div class="description">
	<p>
		This seminar will provide an opportunity to discuss about the activities of the institute and
		will be organized in 3 sessions throughout the 2025-2026 academic year. Its purpose is twofold:
	</p>
	<ul>
		<li>
			To invite external speakers to present original research in terms of data and/or methods that
			could enrich the Institute's research and/or initiate new research projects
		</li>
		<li>To exchange on the Institute's ongoing or upcoming projects and research.</li>
	</ul>
	<p>
		The seminar is organized by <a
			href="https://dauphine.psl.eu/recherche/cvtheque/profil/darolles-serge">Serge Darolles</a
		>, <a href="https://dauphine.psl.eu/recherche/cvtheque/profil/le-fol-gaelle">Gaëlle Le Fol</a> &
		<a href="https://dauphine.psl.eu/recherche/cvtheque/profil/porcher-simon">Simon Porcher</a>.
	</p>
	<p>
		<em
			>To propose a presentation, please contact: <a href="mailto:simon.porcher@dauphine.psl.eu"
				>simon.porcher@dauphine.psl.eu</a
			>.</em
		>
	</p>
	<p>
		<em
			>To attend, please contact: <a href="mailto:bruno.chavesferreira@dauphine.psl.eu"
				>bruno.chavesferreira@dauphine.psl.eu</a
			></em
		>
	</p>
</div>

<div class="container">
	<div class="flex flex-col items-center gap-4 text-center md:flex-row md:gap-8 md:text-left">
		<img
			src="/images/visuels/Visuel_26-11-25.jpg"
			alt="ACSS Research Seminar on LLMs in Finance"
			class="h-auto w-full rounded-lg md:w-64 md:flex-shrink-0"
			loading="eager"
			decoding="async"
		/>
		<div>
			<p class="text-xl font-semibold text-blueGray-600">
				ACSS Research seminar<br />"<em>LLMs : from Archives to Finance</em>"
			</p>

			<p class="md:leading-24 text-base leading-relaxed md:text-lg">
				To be held on Wednesday, November 26<sup>th</sup>
				2025 from 8:30 to 13:30<br />Campus de l'Estrapade de PSL - 16 bis rue de l'Estrapade 75005
				Paris
				<br />
				<em class="text-base">
					Organized by ACSS-PSL Institute with the financial support of PSL Global Seed Fund.
				</em>
			</p>
		</div>
	</div>
</div>

<div class="presentation mt-6">
	<div class="mb-6 mt-6 border-l-4 pl-3 text-sm">
		<p>
			The event will open with a keynote talk by Nicolas Hervé (INA), who will discuss the
			intersection of audiovisual archives and computational social sciences, highlighting new
			approaches to analyzing large-scale media data.
		</p>
		<p>
			The first session, focused on academic perspectives, will feature Alexandre Allauzen (ESPCI)
			on the challenges of frugality in large language models, and Elise Gourier (ESSEC) on the use
			of LLMs to detect greenwashing in corporate communication.
		</p>
		<p>
			The second session will turn to professional applications, with Romuald Elie (Google DeepMind)
			presenting advances in denoising diffusion models for weather forecasting, and Emmanuel
			Hauptmann (RAM AI) examining whether LLMs can deliver value-added insights in the investment
			process.
		</p>
	</div>

	<h3 class="text-lg font-semibold">Programme :</h3>

	<p>8h30 : Welcome reception</p>

	<p><strong>9h00-10h15 - Keynote talk</strong></p>
	<ul>
		<li class="md:ml-24">
			<a href="https://www.herve.name/">Nicolas Hervé</a> (INA) : Audiovisual archives and computational
			social sciences
		</li>
	</ul>
	<p>10h15-10h30 : Pause</p>

	<p>10h30-11h30 : <strong>Session 1 - Academic concerns</strong></p>
	<ul>
		<li class="md:ml-24">
			<a href="https://allauzen.github.io/">Alexandre Allauzen</a> (ESPCI) :
			<em>Frugality and Large Language Models</em>
		</li>
		<li class="md:ml-24">
			<a href="https://www.elisegourier.com/">Elise Gourier</a> (ESSEC) :
			<em>Detecting Greenwashing with LLMs</em>
		</li>
	</ul>
	<p>11h30-12h30 : <strong>Session 2 - Professional concerns</strong></p>
	<ul>
		<li class="md:ml-24">
			<a href="https://www.linkedin.com/in/romuald-elie-b9bb817b/">Romuald Elie</a> (Google
			Deepmind) : <em>Denoising diffusion models and weather forecasting</em>
		</li>
		<li class="md:ml-24">
			<a href="https://www.ram-ai.com/fr/unsere-mitarbeiter/emmanuel-hauptmann"
				>Emmanuel Hauptmann</a
			>
			(RAM AI) : <em>Can LLMs bring value-added in the investment process?</em>
		</li>
	</ul>
	<p>12h30 : Buffet</p>
	<p>13h30 : End</p>

	<p class="text-center">
		<a href="https://www.fondation-dauphine.fr/inscriptions/acss-research-seminar-llms-finance"
			>Register here to attend the conference.</a
		>
	</p>
</div>

<h2 class="past">Past Sessions:</h2>

<p class="annonce">
	The Seventh research seminar of the ACSS-PSL Institute<br />to be held on Friday, November 17<sup
		>th</sup
	>
	from 12:15 to 13:45
</p>

<h4>
	<a href="https://apiacoa.org/">Fabrice Rossi</a>, Ceremade
</h4>

<div class="presentation">
	<p class="title">
		Exploring Nigerian Auxiliary Generator Use with Variable Length Markov Chains with Covariates
	</p>
	<p>
		<em>Coauthor</em>: Hugo Le Picard
	</p>
	<p>Abstract:</p>
	<p class="abstract">
		While Nigeria is the first Sub-Sahara economy, its centralised electricity network is very
		unreliable and is down approximately 45 % of the time. Business and wealthy households use
		auxiliary power generators to compensate for these blackouts. The aggregated capacity of these
		auxiliary generators is estimated between 10 and 15 GW, roughly three times more than the actual
		available capacity of the centralised grid. Generators are a large economic burden and induce
		health and environmental issues, hence their use should be discouraged. However, usage patterns
		of these generators remain unstudied which prevents estimating the effects on their use that
		could be induced by different types of improvements of the centralised power grid. We discuss in
		this presentation preliminary results obtained on a unique data set of 68 generators installed
		in Nigeria companies and recorded for several days together with the state of the centralised
		power grid. Each generator is represented by a binary time series (on and off) recorded with a
		time resolution of ten minutes. The state of the portion of the power grid to which each company
		is connected is represented in a similar way. To analyse such binary time series, we rely on
		Variable Length Markov Chains (VLMC). These are parsimonious Markov chains that can combine
		short and long memory components. This is particularly adapted to model generator use patterns
		that are independent from the status of the centralised network, owing to its unreliability. We
		also consider a recent extension of VLMC to situations where a time series can be influenced by
		its own past but also by external covariates. This extension is well adapted to capture
		generator use patterns that depends only on external factors (the state of the centralised
		network) or on both external factors and the past status of the generator itself. Using a BIC
		based automatic model selection, we show that all types of dependencies are present in our
		generator data set. Using simulations generated from the obtained models we assess to what
		extend they can be used to study the potential effects on usage patterns of improvements of the
		quality of the centralised grid.
	</p>
</div>

<h4>
	<a href="https://www.linkedin.com/in/ly-alpha-131bb6155">Alpha Ly</a>, LEDa
</h4>

<div class="presentation">
	<p class="title">
		Electrification and Deforestation in Côte d'Ivoire: a spatial econometric analysis
	</p>

	<p>
		<em>Coauthors</em>: Raja Chakir and Anna Creti
	</p>

	<p>Abstract:</p>
	<p class="abstract">
		This study analyses the links between electrification and deforestation in Côte d'Ivoire. First,
		we assess the alignment of night lights intensity data with the official electricity coverage
		statistics, which are available only at the regional level. Then, using panel data on night
		lights intensity, we investigate the relationship between electrification and deforestation in
		greater detail, focusing on a fine resolution at departmental level. In this analysis, we take
		into account both spatial autocorrelation and individual heterogeneity. Our findings reveal that
		electrification has an overall positive impact on deforestation with a direct positive impact in
		electrified localities and a negative indirect impact on neighboring ones. This empirical
		evidence, contrasting with prior findings on developing countries, carries significant
		implications for environmental policy and sustainable development efforts.
	</p>
</div>

<p class="annonce">
	The sixth research seminar of the ACSS-PSL Institute<br />to be held on Friday, October 6<sup
		>th</sup
	>
	from 12:15 to 13:45<br />This session will be dedicated to the Gender topic
</p>

<h4>
	<a href="https://sites.google.com/view/mariepierredargnies/home">Marie-Pierre Dargnies</a>,
	DRM-Finance
</h4>

<div class="presentation">
	<p class="title">Trust in male and female advisers: An experimental investigation</p>
	<p>Abstract:</p>
	<p class="abstract">
		We use an online experiment to investigate advisers‘ recommendation follow-up and the choice of
		an adviser to receive a recommendation from. We are interested in the role of the adviser’s
		gender and of whether the adviser is portrayed as an expert or not. Participants play the Monty
		Hall game, a decision game for which most participants have a false intuition about the expected
		payoff maximizing action. Before making the final decision determining whether they win the
		prize or not, each participant receives a recommendation from an adviser. For some participants,
		it is randomly determined whether they receive the recommendation of a male or a female adviser.
		In other conditions, participants must choose an adviser between two males and two females
		before receiving the recommendation from the chosen adviser. Advisers are either portrayed as
		experts or not. Presenting advisers as experts shifts the recommendation follow-up gender gap in
		favor of female advisers. In conditions where participants have to choose an adviser among
		several ones, female participants choose more often a female adviser. Men who chose a female
		adviser follow more often the recommendation than the ones who chose a male adviser
	</p>
</div>

<h4>
	<a href="https://drm.dauphine.fr/fr/ermes/membres/detail-cv/profile/eva-delacroix-bastien.html"
		>Eva Delacroix-Bastien</a
	>, DRM-HERMES and
	<a href="https://drm.dauphine.fr/fr/ermes/membres/detail-cv/profile/florence-benoit-moreau.html"
		>Florence Benoit-Moreau</a
	> (DRM-HERMES).
</h4>

<div class="presentation">
	<p class="title">Marketing and gender stereotypes: building a corpus of gendered products</p>

	<p>Abstract:</p>
	<p class="abstract">
		In the field of gender studies in marketing, we explore how the market reinforces gender
		stereotypes through its offer. We manually collected a corpus of products from gender-segmented
		markets (children's publishing and clothing) and analyzed it with two softwares: Tropes
		(semantic analysis) and Iramuteq (textual data analysis). We now want to take our research a
		step further and would like to systematize data collection and analysis in order to strengthen
		the validity of our conclusions.
	</p>
</div>

<p class="annonce">
	The fifth research seminar of the ACSS-PSL Institute<br />to be held on Friday, June 23<sup
		>rd</sup
	> from 12:15 to 13:45.
</p>

<h4>
	<a href="https://ardiad.github.io/">David Ardia</a>, Professeur agrégé, GERAD & HEC Montréal
</h4>

<div class="presentation">
	<p class="title">Sentometrics: An Overview of Methodology and Applications</p>
	<p>Abstract:</p>
	<p class="abstract">
		The advent of massive amounts of textual data has spurred the development of econometric
		methodology to transform qualitative sentiment data into quantitative sentiment variables, and
		to use those variables in an econometric analysis of the relationships between sentiment and
		other variables. This seminar will present this new research field and illustrate possible
		applications in economics and finance.
	</p>
</div>

<h4>
	<a href="https://jfimbett.github.io/">Juan Imbet</a>, Assistant Professor of Finance at the
	Université Paris Dauphine – PSL.
</h4>

<div class="presentation">
	<p class="title">Social Media as a Bank Run Catalyst</p>

	<p>
		<em>Coauthors</em>: Tony Cookson, Corbin Fox, Javier Gil-Bazo and Christoph Schiller
	</p>

	<p>Abstract:</p>
	<p class="abstract">
		Social media fueled a bank run on Silicon Valley Bank (SVB), and the effects were felt broadly
		in the U.S. banking industry. We employ comprehensive Twitter data to show that preexisting
		exposure to social media predicts bank stock market losses in the run period even after
		controlling for bank characteristics related to run risk (i.e., mark-to-market losses and
		uninsured deposits). Moreover, we show that social media amplifies these bank run risk factors.
		During the run period, we find the intensity of Twitter conversation about a bank predicts stock
		market losses at the hourly frequency. This effect is stronger for banks with bank run risk
		factors. At even higher frequency, tweets in the run period with negative sentiment translate
		into immediate stock market losses. These high frequency effects are stronger when tweets are
		authored by members of the Twitter startup community (who are likely depositors) and contain
		keywords related to contagion. These results are consistent with depositors using Twitter to
		communicate in real time during the bank run.
	</p>
</div>

<p class="annonce">
	The fourth research seminar of the ACSS-PSL Institute<br />to be held on Friday, April 7<sup
		>th</sup
	>
	from 12:15 to 13:45.
	<br />This session will be dedicated to the Health topic
</p>

<h4>
	<a href="https://www.lamsade.dauphine.fr/~ychevaleyre/">Yann Chevaleyre</a>, Full Professor in
	Computer science, Dauphine-PSL University, researcher in Artificial Intelligence, LAMSADE Research
	center.
</h4>

<div class="presentation">
	<p class="title">Interpretable Machine Learning for genomic, metagenomic and other Omics data</p>
</div>

<h4>
	<a href="https://sites.google.com/view/laurakhoury/home">Laura Khoury</a>, Assistant Professor of
	Economics, Dauphine-PSL University, LEDa research center.
</h4>

<div class="presentation">
	<p class="title">Prison, Mental Health and Family Spillovers</p>

	<p>
		<em>Coauthors</em>: M. Bhuller and K. Løken
	</p>

	<p>Abstract:</p>
	<p class="abstract">
		Does prison cause mental health problems among inmates and their family members? Correlational
		evidence shows that the prevalence of mental health problems is much higher in the inmate
		population than in the general population, but it remains silent on causality. We exploit the
		strengths of the Norwegian setting and the richness of the data to accurately measure the
		impacts of incarceration on the health of the defendants and their family members. First, we use
		an event-study design around the case decision event. The event study is complemented with an
		instrumental variable (IV) strategy that takes advantage of the random assignment of criminal
		cases to judges who differ in their stringency. Both methods consistently show that the positive
		correlation is misleading: incarceration lowers the prevalence of mental health disorders among
		defendants as measured by mental-health related visits to health care professionals. We further
		demonstrate that this effect lasts long after release and is unlikely to be driven by a shift in
		health care demand. Family members also experience positive spillovers on their mental health,
		especially spouses.
	</p>
</div>

<p class="annonce">
	The third research seminar of the ACSS-PSL Institute<br />to be held on Friday, February 17 from
	12:15 to 13:45
</p>

<h4><a href="https://laurent-ferrara.org/">Laurent Ferrara</a>, SKEMA Business School</h4>

<div class="presentation">
	<p class="title">
		When are Google data useful to nowcast GDP: An approach via preselection and shrinkage
	</p>
	<p>
		<em>Coauthor</em>: Anna Simoni; CNRS - CREST
	</p>

	<p>Abstract:</p>
	<p class="abstract">
		Alternative data sets are widely used for macroeconomic nowcasting together with machine
		learning-based tools. The latter are often applied without a complete picture of their
		theoretical nowcasting properties. Against this background, a theoretically grounded nowcasting
		methodology is proposed that allows researchers to incorporate alternative Google Search Data
		(GSD) among the predictors and that combines targeted preselection, Ridge regularization, and
		Generalized Cross Validation. Breaking with most existing literature, which focuses on
		asymptotic in-sample theoretical properties, we establish the theoretical out-of-sample
		properties of our methodology and support them with Monte-Carlo simulations. We apply our
		methodology to GSD to nowcast GDP growth rate of several countries during various economic
		periods. Our empirical findings support the idea that GSD tends to increase nowcasting accuracy,
		even after controlling for official variables, but that the gain differs between periods of
		recessions and of macroeconomic stability.
	</p>
</div>

<h4>
	<a href="https://www.linkedin.com/in/s%C3%A9bastien-saurin-b53164154">Sébastien Saurin</a>,
	University of Orléans
</h4>

<div class="presentation">
	<p class="title">Explainable Performance</p>

	<p>
		<em>Coauthors</em>: Sullivan Hué, Aix-Marseille University - Aix-Marseille School of Economics,
		Christophe Hurlin, University of Orléans, Christophe Pérignon, HEC Paris
	</p>

	<p>Abstract:</p>
	<p class="abstract">
		We introduce the XPER (eXplainable PERformance) methodology to measure the specific contribution
		of the input features to the predictive or economic performance of a model. Our methodology
		offers several advantages. First, it is both model-agnostic and performance metric-agnostic.
		Second, XPER is theoretically founded as it is based on Shapley values. Third, the
		interpretation of the benchmark, which is inherent in any Shapley value decomposition, is
		meaningful in our context. Fourth, XPER is not plagued by model specification error, as it does
		not require re-estimating the model. Fifth, it can be implemented either at the model level or
		at the individual level. In an application based on auto loans, we find that performance can be
		explained by a surprisingly small number of features, XPER decompositions are rather stable
		across metrics, yet some feature contributions switch sign across metrics. Our analysis also
		shows that explaining model forecasts and model performance are two distinct tasks.
	</p>
	<p>
		<a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4280563"
			>https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4280563</a
		>
	</p>
</div>

<p class="annonce">
	The second research seminar of the ACSS-PSL Institute<br />December 9 from 12:15 to 13:45
</p>

<h4>
	<a href="https://benavent.fr/">Christophe Benavent</a>, Professor of Management, DRM, Université
	Paris Dauphine-PSL
</h4>
<div class="presentation">
	<p class="title">
		The Covid-19 Crisis: an NLP Exploration of the French Twitter Feed (February-May 2020)
	</p>
	<p>Abstract:</p>
	<p class="abstract">
		The Covid-19 pandemic offers a spectacular case of disaster management. In this literature, the
		paradigm of participation is fundamental: the mitigation of the impact of the disaster, the
		quality of the preparation and the resilience of the society, which facilitate the
		reconstruction, depend on the participation of the populations. Being able to observe and
		measure the state of mental health of the population (anxiety, confidence, expectations, ...)
		and to identify the points of controversy and the content of the discourse, are necessary to
		support measures designed to encourage this participation. Social media, and in particular
		Twitter, offer valuable resources for researching this discourse. The objective of this
		empirical study is to reconstruct a micro history of users’ reactions to the pandemic as they
		share them on social networks. The general method used comes from new processing techniques
		derived from Natural Language Processing (NLP). Three analysis methods are used to process the
		corpus: analysis of the temporal evolution of term occurrences; creation of dynamic semantic
		maps to identify co-occurrences; analysis of topics using the SVM method. The main empirical
		result is that the mask emerges as a central figure of discourse, at least in the discourse
		produced by certain social media. The retrospective analysis of the phenomenon allows us to
		explain what made the mask a focal point not only in conversation, but also in behaviors. Its
		value resides less in its functional qualities than in its ability to fix attention and organize
		living conditions under the threat of pandemic.
	</p>
</div>

<h4>
	<a href="https://pinchofdata.github.io/germaingauthier/">Germain Gauthier</a>, PhD candidate in
	Economics, CREST, Ecole Polytechnique
</h4>
<div class="presentation">
	<p class="title">Measuring Crime Reporting and Incidence: Method and Application to #MeToo</p>
	<p>Abstract:</p>
	<p class="abstract">
		This paper studies the Me Too movement’s effects on sex criminality. As many victims do not
		report to the police, a long-standing empirical challenge with reported crime statistics is that
		they reflect variations in victim reporting and crime incidence. To separate both margins, I
		develop a duration model that studies the delay between the incident’s occurrence and its report
		to the police. The model accounts for unobserved heterogeneity, never-reporters, and
		double-truncation in the data. I apply it to the police records of large US cities. Contrary to
		the widespread view that #MeToo was a watershed moment, I find that sex crime reporting had
		already been increasing for years before its sudden mediatization in October 2017. Nonetheless,
		the movement had a positive, persistent impact on victim reporting, particularly for juveniles,
		racial minorities, and victims of misdemeanors and old crime incidents. The increase in
		reporting translates into drastically higher probabilities of arrest for sex offenders. Using
		reported non-sexual crimes as a control group, difference-in-differences estimates suggest the
		movement also had a sizable deterrent effect.
	</p>
</div>

<p class="annonce">
	The first research seminar of the ACSS-PSL Institute<br /> October 14 from 12:15 to 13:45
</p>

<h4>
	<a href="https://www.arthurthomas.fr/">Arthur Thomas</a>, Associate Professor in Economics,
	Laboratoire d'Economie de Dauphine (LEDA)
</h4>
<div class="presentation">
	<p class="title">Bet on a bubble asset ? An optimal portfolio allocation strategy</p>
	<p><em>Coauthors</em>: Gilles de Truchis, Elena Dumitrescu, Sebastien Fries</p>
	<p>Abstract:</p>
	<p class="abstract">
		We discuss portfolio allocation when one asset exhibits phases of locally explosive behavior. We
		model the conditional distribution of such an asset through mixed causal-non-causal models which
		mimic well the speculative bubble behaviour. Relying on a Taylor-series-expansion of a CRRA
		utility function approach, the optimal portfolio(s) is(are) located on the
		mean-variance-skewness-kurtosis efficient surface. We analytically derive these four conditional
		moments and show in a Monte-Carlo simulations exercise that incorporating them into a two-assets
		portfolio optimization problem leads to substantial improvement in the asset allocation
		strategy. All performance evaluation metrics support the higher out-of-sample performance of our
		investment strategies over standard benchmarks such as the mean-variance and equally-weighted
		portfolio. An empirical illustration using the Brent oil price as the speculative asset confirms
		these findings.
	</p>
</div>

<h4>
	<a href="https://sites.google.com/site/evgeniapassari/">Evgenia Passari</a>, Associate Professor
	in finance, DRM Finance, Dauphine
</h4>
<div class="presentation">
	<p class="title">The Origins of Commodity Price Fluctuations</p>
	<p>
		<em>Coauthors</em>: Sarah Mouabbi (Banque de France) et Adrien Rousset Planat (London Business
		School)
	</p>
	<p>Abstract:</p>
	<p class="abstract">
		We build novel indexes of commodity price developments by simulating news-reading. Our proposed
		computer-based, narrative approach is flexible, unified and spans the global commodity market,
		including energy, industrial and precious metals, and agricultural commodities. Empirical
		evidence and human readings of news articles indicate that our indexes capture commodity-price
		supply and demand components. Index-peaks track the post-crisis collapse of commodity markets,
		other market-specific developments, as well as the recent COVID-19 crisis. The richness of news
		content allows us to decompose the supply and demand indexes into a number of key determinants
		that shaped commodity markets since the beginning of the 21st century, including business cycle
		effects, geopolitical risk, natural disasters, and climate change considerations. Preliminary
		results reveal that the nature of commodity price movements matters for macroeconomic outcomes,
		firms&rsquo; decisions, and asset prices.
	</p>
</div>

<style>
	.annonce {
		@apply mb-6 text-center text-xl font-semibold text-blueGray-600;
	}

	.description {
		@apply mb-6 rounded-xl border-2 border-blue-100 bg-white px-6 py-3 text-sm;
	}

	.abstract {
		@apply border-l-4 pl-3 text-sm;
	}

	.presentation {
		@apply mb-6;
	}

	p {
		@apply my-2;
	}
	.title {
		@apply font-semibold;
	}

	ul {
		@apply ml-5 list-disc;
	}
	h2.past {
		@apply mt-12 border-y-4 py-4 font-semibold;
	}
</style>
