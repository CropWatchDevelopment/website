// Captions and chapters for the V25 animation. Kept apart from scene.ts so the component can
// render them without pulling three.js into the page bundle.

export const DURATION = 79;

/** captions, one per step */
export const STEPS: { t: number; title: string; note: string }[] = [
	{ t: 0, title: 'V25 enclosure', note: 'Two covers, 8 captive screws' },
	{ t: 2.0, title: 'Sensor cover off', note: '3 captive screws loosen and stay in the cover' },
	{ t: 8.0, title: 'Unplug the sensor', note: 'The QWIIC cable stays in the case' },
	{ t: 11.0, title: 'Lift out the sensor', note: '' },
	{ t: 14.0, title: 'Main cover off', note: '5 captive screws stay in the cover' },
	{ t: 19.6, title: 'Potted main board', note: 'Gloss black epoxy covers every part on the board' },
	{ t: 21.0, title: 'A look under the epoxy', note: 'Hidden for this view only' },
	{ t: 22.0, title: 'Inside the V25', note: 'Main board, LoRaWAN radio, 2 x AA cells' },
	{
		t: 26.0,
		title: 'Pouring the epoxy back in',
		note: 'Potting seals the main board against moisture and condensation'
	},
	{
		t: 28.0,
		title: 'Under the board, then over it',
		note: 'The level rises until every part is covered'
	},
	{
		t: 30.2,
		title: 'It stops below the cable passage',
		note: 'The I2C connectors stay clear for their cables'
	},
	{ t: 32.5, title: 'Take out the old AA cells', note: '' },
	{ t: 36.0, title: 'Insert new AA cells', note: '' },
	{ t: 39.2, title: 'Power on', note: 'The status LED flashes once to indicate everything worked' },
	{ t: 40.8, title: 'Put the main cover on first', note: '5 captive screws' },
	{ t: 45.4, title: 'Reinstall the sensor', note: 'Plug the QWIIC cable back in' },
	{ t: 49.4, title: 'Re install the sensor cover', note: '3 captive screws' },
	{ t: 54.0, title: 'Walk-in cooler', note: '4 magnets hold it to the wall' },
	{ t: 66.0, title: 'Pole mount', note: 'Plastic bracket on the back, band clamp round the pole' }
];

/** the chapter bar under the stage */
export const CHAPTERS: { t: number; label: string }[] = [
	{ t: 0, label: 'Sensor cover' },
	{ t: 8.0, label: 'Sensor' },
	{ t: 14.0, label: 'Main cover' },
	{ t: 19.6, label: 'Main board' },
	{ t: 32.5, label: 'Batteries' },
	{ t: 40.8, label: 'Close up' },
	{ t: 54.0, label: 'Cooler wall' },
	{ t: 66.0, label: 'Pole' }
];
