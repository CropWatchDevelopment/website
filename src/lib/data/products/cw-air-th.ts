// Product data for CropWatch Air Temperature & Humidity Sensor (CW-AIR-TH)
const cwAirThProduct = {
	name: 'CropWatch Air Temperature & Humidity Sensor',
	tagline: 'Reliable Air Monitoring for Cold Storage & Agriculture',
	description: 'Monitor air temperature and humidity with robust, long-life sensors. Ideal for cold storage, greenhouses, and challenging environments where other sensors fail.',
	models: [
		{
			name: 'CW-AIR-TH',
			id: 'CW-AIR-TH',
			description: 'Measures air temperature and humidity. Designed for harsh and cold environments.'
		}
	],
	standoutFeatures: [
		'Up to 10 years of battery life',
		'External, replaceable sensor for easy maintenance',
		'IP67 enclosure and conformal coated PCB',
		'Accurate, reliable readings in cold and high-density storage',
		'LoRaWAN connectivity for long-range data transmission',
		'Cloud-connected for real-time monitoring and alerts'
	],
	specifications: [
		{
			category: 'Environmental',
			specs: [
				{ name: 'Temperature Range', value: '-40°C to +85°C' },
				{ name: 'Humidity Range', value: '0% to 100% RH' },
				{ name: 'Accuracy', value: '±0.3°C, ±2% RH' },
				{ name: 'Ingress Protection', value: 'IP67' }
			]
		},
		{
			category: 'Power',
			specs: [
				{ name: 'Battery Life', value: 'Up to 10 years' },
				{ name: 'Battery Type', value: 'D-cell Li-SOCL2' }
			]
		}
	],
	applications: [
		{
			name: 'Cold Storage',
			examples: [
				'Refrigerated warehouses',
				'Walk-in coolers & freezers',
				'Food logistics',
				'Pharmaceutical storage'
			]
		},
		{
			name: 'Agriculture',
			examples: [
				'Greenhouses',
				'Produce storage',
				'Livestock barns',
				'Crop monitoring',
				'Nurseries'
			]
		}
	]
};

export default cwAirThProduct;
export {};
