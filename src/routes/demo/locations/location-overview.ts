/**
 * Port of CropWatch/src/routes/locations/[location_id]/location-overview.ts
 * (plus formatRelative from $lib/i18n/format): device health on the location
 * page. The app also folds in its refresh scheduler's freshness verdict; the
 * demo has no scheduler, so health comes from the last-seen time alone.
 */

export type DeviceHealth = 'online' | 'offline' | 'never';

/** Upload cadence assumed when a device row has no usable upload_interval. */
export const DEFAULT_UPLOAD_INTERVAL_MINUTES = 10;
const GRACE_MS = 60 * 1000;

export interface LocationDeviceRow {
	dev_eui: string;
	name: string;
	group: string | null;
	health: DeviceHealth;
	lastSeen: string | null;
	temperature: number | null;
	humidity: number | null;
	co2: number | null;
	/** Current gateway link; RSSI and SNR are both null when no gateway heard the device. */
	signal: { rssi: number | null; snr: number | null } | null;
	lat: number | null;
	long: number | null;
}

export interface HealthSummary {
	total: number;
	online: number;
	offline: number;
	never: number;
	/** Whole-number share of devices online, 0 when there are none. */
	percentOnline: number;
	/** Device with the newest reading, if any device has reported. */
	lastUplink: LocationDeviceRow | null;
}

/** Offline when the newest reading is older than the upload interval plus grace. */
export function classifyHealth(
	lastSeen: string | null,
	uploadIntervalMinutes: number | null,
	now: number
): DeviceHealth {
	const lastSeenMs = lastSeen ? new Date(lastSeen).getTime() : NaN;
	if (!Number.isFinite(lastSeenMs)) return 'never';
	const intervalMinutes =
		uploadIntervalMinutes && uploadIntervalMinutes > 0
			? uploadIntervalMinutes
			: DEFAULT_UPLOAD_INTERVAL_MINUTES;
	return now - lastSeenMs > intervalMinutes * 60 * 1000 + GRACE_MS ? 'offline' : 'online';
}

export function summarizeHealth(rows: LocationDeviceRow[]): HealthSummary {
	let online = 0;
	let offline = 0;
	let never = 0;
	let lastUplink: LocationDeviceRow | null = null;
	let lastUplinkMs = -Infinity;

	for (const row of rows) {
		if (row.health === 'online') online += 1;
		else if (row.health === 'offline') offline += 1;
		else never += 1;

		const seenMs = row.lastSeen ? new Date(row.lastSeen).getTime() : NaN;
		if (Number.isFinite(seenMs) && seenMs > lastUplinkMs) {
			lastUplinkMs = seenMs;
			lastUplink = row;
		}
	}

	return {
		total: rows.length,
		online,
		offline,
		never,
		percentOnline: rows.length === 0 ? 0 : Math.round((online / rows.length) * 100),
		lastUplink
	};
}

/** "3 分前", "2 時間前" (Intl short style, as the app formats it). */
export function formatRelative(iso: string | null, now: number, locale = 'ja-JP'): string | null {
	const ms = iso ? new Date(iso).getTime() : NaN;
	if (!Number.isFinite(ms)) return null;
	// Round by size so a gap reads the same either side of now.
	const round = (value: number) => Math.sign(value) * Math.round(Math.abs(value));
	const seconds = round((ms - now) / 1000);
	const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'short' });
	const abs = Math.abs(seconds);
	const text =
		abs < 60
			? format.format(seconds, 'second')
			: abs < 3600
				? format.format(round(seconds / 60), 'minute')
				: abs < 86400
					? format.format(round(seconds / 3600), 'hour')
					: format.format(round(seconds / 86400), 'day');
	// The short style abbreviates with a trailing dot in some languages; drop it.
	return text.replace(/(\p{L})\.(?=\s|$)/gu, '$1');
}
