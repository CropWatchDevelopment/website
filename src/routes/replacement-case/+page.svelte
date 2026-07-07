<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { productSchema } from '$lib/seo/schema';
	import { initDeviceViewer } from '$lib/deviceViewer';

	// The rugged IP66 enclosure as a single Product (bare - no price/rating, so
	// valid but not rich-snippet eligible).
	const caseLd = productSchema({
		name: 'Replacement Sensor Case (CW-CASE)',
		sku: 'CW-CASE',
		category: 'Sensor enclosure',
		description:
			'The rugged, UV-stable IP66 enclosure that houses every CropWatch sensor. Field-replaceable and washdown-ready, built for freezers, barns and open fields.',
		url: '/replacement-case'
	});

	// Spin up the 3D case viewer on #deviceCanvas (Babylon is bundled locally,
	// loaded lazily). Dispose the engine when the page unmounts.
	onMount(() => {
		let cleanup: (() => void) | void;
		let cancelled = false;
		initDeviceViewer()
			.then((c) => {
				if (cancelled) c?.();
				else cleanup = c;
			})
			.catch((e) => console.warn('3D viewer unavailable:', e));
		return () => {
			cancelled = true;
			cleanup?.();
		};
	});
</script>

<svelte:head>
	<title>Replacement Sensor Case - Rugged IP66 Enclosure (3D) | CropWatch</title>
	<meta
		name="description"
		content="The rugged, UV-stable IP66 enclosure that houses every CropWatch sensor. View it in interactive 3D. Field-replaceable, washdown-ready, and built for freezers, barns and open fields. Pre-calibrated modules drop straight in."
	/>
	<meta
		name="keywords"
		content="sensor enclosure, replacement case, IP66 enclosure, rugged sensor housing, weatherproof sensor case, washdown sensor enclosure, LoRaWAN sensor case, field replaceable enclosure, 3D product viewer"
	/>
	<meta property="og:title" content="Replacement Sensor Case - Rugged IP66 Enclosure | CropWatch" />
	<meta
		property="og:description"
		content="The rugged, UV-stable IP66 enclosure that houses every CropWatch sensor - field-replaceable and washdown-ready. View it in interactive 3D."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/replacement-case" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'Products', href: '/cold-chain' },
		{ label: 'Replacement Sensor Case' }
	]}
/>

<JsonLd data={caseLd} />

<!-- 3D hero -->
<section class="phero">
	<div class="wrap phero__grid">
		<div class="pstage">
			<span class="pstage__badge"><span class="material-symbols-rounded">view_in_ar</span> 3D</span>
			<div class="pstage__loader" id="stageLoader">Loading 3D…</div>
			<canvas id="deviceCanvas"></canvas>
			<span class="pstage__hint"
				><span class="material-symbols-rounded">drag_pan</span>
				<span>Drag to rotate · scroll to zoom</span></span
			>
		</div>
		<div class="pcopy">
			<p class="eyebrow">Replacement sensor case</p>
			<h1>CW-CASE</h1>
			<p class="psub">Rugged IP66 enclosure</p>
			<p class="lead">
				The housing every CropWatch sensor lives in - sealed against freezer frost, barn washdown,
				field sun and dust. When you need a fresh enclosure, the same pre-calibrated module drops
				straight in.
			</p>
			<div class="spec-chips">
				<span><span class="material-symbols-rounded">water_drop</span> IP66</span>
				<span><span class="material-symbols-rounded">wb_sunny</span> UV-stable</span>
				<span><span class="material-symbols-rounded">cleaning_services</span> Washdown</span>
				<span><span class="material-symbols-rounded">cached</span> Tool-free</span>
			</div>
			<div class="pcopy__ctas">
				<a href="/contact" class="cta-pill cta-pill--lg">Request a quote</a>
				<a href="/replacement-sensors" class="cta-ghost cta-pill--lg"
					><span class="material-symbols-rounded">cable</span> <span>Sensor modules</span></a
				>
			</div>
		</div>
	</div>
</section>

