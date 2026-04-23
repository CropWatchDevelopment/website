<script lang="ts">
	interface Props {
		src: string;
		alt?: string;
	}
	let { src, alt = '' }: Props = $props();
</script>

<img class="hs-art" {src} {alt} loading="eager" decoding="async" />
