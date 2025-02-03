<script>
	// Example use cases array
	export let useCases = [
		{
			title: 'Hotel Room',
			image:
				'https://www.usatoday.com/gcdn/authoring/authoring-images/2024/05/26/USAT/73865433007-tempoby-hilton-nashville-standard-king.jpg?width=1733&height=1176&fit=crop&format=pjpg&auto=webp',
			alt: 'Use Case 1',
			challenges:
				'Detailing the challenges faced in this scenario, including obstacles and key pain points.',
			solution: 'Explaining our approach to overcoming these challenges with innovative solutions.',
			button: {
				text: 'Read More',
				link: '/readmore'
			}
		},
		{
			title: 'Super Market',
			image:
				'https://s.yimg.com/ny/api/res/1.2/ip1CHmVMTvxcRzO4Ar8Mew--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/insidermonkey.com/efdfeb0a3401696fb2fc224def7e8348',
			alt: 'Use Case 2',
			challenges: 'Exploring the common issues and complications encountered in this area.',
			solution: 'How our solutions address and resolve these issues efficiently.'
			// No button for this card
		},
		{
			title: 'School/Classroom',
			image:
				'https://www.acs.org/content/acs/en/education/policies/middle-and-high-school-chemistry/classroom/_jcr_content/bottomContent/columnsbootstrap/column1/image.scale.medium.1399.jpg/1574355187340.jpg',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Elderly Care',
			image: 'https://cdn.britannica.com/65/199365-050-3D2AB9D0/Residents-nursing-home-meal.jpg',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Poltry Farm',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8XmHx8QUxn1bkB5ip4kv5Y2gNIpDpQcMtuw&s',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Refridgeration Facility',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSakBYbr0IW28wFSAh7sFi3Pgvz8muUfiMiavvrt5OzWkvu0qEPqYD_oyyeWD4h7TLBea4&usqp=CAU',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Foristry & safety',
			image:
				'https://i.ytimg.com/vi/p_gfKiQmVMw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAD20fdjxTkI_HhKMNRjHySw0IMwA',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Factory Safety',
			image:
				'https://www.arup.com/globalassets/images/insights/publications/rethinking-the-factory-banner.jpg?width=760&quality=80',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		},
		{
			title: 'Farming & Soil monitoring',
			image:
				'https://www.tanyo.jp/wp/wp-content/themes/tanyo/assets/images/product/greenhouse/img_features-02.jpg',
			alt: 'Use Case 3',
			challenges: 'An overview of the specific challenges encountered in this scenario.',
			solution: 'How our strategy effectively tackles the identified challenges.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://www.youtube.com/watch?v=pa2iiDZOATY',
				external: true
			}
		},
		{
			title: 'Smoke/Fire monitor',
			image: 'https://www.onithome.com/wp-content/uploads/2021/06/home-smoke-detector.jpg',
			alt: 'Use Case 3',
			challenges:
				'While nearly all public builings have a fire system that can contact the fire department automatically, nearly no houses have this same safety measure.',
			solution:
				'We offer a solution that can be installed in any home, and can contact you, and others when smoke or fire is detected, reducing wait time between smoke and help leading to better protection of you, your family, pets, and property.',
			button: {
				text: 'Watch on YouTube',
				link: 'https://youtube.com/somevideo',
				external: true
			}
		}
	];
</script>

<h1 class="mb-8 mt-4 text-center text-6xl font-bold">Use Cases</h1>
<div class="mx-8 mb-4 grid grid-cols-1 gap-6 border-b border-t sm:grid-cols-2 lg:grid-cols-4">
	{#each useCases as useCase}
		<div class="flex flex-col overflow-hidden rounded-lg bg-slate-200 shadow">
			<!-- Image container with title overlay -->
			<div class="relative">
				<img src={useCase.image} alt={useCase.alt} class="h-52 w-full object-cover" />
				<div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
					<h2 class="text-lg font-semibold text-white">{useCase.title}</h2>
				</div>
			</div>
			<div class="flex-grow p-4">
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-gray-800">Challenges</h3>
					<p class="text-gray-600">{useCase.challenges}</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Solution</h3>
					<p class="text-gray-600">{useCase.solution}</p>
				</div>
			</div>
			{#if useCase.button}
				<div class="p-4 text-right">
					{#if useCase.button.external}
						<a
							href={useCase.button.link}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							{useCase.button.text}
						</a>
					{:else}
						<a
							href={useCase.button.link}
							class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							{useCase.button.text}
						</a>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<div class="flex items-center justify-center rounded-lg bg-slate-200 p-4 shadow">
		<span class="text-2xl font-semibold text-gray-500">More coming soon...</span>
	</div>
</div>
