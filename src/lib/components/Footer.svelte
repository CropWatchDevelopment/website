<script lang="ts">
	import moment from "moment";

	export let news;
</script>

<span class="flex flex-1"></span>
<footer>
	<div class="container flex flex-wrap">
		<div class="grid-row grid w-full md:w-1/6">
			<h2>Quick Links</h2>
			<div class="flex flex-row gap-5 lg:flex-col">
				<a href="/contact-us" class="btn btn-primary one w-fit text-nowrap">Contact Us</a>
				<a href="/shop/products" class="btn btn-primary two w-fit text-nowrap">Shop</a>
				<a href="/news" class="btn btn-primary two w-fit text-nowrap">News</a>
			</div>
		</div>
		<div class="news w-full md:w-1/2">
			<h2>Latest News & Updates</h2>
			<ul>
				{#if news && news.news && news.news.length > 0}
				{#each news.news as item}
				<li>
					<a href={`/news/${item.id}`}>{item.title}</a>
					<small>{moment(item.created_date).format('YYYY MMM DD')}</small>
				</li>
				{/each}
				{/if}
			</ul>
		</div>
		<div class="subscirbe w-full md:w-1/3">
			<p class="sub">
				<span>Subscribe</span> to Our Newsletter to get Important News Posts &amp; Inside Scoops:
			</p>
			<div class="form flex">
				<input
					type="email"
					placeholder="Enter your Email"
					id="exampleInputName"
					class="mb-4 h-9 w-2/3 rounded-l border border-black bg-[#2d2e2e64] pl-3 font-normal leading-9 text-gray-600"
				/>
				<button
					type="submit"
					class="bttn mb-4 h-9 w-1/3 rounded-r border border-[#16a085] bg-[#1abc9c] font-normal leading-9 text-white"
					>Subscribe</button
				>
			</div>
			<div class="social">
				<ul>
					<li>
						<a
							class="github"
							title="Github"
							target="_blank"
							href="https://github.com/CropWatchDevelopment"
						>
							<i class="fa-brands fa-github"></i>
						</a>
						Fork us <span>on Github</span>
					</li>
					<li>
						<a
							class="discourse"
							title="Discourse"
							target="_blank"
							href="https://forum.cropwatch.io/"
						>
							<i class="fa-brands fa-discourse"></i>
						</a>
						Talk to us <span>on our Forum</span>
					</li>
					<li>
						<a
							class="google-plus"
							title="Youtube"
							target="_blank"
							href="https://www.youtube.com/@cropwatch4407"
						>
							<i class="fa-brands fa-youtube"></i>
						</a>
						Subscribe to us <span>on Youtube</span>
					</li>
					<li>
						<a
							class="linkedin"
							title="linkedIn"
							target="_blank"
							href="https://www.linkedin.com/company/cropwatch-system/"
						>
							<i class="fa-brands fa-linkedin"></i>
						</a>
						Follow us <span>on Linkedin</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
