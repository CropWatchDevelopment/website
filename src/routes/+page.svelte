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
	import CropWatchWaterMeterImage from '$lib/images/CropWatch_WaterMeter.png';
	import AxisCameraImage from '$lib/images/axis-camera.jpg';
	import WaterMeterImage from '$lib/images/waterMeter.jpg';
	import MiyazakiFlagImage from '$lib/images/Flag_of_Miyazaki_Prefecture.png';
	import { _ } from 'svelte-i18n';
</script>

<main class="flex flex-col overflow-visible">
	<div class="w-full">
		<Slides />
	</div>
	<div class="grid w-full">
		<div class="bg-slate-300 p-16">
			<h1 class="text-2xl text-center font-extrabold mb-4">
				{$_('mainTitle')}
			</h1>
			<div class="grid grid-flow-row grid-cols-3 gap-3">
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
								<img class="mx-auto" src={MiyazakiFlagImage} alt="Miyazaki Perfecture" />
							</Tilt>
						</div>
					</Shine>
					<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">Miyazaki Perfecture</p>
				</a>
			</div>
		</div>
		<div class="md:mx-8 lg:mx-40">
			<h1 class="font-extrabold text-gray-700 text-6xl ml-0 my-20 whitespace-nowrap">
				{$_('home.section1.title')}
			</h1>
			
			<div class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<!-- <h2 class="font-semibold text-2xl text-gray-800 mb-4">{$_('home.section1.subheader')}</h2> -->
					<p class="text-slate-700 text-lg leading-7 mb-6 first-line:pl-4">
						{$_('home.section1.text')}
					</p>

					<p class="text-slate-700 text-lg leading-7 mb-6 first-line:pl-4">
						{$_('home.section1.text2')}
					</p>

					<!-- Stats component here, if you decide to include it -->

					<button
						class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-lg transition duration-150 ease-in-out flex items-center justify-center space-x-2"
					>
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m2-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path></svg
						>

						<span>{$_('home.section1.demo')}</span>
					</button>
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
				<h2 class="text-5xl text-white mb-8">{$_('home.section2.title')}</h2>
				<p class="text-xl text-white">
					{$_('home.section2.text1')}
				</p>

				<p class="text-xl text-white pt-2">
					{$_('home.section2.text2')}
				</p>

				<p class="text-xl text-white">
					{$_('home.section2.text3')}
				</p>
			</div>
		</div>
	</div>

	<div class="p-8 lg:p-16">
		<h1 class="font-extrabold from-neutral-700 text-center text-6xl ml-0 lg:ml-8 mt-20 mb-5 p-2">
			{$_('home.section3.title')}
		</h1>
		<h2 class="text-xl text-slate-700">
			{$_('home.section3.text')}
		</h2>

		<div class="grid grid-flow-row grid-cols-3 gap-5 pt-4 md:px-20 xl:px-64">
			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title={$_('home.agriWatchTitle')}
					subheading={$_('home.agriWatchSubtitle')}
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiBarn} />
						</Avatar>
					</div>
				</Header>
				<div slot="contents" class="flex h-full">
					<img
						src={CropWatchWaterMeterImage}
						alt=""
						class="flex mx-auto self-center"
						style="max-height: 220px;"
					/>
				</div>
			</Card>

			<Card class="flex elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title={$_('home.tempWatchTitle')}
					subheading={$_('home.tempWatchSubtitle')}
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
					title={$_('home.wellWatchTitle')}
					subheading={$_('home.wellWatchSubtitle')}
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

			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
					title={$_('home.smartCityTitle')}
					subheading={$_('home.smokeDetectorTitle')}
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
				title={$_('home.smartCityTitle')}
					subheading={$_('home.edgeAICameraTitle')}
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiMeterElectric} />
						</Avatar>
					</div>
				</Header>
				<img src={AxisCameraImage} class="w-8/12 mx-auto mt-14" slot="contents" alt="" />
			</Card>


			<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
				<Header
				title={$_('home.smartCityTitle')}
					subheading={$_('home.assetTrackingTitle')}
					slot="header"
				>
					<div slot="avatar">
						<Avatar class="bg-primary text-primary-content font-bold">
							<Icon data={mdiPackage} />
						</Avatar>
					</div>
				</Header>
				<div slot="contents" class="flex h-full">
					<img
						src={SeeedTrackerImage}
						alt=""
						class="flex mx-auto self-center"
						style="max-height: 220px;"
					/>
				</div>
			</Card>

			

			
		</div>
	</div>

	<div class="flex mb-8 bg-teal-500 flex-col align-middle p-4">
		<h1 class="font-extrabold text-white text-center text-6xl ml-0 lg:ml-8 mt-20 mb-5 p-2">
			{$_('home.contactUsTitle')}
		</h1>
		<div class="mx-auto">
			<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-lg transition duration-150 ease-in-out">
				{$_('home.contactUsButton')}
			</button>
		</div>
	</div>
</main>
