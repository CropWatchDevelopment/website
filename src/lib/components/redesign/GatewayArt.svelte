<svg
	viewBox="0 0 400 400"
	style="width:100%; max-width:420px; margin:0 auto; display:block;"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<linearGradient id="gw-g" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#eef2fb" />
			<stop offset="100%" stop-color="#b8c5e3" />
		</linearGradient>
	</defs>
	{#each [60, 110, 160, 210] as r, i}
		<path
			d={`M${200 - r},200 A${r} ${r} 0 0 1 ${200 + r},200`}
			fill="none"
			stroke={`rgba(242,165,22,${0.5 - i * 0.1})`}
			stroke-width="1"
		/>
	{/each}
	<rect
		x="120"
		y="200"
		width="160"
		height="80"
		rx="8"
		fill="url(#gw-g)"
		stroke="#11213c"
		stroke-width="2"
	/>
	<line x1="180" y1="200" x2="170" y2="140" stroke="#11213c" stroke-width="4" stroke-linecap="round" />
	<line x1="220" y1="200" x2="230" y2="140" stroke="#11213c" stroke-width="4" stroke-linecap="round" />
	<circle cx="170" cy="140" r="5" fill="#f2a516" />
	<circle cx="230" cy="140" r="5" fill="#f2a516" />
	{#each [0, 1, 2, 3] as i}
		<circle cx={150 + i * 15} cy="240" r="3" fill={i < 3 ? '#72d9a2' : '#f2a516'} />
	{/each}
	<rect x="220" y="235" width="40" height="16" rx="2" fill="#0f1f3d" />
	<text
		x="200"
		y="275"
		text-anchor="middle"
		fill="#11213c"
		font-size="10"
		font-weight="700"
		font-family="ui-monospace, monospace">CW-GW-OUT</text
	>
</svg>
