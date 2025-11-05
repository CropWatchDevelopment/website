<script lang="ts">
	type CountryPart = { partNumber: string; manufacturer: string };
	type Country = { flag: string; name: string; partList: CountryPart[] };

	let showToolTip = $state<boolean>(false);
	let mousePosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let hoveringCountry = $state<Country | null>(null);

	const countryList: Country[] = [
		{
			flag: '🇯🇵',
			name: 'Japan',
			partList: [
				{ partNumber: 'GRM188R61A106ME69J', manufacturer: 'Murata Manufacturing Co., Ltd.' },
				{ partNumber: 'GRM188R60J226MEA0J', manufacturer: 'Murata Manufacturing Co., Ltd.' },
				{ partNumber: 'GRM1555C1H220JA01J', manufacturer: 'Murata Manufacturing Co., Ltd.' },
				{ partNumber: 'LQM21PN2R2MGHL', manufacturer: 'Murata Manufacturing Co., Ltd.' },
				{
					partNumber: 'C239522 (JST SM04B-SRSS-TB connector)',
					manufacturer: 'J.S.T. Mfg. Co. (JST)'
				}
			]
		},
		{
			flag: '🇰🇷',
			name: 'S. Korea',
			partList: [{ partNumber: 'CL05A105KP5NNNC', manufacturer: 'Samsung Electro-Mechanics Co.' }]
		},
		{
			flag: '🇺🇸',
			name: 'USA',
			partList: [
				{ partNumber: 'QBLP595-IG', manufacturer: 'QT-Brightek Corp.' },
				{ partNumber: 'TC0203620000G', manufacturer: 'Amphenol (Anytek brand)' },
				{ partNumber: 'DMG2302UKQ-7', manufacturer: 'Diodes Incorporated' },
				{ partNumber: 'AO3401A', manufacturer: 'Alpha & Omega Semiconductor Ltd.' },
				{ partNumber: 'KMR223GLFG (tactile switch)', manufacturer: 'C&K Components, Inc.' },
				{
					partNumber: '453-00140R (LoRa module RM1261)',
					manufacturer: 'Laird Connectivity (Ezurio brand)'
				},
				{ partNumber: 'TPS63900DSKR', manufacturer: 'Texas Instruments (TI)' },
				{ partNumber: 'TLV521DCKR', manufacturer: 'Texas Instruments (TI)' },
				{ partNumber: 'TPS22810DRVR', manufacturer: 'Texas Instruments (TI)' }
			]
		},
		{
			flag: '🇹🇼',
			name: 'Taiwan',
			partList: [
				{ partNumber: 'RC0402FR-0736K5L', manufacturer: 'Yageo Corporation' },
				{ partNumber: 'RC0402FR-07511RL', manufacturer: 'Yageo Corporation' },
				{ partNumber: 'RC0402FR-07110KL', manufacturer: 'Yageo Corporation' },
				{ partNumber: 'AC0402FR-0710KL', manufacturer: 'Yageo Corporation (Automotive series)' },
				{ partNumber: 'WR04X1001FTL', manufacturer: 'Walsin Technology Corp.' },
				{ partNumber: 'RC0402FR-070RL', manufacturer: 'Yageo Corporation' }
			]
		},
		{
			flag: '🇮🇪',
			name: 'Ireland',
			partList: [
				{ partNumber: 'CRGCQ0402F1M0', manufacturer: 'TE Connectivity (Passive Components)' },
				{ partNumber: 'CRGCQ0402F4K7', manufacturer: 'TE Connectivity (Passive Components)' }
			]
		},
		{
			flag: '🇨🇭',
			name: 'Switzerland',
			partList: [
				{ partNumber: 'STM32L073RZT6', manufacturer: 'STMicroelectronics N.V.' },
				{
					partNumber: 'CM8V-T1A-32.768kHz-12.5pF-20PPM-TC-QC (32.768 kHz crystal)',
					manufacturer: 'Micro Crystal AG (Swatch Group)'
				}
			]
		}
	];

	const origins = [
		{ flag: ['🇳🇴'], title: 'Designed in Norway' },
		{ flag: ['🇯🇵'], title: 'Manufactured & Assembled in Japan' },
		{
			country: countryList,
			title: 'Using Parts from:',
			subtitle: 'Japan, South Korea, USA, Taiwan, Ireland, and Switzerland'
		},
		{ flag: ['🇺🇸', '🇦🇺'], title: 'Programmed in the USA & Australia' },
		{ flag: ['🌍'], title: 'Used by You' }
	];

	let onFlagHover = (event: MouseEvent, country: Country) => {
		showToolTip = true;
		mousePosition = { x: event.clientX, y: event.clientY };
		hoveringCountry = country;
	};

	let hideTooltip = () => {
		showToolTip = false;
		hoveringCountry = null;
	};
