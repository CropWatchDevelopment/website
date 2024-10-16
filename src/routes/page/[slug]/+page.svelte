<script lang="ts">
	import FARMER_IMAGE from '$lib/images/farmer.png';
	import { page } from '$app/stores';
	import { PUBLIC_APIURL } from '$env/static/public';

    export let data;
    console.log(data);
</script>

<div class="bg-slate-300 py-5">
	<div class="mx-auto max-w-2xl px-4 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			<div class="flex flex-col-reverse">
				<!-- Image selector -->
				<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<!-- <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
						<button
							id="tabs-1-tab-1"
							class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
							aria-controls="tabs-1-panel-1"
							role="tab"
							type="button"
						>
							
							<span
								class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2"
								aria-hidden="true"
							></span>
						</button>

					</div> -->
				</div>

				<div class="aspect-h-1 aspect-w-1 w-full">
					<!-- Tab panel, show/hide based on tab state. -->
					<div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
						<img
							src={`${PUBLIC_APIURL}/assets/${data.image}`}
							alt="Angled front view with bag zipped and handles upright."
							class="h-full w-full object-cover object-center sm:rounded-lg"
						/>
					</div>

					<!-- More images... -->
				</div>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{(data.page_title)?.toLocaleUpperCase().replaceAll('-', ' ')}</h1>

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6 text-base text-gray-700">
					{@html data.page_content}
					</div>
				</div>

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Additional details</h2>

					<div class="divide-y divide-gray-200 border-t">
						<div>
							<h3>
								<!-- Expand/collapse question button -->
								<button
									type="button"
									class="group relative flex w-full items-center justify-between py-6 text-left"
									aria-controls="disclosure-1"
									aria-expanded="false"
								>
									<!-- Open: "text-indigo-600", Closed: "text-gray-900" -->
									<span class="text-sm font-medium text-gray-900">Features</span>
									<span class="ml-6 flex items-center">
										<!-- Open: "hidden", Closed: "block" -->
										<svg
											class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											data-slot="icon"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
										<!-- Open: "block", Closed: "hidden" -->
										<svg
											class="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											data-slot="icon"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
										</svg>
									</span>
								</button>
							</h3>
							<div class="prose prose-sm pb-6" id="disclosure-1">
								<ul role="list">
                                    {#each data.features as feature}
                                    <li>{feature.label}</li>
                                    {/each}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
		<div class="grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
			<div class="flex p-px lg:col-span-4">
				<div
					class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
				>
					<img
						class="h-80 object-cover object-left"
						src={`${PUBLIC_APIURL}/assets/${data.img_group_1}`}
						alt=""
					/>
				</div>
			</div>
			<div class="flex p-px lg:col-span-2">
				<div
					class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]"
				>
					<img
						class="h-80 object-cover object-center"
						src={`${PUBLIC_APIURL}/assets/${data.img_group_2}`}
						alt=""
					/>
				</div>
			</div>
			<div class="flex p-px lg:col-span-2">
				<div
					class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem]"
				>
					<img
						class="h-80 object-cover object-center"
						src={`${PUBLIC_APIURL}/assets/${data.img_group_3}`}
						alt=""
					/>
				</div>
			</div>
			<div class="flex p-px lg:col-span-4">
				<div
					class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
				>
					<img
						class="h-80 object-cover object-left"
						src={`${PUBLIC_APIURL}/assets/${data.img_group_4}`}
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</div>









<div class="bg-slate-200 py-5 sm:py-5">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
          <p class="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
            <div class="h-px flex-auto bg-gray-100"></div>
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              Private forum access
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              Member resources
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              Entry to annual conference
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              Official member t-shirt
            </li>
          </ul>
        </div>
        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-gray-600">Pay once, own it forever</p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
              </p>
              <a href="#" class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
              <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>