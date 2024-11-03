<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;
</script>

<div class="bg-slate-200 px-6 py-24 sm:py-32 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Device List</h2>
		<p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
			Below is our selection of xyz devices. Click on the device to learn more.
		</p>
	</div>
</div>

<div class="bg-slate-200">

    {#each data.pages as device}
    <div class="bg-white shadow sm:rounded-lg mx-5 mb-5">
      <div class="px-4 py-5 sm:p-6 flex items-start space-x-4">
        <!-- Image Section -->
        <div class="flex-shrink-0 w-32 h-32">
          <img src={`${PUBLIC_APIURL}/assets/${device.translations[0]?.device_thumbnail}`} alt="CI icon" class="w-full h-full object-cover">
        </div>
        
        <!-- Content Section -->
        <div>
          <h3 class="text-base font-semibold text-gray-900">{device.translations[0]?.page_title}</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500 list-disc">

                {@html device.translations[0]?.thumbnail_description}

          </div>
          <div class="mt-6 text-sm/6">
            <a href={`/detail-page/${device.slug}`} class="font-semibold text-indigo-600 hover:text-indigo-500">
              Learn more
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div>
  
  <style>
    ul, ol {
      list-style-type: disc !important;
      list-style: square !important;
    }
    li {
      margin-left: 1.5em;
      list-style-type: disc;
      list-style: square;
    }
  </style>