/**
 * Port of CropWatch/src/lib/components/displays/SignalStrength/signalStrength.ts
 * (the bar grading; the app's multi-gateway pick is not needed here).
 *
 * LoRaWAN link quality → 0-4 signal bars. RSSI and SNR are graded on their
 * own and the link gets the WORSE of the two grades: RSSI > -115 dBm with
 * SNR > -7 dB is a reliable link, RSSI ≤ -120 dBm or SNR ≤ -13 dB is at the
 * edge of range (Semtech, Robustel, Sensing Labs field guidance).
 */

export type SignalBars = 0 | 1 | 2 | 3 | 4;
export type SignalQuality = 'none' | 'weak' | 'okay' | 'strong';

/** Minimum RSSI (dBm) for 4, 3 and 2 bars. Anything lower that was still received is 1 bar. */
const RSSI_STEPS = [-100, -110, -118] as const;

/** Minimum SNR (dB) for 4, 3 and 2 bars. */
const SNR_STEPS = [0, -5, -10] as const;

function grade(value: number, steps: readonly [number, number, number]): SignalBars {
	if (value >= steps[0]) return 4;
	if (value >= steps[1]) return 3;
	if (value >= steps[2]) return 2;
	return 1;
}

const isReading = (value: number | null | undefined): value is number =>
	typeof value === 'number' && Number.isFinite(value);

/** Bars for a reading; 0 means no usable reading. A received packet always gets at least 1. */
export function signalBars(
	rssi: number | null | undefined,
	snr: number | null | undefined
): SignalBars {
	const grades: SignalBars[] = [];
	if (isReading(rssi)) grades.push(grade(rssi, RSSI_STEPS));
	if (isReading(snr)) grades.push(grade(snr, SNR_STEPS));
	if (grades.length === 0) return 0;
	return Math.min(...grades) as SignalBars;
}

/** 1 bar = weak (red), 2 = okay (yellow), 3-4 = strong (green). */
export function signalQuality(bars: SignalBars): SignalQuality {
	if (bars === 0) return 'none';
	if (bars === 1) return 'weak';
	if (bars === 2) return 'okay';
	return 'strong';
}
