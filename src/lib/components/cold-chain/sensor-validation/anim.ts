/* Timeline helpers for the sensor-validation explainer.
   Ported from the Claude Design project "JAPAN Sensor validation animation"
   (animations.jsx + sensor-validation.jsx). The source ran on a React
   timeline engine; here the scenes are plain functions of the playhead `t`
   and Svelte's reactivity drives the re-render. */

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const Easing = {
	linear: (t: number) => t,
	easeInCubic: (t: number) => t * t * t,
	easeOutCubic: (t: number) => {
		const u = t - 1;
		return u * u * u + 1;
	},
	easeInOutCubic: (t: number) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	easeOutBack: (t: number) => {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	}
};

/** Piecewise tween: interpolate([0, 1], [0, 100])(0.5) === 50. Clamps at both ends. */
export function interpolate(
	input: number[],
	output: number[],
	ease: (t: number) => number = Easing.linear
) {
	return (t: number) => {
		if (t <= input[0]) return output[0];
		if (t >= input[input.length - 1]) return output[output.length - 1];
		for (let i = 0; i < input.length - 1; i++) {
			if (t >= input[i] && t <= input[i + 1]) {
				const span = input[i + 1] - input[i];
				const local = span === 0 ? 0 : (t - input[i]) / span;
				return output[i] + (output[i + 1] - output[i]) * ease(local);
			}
		}
		return output[output.length - 1];
	};
}

/** Normalised 0..1 progress of `t` across [a, b]. */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a || 1e-6), 0, 1);

/** Fade in over [a, b], hold, fade out over [c, d]. */
export const io = (
	t: number,
	a: number,
	b: number,
	c: number,
	d: number,
	e: (t: number) => number = Easing.easeOutCubic
) => e(seg(t, a, b)) * (1 - Easing.easeInCubic(seg(t, c, d)));

/** Palette — hard-coded rather than tokenised so the scenes stay pure functions
    of `t`, but the values mirror the light site theme on purpose: this is a
    panel on a white page, not a dark screen inset into one. The hues match the
    static fallback diagram (double-sensor-check.svg) so the animated and still
    versions read as the same drawing.

    Text-bearing tones clear 4.5:1 on the panel — scenes label things as small
    as 12px, so the vivid dark-theme accents (#00d4aa, #38bdf8) can't carry over:
      teal #0a7d4f 5.2:1 · red #dd0f0f 5.1:1 · sky #2c6cb7 5.3:1 · faint #5f719a 4.9:1
    `teal` keeps its name (29 call sites) but is now the site's emerald. */
export const C = {
	bg0: '#f5f8fc',
	bg1: '#eef4fc',
	surface: '#f7faff',
	surface2: '#ffffff',
	border: '#d7e0f5',
	teal: '#0a7d4f',
	tealDim: 'rgba(10,125,79,0.16)',
	red: '#dd0f0f',
	redDim: 'rgba(221,15,15,0.12)',
	amber: '#b45309',
	sky: '#2c6cb7',
	ink: '#0b1730',
	muted: '#4a5d7e',
	faint: '#5f719a'
} as const;

/* Site tokens carry the JP fallbacks; the mono stack needs them spliced in so
   Japanese glyphs in monospace runs (エラー, 応答なし) don't drop to a generic. */
export const SANS = 'var(--cw-font-family)';
export const MONO = `'JetBrains Mono', var(--cw-font-jp), ui-monospace, monospace`;

export const fmtTemp = (v: number) => `${v.toFixed(1)} °C`;

export type SensorState = 'ok' | 'err' | 'off' | 'wrong';
export type GateTone = 'neutral' | 'red' | 'teal';

/** Canvas is authored at 1080×1080; everything is absolutely positioned on that grid. */
export const CANVAS = 1080;

/** Global playback speed: <1 slows the 35s authored timeline down uniformly. */
export const SPEED = 0.78;
export const BASE_DUR = 35;
export const DURATION = Math.round(BASE_DUR / SPEED);

/** Frame shown when prefers-reduced-motion is set: the flow fully validated. */
export const STILL_TIME = 33.5;
