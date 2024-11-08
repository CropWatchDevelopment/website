<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import moment from 'moment';
	export let data;
	console.log(data);
</script>

<div class="bg-white py-10">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="lg:pr-4">
				<div
					class="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"
				>
					<img
						class="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
						src={`${PUBLIC_APIURL}/assets/${data.posts.post_image}`}
						alt=""
					/>
				</div>
			</div>
			<div>
				<div class="text-base/7 text-gray-700 lg:max-w-lg">
					<p class="text-base/7 font-semibold text-indigo-600">Company Update</p>
					<h1
						class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
					>
						{data.posts.title}
					</h1>
					<div class="max-w-xl">
						{@html data.posts.content}
					</div>
				</div>
				<dl class="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-2">
					<div>
						<dt class="text-sm/6 font-semibold text-gray-600">Author</dt>
						<dd class="mt-2 text-3xl/10 font-bold tracking-tight text-gray-900">
							<p>
								<!-- <img
									src={`${PUBLIC_APIURL}/assets/${data.posts.author_image}`}
									alt=""
									class="mx-auto h-6 w-6 flex-none rounded-full bg-white/10"
								/> -->
								{data.posts.author}
							</p>
						</dd>
					</div>
					<div>
						<dt class="text-sm/6 font-semibold text-gray-600">Date</dt>
						<dd class="mt-2 text-3xl/10 font-bold tracking-tight text-gray-900">
							{moment(data.posts.data_created).format('YYYY MMM DD')}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
</div>
