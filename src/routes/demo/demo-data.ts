/**
 * Fabricated dashboard payload for the /demo route.
 *
 * Everything here is invented. There are no real dev EUIs, customer names,
 * site names, gateway IDs or account identifiers anywhere in this file, and the
 * demo never talks to the CropWatch API — the whole point of /demo is to show a
 * prospect the product without exposing a live tenant. Keep it that way: if you
 * add a device, invent its identifiers too.
 *
 * The shapes mirror CropWatch/src/lib/api/api.dtos.ts (DashboardLocationGroup /
 * DashboardRow / DashboardDeviceType) so the card view here is a straight port
 * of the real DashboardCards component rather than a lookalike.
 *
 * The cold-chain and barn devices carry exactly the columns their real hardware
 * fills in (checked against live cw_air_data in 2026-10): temperature +
 * humidity (+ CO₂ on the CO₂ model) and nothing else — no pressure, no
 * battery. Every device uploads every 10 minutes like the real fleet.
 *
 * The cucumber-house probe is the soil board with air and light sensors: it
 * reports soil temperature, moisture and EC plus air CO₂, air temperature, air
 * humidity and PPFD, so the soil page shows its above/below-ground panel, VPD,
 * PPFD and DLI populated. No pH: the boards CropWatch ships do not measure it.
 * Like a real soil sensor with a crop set in device settings, it carries the
 * cucumber targets (demo-crops.ts), which drive the targets card, the target
 * bands and the hour's light target.
 */

import type { CropTypeDetailDto } from './agronomy/crop-targets';
import type { Coordinates } from './agronomy/solar';
import { DEMO_CUCUMBER } from './demo-crops';

/**
 * Which real-world installation a demo device stands in for. demo-history.ts
 * shapes each device's curves from the matching profile (a fridge cycles its
 * compressor and spikes on door openings; a barn warms through the afternoon;
 * a broiler house holds the setpoint for its flock's age).
 */
export type DemoProfile = 'fridge' | 'freezer' | 'barn' | 'outdoor' | 'cucumber' | 'broiler';

export interface DemoDeviceType {
	id: number;
	name: string;
	data_table_v2: string;
	primary_data_v2: string;
	secondary_data_v2: string;
	default_upload_interval: number | null;
}

/**
 * The location row the app's location page reads (LocationDto). The
 * coordinates are a round-number spot in open farmland in Ibaraki, picked
 * from the aerial photos for having nothing identifiable at the pin. They
 * match no customer site. The sun model reads them through sunCoordinates().
 */
export interface DemoLocation {
	location_id: number;
	name: string;
	group: string | null;
	coordinates?: Coordinates;
	/** Map zoom saved with the location (the app's map_zoom). */
	map_zoom?: number;
	description?: string;
	created_at: string;
}

export interface DemoLatest {
	created_at: string | null;
	primary: number | string | boolean | null;
	secondary: number | string | boolean | null;
}

export interface DemoRow {
	dev_eui: string;
	name: string;
	group: string | null;
	upload_interval: number | null;
	last_data_updated_at: string | null;
	error_status: string | null;
	device_type: DemoDeviceType;
	location: DemoLocation | null;
	latest: DemoLatest | null;
	profile: DemoProfile;
	/**
	 * Where a `barn` sensor hangs along the house: -1 at the air inlet, 0 in the
	 * middle, +1 at the exhaust fans. Sets how far its CO₂ and temperature sit
	 * from the house average.
	 */
	barnPosition?: number;
	/**
	 * Freeze the device's clock at this local hour: its latest upload is the
	 * most recent HH:00, and its history ends there. Used to show the cucumber
	 * house at 13:00, when light, temperature and VPD are at their daily peak.
	 */
	clockHour?: number;
	/** The crop set on a soil sensor in device settings. */
	crop?: CropTypeDetailDto;
	/**
	 * A `broiler` house's climate: the temperature and humidity it holds for
	 * the flock's age (young birds are kept warmer).
	 */
	setpoint?: { temperature: number; humidity: number };
	/**
	 * The device went quiet this many minutes ago: no uploads after that, so
	 * the dashboard and location page show it offline. Shows the location
	 * page's "needs attention" list with something in it.
	 */
	silentForMinutes?: number;
	/** Strongest gateway's view of the device (the app's gateway_signals). */
	signal: { rssi: number; snr: number };
	/** Where the device is installed, for its pin on the location map. */
	lat?: number;
	long?: number;
	/**
	 * Full "latest data row" the expanded details panel reads, as the API would
	 * return it. The values are only the server-rendered seed; on the client the
	 * dashboard replaces them with the generated reading for "now" from
	 * demo-history.ts, so the cards always agree with the device pages.
	 */
	details: Record<string, number | boolean | string>;
}

export interface DemoLocationGroup {
	key: string;
	location: DemoLocation;
	devices: DemoRow[];
}

/** Every real device in the fleet reports on a 10-minute cadence. */
const UPLOAD_INTERVAL_MIN = 10;

const DEMO_GROUP = 'デモ株式会社';

