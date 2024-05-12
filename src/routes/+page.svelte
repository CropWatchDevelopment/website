<script lang="ts">
	import { Button, Card, Header, Avatar, Icon, Shine, Tilt, Dialog, TextField } from 'svelte-ux';
	import Slides from '$lib/deck/Slides.svelte';
	import {
		mdiBarn,
		mdiBox,
		mdiClose,
		mdiEmail,
		mdiFire,
		mdiForum,
		mdiGithub,
		mdiInformation,
		mdiLinkedin,
		mdiMeterElectric,
		mdiPackage,
		mdiPhone,
		mdiSend,
		mdiSnowflake,
		mdiStackOverflow,
		mdiWatch,
		mdiWeb
	} from '@mdi/js';
	import SaitoCityFlagImage from '$lib/images/SaitoCity.png';
	import NishimeraCityFlagImage from '$lib/images/NishimeraCity.jpg';
	import CropWatchAtGreenhouseImage from '$lib/images/CropWatch-installed-greenhouse.jpg';
	import TroubleShootingImage from '$lib/images/troubleShooting.jpg';
	import SmokeDetectorImage from '$lib/images/smoke-detector.png';
	import SeeedTrackerImage from '$lib/images/seeedT1000.webp';
	import AxisCameraImage from '$lib/images/axis-camera.jpg';
	import farmingImage from '$lib/images/tractor-spraying-pesticides-soybean-green-field-generative-ai_849906-11911.avif';
	import coldChain from '$lib/images/cold-chain.webp';
	import workerSafetyImage from '$lib/images/workerSafety.webp';
	import TractorImage from '$lib/images/tractor.svg';
	import kevin from '$lib/images/kevin.jpg';
	import sayaka from '$lib/images/sayaka.jpg';
	import jose from '$lib/images/jose.jpg';
	import sigurd from '$lib/images/sigurd.jpg';
	import abay from '$lib/images/abay.png';
	import tractor from '$lib/images/tractor.svg';

	import MiyazakiFlagImage from '$lib/images/Flag_of_Miyazaki_Prefecture.png';
	import { _, isLoading } from 'svelte-i18n';
	import { goto } from '$app/navigation';

	let openEmailDialog: boolean = false;
	let messageValue: string = '';
	let emailValue: string = '';
