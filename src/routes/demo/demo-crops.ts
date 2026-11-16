/**
 * The crop set on the demo's soil sensor, and where its house stands.
 *
 * In the app a soil sensor gets its crop from device settings and the targets
 * come from GET /crops. These are the cucumber rows of the real reference
 * table (api/supabase/updates/037_crop_types.sql), limited to the metrics the
 * soil page reads. They are published agronomy figures, not customer data.
 * The board does not measure pH, so the soil_ph row is left out.
 */

import type { CropTypeDetailDto } from './agronomy/crop-targets';
import type { Coordinates } from './agronomy/solar';

export const DEMO_CUCUMBER: CropTypeDetailDto = {
	code: 'cucumber',
	name_en: 'Cucumber',
	name_ja: 'キュウリ',
	targets: [
		{
			metric: 'soil_temperature',
			period: 'all',
			unit: '°C',
			min_value: null,
			optimal_min: 18,
			optimal_max: 25,
			max_value: null
		},
		{
			metric: 'soil_moisture',
			period: 'all',
			unit: '%',
			min_value: 12.5,
			optimal_min: 20.8,
			optimal_max: 34.2,
			max_value: null
		},
		// No bulk-probe EC target exists for cucumber, so the page falls back to
		// the lab (1:5 extract) band and labels it as such.
		{
			metric: 'soil_ec',
			period: 'all',
			unit: 'mS/cm',
			min_value: null,
			optimal_min: null,
			optimal_max: null,
			max_value: null
		},
		{
			metric: 'soil_ec_1to5',
			period: 'all',
			unit: 'mS/cm',
			min_value: null,
			optimal_min: 0.4,
			optimal_max: 0.5,
			max_value: null
		},
		{
			metric: 'air_temperature',
			period: 'day',
			unit: '°C',
			min_value: 8,
			optimal_min: 23,
			optimal_max: 28,
			max_value: 35
		},
		{
			metric: 'air_temperature',
			period: 'night',
			unit: '°C',
			min_value: 8,
			optimal_min: 10,
			optimal_max: 15,
			max_value: null
		},
		{
			metric: 'air_humidity',
			period: 'day',
			unit: '%',
			min_value: null,
			optimal_min: 70,
			optimal_max: 80,
			max_value: null
		},
		{
			metric: 'air_humidity',
			period: 'night',
			unit: '%',
			min_value: null,
			optimal_min: null,
			optimal_max: null,
			max_value: 93
		},
		{
			metric: 'co2',
			period: 'day',
			unit: 'ppm',
			min_value: null,
			optimal_min: 600,
			optimal_max: 900,
			max_value: null
		},
		{
			metric: 'ppfd',
			period: 'day',
			unit: 'µmol/m²/s',
			min_value: null,
			optimal_min: 463,
			optimal_max: 1019,
			max_value: 1500
		},
		{
			metric: 'dli',
			period: 'all',
			unit: 'mol/m²/day',
			min_value: null,
			optimal_min: 20,
			optimal_max: 30,
			max_value: null
		},
		{
			metric: 'vpd',
			period: 'day',
			unit: 'kPa',
			min_value: null,
			optimal_min: 0.41,
			optimal_max: 0.83,
			max_value: null
		}
	]
};

/** The JST meridian (UTC+9 × 15°). */
const JST_MERIDIAN = 135;

/**
 * A location's coordinates as the sun model sees them (day/night targets,
 * the hour's light target, PPFD and sunset).
 *
 * The demo's device clocks and daily routines run on the viewer's local
 * time, and the cucumber house is frozen at local 13:00. For anyone on Japan
 * time this is the location itself. For a viewer elsewhere the longitude
 * moves by the gap between their time zone's meridian and Japan's, so the
 * sun stands where a Japanese viewer would see it at the same clock time
 * instead of setting the house at night. The map always shows the real
 * coordinates.
 */
export function sunCoordinates(
	coordinates: Coordinates | null | undefined,
	now: Date = new Date()
): Coordinates | null {
	if (!coordinates) return null;
	const viewerMeridian = -now.getTimezoneOffset() / 4;
	return { lat: coordinates.lat, long: coordinates.long + viewerMeridian - JST_MERIDIAN };
}
