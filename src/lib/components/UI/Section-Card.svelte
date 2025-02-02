<script lang="ts">
	const { image, title, description, link } = $props();
</script>

<div class="m-2 rounded bg-white shadow-md hover:m-0 hover:shadow-lg cursor-pointer">
	<a href={link} class="block">
		<img src={image} alt="Agriculture" class="h-50 mx-auto w-full" />
		<h3 class="mt-4 font-bold">{title}</h3>
		<p class="mt-2 px-6 pb-6">{description}</p>
	</a>
</div>
