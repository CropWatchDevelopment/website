<script>
	import ProductCard from '$lib/components/UI/Product-Card.svelte';
</script>

<!-- Category Title -->
<section class="bg-green-100/5 py-10">
	<div class="container mx-auto text-center">
		<h1 class="text-4xl font-bold">Agriculture</h1>
		<p class="mt-2 text-gray-600">Explore our range of devices categorized by function type.</p>
	</div>
</section>

<section class="py-10">
	<div class="container mx-auto">
		<!-- SOIL Sensors, below ground stuff -->
		<div class="mb-10">
			<h2 class="border-b-2 border-blue-600 pb-2 text-2xl font-bold">Soil Sensors</h2>
			<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- Device Card -->
				<ProductCard
					image="/images/CW-SS-TMEPNPK.png"
					name="[CropWatch] Temperature, Moisture, EC, & pH Soil Sensor"
					description="The sensor is made from chinesium.... soooo it kinda sucks, but it's cheap. It measures soil temperature, moisture, electrical conductivity, pH, nitrogen, phosphorus, and potassium levels. It is designed to help farmers and agricultural researchers make informed decisions about soil management and crop production."
					price="$299"
					link="/product/farming/CW-SS-TMEPNPK"
				/>
        <ProductCard
					image="/images/CW-SS-PH.png"
					name="[CropWatch] ISFET pH Soil Sensor"
					description="The ISFET pH meter for agriculture use is a game-changer for farmers and agricultural researchers. It provides fast, accurate, and reliable pH readings, leading to better soil management and crop yields. With its wider pH range, resistance to contaminants and electrolytes, and cost-effectiveness"
					price="$299"
					link="/product/farming/CW-SS-PH"
				/>
				<ProductCard
					image="/images/CW-SS-TME.webp"
					name="[CropWatch] Temperature, Moisture, & EC Soil Sensor"
					description="The ISFET pH meter for agriculture use is a game-changer for farmers and agricultural researchers. It provides fast, accurate, and reliable pH readings, leading to better soil management and crop yields. With its wider pH range, resistance to contaminants and electrolytes, and cost-effectiveness"
					price="$299"
					link="/product/farming/CW-SS-TME"
				/>
			</div>
		</div>

		<!-- Function Type 2 -->
		<div class="mb-10">
			<h2 class="border-b-2 border-blue-600 pb-2 text-2xl font-bold">Air Sensors</h2>
			<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- Device Card -->
				<ProductCard
					image="/images/Milesight_EM500-co2.webp"
					name="[Milesight] CO₂, Temperature & Humidity Sensor"
					description="EM500-CO2 is designed for measuring gaseous carbon dioxide (CO2) concentration in harsh environments. It is useful in the application where knowing CO2 level is important like greenhouse, building ventilation, fruit and vegetable storage"
					price="$199"
					link="device-details.html"
				/>
        <ProductCard
					image="/images/seeed.webp"
					name="[SEEED] 8-in-1 Weather Station"
					description="SenseCAP LoRaWAN S2120 Weather Station collects and uploads air temperature, humidity, wind speed/direction, Rainfall Intensity, light intensity, UV index, and barometric pressure data supported by worldwide LoRaWAN networks."
					price="$199"
					link="device-details.html"
				/>
        <ProductCard
					image="/images/TUNDRA-ISO-2000x2000.png"
					name="[Tektelic] Temperature & Humidity Sensor"
					description="The TUNDRA Sensor is your key to achieving optimal storage conditions and enhancing the performance and safety of stored products. Elevate your storage environment for healthier and more efficient outcomes."
					price="$199"
					link="device-details.html"
				/>
			</div>
		</div>
	</div>
</section>
