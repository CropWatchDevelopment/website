<main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
	<div class="border-b border-gray-200 pb-10 pt-5">
		<h1 class="text-4xl font-bold tracking-tight text-gray-900">Smart Farming Devices</h1>
		<p class="mt-4 text-base text-gray-500">
			Checkout out the latest release of Basic Tees, new and improved with four openings!
		</p>
	</div>

	<div class="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
		<aside>
			<h2 class="sr-only">Filters</h2>

			<!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
			<button type="button" class="inline-flex items-center lg:hidden">
				<span class="text-sm font-medium text-gray-700">Filters</span>
				<svg
					class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
					/>
				</svg>
			</button>

			<div class="hidden lg:block">
				<form class="space-y-10 divide-y divide-gray-200">
					<div>
						<fieldset>
							<legend class="block text-sm font-medium text-gray-900">Color</legend>
							<div class="space-y-3 pt-6">
								<div class="flex items-center">
									<input
										id="color-0"
										name="color[]"
										value="white"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-0" class="ml-3 text-sm text-gray-600">White</label>
								</div>
								<div class="flex items-center">
									<input
										id="color-1"
										name="color[]"
										value="beige"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-1" class="ml-3 text-sm text-gray-600">Beige</label>
								</div>
								<div class="flex items-center">
									<input
										id="color-2"
										name="color[]"
										value="blue"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-2" class="ml-3 text-sm text-gray-600">Blue</label>
								</div>
								<div class="flex items-center">
									<input
										id="color-3"
										name="color[]"
										value="brown"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-3" class="ml-3 text-sm text-gray-600">Brown</label>
								</div>
								<div class="flex items-center">
									<input
										id="color-4"
										name="color[]"
										value="green"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-4" class="ml-3 text-sm text-gray-600">Green</label>
								</div>
								<div class="flex items-center">
									<input
										id="color-5"
										name="color[]"
										value="purple"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="color-5" class="ml-3 text-sm text-gray-600">Purple</label>
								</div>
							</div>
						</fieldset>
					</div>
					<div class="pt-10">
						<fieldset>
							<legend class="block text-sm font-medium text-gray-900">Category</legend>
							<div class="space-y-3 pt-6">
								<div class="flex items-center">
									<input
										id="category-0"
										name="category[]"
										value="new-arrivals"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="category-0" class="ml-3 text-sm text-gray-600">All New Arrivals</label
									>
								</div>
								<div class="flex items-center">
									<input
										id="category-1"
										name="category[]"
										value="tees"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="category-1" class="ml-3 text-sm text-gray-600">Tees</label>
								</div>
								<div class="flex items-center">
									<input
										id="category-2"
										name="category[]"
										value="crewnecks"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="category-2" class="ml-3 text-sm text-gray-600">Crewnecks</label>
								</div>
								<div class="flex items-center">
									<input
										id="category-3"
										name="category[]"
										value="sweatshirts"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="category-3" class="ml-3 text-sm text-gray-600">Sweatshirts</label>
								</div>
								<div class="flex items-center">
									<input
										id="category-4"
										name="category[]"
										value="pants-shorts"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="category-4" class="ml-3 text-sm text-gray-600"
										>Pants &amp; Shorts</label
									>
								</div>
							</div>
						</fieldset>
					</div>
					<div class="pt-10">
						<fieldset>
							<legend class="block text-sm font-medium text-gray-900">Sizes</legend>
							<div class="space-y-3 pt-6">
								<div class="flex items-center">
									<input
										id="sizes-0"
										name="sizes[]"
										value="xs"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-0" class="ml-3 text-sm text-gray-600">XS</label>
								</div>
								<div class="flex items-center">
									<input
										id="sizes-1"
										name="sizes[]"
										value="s"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-1" class="ml-3 text-sm text-gray-600">S</label>
								</div>
								<div class="flex items-center">
									<input
										id="sizes-2"
										name="sizes[]"
										value="m"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-2" class="ml-3 text-sm text-gray-600">M</label>
								</div>
								<div class="flex items-center">
									<input
										id="sizes-3"
										name="sizes[]"
										value="l"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-3" class="ml-3 text-sm text-gray-600">L</label>
								</div>
								<div class="flex items-center">
									<input
										id="sizes-4"
										name="sizes[]"
										value="xl"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-4" class="ml-3 text-sm text-gray-600">XL</label>
								</div>
								<div class="flex items-center">
									<input
										id="sizes-5"
										name="sizes[]"
										value="2xl"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label for="sizes-5" class="ml-3 text-sm text-gray-600">2XL</label>
								</div>
							</div>
						</fieldset>
					</div>
				</form>
			</div>
		</aside>

		<section aria-labelledby="product-heading" class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
			<h2 id="product-heading" class="sr-only">Products</h2>

			<div
				class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3"
			>
				<div
					class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
				>
					<div
						class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
					>
						<img
							src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg"
							alt="Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green."
							class="h-full w-full object-cover object-center sm:h-full sm:w-full"
						/>
					</div>
					<div class="flex flex-1 flex-col space-y-2 p-4">
						<h3 class="text-sm font-medium text-gray-900">
							<a href="#">
								<span aria-hidden="true" class="absolute inset-0"></span>
								Basic Tee 8-Pack
							</a>
						</h3>
						<p class="text-sm text-gray-500">
							Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for
							laundry day.
						</p>
						<div class="flex flex-1 flex-col justify-end">
							<p class="text-sm italic text-gray-500">8 colors</p>
							<p class="text-base font-medium text-gray-900">$256</p>
						</div>
					</div>
				</div>
				

				<!-- More products... -->
			</div>
		</section>
	</div>
</main>
