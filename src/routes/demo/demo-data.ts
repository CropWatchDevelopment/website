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
 * The cucumber-house probe is the one deliberate exception: it reports the
 * combined soil + air + light set (soil temperature, moisture, EC, pH, plus
 * air CO₂, air temperature, air humidity and PPFD) so the soil page shows its
 * air-quality, VPD, PPFD and DLI panels populated. In the app those panels
 * wait for the combined sensor; shipping soil probes send only the soil
 * columns.
 */

/**
 * Which real-world installation a demo device stands in for. demo-history.ts
 * shapes each device's curves from the matching profile (a fridge cycles its
 * compressor and spikes on door openings; a barn warms through the afternoon).
 */
export type DemoProfile = 'fridge' | 'freezer' | 'barn' | 'outdoor' | 'cucumber';

export interface DemoDeviceType {
	id: number;
	name: string;
	data_table_v2: string;
	primary_data_v2: string;
	secondary_data_v2: string;
	default_upload_interval: number | null;
}

export interface DemoLocation {
	location_id: number;
	name: string;
	group: string | null;
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

const FOOD_CENTER: DemoLocation = {
	location_id: 9001,
	name: 'デモ食品センター',
	group: 'デモ株式会社'
};

const BARN: DemoLocation = {
	location_id: 9002,
	name: 'デモ鶏舎 1号棟',
	group: 'デモ株式会社'
};

const CUCUMBER_HOUSE: DemoLocation = {
	location_id: 9003,
	name: 'デモきゅうりハウス',
	group: 'デモ株式会社'
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

/**
 * Seed readings, typical of the real fleet: fridges sit near 4 °C at ~85 %RH,
 * freezers near -19 °C, barns around 25 °C / 90 %RH with CO₂ in the 600s.
 *
 * The barn is laid out like the most common real poultry install: three CO₂
 * sensors along the house (inlet, middle, exhaust end) plus one
 * temperature/humidity sensor outside as the reference.
 */
export function createDemoGroups(): DemoLocationGroup[] {
	return [
		{
			key: 'demo-food-center',
			location: FOOD_CENTER,
			devices: [
				{
					dev_eui: 'DEMO00000000A001',
					name: '冷蔵庫 1',
					group: 'デモ株式会社',
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
					name: '冷凍庫 1',
					group: 'デモ株式会社',
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
					name: '鶏舎 前方（入気側）',
					group: 'デモ株式会社',
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
					name: '鶏舎 中央',
					group: 'デモ株式会社',
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
					name: '鶏舎 後方（排気側）',
					group: 'デモ株式会社',
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
					name: '外気',
					group: 'デモ株式会社',
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
					name: 'きゅうり 1号ハウス',
					group: 'デモ株式会社',
					upload_interval: UPLOAD_INTERVAL_MIN,
					last_data_updated_at: null,
					error_status: null,
					device_type: SOIL_TYPE,
					location: CUCUMBER_HOUSE,
					profile: 'cucumber',
					clockHour: 13,
					latest: { created_at: null, primary: 21.3, secondary: 34.6 },
					details: {
						temperature_c: 21.3,
						moisture: 34.6,
						ec: 1.02,
						ph: 6.3,
						co2: 418,
						air_temperature_c: 27.6,
						air_humidity: 69.5,
						ppfd: 862
					}
				}
			]
		}
	];
}
