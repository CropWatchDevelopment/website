<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';

	export let data;
	console.log(data);
</script>

<div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
	<div
		class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
		aria-hidden="true"
	></div>
	<div class="mx-auto max-w-7xl px-6 py-32 sm:py-20 lg:px-8">
		<div
			class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8"
		>
			<h1
				class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto"
			>
				{data.page_title}
			</h1>
			<div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
				<p class="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
					{@html data.page_content}
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="#"
						class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>View Features below</a
						>
					</div>
				</div>
				<img
				src={`${PUBLIC_APIURL}/assets/${data.image}`}
				alt=""
				class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
				/>
			</div>
		</div>
		<div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div>
	</div>
	
	<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<div class="relative isolate overflow-hidden bg-[rgb(9,36,95)] py-24 sm:py-32">
	<!-- <img src={SAITO_IMAGE} alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"> -->
	<div
		class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
	>
		<div
			class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
	<div
		class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
	>
		<div
			class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">{data.color_area_title}</h2>
			<p class="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
				{data.color_area_subtitle}
			</p>
		</div>
		<div
			class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
		>

		{#each data?.color_area_points || [] as point}			
		<div class="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
			<!-- <svg
			class="h-7 w-5 flex-none text-indigo-400"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			data-slot="icon"
				>
				<path
				fill-rule="evenodd"
				d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
				clip-rule="evenodd"
				/>
			</svg> -->
			<div class="text-base/7">
				<h3 class="font-semibold text-white">{point.title}</h3>
				<p class="mt-2 text-gray-300">
					{point.description}
				</p>
			</div>
		</div>
		{/each}

		</div>
	</div>
</div>

<div class="mx-auto grid max-w-[calc(1320px+20px)] grid-cols-1 gap-5 p-5 md:grid-cols-3">
	<!-- First Column -->
	<div class="bg-gradient-to-b from-indigo-100/20 bg-cover p-5 shadow-md">
		<div class="mb-5 text-left">
			<h4 class="text-xl font-extrabold uppercase text-blue-500">Main Features</h4>
		</div>
		<div class="font-raleway mb-5 text-left text-[18px] font-normal leading-8">
			<ul class="list-disc space-y-2 pl-5">
				{#each data?.features || [] as feature}
					<li>{feature.name}</li>
				{/each}
			</ul>
		</div>
		<div class="mb-5 mt-10 text-left">
			<h4 class="text-xl font-extrabold uppercase text-blue-500">Differentiations</h4>
		</div>
		<div class="font-raleway text-left text-[18px] font-normal leading-8">
			<ul class="list-disc space-y-2 pl-5">
				{#each data?.WhyPoints || [] as point}
					<li>
						{@html point.point}
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Second Column -->
	<div class="bg-gradient-to-b from-indigo-100/20 bg-cover p-5 shadow-md">
		<div class="mb-5 text-left">
			<h4 class="text-lg font-extrabold uppercase text-blue-500">Technical Characteristics</h4>
		</div>
		<div class="grid grid-cols-2 gap-4">
			{#each data?.technical_infomation || [] as item}
				<div class="text-sm text-[rgba(12,12,12,0.4)]">
					<h4 class="font-extrabold uppercase">{item.title}</h4>
					<p class="font-semibold text-[var(--awb-custom_color_2)]">
						{item.detail}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Third Column with Images and Buttons -->
	<div
		class="flex flex-col items-center space-y-4 bg-gradient-to-b from-indigo-100/20 bg-cover p-5 shadow-md"
	>
		<!-- Image 1 -->
		<div class="overflow-hidden rounded shadow-lg">
			<img
				src="//tektelic.com/wp-content/uploads/comfort-outline-front.svg"
				alt="Comfort outline front"
				class="h-auto w-full"
			/>
		</div>

		<!-- Image 2 -->
		<div class="overflow-hidden rounded shadow-lg">
			<img
				src="//tektelic.com/wp-content/uploads/comfort-outline-back.svg"
				alt="Comfort outline back"
				class="h-auto w-full"
			/>
		</div>

		<!-- Image 3 -->
		<div class="overflow-hidden rounded shadow-lg">
			<img
				src="//tektelic.com/wp-content/uploads/COMFORT.svg"
				alt="Comfort logo"
				class="h-auto w-full"
			/>
		</div>
		<!-- Buttons -->
		{#each data?.device_links || [] as link}
			<a
				href={link.url}
				class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>{link.title}</a
			>
		{/each}
	</div>
</div>

<div class="bg-indigo-100">
	<div
		class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8"
	>
		<h2 class="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
			Ready to dive in? <br />Start your free trial today.
		</h2>
		<div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
			<a
				href="#"
				class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Get started</a
			>
			<!-- <a href="#" class="text-sm/6 font-semibold text-gray-900"
				>Learn more <span aria-hidden="true">→</span></a
			> -->
		</div>
	</div>
</div>
