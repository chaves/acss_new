<script lang="ts">
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<Breadcrumb title="Credit procyclicality database" title_path="Credit procyclicality database" />

<svelte:head>
	<title>Credit procyclicality database</title>
	<meta name="description" content="" />
</svelte:head>

<div class="float-right ml-6 px-3 border-l-4 border-slate-300">
	<a data-no-translate href="https://acss-dig.psl.eu/data/database_web_03_2022.csv"
		><img
			src="/images/icons/format-de-fichier-csv.png"
			class="h-8 my-2 inline"
			alt="CSV file format icon"
			loading="lazy"
			decoding="async"
		/>
		CSV (semi colon separator)
	</a>
	<br />
	<a data-no-translate href="https://acss-dig.psl.eu/data/database_web_03_2022.dta"
		><img
			src="/images/icons/file_type_stata_icon_130148.svg"
			alt="Stata file format icon"
			class="h-8 my-2 inline"
			loading="lazy"
			decoding="async"
		/>
		Stata Data File Format
	</a>
</div>

<p>
	The final database is an unbalanced database consisting of 163 countries over the period
	1957Q1-2018Q4. A detailed presentation of data sources, data treatments and trend-cycles
	decompositions is provided in <a
		href="https://cepr.org/active/publications/discussion_papers/dp.php?dpno=16519"
		>Bouvatier et al. (2021)</a
	>.
</p>
<ol>
	<li><strong>Credit series</strong></li>
</ol>
<p>
	Main credit series come from the IFS database provided by the IMF. These credit series are called <strong
		>IFS_22d</strong
	> and correspond to credit granted by banking institutions to the private sector. These credit series
	have been adjusted using alternative discontinued series also from the IFS database; level shifts,
	gaps and seasonality have been corrected.
</p>

<p>
	The final database also includes credit series from the BIS database. These credit series are
	called <strong>bank_credit</strong> and <strong>private_credit</strong> for narrow and broad credit
	respectively. However, these credit series are available for 43 countries (Dembiermont et al., 2013)
	so they have been included only to allow comparison.
</p>
<ol start="2">
	<li><strong>Measurement units</strong></li>
</ol>
<p>
	Credit series are expressed in domestic currency at current price (called <strong> XDC</strong>),
	in percentage of GDP (called <strong>770</strong>) or in domestic currency at constant price
	(called <strong>RDC</strong>). In addition, all credit series include adjustments, indicated by
	<strong>A</strong> in the credit series names.
</p>
<p>
	For instance, credit series called <strong>bank_credit_XDC_A</strong> correspond to narrow credit
	expressed in domestic currency at current price adjusted by the BIS; credit series called
	<strong>IFS_22d_770_A</strong> correspond to bank credit (from the IFS database) expressed in percentage
	of GDP that have been adjusted (for level shifts, gaps and seasonality).
</p>
<ol start="3">
	<li><strong>Trend-cycle decompositions</strong></li>
</ol>
<p>
	The final database provides a trend-cycle decomposition for all credit series. We rely on 3
	methodologies: Hodrick &amp; Prescott (1997) filter with lambda parameter fixed to 400,000 (called <strong
		>HP4</strong
	>), modified Hodrick-Prescott (HP) filter following Kaiser &amp; Maravall (1999, 2001) with lambda
	parameter fixed to 400,000 (called <strong>HPM</strong>), and basic Singular Spectrum Analysis
	(called <strong>SSA</strong>). All methodologies are implemented in one-sided approach (called
	<strong>os</strong>) and in two-sided approach (called <strong>ts</strong>). In one-sided
	approach, the first window used to generate the trend-cycle decomposition includes 40 observations
	(i.e. 10 years). Further, the trend component is called <strong>trend</strong> and the cyclical
	component is called
	<strong>gap</strong>.
</p>
<p>
	For instance, credit series <strong>bank_credit_770_gap_HP4os</strong> correspond to the credit
	gap assessed by one-sided HP filter for the narrow credit-to-GDP ratio provided by the BIS
	database; credit series <strong>IFS_22d_770_gap_SSAts</strong> correspond to the credit gap assessed
	by two-sided basic SSA for adjusted credit-to-GDP ratio computed from the IFS database.
</p>
<p class="mt-6 text-lg"><strong>References:</strong></p>
<ul>
	<li>
		<a href="https://cepr.org/active/publications/discussion_papers/dp.php?dpno=16519">
			Bouvatier V., A.L. Delatte &amp; P.N. Rehault, Measuring credit procyclicality: a new
			database, Discussion Paper DP16519, CEPR, 2021</a
		>.
	</li>
	<li>
		<a href="https://www.bis.org/publ/qtrpdf/r_qt1303h.htm"
			>Dembiermont, C., Drehmann, M., &amp; Muksakunratana, S. (2013). How much does the private
			sector really borrow - a new database for total credit to the private non-financial sector.
			BIS Quarterly Review, March 2013, 65.81</a
		>.
	</li>
</ul>

<style>
	ol {
		@apply mt-6 mb-2 text-lg;
	}
	ul li {
		@apply my-3 ml-9 list-disc;
	}
	a {
		@apply font-semibold text-blue-dark hover:underline hover:decoration-pink-500 hover:decoration-2;
	}
</style>
