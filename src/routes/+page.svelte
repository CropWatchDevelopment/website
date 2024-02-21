<script lang="ts">
	import { Button } from 'svelte-ux';
	import greenhouses1 from '$lib/videos/greenhouses1.mp4';
	import greenhouses2 from '$lib/videos/greenhouse2.mp4';
	import Typewriter from '$lib/components/typewriter-effect/Typewriter.svelte';
	import Slides from '$lib/deck/Slides.svelte';

	let videos = [greenhouses1, greenhouses2];
	let videoIndex: number = 0;
	$: currentVideo = greenhouses1;
	let currentTime = 0;
	$: paused = false;
	$: displayVideo = true;
	const nextVideo = () => {
		videoIndex++;
		debugger;
		if (videoIndex >= videos.length) videoIndex = 0;
		currentVideo = videos[videoIndex];
		currentTime = 0;
		displayVideo = false;
		setTimeout(() => (displayVideo = true), 0);
		paused = false;
	};
</script>

<main class="grid">
		<Slides />
		<h1>Data when and where you need it</h1>
</main>