const FOOD_CENTER: DemoLocation = {
	location_id: 9001,
	name: 'デモ食品センター',
	group: DEMO_GROUP,
	coordinates: { lat: 36.2088, long: 140.4215 },
	map_zoom: 16,
	description: '冷蔵庫・冷凍庫の温度管理（デモ）',
	created_at: '2026-04-08T01:00:00.000Z'
};

const BARN: DemoLocation = {
	location_id: 9002,
	name: 'デモ鶏舎 1号棟',
	group: DEMO_GROUP,
	coordinates: { lat: 36.208, long: 140.4295 },
	map_zoom: 17,
	description: '鶏舎内の CO₂ 分布（入気側・中央・排気側）と外気（デモ）',
	created_at: '2026-05-20T01:00:00.000Z'
};

const CUCUMBER_HOUSE: DemoLocation = {
	location_id: 9003,
	name: 'デモきゅうりハウス',
	group: DEMO_GROUP,
	coordinates: { lat: 36.2049, long: 140.4447 },
	map_zoom: 17,
	description: '土壌・環境センサーによる施設きゅうりの栽培管理（デモ）',
	created_at: '2026-06-02T01:00:00.000Z'
};

const BROILER_FARM: DemoLocation = {
	location_id: 9004,
	name: 'デモ養鶏場',
	group: DEMO_GROUP,
	coordinates: { lat: 36.2096, long: 140.4262 },
	map_zoom: 17,
	description: 'ブロイラー鶏舎 10 棟の温湿度管理（デモ）',
	created_at: '2026-09-14T01:00:00.000Z'
};

/** 温湿度センサー (CW-air-thvd): temperature + humidity, nothing else. */
const AIR_TYPE: DemoDeviceType = {
	id: 9101,
	name: 'CropWatch 温湿度センサー',
	data_table_v2: 'cw_air_data',
	primary_data_v2: 'temperature_c',
	secondary_data_v2: 'humidity',
	default_upload_interval: 15
};

/** CO₂センサー: CO₂ leads, temperature is the secondary; humidity in details. */
const CO2_TYPE: DemoDeviceType = {
	id: 9102,
	name: 'CropWatch CO₂センサー',
	data_table_v2: 'cw_air_data',
	primary_data_v2: 'co2',
	secondary_data_v2: 'temperature_c',
	default_upload_interval: 15
};

/** 土壌センサー (combined soil + air + light set, see the header note). */
const SOIL_TYPE: DemoDeviceType = {
	id: 9103,
	name: 'CropWatch 土壌・環境センサー',
	data_table_v2: 'cw_soil_data',
	primary_data_v2: 'temperature_c',
	secondary_data_v2: 'moisture',
	default_upload_interval: 35
};

/** The ten houses of the demo broiler farm, west to east. */
const BROILER_HOUSES: {
	setpoint: { temperature: number; humidity: number };
	co2?: boolean;
	signal: { rssi: number; snr: number };
	silentForMinutes?: number;
}[] = [
	{ setpoint: { temperature: 21.4, humidity: 66 }, signal: { rssi: -92, snr: 8.5 } },
	{ setpoint: { temperature: 20.6, humidity: 71 }, signal: { rssi: -97, snr: 7 } },
	{ setpoint: { temperature: 22.8, humidity: 64 }, co2: true, signal: { rssi: -103, snr: 5.5 } },
	{ setpoint: { temperature: 20.2, humidity: 73 }, signal: { rssi: -106, snr: 3 } },
	// The youngest flock, kept warmest.
	{ setpoint: { temperature: 24.6, humidity: 62 }, signal: { rssi: -99, snr: 6.5 } },
	{ setpoint: { temperature: 21, humidity: 69 }, signal: { rssi: -109, snr: -2.5 } },
	// Far end of the farm on a weak link, and silent for the last few hours.
	{
		setpoint: { temperature: 20.4, humidity: 74 },
		signal: { rssi: -119, snr: -11.5 },
		silentForMinutes: 160
	},
	{ setpoint: { temperature: 23.1, humidity: 65 }, co2: true, signal: { rssi: -112, snr: -4 } },
	{ setpoint: { temperature: 21.8, humidity: 68 }, signal: { rssi: -101, snr: 4 } },
	{ setpoint: { temperature: 20.8, humidity: 76 }, signal: { rssi: -95, snr: 7.5 } }
];

/** Spacing of the house pins on the map (degrees of longitude, ~25 m). */
const HOUSE_SPACING = 0.00028;

