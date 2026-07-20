/**
 * Agriculture page — faithful recreations of three CWUI charts:
 * CwPPFDChart (range gauge), CwVPDChart (temp×RH matrix), CwHeatmap.
 *
 * Ported from the design bundle's vanilla `ag-charts.js`. Kept as plain DOM
 * builders (no Svelte runtime) so the markup matches the design 1:1 and relies
 * on the global classes in `ag.css`. Call `initAgCharts()` from `onMount` — the
 * original auto-ran on DOMContentLoaded, which never fires on client-side
 * navigation, so each chart instead hydrates the (server-rendered, empty)
 * `#ppfdCard` / `#vpdCard` / `#hmCard` containers when the page mounts.
 */

/* ── 1) PPFD range gauge (CwPPFDChart) ───────────────────── */
interface PpfdCrop {
	name: string;
	min: number;
	max: number;
	cur: number;
	dli: number;
}

const PPFD_CROPS: PpfdCrop[] = [
	{ name: 'Lettuce', min: 200, max: 400, cur: 320, dli: 11.5 },
	{ name: 'Strawberry', min: 400, max: 600, cur: 470, dli: 14.2 },
	{ name: 'Basil', min: 300, max: 600, cur: 540, dli: 13.0 },
	{ name: 'Pepper', min: 600, max: 1000, cur: 740, dli: 18.4 },
	{ name: 'Tomato', min: 700, max: 1200, cur: 1080, dli: 24.6 }
];
const PPFD_DOMAIN = 1400;
const PPFD_TICKS = [0, 200, 400, 600, 800, 1000, 1200, 1400];

function ppfdStatus(c: PpfdCrop): { cls: string; ic: string; txt: string; note: string } {
	if (c.cur < c.min)
		return { cls: 'low', ic: 'south', txt: 'Below target', note: c.min - c.cur + ' µmol below band' };
	if (c.cur > c.max)
		return { cls: 'high', ic: 'north', txt: 'Too high', note: c.cur - c.max + ' µmol above band' };
	return { cls: 'ok', ic: 'check_circle', txt: 'Optimal', note: 'Inside target band' };
}

function renderPPFD(root: HTMLElement, crop: PpfdCrop): void {
	const pct = (v: number) => Math.max(0, Math.min(100, (v / PPFD_DOMAIN) * 100));
	const s = ppfdStatus(crop);
	const optLeft = pct(crop.min);
	const optW = pct(crop.max) - pct(crop.min);
	const ticks = PPFD_TICKS.map(
		(t) => '<span class="ppfd__tick" style="left:' + pct(t) + '%">' + t.toLocaleString() + '</span>'
	).join('');
	root.innerHTML =
		'<dl class="ppfd__summary">' +
		'<div class="ppfd__stat"><dt>Crop</dt><dd style="font-family:var(--cw-font-family)">' +
		crop.name +
		'</dd></div>' +
		'<div class="ppfd__stat"><dt>Current PPFD</dt><dd>' +
		crop.cur.toLocaleString() +
		' <small>µmol/m²/s</small></dd></div>' +
		'<div class="ppfd__stat"><dt>Target range</dt><dd>' +
		crop.min.toLocaleString() +
		'-' +
		crop.max.toLocaleString() +
		'</dd></div>' +
		'<div class="ppfd__stat"><dt>DLI today</dt><dd>' +
		crop.dli.toFixed(1) +
		' <small>mol/m²/day</small></dd></div>' +
		'</dl>' +
		'<div class="ppfd__status ' +
		s.cls +
		'"><span class="material-symbols-rounded">' +
		s.ic +
		'</span> ' +
		s.txt +
		' · ' +
		s.note +
		'</div>' +
		'<div class="ppfd__track" style="margin-top:12px">' +
		'<div class="ppfd__zone low" style="width:' +
		optLeft +
		'%"></div>' +
		'<div class="ppfd__zone opt" style="width:' +
		optW +
		'%"><span class="ppfd__optlabel" style="left:50%;transform:translate(-50%,-50%)">Optimal</span></div>' +
		'<div class="ppfd__zone high" style="width:' +
		(100 - optLeft - optW) +
		'%"></div>' +
		'<div class="ppfd__marker" data-v="' +
		crop.cur.toLocaleString() +
		' µmol" style="left:' +
		pct(crop.cur) +
		'%"></div>' +
		'</div>' +
		'<div class="ppfd__ticks">' +
		ticks +
		'</div>' +
		'<div class="ppfd__scalelabels"><span>Low</span><span>Optimal</span><span>High</span></div>';
}

