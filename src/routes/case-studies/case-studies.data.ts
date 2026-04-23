export type Sector = 'cold-chain' | 'hospitality' | 'agriculture' | 'livestock';

export type FilterKey = 'all' | Sector;

type Headline = {
	before: string;
	accent: string;
	after?: string;
};

type Metric = {
	value: string;
	unit?: string;
	label: string;
};

type ReadoutTone = 'ok' | 'warn' | 'neutral';

type ReadoutEntry = {
	label: string;
	value: string;
	tone?: ReadoutTone;
};

type ZoneTone = 'ok' | 'warn';

type ZoneEntry = {
	label: string;
	value: string;
	tone?: ZoneTone;
};

type VisualBase = {
	eyebrow: string;
	tags: string[];
};

type ReadoutVisual = VisualBase & {
	kind: 'readout';
	entries: ReadoutEntry[];
	footerNote?: string;
	footerAlign?: 'start' | 'end';
};

type ZoneVisual = VisualBase & {
	kind: 'zones';
	entries: ZoneEntry[];
	footerNote: string;
	footerAlign?: 'start' | 'end';
};

export type CaseStudy = {
	id: string;
	orderLabel: string;
	indexName: string;
	indexIndustry: string;
	sector: Sector;
	breadcrumb: string;
	location: string;
	liveDuration: string;
	clientMeta: string;
	clientName: string;
	clientUrl?: string;
	clientUrlExternal?: boolean;
	logo: string;
	headline: Headline;
	problem: string;
	solution: string;
	quote: string;
	quoteAttribution: string;
	metrics: Metric[];
	deployed: string;
	deploymentNote: string;
	footerLink: {
		href: string;
		label: string;
		external?: boolean;
	};
	layout: 'content-first' | 'visual-first';
	visual: ReadoutVisual | ZoneVisual;
	imageSrc?: string;
	imageAlt?: string;
};

export const filterOptions: Array<{ key: FilterKey; label: string }> = [
	{ key: 'all', label: 'All sectors' },
	{ key: 'cold-chain', label: 'Cold chain' },
	{ key: 'hospitality', label: 'Hospitality' },
	{ key: 'agriculture', label: 'Agriculture' },
	{ key: 'livestock', label: 'Livestock' }
];

export const heroStats: Array<{ label: string; value: string }> = [
	{ label: 'Active deployments', value: '5 operators' },
	{ label: 'Sensors in field', value: '4,200+' },
	{ label: 'Cumulative uptime', value: '99.97%' },
	{ label: 'Industries served', value: '6' }
];

