<script lang="ts">
	import { Button, Card, Header, Avatar, Icon, Shine, Tilt } from 'svelte-ux';
	import Slides from '$lib/deck/Slides.svelte';
	import {
		mdiBarn,
		mdiBox,
		mdiFire,
		mdiInformation,
		mdiMeterElectric,
		mdiPackage,
		mdiSnowflake,
		mdiWatch
	} from '@mdi/js';
	import SaitoCityFlagImage from '$lib/images/SaitoCity.png';
	import NishimeraCityFlagImage from '$lib/images/NishimeraCity.jpg';
	import CropWatchAtGreenhouseImage from '$lib/images/CropWatch-installed-greenhouse.jpg';
	import TroubleShootingImage from '$lib/images/troubleShooting.jpg';
	import SmokeDetectorImage from '$lib/images/smoke-detector.png';
	import SmartWatchImage from '$lib/images/lorawatch.webp';
	import ColdChainSensorImage from '$lib/images/CropWatch TH Sensor.png';
	import SeeedTrackerImage from '$lib/images/seeedT1000.webp';
	import WaterMeterImage from '$lib/images/waterMeter.jpg';
	import MiyazakiFlagImage from '$lib/images/Flag_of_Miyazaki_Prefecture.png';
	import Stats from '$lib/components/stats/Stats.svelte';
	import { t } from '$lib/translations';
</script>

