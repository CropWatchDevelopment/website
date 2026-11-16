import { describe, expect, it } from 'vitest';
import { buildAiReport, type AiRecommendationDto } from './demo-ai-report';
import { createDemoGroups, type DemoRow } from './demo-data';
import { buildDliHistory } from './demo-history';

function demoDevices(): DemoRow[] {
	return createDemoGroups().flatMap((group) => group.devices);
}

function cucumberDevice(): DemoRow {
	const device = demoDevices().find((d) => d.profile === 'cucumber');
	if (!device) throw new Error('no cucumber device');
	return device;
}

/** The band a finding's target cell shows, e.g. "23〜28°C" -> [23, 28]. */
function bandOf(target: string | null): [number, number] {
	const [lo, hi] = (target ?? '').split('〜').map((part) => parseFloat(part));
	return [lo, hi];
}

describe('demo AI growing report', () => {
	const device = cucumberDevice();
	// Three days a month through a year: every season and the slow multi-day wander.
	const days = Array.from({ length: 36 }, (_, i) =>
		new Date(2026, Math.floor(i / 3), 4 + (i % 3) * 10, 9, 30).getTime()
	);
	const reports = days.map((now) => buildAiReport(device, now) as AiRecommendationDto);

	it('is written only for a sensor with a crop', () => {
		for (const other of demoDevices().filter((d) => !d.crop)) {
			expect(buildAiReport(other, days[0])).toBeNull();
		}
	});

	it('covers the day before the device clock, the last bar of the DLI history', () => {
		days.forEach((now, i) => {
			const yesterday = buildDliHistory(device, now).at(-1)!;
			expect(reports[i].period_start).toBe(yesterday.date);
			expect(reports[i].period_end).toBe(yesterday.date);
			const dli = reports[i].details.find((d) => d.metric === 'dli')!;
			expect(dli.ja).toContain(`：${parseFloat(yesterday.value.toFixed(1))}mol/m²/day、`);
		});
	});

	// Usually five; the count moves a little with the day's weather and the
	// viewer's time zone (the readings' noise is keyed to the instant).
	it('always has something to show: a few findings, none past a safe limit', () => {
		for (const report of reports) {
			expect(report.status).toBe('action');
			expect(report.max_severity).toBe(2);
			expect(report.findings.length).toBeGreaterThanOrEqual(3);
			expect(report.findings.length).toBeLessThanOrEqual(6);
			// Something is on target too, so the card's 目標どおり line shows.
			expect(report.details.some((d) => d.severity === 0 || d.severity === 1)).toBe(true);
		}
	});

	it('reports each finding on the side of the band it is off', () => {
		for (const report of reports) {
			for (const finding of report.findings) {
				const [lo, hi] = bandOf(finding.display.ja.target);
				const { status } = finding.display;
				if (finding.direction === 'low') expect(finding.value).toBeLessThan(lo);
				else expect(finding.value).toBeGreaterThan(hi);
				// "The low end is off, the average is fine" only when the average is.
				if (status === 'low_end_below') expect(finding.mean).toBeGreaterThanOrEqual(lo);
				if (status === 'below') expect(finding.direction).toBe('low');
				if (status === 'peak_above') expect(finding.mean).toBeLessThanOrEqual(hi);
				if (status === 'above') expect(finding.direction).toBe('high');
			}
		}
	});

	it('never gives opposite humidity and VPD advice for the same daytime', () => {
		for (const report of reports) {
			const humidity = report.findings.find(
				(f) => f.metric === 'air_humidity' && f.period === 'day'
			);
			const vpd = report.findings.find((f) => f.metric === 'vpd');
			if (humidity && vpd) expect(humidity.direction === 'high').toBe(vpd.direction === 'low');
		}
	});

	it('judges soil moisture and EC only against a band set for the field, which the demo lacks', () => {
		for (const report of reports) {
			for (const metric of ['soil_moisture', 'soil_ec', 'ppfd']) {
				expect(report.details.find((d) => d.metric === metric)?.severity).toBeNull();
				expect(report.findings.some((f) => f.metric === metric)).toBe(false);
			}
		}
	});

	it('explains every reading the board sends, and no pH', () => {
		for (const report of reports) {
			expect(report.details.map((d) => `${d.metric}:${d.period}`)).toEqual([
				'air_temperature:night',
				'air_temperature:day',
				'air_humidity:night',
				'air_humidity:day',
				'vpd:day',
				'dli:all',
				'ppfd:day',
				'soil_temperature:all',
				'soil_moisture:all',
				'soil_ec:all',
				'co2:day'
			]);
			expect(JSON.stringify(report)).not.toMatch(/ph/i);
		}
	});

	it('writes one paragraph per finding from the same numbers as the table', () => {
		for (const report of reports) {
			const paragraphs = report.body_ja.split('\n');
			report.findings.forEach((finding, i) => {
				const text = finding.display.ja;
				expect(paragraphs[i].startsWith(`${text.what}は`)).toBe(true);
				expect(paragraphs[i]).toContain(text.value);
				expect(paragraphs[i]).toContain(text.target);
				expect(paragraphs[i].endsWith(text.action)).toBe(true);
			});
			// Then the readings that were fine.
			expect(paragraphs).toHaveLength(report.findings.length + 1);
			expect(paragraphs.at(-1)).toMatch(/は目標どおりでした。$/);
			expect(report.headline_ja).toBe(
				`キュウリの栽培環境：${report.findings.length}項目が目標から外れています`
			);
		}
	});

	it('uses plain hyphens, never em or en dashes', () => {
		for (const report of reports) expect(JSON.stringify(report)).not.toMatch(/[—–]/);
	});
});