<!-- built for the worst spots -->
<section class="section section--tint section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Built for the worst spots</p>
			<h2>One enclosure, every environment.</h2>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(3,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"><span class="material-symbols-rounded">ac_unit</span></span>
				<h3>Freezer-proof</h3>
				<p>Sealed against frost and condensation down to −40 °C, with no ingress to the electronics.</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">water_drop</span></span
				>
				<h3>Washdown-ready</h3>
				<p>IP66 against barn hose-downs and humid greenhouse air, year after year.</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"><span class="material-symbols-rounded">wb_sunny</span></span>
				<h3>UV-stable outdoors</h3>
				<p>Holds up to full field sun without becoming brittle or discoloured.</p>
			</article>
		</div>
	</div>
</section>

<!-- modular split -->
<section class="section">
	<div class="wrap split">
		<div data-reveal>
			<p class="eyebrow">Modular by design</p>
			<h2>Replace the shell, keep the calibration.</h2>
			<p class="lead">
				If a case is cracked, painted over, or just retired from a harsh spot, you don't lose your
				calibrated sensor. Move the pre-certified module into a fresh enclosure and carry on.
			</p>
			<ul class="diff-list" style="margin-top:8px">
				<li><span class="material-symbols-rounded">check</span> Same socket across the CropWatch range</li>
				<li>
					<span class="material-symbols-rounded">check</span> Tool-free latch - no opening sealed electronics
				</li>
				<li><span class="material-symbols-rounded">check</span> Mount by screw, magnet, strap or DIN clip</li>
				<li>
					<span class="material-symbols-rounded">check</span> The module's certificate follows it automatically
				</li>
			</ul>
			<p style="margin-top:22px">
				<a href="/replacement-sensors" class="cta-pill"
					>See the sensor modules <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</p>
		</div>
		<div class="split__media" data-reveal>
			<img
				src="/assets/imagery/device-side-view.webp"
				alt="Side view of the CropWatch sensor case showing its rugged sealed enclosure"
				style="height:420px;width:100%"
			/>
		</div>
	</div>
</section>

<!-- materials & protection -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Materials &amp; protection</p>
			<h2>Engineered down to the membrane.</h2>
			<p class="section__intro">
				The case has to breathe to read true temperature and humidity - without letting water, dust
				or UV reach the electronics. Three details make that possible.
			</p>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(3,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"><span class="material-symbols-rounded">filter_alt</span></span>
				<h3>Replaceable metal mesh filter</h3>
				<p>
					A fine stainless mesh keeps dust, insects and debris out of the sensing chamber while air
					still moves freely. When a harsh site finally clogs it, you pop in a fresh one - no new
					enclosure required.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">eco</span></span
				>
				<h3>PA11 stable plastic</h3>
				<p>
					Built from PA11, a bio-based polyamide prized for dimensional stability and impact strength
					across wide temperature swings - so the case stays true and tough from a blast freezer to a
					sun-baked field.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"><span class="material-symbols-rounded">shield_with_heart</span></span>
				<h3>Hydrophobic shield treatment</h3>
				<p>
					The vented shield is treated to repel water: droplets bead and roll off instead of pooling
					over the membrane, so condensation and washdown spray never skew a reading or wick inside.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- specs -->
<section class="pspecs">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">CW-CASE</p>
			<h2>Specifications</h2>
		</div>
		<dl class="pspecs__grid" data-reveal>
			<div class="spec-row"><dt>Ingress rating</dt><dd>IP66</dd></div>
			<div class="spec-row"><dt>Material</dt><dd>PA11 (bio-based)</dd></div>
			<div class="spec-row"><dt>Air filter</dt><dd>Replaceable steel mesh</dd></div>
			<div class="spec-row"><dt>Shield</dt><dd>Hydrophobic-treated</dd></div>
			<div class="spec-row"><dt>Temp range</dt><dd>−40 °C to +85 °C</dd></div>
			<div class="spec-row"><dt>Mounting</dt><dd>Screw · magnet · strap</dd></div>
			<div class="spec-row"><dt>Module socket</dt><dd>Universal CropWatch</dd></div>
			<div class="spec-row"><dt>Latch</dt><dd>Tool-free</dd></div>
			<div class="spec-row"><dt>Antenna</dt><dd>Internal / external SMA</dd></div>
			<div class="spec-row"><dt>Color</dt><dd>Signal white</dd></div>
		</dl>
	</div>
</section>

<!-- pairs with -->
<section class="prelated">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<h2>Pairs with</h2>
		</div>
		<div class="prelated__grid">
			<a class="rel-card" href="/replacement-sensors" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">cable</span></span>
				<span><b>Sensor modules</b><span>Air, soil &amp; more</span></span>
			</a>
			<a class="rel-card" href="/cold-chain" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">ac_unit</span></span>
				<span><b>Cold-chain kit</b><span>Coolers &amp; freezers</span></span>
			</a>
			<a class="rel-card" href="/agriculture" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">eco</span></span>
				<span><b>Field &amp; greenhouse</b><span>Outdoor deployments</span></span>
			</a>
		</div>
	</div>
</section>

<!-- closing -->
<section class="closing section--tint">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Stock up</p>
		<h2>Need a fresh enclosure?</h2>
		<p>Tell us your environment and we'll recommend the right mounting and antenna options.</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Request a quote</a>
			<a href="/replacement-sensors" class="cta-ghost cta-ghost--light cta-pill--lg">Sensor modules</a>
		</div>
	</div>
</section>