function initPPFD(): void {
	const card = document.getElementById('ppfdCard');
	if (!card) return;
	const chips = card.querySelector<HTMLElement>('[data-chips]');
	const view = card.querySelector<HTMLElement>('[data-view]');
	if (!chips || !view) return;
	let active = 3; // Pepper
	PPFD_CROPS.forEach((c, i) => {
		const b = document.createElement('button');
		b.className = 'crop-chip' + (i === active ? ' is-active' : '');
		b.type = 'button';
		b.textContent = c.name + ' ' + c.min + '-' + c.max;
		b.addEventListener('click', () => {
			active = i;
			Array.from(chips.children).forEach((el, j) => el.classList.toggle('is-active', j === i));
			renderPPFD(view, PPFD_CROPS[i]);
		});
		chips.appendChild(b);
	});
	renderPPFD(view, PPFD_CROPS[active]);
}

/* ── 2) VPD matrix (CwVPDChart) — temp (rows) × RH (cols) ───
   VPD = SVP(T) · (1 − RH/100),  SVP = 0.6108·e^(17.27T/(T+237.3)) */
interface VpdProgram {
	name: string;
	min: number;
	max: number;
}

const VPD_PROGRAMS: VpdProgram[] = [
	{ name: 'Clone Dome', min: 0.5, max: 0.7 },
	{ name: 'Leafy Greens', min: 0.6, max: 0.9 },
	{ name: 'Basil Push', min: 0.8, max: 1.1 },
	{ name: 'Tomato Flower', min: 1.0, max: 1.3 },
	{ name: 'Pepper Finish', min: 1.1, max: 1.4 }
];
const VPD_TEMPS = [18, 20, 22, 24, 26, 28, 30, 32]; // °C rows
const VPD_RH = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]; // % cols
const CUR_T = 26;
const CUR_RH = 65;

/** US display: Fahrenheit first, Celsius in parentheses. Math stays in °C. */
const cToF = (c: number): number => (c * 9) / 5 + 32;

function vpd(t: number, rh: number): number {
	const svp = 0.6108 * Math.exp((17.27 * t) / (t + 237.3));
	return svp * (1 - rh / 100);
}
function vpdColor(v: number): string {
	// hue ramp: 0 kPa → blue(220), ~1.0 → green(130), ~2.2 → red(0)
	let hue: number;
	if (v <= 1.0) hue = 220 - (v / 1.0) * 90; // 220 → 130
	else hue = Math.max(0, 130 - ((v - 1.0) / 1.2) * 130); // 130 → 0
	return 'hsl(' + hue.toFixed(0) + ' 68% 50%)';
}

function renderVPD(card: HTMLElement, prog: VpdProgram): void {
	const view = card.querySelector<HTMLElement>('[data-view]');
	const readout = card.querySelector<HTMLElement>('[data-readout]');
	if (!view || !readout) return;
	const curV = vpd(CUR_T, CUR_RH);
	const inBand = curV >= prog.min && curV <= prog.max;
	readout.innerHTML =
		'<div class="vpd__readout"><b>' +
		curV.toFixed(2) +
		' kPa</b><span>room VPD · ' +
		cToF(CUR_T).toFixed(1) +
		' °F (' +
		CUR_T +
		' °C) / ' +
		CUR_RH +
		' %RH</span></div>' +
		'<p style="margin:0;font-size:13px;color:var(--web-muted)">' +
		prog.name +
		' target ' +
		prog.min.toFixed(1) +
		'-' +
		prog.max.toFixed(1) +
		' kPa · ' +
		'<strong style="color:' +
		(inBand ? 'var(--web-accent)' : 'var(--cw-danger-500)') +
		'">' +
		(inBand ? 'on target' : 'steer back to band') +
		'</strong></p>';

	const head =
		'<tr><th class="corner">°F \\ %RH</th>' +
		VPD_RH.map((r) => '<th>' + r + '</th>').join('') +
		'</tr>';
	const rows = VPD_TEMPS.map((t) => {
		const cells = VPD_RH.map((rh) => {
			const v = vpd(t, rh);
			let cls = 'vpd__cell';
			if (v >= prog.min && v <= prog.max) cls += ' in-band';
			if (t === CUR_T && rh === CUR_RH) cls += ' current';
			return (
				'<td class="' +
				cls +
				'" style="background:' +
				vpdColor(v) +
				'" title="' +
				Math.round(cToF(t)) +
				' °F (' +
				t +
				' °C) / ' +
				rh +
				'%RH = ' +
				v.toFixed(2) +
				' kPa">' +
				v.toFixed(2) +
				'</td>'
			);
		}).join('');
		return '<tr><td class="vpd__rowlab">' + Math.round(cToF(t)) + '°</td>' + cells + '</tr>';
	}).join('');
	view.innerHTML = '<div class="vpd__wrap"><table class="vpd__grid">' + head + rows + '</table></div>';
}

