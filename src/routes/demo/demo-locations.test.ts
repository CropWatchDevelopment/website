import { describe, expect, it } from 'vitest';
import { createDemoGroups, findDemoGroup } from './demo-data';
import { buildHistory, lastHeardAt, latestUploadAt, readingAt } from './demo-history';
import {
	classifyHealth,
	summarizeHealth,
	type LocationDeviceRow
} from './locations/location-overview';
import { signalBars } from './locations/signal-strength';

const NOW = Date.UTC(2026, 10, 16, 3, 7);

function rowsFor(locationId: number): LocationDeviceRow[] {
	return findDemoGroup(locationId)!.devices.map((device) => {
		const lastSeen = new Date(lastHeardAt(device, NOW)).toISOString();
		const reading = readingAt(device, latestUploadAt(device, NOW));
		return {
			dev_eui: device.dev_eui,
			name: device.name,
			group: device.group,
			health: classifyHealth(lastSeen, device.upload_interval, NOW),
			lastSeen,
			temperature: reading.temperature_c ?? null,
			humidity: reading.humidity ?? null,
			co2: reading.co2 ?? null,
			signal: device.signal,
			lat: device.lat ?? null,
			long: device.long ?? null
		};
	});
}

describe('demo locations', () => {
	it('every location has coordinates and unique device EUIs', () => {
		const euis = new Set<string>();
		for (const group of createDemoGroups()) {
			expect(group.location.coordinates).toBeDefined();
			for (const device of group.devices) {
				expect(euis.has(device.dev_eui)).toBe(false);
				euis.add(device.dev_eui);
			}
		}
	});

	it('the broiler farm has ten houses, one of them silent', () => {
		const rows = rowsFor(9004);
		expect(rows).toHaveLength(10);
		const summary = summarizeHealth(rows);
		expect(summary).toMatchObject({ total: 10, online: 9, offline: 1, never: 0 });
		expect(rows.find((row) => row.health === 'offline')?.name).toBe('7号鶏舎');
		for (const row of rows) {
			expect(row.temperature).toBeGreaterThan(17);
			expect(row.temperature).toBeLessThan(28);
			expect(row.humidity).toBeGreaterThan(50);
			expect(row.humidity).toBeLessThan(90);
			expect(row.lat).not.toBeNull();
		}
		expect(rows.filter((row) => row.co2 !== null)).toHaveLength(2);
	});

	it('shows a range of signal strengths, from strong to weak', () => {
		const bars = new Set(rowsFor(9004).map((row) => signalBars(row.signal!.rssi, row.signal!.snr)));
		expect(bars).toEqual(new Set([1, 2, 3, 4]));
	});

	it('the silent house has no uploads after it went quiet', () => {
		const device = findDemoGroup(9004)!.devices.find((d) => d.silentForMinutes)!;
		const newest = Date.parse(String(buildHistory(device, 24, NOW)[0].created_at));
		expect(NOW - newest).toBeGreaterThanOrEqual(device.silentForMinutes! * 60_000);
	});

	it('every other device is online, the frozen-clock cucumber house included', () => {
		for (const id of [9001, 9002, 9003]) {
			expect(summarizeHealth(rowsFor(id)).offline).toBe(0);
		}
	});
});