export const caseStudies: CaseStudy[] = [
	{
		id: 'case-tk-ebisu',
		orderLabel: 'CASE 01 / 05',
		indexName: 'TK Ebisu',
		indexIndustry: 'Cold chain / logistics',
		sector: 'cold-chain',
		breadcrumb: 'Cold chain & logistics',
		location: 'Tokyo',
		liveDuration: '18 mo',
		clientMeta: 'Client',
		clientName: 'TK Ebisu',
		clientUrl: 'https://ebisu-g.com/group/tk-ebisu/',
		clientUrlExternal: true,
		logo: 'TK',
		headline: {
			before: 'From four-hour walkthroughs to ',
			accent: 'four-second alerts.'
		},
		problem:
			'Refrigerated logistics yard with 22 walk-ins and 14 reefer bays. Night-shift staff logged temperatures every four hours by hand. A failed compressor in 2023 went undetected for nearly six hours, spoiling a full pallet of seafood.',
		solution:
			'38 x CW-AIR-TH sensors across walk-ins, reefer trailers, and the prep area. Two indoor LoRaWAN gateways. Alerts pipe into LINE Works so the supervisor and on-call engineer get pinged the moment any door is left open or temperature drifts.',
		quote:
			'"We stopped finding out about freezer failures from the morning shift. Now we know inside a minute, from anywhere."',
		quoteAttribution: 'Operations Lead - TK Ebisu',
		metrics: [
			{ value: '4', unit: 'hrs/day', label: 'Manual logging eliminated' },
			{ value: '12', unit: 'min', label: 'Average failure detection time' },
			{ value: 'JPY 1.4', unit: 'M', label: 'Spoilage avoided in year 1' }
		],
		deployed: '2024-09',
		deploymentNote: 'Shipped from Miyazaki',
		footerLink: {
			href: 'https://ebisu-g.com/group/tk-ebisu/',
			label: 'Visit customer site',
			external: true
		},
		layout: 'content-first',
		visual: {
			kind: 'readout',
			eyebrow: 'Deployment / TK-YARD-01',
			tags: ['22 walk-ins', '14 reefer bays', '2 gateways', '38 sensors'],
			entries: [
				{ label: 'Walk-in A / -22 C target', value: '-22.4 C', tone: 'ok' },
				{ label: 'Walk-in B / -18 C target', value: '-18.1 C', tone: 'ok' },
				{ label: 'Reefer 07 / in transit', value: '-14.2 C up', tone: 'warn' },
				{ label: 'Prep room / ambient', value: '+19.8 C', tone: 'ok' },
				{ label: 'Door / loading bay 2', value: 'OPEN 4m', tone: 'warn' }
			]
		},
		imageSrc: 'https://ebisu-g.com/wp-content/uploads/2022/11/pet-img17.jpg',
		imageAlt:
			'Photo of a TK Ebisu refrigerated yard with a CW-AIR-TH sensor mounted on a walk-in door'
	},
	{
		id: 'case-seagaia',
		orderLabel: 'CASE 02 / 05',
		indexName: 'Phoenix Seagaia Resort',
		indexIndustry: 'Hospitality / HACCP',
		sector: 'hospitality',
		breadcrumb: 'Hospitality / HACCP',
		location: 'Miyazaki',
		liveDuration: '14 mo',
		clientMeta: 'Client',
		clientName: 'Phoenix Seagaia Resort',
		clientUrl: 'https://en.seagaia.co.jp/',
		clientUrlExternal: true,
		logo: 'PS',
		headline: {
			before: 'HACCP audit prep cut from ',
			accent: 'three days to twenty minutes.'
		},
		problem:
			'Seven restaurants and three banquet kitchens, each with their own clipboard log. Before every audit, F&B managers spent two to three days reconstructing temperature records from paper. A missed log meant a non-conformance.',
		solution:
			'62 x CW-AIR-TH sensors across all cold and hot holding points, with two outdoor gateways covering the entire resort. Auto-generated HACCP CCP reports export as signed PDFs, and sous chefs can check live readings on a tablet at the pass.',
		quote:
			'"The auditor asked for the last six months of the sushi case. I exported it in twenty seconds. He just nodded."',
		quoteAttribution: 'Executive Sous Chef - Phoenix Seagaia',
		metrics: [
			{ value: '3 -> 0.3', unit: 'days', label: 'Audit prep time' },
			{ value: '100', unit: '%', label: 'CCP coverage across all kitchens' },
			{ value: '0', label: 'Non-conformances since deployment' }
		],
		deployed: '2025-02',
		deploymentNote: 'On-site install',
		footerLink: {
			href: 'https://en.seagaia.co.jp/',
			label: 'Visit resort site',
			external: true
		},
		layout: 'visual-first',
		visual: {
			kind: 'readout',
			eyebrow: 'Facility / Phoenix Seagaia / F&B',
			tags: ['7 restaurants', '3 banquet kitchens', '62 sensors', 'HACCP-ready'],
			entries: [
				{ label: 'Sushiya / neta-case', value: '+3.8 C', tone: 'ok' },
				{ label: 'Banquet kitchen / walk-in', value: '+2.1 C', tone: 'ok' },
				{ label: 'Pastry / chocolate room', value: '+18.0 C', tone: 'ok' },
				{ label: 'Buffet / hot hold', value: '+64.5 C', tone: 'ok' },
				{ label: 'Audit log / last export', value: '2026-04-12', tone: 'neutral' }
			]
		},
		imageSrc:
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/31/65/e2/the-living-garden.jpg?w=1200&h=-1&s=1',
		imageAlt:
			'Photo of a sushi case at Phoenix Seagaia Resort with a CW-AIR-TH sensor mounted inside'
	},
	{
		id: 'case-poultry',
		orderLabel: 'CASE 03 / 05',
		indexName: 'Kyushu Poultry',
		indexIndustry: 'Livestock / welfare',
		sector: 'livestock',
		breadcrumb: 'Livestock / poultry welfare',
		location: 'Kyushu',
		liveDuration: '9 mo',
		clientMeta: 'Client / anonymized at request',
		clientName: 'Kyushu Poultry Producer',
		logo: 'KP',
		headline: {
			before: 'Heat-stress alerts that ',
			accent: 'save flocks',
			after: ' in summer.'
		},
		problem:
			'Four broiler sheds totalling roughly 120,000 birds. Summer humidity routinely pushed THI into stress zones. A 2024 power-vent failure caused a 2,300-bird mortality event before the morning rounds noticed.',
		solution:
			'24 x CW-AIR-TH sensors at three heights per shed, plus ambient outdoor units. Threshold alerts fire at THI 78 or higher. Independent power means alerts still go out when a shed loses mains - they once caught a generator failure 11 minutes before staff did.',
		quote:
			'"Last August we got a THI alert at 03:14. The on-call manager opened a side vent remotely. Saved the flock."',
		quoteAttribution: 'Farm Manager - Kyushu site',
		metrics: [
			{ value: '2,300 -> 0', label: 'Heat-stress mortality events' },
			{ value: '11', unit: 'min', label: 'Earlier than human detection' },
			{ value: '4', unit: 'sheds', label: 'Single gateway covers all' }
		],
		deployed: '2025-07',
		deploymentNote: 'Anonymized reference',
		footerLink: {
			href: '/contact',
			label: 'Request reference details'
		},
		layout: 'content-first',
		visual: {
			kind: 'readout',
			eyebrow: 'Shed climate / live THI',
			tags: ['4 sheds', '3 heights per shed', '120k birds', 'Independent power'],
			entries: [
				{ label: 'Shed A / floor', value: '26.4 C / 62% / THI 73', tone: 'ok' },
				{ label: 'Shed A / ceiling', value: '29.1 C / 58% / THI 75', tone: 'ok' },
				{ label: 'Shed B / floor', value: '29.8 C / 71% / THI 78 up', tone: 'warn' },
				{ label: 'Shed C / floor', value: '26.0 C / 64% / THI 73', tone: 'ok' },
				{ label: 'Outdoor ambient', value: '31.2 C / 78%', tone: 'neutral' }
			]
		},
		imageSrc: 'https://photos.app.goo.gl/4vj1Kf77ygfPXrM99',
		imageAlt:
			'Photo of the interior of a broiler shed with chickens and a CW-AIR-TH sensor mounted near the ceiling'
	},
	{
		id: 'case-ja-miyazaki',
		orderLabel: 'CASE 04 / 05',
		indexName: 'JA Miyazaki',
		indexIndustry: 'Agriculture / co-op',
		sector: 'agriculture',
		breadcrumb: 'Agriculture / co-op',
		location: 'Miyazaki',
		liveDuration: '22 mo',
		clientMeta: 'Client',
		clientName: 'JA Miyazaki',
		clientUrl: 'https://miyazaki.mz-ja.or.jp/',
		clientUrlExternal: true,
		logo: 'JA',
		headline: {
			before: 'One co-op, 47 farms, ',
			accent: 'one dashboard.'
		},
		problem:
			'Co-op extension officers visited member farms weekly to check climate logs. Crop quality was inconsistent across mango, pepper, and rice growers, and the co-op had no shared visibility to coach struggling farmers before harvest.',
		solution:
			'3,800 sensors deployed across 47 member farms. Each farmer gets a private dashboard while the co-op sees aggregate views and best-practice benchmarks. Monthly grower meetings now center on data instead of memory.',
		quote:
			'"We can finally tell new farmers exactly what the top growers\' greenhouses look like - minute by minute, week by week."',
		quoteAttribution: 'Extension Officer - JA Miyazaki',
		metrics: [
			{ value: '+12', unit: '%', label: 'Average yield uplift in year 2' },
			{ value: '47', unit: 'farms', label: 'Connected on one network' },
			{ value: '-68', unit: '%', label: 'Site-visit hours per season' }
		],
		deployed: '2024-06',
		deploymentNote: 'Co-op program',
		footerLink: {
			href: 'https://miyazaki.mz-ja.or.jp/',
			label: 'Visit JA Miyazaki',
			external: true
		},
		layout: 'visual-first',
		visual: {
			kind: 'readout',
			eyebrow: 'Co-op network / 47 farmer members',
			tags: ['47 farms', '3,800 sensors', 'Mango / pepper / rice', 'Shared dashboard'],
			entries: [
				{ label: 'Farm M-12 / mango greenhouse', value: '28.4 C / 72%', tone: 'ok' },
				{ label: 'Farm P-04 / pepper greenhouse', value: '24.1 C / 65%', tone: 'ok' },
				{ label: 'Farm R-22 / rice paddy', value: '22.8 C / soil 26 C', tone: 'ok' },
				{ label: 'Farm M-19 / mango greenhouse', value: '31.2 C up', tone: 'warn' },
				{ label: 'Network active / 47 of 47', value: '100%', tone: 'ok' }
			]
		}
	},
	{
		id: 'case-tuno',
		orderLabel: 'CASE 05 / 05',
		indexName: 'Tuno Cucumber Project',
		indexIndustry: 'Greenhouse / precision ag',
		sector: 'agriculture',
		breadcrumb: 'Precision agriculture',
		location: 'Tuno',
		liveDuration: '7 mo',
		clientMeta: 'Client / project',
		clientName: 'Tuno Cucumber Farming Project',
		logo: 'TC',
		headline: {
			before: 'Tuning a greenhouse like an ',
			accent: 'instrument.'
		},
		problem:
			'A small consortium of cucumber growers in Tuno wanted to compete on quality rather than volume. They needed to map exactly how soil moisture, EC, and air RH correlated with harvest weight and shelf life across micro-zones inside each greenhouse.',
		solution:
			"CW-FARM soil probes at three depths in nine zones per greenhouse, plus CW-AIR-TH at canopy and ridge. Data pipes into the growers' own analysis sheets through the CropWatch API so they can run year-on-year irrigation A/B tests.",
		quote:
			'"We\'re not guessing anymore. We can see when a zone is drying out three days before the leaves do."',
		quoteAttribution: 'Lead grower - Tuno project',
		metrics: [
			{ value: '+18', unit: '%', label: 'Marketable yield in year 1' },
			{ value: '-24', unit: '%', label: 'Irrigation water usage' },
			{ value: '9', unit: 'zones', label: 'Per-greenhouse resolution' }
		],
		deployed: '2025-09',
		deploymentNote: 'API-integrated',
		footerLink: {
			href: '/contact',
			label: 'Discuss this deployment'
		},
		layout: 'content-first',
		visual: {
			kind: 'zones',
			eyebrow: 'Greenhouse GH-03 / zone grid',
			tags: ['9 zones', '3 soil depths', 'Canopy and ridge T/RH', 'API export'],
			entries: [
				{ label: 'Z1', value: '62%', tone: 'ok' },
				{ label: 'Z2', value: '64%', tone: 'ok' },
				{ label: 'Z3', value: '52% up', tone: 'warn' },
				{ label: 'Z4', value: '61%', tone: 'ok' },
				{ label: 'Z5', value: '63%', tone: 'ok' },
				{ label: 'Z6', value: '65%', tone: 'ok' },
				{ label: 'Z7', value: '62%', tone: 'ok' },
				{ label: 'Z8', value: '64%', tone: 'ok' },
				{ label: 'Z9', value: '63%', tone: 'ok' }
			],
			footerNote: 'Soil moisture / 20 cm depth / live',
			footerAlign: 'end'
		}
	}
];

export const commonThread = {
	eyebrow: 'Common thread / 01',
	before: 'Every customer started with a starter kit. ',
	accent: 'One gateway, three sensors.'
};

export const closingFacts: Array<{ label: string; value: string; highlight?: boolean }> = [
	{ label: 'Includes', value: '1 gateway, 3 sensors' },
	{ label: 'Setup time', value: 'About 90 minutes' },
	{ label: 'Coverage', value: 'About 1 facility' },
	{ label: 'Time to first alert', value: '< 24 hours', highlight: true },
	{ label: 'Risk-free trial', value: '90 days', highlight: true }
];
