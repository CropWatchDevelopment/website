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
 */

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
	/** Full "latest data row" the expanded details panel reads, as the API would return it. */
	details: Record<string, number | boolean | string>;
}

export interface DemoLocationGroup {
	key: string;
	location: DemoLocation;
	devices: DemoRow[];
}

/** Per-column drift envelope used to keep the demo looking live. */
export interface DemoDrift {
	/** Maximum step per tick. */
	step: number;
	/** Value is clamped into this range. */
	min: number;
	max: number;
	/** Decimal places to round to. */
	precision: number;
}

export const DEMO_DRIFT: Record<string, DemoDrift> = {
	temperature_c: { step: 0.12, min: 15, max: 31, precision: 2 },
	humidity: { step: 0.4, min: 40, max: 82, precision: 1 },
	co2: { step: 9, min: 430, max: 980, precision: 0 },
	pressure: { step: 0.25, min: 1004, max: 1022, precision: 1 },
	moisture: { step: 0.3, min: 22, max: 48, precision: 1 },
	ec: { step: 0.02, min: 0.8, max: 2.1, precision: 2 },
	battery_level: { step: 0.004, min: 3.4, max: 3.65, precision: 2 }
};

const GREENHOUSE: DemoLocation = {
	location_id: 9001,
	name: 'デモ温室 A棟',
	group: 'デモ農場'
};

const FIELD: DemoLocation = {
	location_id: 9002,
	name: 'デモ露地圃場 1区',
	group: 'デモ農場'
};

/** 温湿度センサー — the two-value air sensor (temperature + humidity). */
const AIR_TYPE: DemoDeviceType = {
	id: 9101,
	name: 'CropWatch 温湿度センサー',
	data_table_v2: 'cw_air_data',
	primary_data_v2: 'temperature_c',
	secondary_data_v2: 'humidity',
	default_upload_interval: 10
};

/** CO₂センサー — CO₂ leads, temperature rides along as the secondary reading. */
const CO2_TYPE: DemoDeviceType = {
	id: 9102,
	name: 'CropWatch CO₂センサー',
	data_table_v2: 'cw_air_data',
	primary_data_v2: 'co2',
	secondary_data_v2: 'temperature_c',
	default_upload_interval: 10
};

/** 土壌センサー — the agriculture probe (soil temperature, moisture, EC, pH). */
const SOIL_TYPE: DemoDeviceType = {
	id: 9103,
	name: 'CropWatch 土壌センサー',
	data_table_v2: 'cw_soil_data',
	primary_data_v2: 'temperature_c',
	secondary_data_v2: 'moisture',
	default_upload_interval: 15
};

/**
 * Seed readings. These are plausible mid-season values for a Japanese
 * greenhouse and open field; the client nudges them on a timer so the demo
 * reads as live rather than frozen.
 */
export function createDemoGroups(): DemoLocationGroup[] {
	return [
		{
			key: 'demo-greenhouse',
			location: GREENHOUSE,
			devices: [
				{
					dev_eui: 'DEMO00000000A001',
					name: '温湿度センサー A-1',
					group: 'デモ農場',
					upload_interval: 10,
					last_data_updated_at: null,
					error_status: null,
					device_type: AIR_TYPE,
					location: GREENHOUSE,
					latest: { created_at: null, primary: 24.6, secondary: 62.4 },
					details: {
						temperature_c: 24.6,
						humidity: 62.4,
						pressure: 1012.4,
						battery_level: 3.61
					}
				},
				{
					dev_eui: 'DEMO00000000A002',
					name: 'CO₂センサー A-2',
					group: 'デモ農場',
					upload_interval: 10,
					last_data_updated_at: null,
					error_status: null,
					device_type: CO2_TYPE,
					location: GREENHOUSE,
					latest: { created_at: null, primary: 612, secondary: 25.1 },
					details: {
						co2: 612,
						temperature_c: 25.1,
						humidity: 58.7,
						pressure: 1012.1,
						battery_level: 3.58
					}
				}
			]
		},
		{
			key: 'demo-field',
			location: FIELD,
			devices: [
				{
					dev_eui: 'DEMO00000000B001',
					name: '土壌センサー B-1',
					group: 'デモ農場',
					upload_interval: 15,
					last_data_updated_at: null,
					error_status: null,
					device_type: SOIL_TYPE,
					location: FIELD,
					latest: { created_at: null, primary: 18.9, secondary: 34.2 },
					details: {
						temperature_c: 18.9,
						moisture: 34.2,
						ec: 1.24,
						// Combined-sensor air/light columns. In the app these arrive from the
						// probe's forthcoming sibling and every visualization renders empty;
						// the demo fills them so the page shows a fully reporting device.
						air_temperature: 23.5,
						air_humidity: 63,
						air_co2: 640,
						ppfd: 512
					}
				}
			]
		}
	];
}
