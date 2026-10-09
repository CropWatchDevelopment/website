// Published USD prices shared by /pricing, the per-sector price boxes on
// /cold-chain, /livestock and /agriculture, and their Product JSON-LD.
// Edit here and every visible price and every Offer stays in sync.

export type SectorId = 'cold-chain' | 'livestock' | 'agriculture';

export type SectorPricing = {
	/** Model number (Product.sku). */
	sku: string;
	/** Display name of the sector's recommended sensor. */
	label: string;
	/** One-time hardware price per sensor, USD. */
	unitPrice: number;
	/** Monthly fee per sensor, USD. */
	monthlyPerSensor: number;
	/** Monthly fee per account regardless of location count, USD. */
	baseFee: number;
};

export const SECTOR_PRICING: Record<SectorId, SectorPricing> = {
	// Temp/humidity sensor: ¥33,000 on cropwatch.co.jp/pricing at ~163 JPY/USD (Jul 2026), rounded up.
	'cold-chain': {
		sku: 'CW-AIR-TH',
		label: 'Temperature & Humidity Sensor',
		unitPrice: 250,
		monthlyPerSensor: 7,
		baseFee: 0
	},
	// Temp/humidity + CO2 combo sensor: ¥39,000 on cropwatch.co.jp/pricing at ~163 JPY/USD (Jul 2026), rounded up.
	livestock: {
		sku: 'CW-AIR-THC',
		label: 'Temperature, Humidity & CO₂ Sensor',
		unitPrice: 240,
		monthlyPerSensor: 8,
		baseFee: 50
	},
	// Same CO2 combo sensor and plan as livestock (matches cropwatch.co.jp).
	agriculture: {
		sku: 'CW-AIR-THC',
		label: 'Temperature, Humidity & CO₂ Sensor',
		unitPrice: 240,
		monthlyPerSensor: 8,
		baseFee: 50
	}
};

/** Cheapest gateway option on /pricing (one per location), USD one-time. */
export const GATEWAY_FROM_PRICE = 300;