function initVPD(): void {
	const card = document.getElementById('vpdCard');
	if (!card) return;
	const chips = card.querySelector<HTMLElement>('[data-chips]');
	if (!chips) return;
	let active = 3; // Tomato Flower
	VPD_PROGRAMS.forEach((p, i) => {
		const b = document.createElement('button');
		b.className = 'crop-chip' + (i === active ? ' is-active' : '');
		b.type = 'button';
		b.textContent = p.name + ' ' + p.min.toFixed(1) + '-' + p.max.toFixed(1);
		b.addEventListener('click', () => {
			active = i;
			Array.from(chips.children).forEach((el, j) => el.classList.toggle('is-active', j === i));
			renderVPD(card, VPD_PROGRAMS[i]);
		});
		chips.appendChild(b);
	});
	renderVPD(card, VPD_PROGRAMS[active]);
}

/* ── 3) Heatmap (CwHeatmap) — 24 h × 7 day temperature grid ── */
const HM_COLORS: number[][] = [
	[6, 182, 212],
	[163, 230, 53],
	[249, 115, 22]
]; // cyan → lime → orange
function mix(a: number[], b: number[], t: number): number[] {
	return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
}
function hmColor(t01: number): string {
	let c: number[];
	if (t01 < 0.5) c = mix(HM_COLORS[0], HM_COLORS[1], t01 / 0.5);
	else c = mix(HM_COLORS[1], HM_COLORS[2], (t01 - 0.5) / 0.5);
	return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
}
function seeded(seed: number): () => number {
	return () => {
		seed = (seed * 9301 + 49297) % 233280;
		return seed / 233280;
	};
}

function initHeatmap(): void {
	const card = document.getElementById('hmCard');
	if (!card) return;
	const view = card.querySelector<HTMLElement>('[data-view]');
	if (!view) return;
	const rnd = seeded(42);
	const days = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
	// diurnal model: cool ~5am, warm ~16:00, with per-day + per-cell noise
	const grid: number[][] = [];
	let min = Infinity;
	let max = -Infinity;
	for (let h = 0; h < 24; h++) {
		const base = 17 + 8 * Math.sin(((h - 8) / 24) * 2 * Math.PI);
		const row: number[] = [];
		for (let d = 0; d < 7; d++) {
			let v = base + (rnd() - 0.5) * 4 + Math.sin(d) * 1.2;
			v = Math.round(v * 10) / 10;
			row.push(v);
			min = Math.min(min, v);
			max = Math.max(max, v);
		}
		grid.push(row);
	}
	const head =
		'<div class="hm__days"><div></div>' +
		days.map((d) => '<div class="hm__day">' + d + '</div>').join('') +
		'</div>';
	let rows = '';
	for (let hh = 0; hh < 24; hh++) {
		const cells = grid[hh]
			.map((v) => {
				const t01 = (v - min) / (max - min);
				return (
					'<div class="hm__cell" style="background:' +
					hmColor(t01) +
					'" data-t="' +
					cToF(v).toFixed(1) +
					' °F (' +
					v.toFixed(1) +
					' °C)"></div>'
				);
			})
			.join('');
		rows +=
			'<div class="hm__row"><span class="hm__hour">' +
			String(hh).padStart(2, '0') +
			':00</span>' +
			cells +
			'</div>';
	}
	view.innerHTML = '<div class="hm__wrap">' + head + '<div class="hm">' + rows + '</div></div>';
	const lg = card.querySelector<HTMLElement>('[data-legend]');
	if (lg)
		lg.innerHTML =
			'<span>' +
			cToF(min).toFixed(1) +
			' °F (' +
			min.toFixed(1) +
			' °C)</span><span class="hm__ramp"></span><span>' +
			cToF(max).toFixed(1) +
			' °F (' +
			max.toFixed(1) +
			' °C)</span>';
}

/** Build all three agriculture charts. Safe to call only in the browser. */
export function initAgCharts(): void {
	if (typeof document === 'undefined') return;
	initPPFD();
	initVPD();
	initHeatmap();
}
