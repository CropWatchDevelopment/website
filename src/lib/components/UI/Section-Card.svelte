<script lang="ts">
	const { image, title, description, link, class: ClassName } = $props();
</script>

<div class="m-2 mx-4 rounded-md bg-white shadow-md  text-left ">
	<img src={image} alt="Agriculture" loading="lazy" class="h-60 mx-auto w-full rounded-t-md" />
	<div class="px-6">
		<h3 class="mt-4 font-bold text-2xl">{title}</h3>
		<p class="pb-2 font-light mt-4">{description}</p>
		<p class="text-center">
		<a href={link} class="block {ClassName} text-white my-6 py-3 rounded font-light transition-all hover:scale-105">
			Learn more
		</a>
		</p>
	</div>
</div>
