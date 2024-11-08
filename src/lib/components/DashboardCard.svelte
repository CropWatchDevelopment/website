<script lang="ts">
	import { Button, Collapse, Icon } from 'svelte-ux';
	import { goto } from '$app/navigation';
	import { mdiArrowDown, mdiArrowRight, mdiTimerSand } from '@mdi/js';
	import { _ } from 'svelte-i18n';
	import { Tooltip } from 'svelte-ux';
	import DeviceDataList from './DeviceDataList.svelte';

	function getRandomValue(min, max) {
		return Math.random() * (max - min) + min;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let devicesLatestData = {
		devices: {
			'2CF7F1C061700092': {
				latest: {
					id: 430454,
					dev_eui: '2CF7F1C061700092',
					valid: true,
					err: 0,
					payload: 'AQEQ9koAAAECENQ0AQABBBCwdwoAyXA=',
					rssi: -89,
					snr: 10.2,
					created_at: new Date(),
					battery: null,
					interval: null,
					temperature: parseFloat(getRandomValue(18, 30).toFixed(2)),
					humidity: parseFloat(getRandomValue(50, 90).toFixed(2)),
					co2_level: getRandomInt(400, 1200),
					pressure: null
				},
				history: []
			},
			'2CF7F1C061700124': {
				latest: {
					id: 430447,
					dev_eui: '2CF7F1C061700124',
					valid: true,
					err: 0,
					payload: 'AQEQeq7//wECENIdAQCCZw==',
					rssi: -83,
					snr: 12.8,
					created_at: new Date(),
					battery: null,
					interval: null,
					temperature: parseFloat(getRandomValue(18, 30).toFixed(2)),
					humidity: parseFloat(getRandomValue(50, 90).toFixed(2)),
					co2_level: getRandomInt(400, 1200),
					pressure: null
				},
				history: []
			},
			'2CF7F1C0530000E1': {
				latest: {
					id: 430432,
					dev_eui: '2CF7F1C0530000E1',
					valid: true,
					err: 0,
					payload: 'AQEQ1F0AAAECEMw3AQABBBDQ3QYAuuE=',
					rssi: -109,
					snr: 8.8,
					created_at: new Date(),
					battery: null,
					interval: null,
					temperature: parseFloat(getRandomValue(18, 30).toFixed(2)),
					humidity: parseFloat(getRandomValue(50, 90).toFixed(2)),
					co2_level: getRandomInt(400, 1200),
					pressure: null
				},
				history: []
			}
		}
	};
	let open: boolean = false;
	// Initialize devices as an empty array if undefined
	let devices = [
		{
			dev_eui: '2CF7F1C0530000E1',
			name: 'Co² Device Room 1'
		},
		{
			dev_eui: '2CF7F1C061700124',
			name: 'Co² Device Basement'
		},
		{
			dev_eui: '2CF7F1C061700092',
			name: 'CO² Device Greenhouse'
		}
	];
</script>

<div
	class="border-[rgb(121 121 121)] mx-auto my-5 w-full md:w-1/2 rounded-2xl border-[0.1em] bg-surface-content/30"
>
	<div
		class="custom-bg rounded-4xl relative h-20 w-full bg-cover bg-bottom bg-no-repeat bg-blend-overlay"
	>
		<div class="absolute right-0 top-0 h-full w-1/2 rounded-2xl bg-gradient-to-l from-black"></div>
		<div class="absolute right-3 top-4 space-y-1 text-xs text-white drop-shadow-md">
			<p>Rainfall: 2%</p>
			<p>Humidity: 55%</p>
			<p>WindSpeed: 2 km/h</p>
		</div>
		<div class="absolute left-3 top-5">
			<p class="text-shadow flex text-3xl text-white">
				21<span class="text-xl text-neutral-content drop-shadow-md">ºC</span>
			</p>
		</div>
	</div>

	<h2
		class="primary-text my-3 flex flex-row items-center overflow-hidden text-ellipsis p-2 text-xl"
	>
		<b>Demo Location</b>
		<span class="flex flex-grow" />
		<Button variant="fill" color="primary" icon={mdiArrowRight} />
	</h2>
	<div class="flex flex-col gap-1 px-1 pb-4 text-sm">
		{#each devices as device}
			<Collapse
				{open}
				classes={{ root: 'shadow-md pr-2 bg-surface-200/50', icon: 'data-[open=true]:rotate-90' }}
			>
				<DeviceDataList
					name={device.name}
					data={devicesLatestData.devices[device.dev_eui].latest}
				/>

				<div slot="trigger" class="flex-1 border-l-8 !border-l-green-500">
					<div class="my-1 mr-2 border-r-2">
						<div class="flex flex-col text-center text-base">
							<div class="justify-left flex flex-row">
								{#if !open}<b class="ml-4 text-sm">{device.name}</b>{/if}
							</div>
						</div>
						<div class="flex flex-row justify-center text-base">
							<Tooltip title="CO²">
								<p class="m-auto">
									<span> ⌬ {devicesLatestData.devices[device.dev_eui].latest.co2_level} </span>
									<small>
										<sup>PPM</sup>
									</small>
								</p>
							</Tooltip>
							<Tooltip title="Temperature">
								<p class="m-auto">
									<span> 🌡️ {devicesLatestData.devices[device.dev_eui].latest.temperature} </span>
									<small>
										<sup>°C</sup>
									</small>
								</p>
							</Tooltip>
							<Tooltip title="Relative Humidity">
								<p class="m-auto">
									<span> 💧 {devicesLatestData.devices[device.dev_eui].latest.humidity} </span>
									<small>
										<sup>%</sup>
									</small>
								</p>
							</Tooltip>
						</div>
					</div>
				</div>
				<div class="pl-4">
					<Button
						href="/contact-us"
						variant="fill"
						color="info"
						class="mb-1 w-full"
						icon={mdiArrowRight}
					>
						Schedule a Demo
					</Button>
				</div>
			</Collapse>
		{/each}
	</div>
</div>

<style>
	.text-shadow {
		text-shadow: black 5px 5px 3px;
	}
	.custom-bg::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(https://app.cropwatch.io/_app/immutable/assets/sunny_clouds.C5nV_Ypl.png);
		background-size: cover;
		background-position: center;
		-webkit-border-radius: 15px;
		-moz-border-radius: 15px;
		border-radius: 15px;
		filter: blur(1px) grayscale(20%);
	}
</style>
