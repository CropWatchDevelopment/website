<script lang="ts">
	const { image, title, description, link, class: ClassName } = $props();
</script>

<div class="{ClassName} m-2 rounded shadow-md hover:m-0 hover:shadow-lg cursor-pointer">
	<a href={link} class="block">
		<img src={image} alt="Agriculture" loading="lazy" class="h-52 mx-auto w-full" height="208px" width="344px" />
		<h3 class="mt-4 font-bold">{title}</h3>
		<p class="mt-2 px-6 pb-6">{description}</p>
	</a>
</div>
