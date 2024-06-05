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
		mdiLinkedin,
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
	import farmingImage from '$lib/images/smartFarming.png';
	import coldChain from '$lib/images/cold-chain.png';
	import smartCity from '$lib/images/smartCity.png';
	import workerSafetyImage from '$lib/images/workerSafety.webp';
	import kevin from '$lib/images/kevin.jpg';
	import sayaka from '$lib/images/sayaka-bg.png';
	import jose from '$lib/images/jose.jpg';
	import sigurd from '$lib/images/sigurd.jpg';
	import abay from '$lib/images/abay.png';

	import MiyazakiFlagImage from '$lib/images/Flag_of_Miyazaki_Prefecture.png';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let openEmailDialog: boolean = false;
	let messageValue: string = '';
	let phoneValue: string = '';
	let emailValue: string = '';
	let messageSent: boolean = false;
	let minMessageLength: number = 10;
</script>

<div class="w-full">
	<Slides />
</div>
<div class="grid w-full">
	<div class="bg-slate-300 p-2 md:p-16">
		<h1 class="text-4xl text-cyan-950 font-bold text-center mb-8">
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
				<h2 class="text-4xl mb-2">{$_('home.our team')}:</h2>
				<div class="flex flex-row gap-5 flex-wrap justify-center">
					<div class="flex flex-col items-center">
						<img src={kevin} alt="Kevin Cantrell" class="w-24 h-24 rounded" />
						<p class="text-center font-light mt-4">Kevin Cantrell</p>
						<p class="text-center font-light">{$_('home.kevin title')}</p>
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
						<p class="text-center font-light">{$_('home.sayaka title')}</p>
						<p class="text-center font-light">
							<a href="https://www.linkedin.com/in/sayaka-ikemizu-694b17276/" target="_blank">
								<Icon data={mdiLinkedin} class="text-blue-500" />
							</a>
						</p>
					</div>
					<div class="flex flex-col items-center">
						<img src={jose} alt="Jose Ramiro Zuñiga" class="w-24 h-24 rounded" />
						<p class="text-center font-light mt-4">Jose Ramiro Zuñiga</p>
						<p class="text-center font-light">{$_('home.jose title')}</p>
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
						<p class="text-center font-light">{$_('home.sigurd title')}</p>
						<p class="text-center font-light">
							<a href="https://www.linkedin.com/in/sigurd-%C3%B8yen-78688899/" target="_blank">
								<Icon data={mdiLinkedin} class="text-blue-500" />
							</a>
						</p>
					</div>
					<div class="flex flex-col items-center">
						<img src={abay} alt="Sigurd Øyen" class="w-24 h-24 rounded" />
						<p class="text-center font-light mt-4">Abay Bektursun</p>
						<p class="text-center font-light">{$_('home.abay title')}</p>
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

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
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
			<img
				src={workerSafetyImage}
				slot="contents"
				alt=""
				class=" w-full h-full rounded-lg"
				style="max-height: 220px;"
			/>
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
			<img
				src={smartCity}
				slot="contents"
				alt="CropWatch for Smart Cities"
				class=" w-full h-full rounded-lg"
				style="max-height: 220px;"
			/>
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
	<form
		method="POST"
		action="?/handleContactRequestMessage"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			// `formElement` is this `<form>` element
			// `formData` is its `FormData` object that's about to be submitted
			// `action` is the URL to which the form is posted
			// calling `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted
			messageSent = true;

			return async ({ result, update }) => {
				// `result` is an `ActionResult` object
				// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
				messageSent = false;
				if (result.data.success) {
					openEmailDialog = false;
					alert('Thank you for your message! We will get back to you as soon as possible.');
				} else {
					alert('There was an error sending your message. Please try again later.');
				}
			};
		}}
	>
		<div class="flex flex-col gap-4 p-4 w-full">
			<TextField label="E-Mail *" type="email" name="email" bind:value={emailValue}>
				<div slot="prepend">
					<Icon data={mdiEmail} class="text-surface-content/50 mr-2" />
				</div>
			</TextField>
			<TextField label="Telephone Number" type="text" bind:value={phoneValue} name="phone">
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
			{#if messageValue.length < minMessageLength}
				<div class="text-red-500 text-sm">
					{$_('home.messageMinLength')} {minMessageLength} ({messageValue.length} / {minMessageLength})
				</div>
			{/if}
		</div>

		<div class="w-full flex flex-row justify-between p-4">
			<Button
				variant="fill"
				icon={mdiClose}
				color="primary"
				on:click={() => {
					openEmailDialog = false;
				}}>Close</Button
			>
			<Button
				type="submit"
				variant={messageValue == '' || emailValue == '' || messageValue.length < minMessageLength
					? 'outline'
					: 'fill'}
				icon={mdiSend}
				color="success"
				loading={messageSent}
				disabled={messageSent || messageValue == '' || emailValue == '' || messageValue.length < minMessageLength}
				>SEND!</Button
			>
		</div>
	</form>
</Dialog>
