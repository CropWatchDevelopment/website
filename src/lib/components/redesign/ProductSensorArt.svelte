<svg
	viewBox="0 0 400 400"
	style="width:100%; max-width:420px; margin:0 auto; display:block;"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<linearGradient id="sensor-g" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#fafbfc" />
			<stop offset="100%" stop-color="#d7e0f5" />
		</linearGradient>
	</defs>
	{#each [80, 130, 180] as r, i}
		<circle
			cx="200"
			cy="200"
			{r}
			fill="none"
			stroke={`rgba(242,165,22,${0.35 - i * 0.1})`}
			stroke-width="1"
			stroke-dasharray="3 5"
		/>
	{/each}
	<rect
		x="150"
		y="120"
		width="100"
		height="180"
		rx="16"
		fill="url(#sensor-g)"
		stroke="#11213c"
		stroke-width="2"
	/>
	<rect x="180" y="100" width="40" height="24" rx="6" fill="#11213c" />
	<circle cx="200" cy="106" r="4" fill="#f2a516" />
	<rect x="170" y="260" width="60" height="50" rx="4" fill="#0f1f3d" />
	<rect
		x="178"
		y="268"
		width="44"
		height="34"
		rx="2"
		fill="none"
		stroke="rgba(255,255,255,0.3)"
		stroke-width="1"
		stroke-dasharray="2 2"
	/>
	<rect x="170" y="150" width="60" height="20" rx="4" fill="#11213c" />
	<text
		x="200"
		y="164"
		fill="#f2a516"
		font-size="11"
		font-weight="700"
		text-anchor="middle"
		font-family="ui-monospace, monospace">CW-AIR-TH</text
	>
	<rect x="170" y="180" width="60" height="40" rx="4" fill="#040814" />
	<text
		x="200"
		y="200"
		fill="#72d9a2"
		font-size="12"
		font-family="ui-monospace, monospace"
		text-anchor="middle"
		font-weight="700">22.4°C</text
	>
	<text
		x="200"
		y="213"
		fill="#93a5c9"
		font-size="9"
		font-family="ui-monospace, monospace"
		text-anchor="middle">58.1 %RH</text
	>
	<rect x="140" y="200" width="10" height="20" rx="2" fill="#11213c" />
	<rect x="250" y="200" width="10" height="20" rx="2" fill="#11213c" />
</svg>
