// Product data for CropWatch Soil Sensor (CW-SS)
const cwSSProduct = {
	name: 'CropWatch Soil Sensor',
	tagline: 'Reliable Soil Monitoring for Every Field',
	description: 'Monitor soil moisture, temperature, and nutrients with robust, long-life sensors. Perfect for precision agriculture, research, and remote deployments.',
	models: [
		{
			name: 'CW-SS-TMEPNPK',
			id: 'CW-SS-TMEPNPK',
			description: 'Measures temperature, moisture, EC, pH, and NPK. Ideal for advanced soil analysis.'
		}
	],
	standoutFeatures: [
		'Long battery life for multi-year deployments',
		'Robust LoRaWAN and RS485 connectivity',
		'IP67 enclosure and conformal coated PCB',
		'Accurate, research-grade measurements',
		'Easy installation and maintenance',
		'Cloud-connected for real-time insights'
	],
	specifications: [
		{
			category: 'Environmental',
			specs: [
				{ name: 'Temperature Range', value: '-20°C to +70°C' },
				{ name: 'Moisture Range', value: '0% to 100% VWC' },
				{ name: 'pH Range', value: '3.5 to 9.0' },
				{ name: 'NPK Range', value: '0-1999 mg/kg' },
				{ name: 'Ingress Protection', value: 'IP67' }
			]
		},
		{
			category: 'Power',
			specs: [
				{ name: 'Battery Life', value: 'Up to 5 years' },
				{ name: 'Battery Type', value: 'D-cell Li-SOCL2' }
			]
		}
	],
	applications: [
		{
			name: 'Agriculture',
			examples: [
				'Row crops',
				'Orchards & Vineyards',
				'Greenhouses',
				'Precision irrigation'
			]
		},
		{
			name: 'Research',
			examples: [
				'Soil science',
				'Environmental monitoring',
				'Field trials'
			]
		}
	]
};

export default cwSSProduct;