<main class="flex flex-col overflow-visible">
	<div class="w-full">
		<Slides />
	</div>
	<div class="grid w-full">
		<div class="bg-slate-300 p-16">
			<h1 class="text-2xl text-center font-extrabold mb-4">
				{$t('home.main_content.title')}
			</h1>
			<div class="grid grid-flow-row grid-cols-5 gap-3">
				<a href="http://www.city.saito.miyazaki.jp/" class="mx-auto flex flex-col">
					<Shine>
						<div class="flex items-center justify-center content-center gap-6">
							<Tilt class="hover:scale-110 transition duration-500">
								<img class="transition ease-out" src={SaitoCityFlagImage} alt="Saito City" />
							</Tilt>
						</div>
					</Shine>
					<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">Saito City</p>
				</a>

				<a href="https://www.nishimera.jp/" class="mx-auto flex flex-col">
					<Shine>
						<div class="flex items-center justify-center content-center gap-6">
							<Tilt class="hover:scale-110 transition duration-500">
								<img class="mx-auto" src={NishimeraCityFlagImage} alt="Nishimera City" />
							</Tilt>
						</div>
					</Shine>
					<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">Nishimera City</p>
				</a>

				<a href="https://www.nishimera.jp/" class="mx-auto flex flex-col">
					<Shine>
						<div class="flex items-center justify-center content-center gap-6">
							<Tilt class="hover:scale-110 transition duration-500">
								<img class="mx-auto" src={MiyazakiFlagImage} alt="Miyazaki Perfecture" />
							</Tilt>
						</div>
					</Shine>
					<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">Miyazaki Perfecture</p>
				</a>

				<a href="#">
					<img src="" alt="Saito City" />
				</a>

				<a href="#">
					<img src="" alt="Saito City" />
				</a>
			</div>
		</div>
		<div class="md:mx-8 lg:mx-40">
			<h1 class="font-extrabold from-neutral-700 text-6xl ml-0 lg:ml-8 my-20">
				{$t('home.section1.title')}
			</h1>
			<div class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<h2 class="font-bold">{$t('home.section2SubHeader')}</h2>
					<p class="text-slate-700 text-xl leading-1 my-4">
						{$t('home.section2Text')}
					</p>

					<div class="grid grid-cols-2 grid-rows-2 text-center gap-4 mt-6 mb-4 text-xl">
						<div class="p-4 bg-blue-200 rounded-lg">
							<p class="text-gray-700 font-bold"><u>-18°C</u></p>
							<b class="text-success font-extrabold">OK!</b>
						</div>

						<div class="p-4 bg-blue-200 rounded-lg">
							<p class="text-gray-700 font-bold"><u>10+ Year Battery Life</u></p>
							<b class="text-success font-extrabold">No Problem!</b>
						</div>

						<div class="p-4 bg-blue-200 rounded-lg">
							<p class="text-gray-700 font-bold"><u>30km Range</u></p>
							<b class="text-success font-extrabold">We have done it!</b>
						</div>

						<div class="p-4 bg-blue-200 rounded-lg">
							<p class="text-gray-700 font-bold"><u>Better price?</u></p>
							<b class="text-success font-extrabold">Of course!</b>
						</div>
					</div>

					<Stats />

					<Button variant="fill-light" color="success" size="lg" icon={mdiInformation}
						>Real-Time / Real Data Demo, Click HERE!</Button
					>
				</div>
				<img
					src={CropWatchAtGreenhouseImage}
					class="rounded-xl m-4 elevation-20"
					alt="CropWatch Install On Greenhouse"
				/>
			</div>
		</div>
	</div>
	<div
		class="mt-20"
		style="background: rgb(2,0,36); background: linear-gradient(131deg, rgba(2,0,36,1) 0%, rgba(65,65,175,1) 65%, rgba(0,35,42,1) 100%);"
	>
		<div class="grid grid-flow-row grid-cols-1 md:grid-cols-2 px-8 py-16 gap-10 md:gap-40">
			<img
				src={TroubleShootingImage}
				class="w-full rounded-lg elevation-20"
				alt="We are here for your questions"
			/>
			<div>
				<h2 class="text-5xl text-white mb-8">We will be here to help.</h2>
				<p class="text-xl text-white">
					It is way too easy to make mistakes with technology, we know this and understand. We are
					not a company that is going to sell you a product and walk away, we will assist you with
					installation, setup, useage and beyond.
				</p>
			</div>
		</div>
	</div>

	<div class="p-8 lg:p-16">
		<h1 class="font-extrabold from-neutral-700 text-center text-6xl ml-0 lg:ml-8 mt-20 mb-5 p-2">
			Solutions for the <u>Real-World</u>
		</h1>
		<h2 class="text-xl text-slate-700">
			Give yourself the tools <b>YOU</b> need to work smarter with CropWatch's Inovative IoT
			devices. Our offerings include devices that no one else makes. We have talked to you, we
			listened.<br />
			We offer devices you want because they are what people just like you have been asking for.
		</h2>

		<div class="grid grid-flow-row grid-cols-3 gap-5 pt-4 md:px-20 xl:px-64">
			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header title="Smart Farming" subheading="Increase output and decrease work" slot="header">
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiBarn} />
						</Avatar>
					</div>
				</Header>
				<img src="" slot="contents" alt="" />
			</Card>

			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title="Smart Water Metering"
					subheading="Report water useage faster and more accuratly"
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiMeterElectric} />
						</Avatar>
					</div>
				</Header>
				<img src={WaterMeterImage} slot="contents" alt="" />
			</Card>

			<Card class="flex elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title="Cold Chain"
					subheading="Protect people by monitoring food safety"
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiSnowflake} />
						</Avatar>
					</div>
				</Header>
				<div slot="contents" class="flex h-full">
					<img
						src={ColdChainSensorImage}
						alt=""
						class="flex mx-auto self-center"
						style="max-height: 220px;"
					/>
				</div>
			</Card>

			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title="Asset Tracking"
					subheading="Know where your assets are and predict problems with delivery"
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiPackage} />
						</Avatar>
					</div>
				</Header>
				<div slot="contents" class="flex h-full">
					<img src={SeeedTrackerImage} alt="" class="flex mx-auto self-center" style="max-height: 220px;" />
				</div>
					
			</Card>

			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title="Smart Fire Detection"
					subheading="Protect your city by responding to fire faster"
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiFire} />
						</Avatar>
					</div>
				</Header>
				<img src={SmokeDetectorImage} slot="contents" alt="" />
			</Card>

			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title="Worker Safety"
					subheading="Protect Employees with safety insights"
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiWatch} />
						</Avatar>
					</div>
				</Header>
				<img src={SmartWatchImage} slot="contents" alt="" />
			</Card>
		</div>
	</div>

	<div class="flex mb-8 bg-teal-500 flex-col align-middle p-4">
		<h1 class="font-extrabold from-neutral-700 text-center text-6xl ml-0 lg:ml-8 mt-20 mb-5 p-2">
			Are you ready to get started? We already are!
		</h1>
		<div class="mx-auto">
			<Button variant="fill-light" size="lg" color="danger">Contact Us and join the network today!</Button>
		</div>
	</div>
</main>