function broilerHouses(): DemoRow[] {
	const center = BROILER_FARM.coordinates!;
	return BROILER_HOUSES.map((house, i) => {
		const n = i + 1;
		const { temperature, humidity } = house.setpoint;
		const co2 = 1400 + n * 40;
		return {
			dev_eui: `DEMO00000000D${String(n).padStart(3, '0')}`,
			name: `${n}号鶏舎`,
			group: DEMO_GROUP,
			upload_interval: UPLOAD_INTERVAL_MIN,
			last_data_updated_at: null,
			error_status: null,
			device_type: house.co2 ? CO2_TYPE : AIR_TYPE,
			location: BROILER_FARM,
			profile: 'broiler' as const,
			setpoint: house.setpoint,
			silentForMinutes: house.silentForMinutes,
			signal: house.signal,
			lat: center.lat,
			long: center.long + (i - 4.5) * HOUSE_SPACING,
			latest: house.co2
				? { created_at: null, primary: co2, secondary: temperature }
				: { created_at: null, primary: temperature, secondary: humidity },
			details: {
				...(house.co2 ? { co2 } : {}),
				temperature_c: temperature,
				humidity
			}
		};
	});
}

/**
 * Seed readings, typical of the real fleet: fridges sit near 4 °C at ~85 %RH,
 * freezers near -19 °C, barns around 25 °C / 90 %RH with CO₂ in the 600s.
 *
 * The barn is laid out like the most common real poultry install: three CO₂
 * sensors along the house (inlet, middle, exhaust end) plus one
 * temperature/humidity sensor outside as the reference. The broiler farm is
 * the other common install: one sensor per house, ten houses.
 *
 * Signals are typical LoRaWAN links on a farm: most strong, a few fair, the
 * freezer a little weaker through its walls.
 */
export function createDemoGroups(): DemoLocationGroup[] {
	return [
		{
			key: 'demo-food-center',
			location: FOOD_CENTER,
			devices: [
				{
					dev_eui: 'DEMO00000000A001',
					signal: { rssi: -88, snr: 9 },
					name: '冷蔵庫 1',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: AIR_TYPE,
					location: FOOD_CENTER,
					profile: 'fridge',
					latest: { created_at: null, primary: 3.7, secondary: 85.2 },
					details: { temperature_c: 3.7, humidity: 85.2 }
				},
				{
					dev_eui: 'DEMO00000000A002',
					signal: { rssi: -107, snr: 1.5 },
					name: '冷凍庫 1',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: AIR_TYPE,
					location: FOOD_CENTER,
					profile: 'freezer',
					latest: { created_at: null, primary: -19.2, secondary: 80.4 },
					details: { temperature_c: -19.2, humidity: 80.4 }
				}
			]
		},
		{
			key: 'demo-barn',
			location: BARN,
			devices: [
				{
					dev_eui: 'DEMO00000000B002',
					signal: { rssi: -96, snr: 6 },
					name: '鶏舎 前方（入気側）',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: CO2_TYPE,
					location: BARN,
					profile: 'barn',
					barnPosition: -0.9,
					latest: { created_at: null, primary: 542, secondary: 24.8 },
					details: { co2: 542, temperature_c: 24.8, humidity: 88.7 }
				},
				{
					dev_eui: 'DEMO00000000B001',
					signal: { rssi: -100, snr: 5 },
					name: '鶏舎 中央',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: CO2_TYPE,
					location: BARN,
					profile: 'barn',
					barnPosition: 0.1,
					latest: { created_at: null, primary: 684, secondary: 25.4 },
					details: { co2: 684, temperature_c: 25.4, humidity: 90.1 }
				},
				{
					dev_eui: 'DEMO00000000B003',
					signal: { rssi: -104, snr: 2.5 },
					name: '鶏舎 後方（排気側）',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: CO2_TYPE,
					location: BARN,
					profile: 'barn',
					barnPosition: 1,
					latest: { created_at: null, primary: 871, secondary: 26.1 },
					details: { co2: 871, temperature_c: 26.1, humidity: 91.6 }
				},
				{
					dev_eui: 'DEMO00000000B004',
					signal: { rssi: -84, snr: 10 },
					name: '外気',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: AIR_TYPE,
					location: BARN,
					profile: 'outdoor',
					latest: { created_at: null, primary: 23.6, secondary: 93.2 },
					details: { temperature_c: 23.6, humidity: 93.2 }
				}
			]
		},
		{
			key: 'demo-cucumber',
			location: CUCUMBER_HOUSE,
			devices: [
				{
					dev_eui: 'DEMO00000000C001',
					signal: { rssi: -98, snr: 7 },
					name: 'きゅうり 1号ハウス',
					group: DEMO_GROUP,
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: SOIL_TYPE,
					location: CUCUMBER_HOUSE,
					profile: 'cucumber',
					clockHour: 13,
					crop: DEMO_CUCUMBER,
					latest: { created_at: null, primary: 21.6, secondary: 30.1 },
					details: {
						temperature_c: 21.6,
						moisture: 30.1,
						ec: 0.45,
						co2: 505,
						air_temperature_c: 26.4,
						air_humidity: 74.8,
						ppfd: 820
					}
				}
			]
		},
		{
			key: 'demo-broiler-farm',
			location: BROILER_FARM,
			devices: broilerHouses()
		}
	];
}

/** A location group by its location_id, or null. */
export function findDemoGroup(locationId: number): DemoLocationGroup | null {
	return createDemoGroups().find((group) => group.location.location_id === locationId) ?? null;
}