</script>

<section class="border-t border-[#d7e0f5] bg-white py-14">
	<div
		class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-5 px-4 md:flex-nowrap"
	>
		{#each origins as origin, index (origin.title)}
			<div class="flex min-w-[120px] flex-1 flex-col items-center text-center md:flex-[0_0_240px] md:max-w-[280px]">
				{#if origin.flag}
					<div class="flex items-center gap-1">
						{#each origin.flag as symbol, flagIndex (flagIndex)}
							<span class="text-[clamp(1.6rem,3.8vw,3.2rem)] leading-none">{symbol}</span>
						{/each}
					</div>
				{:else if origin.country}
					<div class="grid w-full max-w-[320px] grid-cols-2 gap-2 sm:grid-cols-3">
						{#each origin.country as coo (coo.name)}
							<button
								type="button"
								class="flex aspect-square w-full min-w-[84px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#f5f7fb] px-4 text-center shadow-sm shadow-[#0b1730]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5387]"
								onmousemove={(e) => onFlagHover(e, coo)}
								onmouseleave={hideTooltip}
								aria-label={`View parts sourced from ${coo.name}`}
							>
								<span class="text-[clamp(1.2rem,3vw,2.4rem)] leading-none">{coo.flag}</span>
								<p class="text-[clamp(0.58rem,1.2vw,0.85rem)] font-semibold text-[#1c2d52]">
									{coo.name}
								</p>
							</button>
						{/each}
					</div>
				{/if}
				<p class="mt-2 text-[clamp(0.62rem,1.4vw,0.95rem)] font-semibold text-[#1c2d52]">
					{origin.title}
				</p>
				{#if origin.subtitle}
					<small class="mt-1 text-[clamp(0.5rem,1.1vw,0.8rem)] text-[#1c2d52]/80">
						{origin.subtitle}
					</small>
				{/if}
			</div>
			{#if index < origins.length - 1}
				<div
					class="hidden h-[clamp(1.5rem,3vw,2.5rem)] w-[clamp(1.5rem,3vw,2.5rem)] flex-shrink-0 items-center justify-center text-[#2f5387] md:flex"
				>
					<svg
						class="h-full w-full"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</div>
				<div class="flex w-full items-center justify-center md:hidden">
					<svg
						class="h-8 w-8 rotate-90 text-[#2f5387]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</div>
			{/if}
		{/each}
	</div>
	<pre>
	<small class="mt-6 block px-4 text-left text-[clamp(0.55rem,1.15vw,0.85rem)] text-[#1c2d52]/70">
		* If a country is not listed above, their parts are not used in our products.
        * All offerings remain lead-free and RoHS compliant.
	</small>
    </pre>
</section>

{#if showToolTip && hoveringCountry}
	<div
		class="pointer-events-none fixed z-50 max-w-xs rounded-2xl border border-[#d7e0f5] bg-white/95 p-4 shadow-xl shadow-black/15 backdrop-blur-sm"
		style={`top: ${mousePosition.y + 16}px; left: ${mousePosition.x + 16}px;`}
	>
		<p class="text-sm font-semibold text-[#0b1730]">Parts from {hoveringCountry.name}:</p>
		<ul class="mt-3 space-y-2 text-sm text-[#1c2d52]/80">
			{#each hoveringCountry.partList as part (part.partNumber)}
				<li>
					<span class="font-semibold text-[#0b1730]">{part.partNumber}</span>
					<span class="block text-xs text-[#1c2d52]/70">{part.manufacturer}</span>
				</li>
			{/each}
		</ul>
	</div>
{/if}