</script>


		<div class="w-full">
			<Slides />
		</div>
		<div class="grid w-full">
			<div class="bg-slate-300 p-2 md:p-16">
				<h1 class="text-4xl font-bold text-center mb-8">
					{$_('mainTitle')}
				</h1>
				<div class="grid grid-cols-3 gap-2 1md:gap-8">
					<a href="https://www.nishimera.jp/" class="mx-auto flex flex-col">
						<Shine>
							<div class="flex items-center justify-center content-center gap-6">
								<Tilt class="hover:scale-110 transition duration-500">
									<img class="mx-auto" src={NishimeraCityFlagImage} alt="Nishimera City" />
								</Tilt>
							</div>
						</Shine>
						<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">
							{$_('home.nisimera')}
						</p>
					</a>

					<a href="http://www.city.saito.miyazaki.jp/" class="mx-auto flex flex-col">
						<Shine>
							<div class="flex items-center justify-center content-center gap-6">
								<Tilt class="hover:scale-110 transition duration-500">
									<img class="mx-auto" src={SaitoCityFlagImage} alt="Saito City" />
								</Tilt>
							</div>
						</Shine>
						<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">{$_('home.saito')}</p>
					</a>

					<a href="https://www.nishimera.jp/" class="mx-auto flex flex-col">
						<Shine>
							<div class="flex items-center justify-center content-center gap-6">
								<Tilt class="hover:scale-110 transition duration-500">
									<img class="mx-auto" src={MiyazakiFlagImage} alt="Miyazaki Perfecture" />
								</Tilt>
							</div>
						</Shine>
						<p class="text-center mt-3 text-cyan-950 text-xl font-semibold">
							{$_('home.miyazaki')}
						</p>
					</a>
				</div>
			</div>
			<div class="md:mx-8 lg:mx-40 px-8">
				<h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 mt-20 mb-10">
					{$_('home.section1.title')}
				</h1>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col">
						<p class="text-lg text-gray-700 mb-4 first-line:pl-4">
							{$_('home.section1.text')}
						</p>
						<p class="text-lg text-gray-700 mb-6 first-line:pl-4">
							{$_('home.section1.text2')}
						</p>
						<span class="flex-1" />
						<button
							disabled
							class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
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
						class="rounded-lg shadow-lg"
						alt="CropWatch Install On Greenhouse"
					/>
				</div>
			</div>
		</div>
		<div class="mt-20 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
			<div class="grid grid-cols-1 md:grid-cols-2 px-8 py-16 gap-10 md:gap-20">
				<img
					src={TroubleShootingImage}
					class="w-full rounded-lg shadow-lg"
					alt="We are here for your questions"
				/>
				<div class="flex flex-col">
					<h2 class="text-4xl font-bold mb-6">
						{$_('home.section2.title')}
					</h2>
					<p class="text-lg mb-4">
						{$_('home.section2.text1')}
					</p>
					<p class="text-lg mb-4">
						{$_('home.section2.text2')}
					</p>
					<p class="text-lg">
						{$_('home.section2.text3')}
					</p>

					<span class="flex-1" />
					<div>
						<h2 class="text-4xl mb-2">Our Amazing team:</h2>
						<div class="flex flex-row gap-5 flex-wrap justify-center">
							<div class="flex flex-col items-center">
								<img src={kevin} alt="Kevin Cantrell" class="w-24 h-24 rounded" />
								<p class="text-center font-light mt-4">Kevin Cantrell</p>
								<p class="text-center font-light">Founder/Developer</p>
								<p class="text-center font-light">
									<a href="https://www.linkedin.com/in/cropwatch/" target="_blank">
										<Icon data={mdiLinkedin} class="text-blue-500" />
									</a>
									<a href="https://github.com/kevin192291" target="_blank">
										<Icon data={mdiGithub} class="text-black" />
									</a>
									<a href="https://stackoverflow.com/users/3740673/kevin192291" target="_blank">
										<Icon data={mdiStackOverflow} class="text-black" />
									</a>
									<a href="https://kevincantrell.x" target="_blank">
										<Icon data={mdiWeb} class="text-yellow-500" />
									</a>
								</p>
							</div>
							<div class="flex flex-col items-center">
								<img src={sayaka} alt="Sayaka Cantrell" class="w-24 h-24 rounded" />
								<p class="text-center font-light mt-4">{$_('home.sayaka')}</p>
								<p class="text-center font-light">Co-Founder/Business OPs</p>
								<p class="text-center font-light">
									<a href="https://www.linkedin.com/in/sayaka-ikemizu-694b17276/" target="_blank">
										<Icon data={mdiLinkedin} class="text-blue-500" />
									</a>
								</p>
							</div>
							<div class="flex flex-col items-center">
								<img src={jose} alt="Jose Ramiro Zuñiga" class="w-24 h-24 rounded" />
								<p class="text-center font-light mt-4">Jose Ramiro Zuñiga</p>
								<p class="text-center font-light">UI/UX Developer</p>
								<p class="text-center font-light">
									<a href="https://www.linkedin.com/in/jose-zuniga-115a68155/" target="_blank">
										<Icon data={mdiLinkedin} class="text-blue-500" />
									</a>
									<a href="https://github.com/jramiroz98" target="_blank">
										<Icon data={mdiGithub} class="text-black" />
									</a>
									<a href="https://jramiroz98.github.io/my-portfolio/" target="_blank">
										<Icon data={mdiWeb} class="text-yellow-500" />
									</a>
								</p>
							</div>
							<div class="flex flex-col items-center">
								<img src={sigurd} alt="Sigurd Øyen" class="w-24 h-24 rounded" />
								<p class="text-center font-light mt-4">Sigurd Øyen</p>
								<p class="text-center font-light">Electronics Engineer</p>
								<p class="text-center font-light">
									<a href="https://www.linkedin.com/in/sigurd-%C3%B8yen-78688899/" target="_blank">
										<Icon data={mdiLinkedin} class="text-blue-500" />
									</a>
								</p>
							</div>
							<div class="flex flex-col items-center">
								<img src={abay} alt="Sigurd Øyen" class="w-24 h-24 rounded" />
								<p class="text-center font-light mt-4">Abay Bektursun</p>
								<p class="text-center font-light">Autonomous AI Expert</p>
								<!-- <p class="text-center font-light">
								<a href="" target="_blank">
									<Icon data={mdiLinkedin} class="text-blue-500" />
								</a>
							</p> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="p-8 lg:p-16">
			<h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 text-center mt-20 mb-8">
				{$_('home.section3.title')}
			</h1>
			<h2 class="text-xl text-gray-700 text-center mb-8">
				{$_('home.section3.text')}
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 lg:mx-40">
				<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header
						title={$_('home.agriWatchTitle')}
						subheading={$_('home.agriWatchSubtitle')}
						slot="header"
					>
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.agriWatchTitle')}
						</div>
						<div slot="avatar">
							<Avatar class="bg-primary text-primary-content font-bold">
								<Icon data={mdiBarn} />
							</Avatar>
						</div>
					</Header>
					<div slot="contents" class="flex h-full">
						<img
							src={farmingImage}
							alt="Smart Farming"
							class="flex w-full h-full rounded-lg"
							style="max-height: 220px;"
						/>
					</div>
					<div slot="actions">
						<Button
							variant="fill"
							color="primary"
							on:click={() => goto('smart-farming')}
							class="w-full"
						>
							{$_('home.viewDevices')}
						</Button>
					</div>
				</Card>

				<Card class="flex elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header subheading={$_('home.tempWatchSubtitle')} slot="header">
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.tempWatchTitle')}
						</div>
						<div slot="avatar">
							<Avatar class="bg-primary text-primary-content font-bold">
								<Icon data={mdiSnowflake} />
							</Avatar>
						</div>
					</Header>
					<div slot="contents" class="flex h-full">
						<img
							src={coldChain}
							alt=""
							class="flex w-full h-full rounded-lg"
							style="max-height: 220px;"
						/>
					</div>
					<div slot="actions">
						<Button
							variant="fill"
							color="primary"
							on:click={() => goto('smart-farming')}
							class="w-full"
						>
							{$_('home.viewDevices')}
						</Button>
					</div>
				</Card>

				<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header subheading={$_('home.wellWatchSubtitle')} slot="header">
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.wellWatchTitle')}
						</div>
						<div slot="avatar">
							<Avatar class="bg-primary text-primary-content font-bold">
								<Icon data={mdiWatch} />
							</Avatar>
						</div>
					</Header>
					<img src={workerSafetyImage} slot="contents" alt="" class=" w-full h-full rounded-lg" />
					<div slot="actions">
						<Button
							variant="fill"
							color="primary"
							on:click={() => goto('smart-farming')}
							class="w-full"
						>
							{$_('home.viewDevices')}
						</Button>
					</div>
				</Card>

				<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header subheading={$_('home.smokeDetectorTitle')} slot="header">
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.smartCityTitle')}
						</div>
						<div slot="avatar">
							<Avatar class="bg-primary text-primary-content font-bold">
								<Icon data={mdiFire} />
							</Avatar>
						</div>
					</Header>
					<img src={SmokeDetectorImage} slot="contents" alt="" />
				</Card>

				<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header subheading={$_('home.edgeAICameraTitle')} slot="header">
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.smartCityTitle')}
						</div>
						<div slot="avatar">
							<Avatar class="bg-primary text-primary-content font-bold">
								<Icon data={mdiMeterElectric} />
							</Avatar>
						</div>
					</Header>
					<img src={AxisCameraImage} class="w-8/12 mx-auto mt-14" slot="contents" alt="" />
				</Card>

				<Card class="elevation-10 hover:scale-105 transition ease-in-out duration-300">
					<Header subheading={$_('home.assetTrackingTitle')} slot="header">
						<div slot="title" class="text-md lg:text-2xl">
							{$_('home.smartCityTitle')}
						</div>
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

		<div class="bg-teal-600 text-white flex flex-col items-center p-8">
			<h1 class="text-4xl font-bold mb-6">
				{$_('home.contactUsTitle')}
			</h1>
			<button
				class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
				on:click={() => (openEmailDialog = true)}
			>
				{$_('home.contactUsButton')}
			</button>
		</div>


	<Dialog bind:open={openEmailDialog}>
		<div slot="title">
			<Icon data={mdiForum} />
			Lets get in touch!
		</div>
		<form method="POST" action="?/handleContactRequestMessage">
			<div class="flex flex-col gap-4 p-4 w-full">
				<TextField label="E-Mail *" type="email" name="email" bind:value={emailValue}>
					<div slot="prepend">
						<Icon data={mdiEmail} class="text-surface-content/50 mr-2" />
					</div>
				</TextField>
				<TextField label="Telephone Number" type="text" name="phone">
					<div slot="prepend">
						<Icon data={mdiPhone} class="text-surface-content/50 mr-2" />
					</div>
				</TextField>
				<TextField
					label="Message *"
					name="message"
					id="message"
					multiline
					required
					bind:value={messageValue}
				/>
			</div>

			<div class="w-full flex flex-row justify-between p-4">
				<Button variant="fill" icon={mdiClose} color="primary">Close</Button>
				<Button
					type="submit"
					variant={messageValue == '' || emailValue == '' || messageValue.length < 10
						? 'outline'
						: 'fill'}
					icon={mdiSend}
					color="success"
					disabled={messageValue == '' || emailValue == '' || messageValue.length < 10}
					>SEND!</Button
				>
			</div>
		</form>
	</Dialog>
