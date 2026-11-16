import { describe, expect, it } from 'vitest';
import { judgeReading, vaporPressureDeficit, cropTarget } from './agronomy/crop-targets';
import { dayLightProfile, isDaylight, ppfdTargetForHour } from './agronomy/light-targets';
import { sunCoordinates } from './demo-crops';
import { createDemoGroups, type DemoRow } from './demo-data';
import { buildDliHistory, buildHistory, deviceNow, readingAt } from './demo-history';
import { buildCropTargetRows } from './devices/[dev_eui]/soil-crop-targets';
import { dliToday, fieldSeries, toSoilRows } from './soil-readings';

const DAY_MS = 86_400_000;

function cucumberDevice(): DemoRow {
	const device = createDemoGroups()
		.flatMap((group) => group.devices)
		.find((d) => d.profile === 'cucumber');
	if (!device) throw new Error('no cucumber device');
	return device;
}

describe('demo devices', () => {
	it('never report pH (the boards CropWatch ships do not measure it)', () => {
		const start = Date.UTC(2026, 10, 16);
		for (const device of createDemoGroups().flatMap((group) => group.devices)) {
			expect(Object.keys(device.details)).not.toContain('ph');
			for (let t = start; t < start + DAY_MS; t += 60 * 60 * 1000) {
				expect(Object.keys(readingAt(device, t))).not.toContain('ph');
			}
		}
	});
});

describe('demo cucumber house at its frozen 13:00', () => {
	const device = cucumberDevice();
	const crop = device.crop!;
	const coordinates = sunCoordinates(device.location!.coordinates)!;
	// A month of days, so the slow multi-day wander is covered.
	const days = Array.from(
		{ length: 30 },
		(_, i) => Date.UTC(2026, 10, 1) + i * DAY_MS + 5 * 3600_000
	);

	it('is in daylight, with the sun up whatever the time zone', () => {
		for (const real of days) {
			expect(isDaylight(new Date(deviceNow(device, real)), coordinates)).toBe(true);
		}
	});

	it('reads mostly in band: VPD at most a touch high, vented CO₂ low', () => {
		for (const real of days) {
			const clock = deviceNow(device, real);
			const reading = readingAt(device, clock);
			const vpd = vaporPressureDeficit(reading.air_temperature_c, reading.air_humidity);
			const statuses = Object.fromEntries(
				buildCropTargetRows({ crop, period: 'day', readings: reading, vpd }).map((row) => [
					row.key,
					row.status
				])
			);
			expect(statuses).toMatchObject({
				moisture: 'optimal',
				temperature_c: 'optimal',
				ec: 'optimal',
				air_temperature_c: 'optimal',
				air_humidity: 'optimal',
				co2: 'low'
			});
			expect(['optimal', 'slightly_high']).toContain(statuses.vpd);
		}
	});

	// One day a month: the shade screen holds the light in band from spring to
	// autumn; winter may fall a little short, never over.
	const months = Array.from({ length: 12 }, (_, m) => Date.UTC(2026, m, 15, 5));

	it('gets the light the hour and the day ask for, in every season', () => {
		for (const real of months) {
			const clock = new Date(deviceNow(device, real));
			const ppfd = readingAt(device, clock.getTime()).ppfd;
			const dli = cropTarget(crop, 'dli', 'day')!;
			const hour = ppfdTargetForHour(
				clock,
				{ min: dli.optimal_min, max: dli.optimal_max },
				dayLightProfile(clock, coordinates)
			)!;
			expect(judgeReading(ppfd, { ...dli, optimal_min: hour.min, optimal_max: hour.max })).toMatch(
				/optimal|slightly_low|low/
			);

			const rows = toSoilRows(buildHistory(device, 'today', real)).reverse();
			expect(dliToday(fieldSeries(rows, 'ppfd'), clock)).toBeGreaterThan(5);
		}
	});

	it('has a week of DLI history before today, never over the 30 mol goal', () => {
		for (const real of months) {
			const history = buildDliHistory(device, real);
			expect(history).toHaveLength(7);
			for (const day of history) {
				expect(day.value).toBeGreaterThan(15);
				expect(day.value).toBeLessThan(30);
			}
		}
	});
});
