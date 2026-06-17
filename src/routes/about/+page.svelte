<script lang="ts">
	import kevinImage from '$lib/images/team/Kevin_Cantrell.jpeg';
	import sigurdImage from '$lib/images/team/Sigurd_Øyen.jpeg'; // i18n-ignore
	import joseImage from '$lib/images/team/Jose_Ramiro_Zuniga.jpg'; // i18n-ignore
	import sayakaImage from '$lib/images/team/Sayaka.png'; // i18n-ignore
	import sedarImage from '$lib/images/team/Sedar_Korur.jpg'; // i18n-ignore
	import efecanImage from '$lib/images/team/Efecan_Hepaksaz.webp'; // i18n-ignore

	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	type Leader = {
		name: string;
		title: string;
		bio: string;
		src?: string;
		avatarAlt: string;
		initials: string;
		linkedinUrl?: string;
		githubUrl?: string;
		websiteUrl?: string;
	};

	/* i18n-ignore leadership roster strings */
	type LeaderSource = Leader & {
		nameByLocale?: Partial<Record<string, string>>;
	};

	const leadershipTeamSource: LeaderSource[] = [
		{
			name: '🇺🇸 Kevin Cantrell', // i18n-ignore
			title: 'Founder & Developer', // i18n-ignore
			bio: 'Founder of CropWatch and lead developer of its core technologies.', // i18n-ignore
			src: kevinImage,
			avatarAlt: 'Placeholder portrait illustration for Kevin Cantrell', // i18n-ignore
			initials: 'KC',
			linkedinUrl: 'https://www.linkedin.com/in/cropwatch/',
			githubUrl: 'https://github.com/kevin192291'
		},
		{
			name: '🇯🇵 Sayaka Cantrell', // i18n-ignore
			nameByLocale: { ja: '🇯🇵 池水 彩' },
			title: 'Business Leader', // i18n-ignore
			bio: 'Responsible for business operations and strategy, driving growth and market presence for CropWatch.', // i18n-ignore
			src: sayakaImage,
			avatarAlt: 'Placeholder portrait illustration for Sayaka Cantrell', // i18n-ignore
			initials: 'SC',
			linkedinUrl: 'https://www.linkedin.com/in/sayaka-ikemizu-694b17276/'
		},
		{
			name: '🇳🇴 Sigurd Øyen', // i18n-ignore
			title: 'Electrical Engineer', // i18n-ignore
			bio: 'Sigurd has engineered the hardware of CropWatch’s sensor networks from the beginning, ensuring robust and reliable performance in diverse environments.', // i18n-ignore
			src: sigurdImage,
			avatarAlt: 'Placeholder portrait illustration for Sigurd Øyen', // i18n-ignore
			initials: 'SO',
			linkedinUrl: 'https://www.linkedin.com/in/sigurd-%C3%B8yen-78688899/'
		},
		{
			name: '🇭🇳 Jose Ramiro Zuniga', // i18n-ignore
			title: 'Frontend Developer & Designer', // i18n-ignore
			bio: 'Jose is responsible for the design and user experience of CropWatch’s web applications, bringing a user-centered approach to the platform.', // i18n-ignore
			src: joseImage,
			avatarAlt: 'Placeholder portrait illustration for Jose Ramiro Zuniga', // i18n-ignore
			initials: 'JRZ',
			linkedinUrl: 'https://www.linkedin.com/in/jose-ramiro-zuniga',
			githubUrl: 'https://github.com/jramiroz98',
			websiteUrl: 'https://jramiroz98.github.io/my-portfolio/'
		},
		{
			name: '🇵🇱 Sedar Korur', // i18n-ignore
			title: 'API/Backend Developer', // i18n-ignore
			bio: 'Sedar is responsible for developing and maintaining the backend systems and APIs that power CropWatch’s data services.', // i18n-ignore
			src: sedarImage,
			avatarAlt: 'Placeholder portrait illustration for Sedar Korur', // i18n-ignore
			initials: 'SK',
			githubUrl: 'https://github.com/korur',
			websiteUrl: 'https://datavisualizationwithsvelte.com/'
		},
		{
			name: '🇹🇷 Efecan Hepaksaz', // i18n-ignore
			title: 'Mechanical Engineer & CAD Designer', // i18n-ignore
			bio: 'Efecan is our CAD designer, He carefully designs and builds our Injection Molding jigs, Cases, and Enclosures to be the highest quality.', // i18n-ignore
			src: efecanImage,
			avatarAlt: 'EH', // i18n-ignore
			initials: 'EH',
			websiteUrl: 'https://www.xazdesign.com/'
		}
	];

	function getLeaderName(leader: LeaderSource): string {
		return leader.nameByLocale?.ja ?? leader.name;
	}
</script>

<svelte:head>
	<title>CropWatch について | 信頼性を追求した産業用 IoT</title>
	<meta name="description" content="CropWatch のミッション、リーダーシップ、マイルストーンをご紹介。コールドストレージ、ホスピタリティ、製造業向けに堅牢な IoT ネットワークを提供しています。" />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,83,135,0.25),transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					私たちのストーリー
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					今に至るまで
				</h1>
				<p class="text-base text-white/80">私たちは、過酷な農業環境でも確実に動作するデバイスの開発から事業をスタートしました。その過程で、「高い信頼性」「正確な測定」「使いやすさ」、そして「電波が届きにくい場所でも安定する通信」といった考え方が、他の産業分野でも強く求められていることに気づきました。</p>
				<p class="text-base text-white/80">現在、CropWatch はコールドチェーン、宿泊・観光施設、製造業、農業など、さまざまな現場の運用を支え、コンプライアンスと業務効率を両立する堅牢な IoT ネットワークを提供しています。私たちの使命は創業当初から変わりません。環境を問わず、信頼できるデータと実用的な知見を現場に届けるIoTソリューションを提供することです。</p>
				<div class="grid gap-4 text-sm text-white/80 md:grid-cols-2">
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
							99.98% の稼働率
						</p>
						<p class="mt-2 text-base font-semibold text-white">
							24/7 のオペレーションチームが支援
						</p>
					</div>
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
							世界 6 拠点
						</p>
						<p class="mt-2 text-base font-semibold text-white">
							常時監視されるセンサーフリート
						</p>
					</div>
				</div>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">事業内容</h2>
				<p class="mt-3 text-sm text-white/70">CropWatchは、屋内・屋外を問わず、現場で信頼できる環境データを収集・可視化するIoT監視・管理サービスを提供しています。</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>環境データ測定・収集</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>データ可視化クラウドサービス提供</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>環境センサー開発・販売</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			リーダーシップ
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">すべての展開を導く経験豊富なオペレーター</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">CropWatchの開発に取り組んでいる高度なスキルを持ったスタッフを紹介します。</p>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each leadershipTeamSource as leader (leader.initials)}
				<article
					class="flex h-full flex-col justify-between rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-20 w-20 items-center justify-center rounded-full text-xl font-semibold text-white"
							style="background-image: linear-gradient(to bottom right, #11213c, #2f5387, #f2a516);"
						>
							{#if leader.src}
								<img
									src={leader.src}
									alt={leader.avatarAlt}
									class="h-20 w-20 rounded-full object-cover"
								/>
							{:else}
								<span aria-hidden="true">{leader.initials}</span>
								<span class="sr-only">{leader.avatarAlt}</span>
							{/if}
						</div>
						<div>
							<p class="text-base font-semibold text-[#0b1730]">{getLeaderName(leader)}</p>
							<p class="text-sm font-medium tracking-[0.18em] text-[#2f5387] uppercase">
								{leader.title}
							</p>
						</div>
					</div>
					<p class="mt-4 text-sm text-[#1c2d52]/80">{leader.bio}</p>
					<div class="mt-6 flex flex-wrap gap-3">
						{#if leader.linkedinUrl}
							<a
								href={leader.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#2f5387]/30 px-4 py-2 text-sm font-medium text-[#2f5387] transition hover:border-[#2f5387] hover:bg-[#2f5387] hover:text-white"
									aria-label={`Open ${getLeaderName(leader)}'s LinkedIn profile`}
								>
								<span aria-hidden="true" class="text-base font-semibold">in</span>
								<span>LinkedIn</span>
							</a>
						{/if}
						{#if leader.githubUrl}
							<a
								href={leader.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#0b1730]/30 px-4 py-2 text-sm font-medium text-[#0b1730] transition hover:border-[#0b1730] hover:bg-[#0b1730] hover:text-white"
									aria-label={`Open ${getLeaderName(leader)}'s GitHub profile`}
								>
								<MaterialIcon name="code" class="text-base font-semibold" />
								<span>GitHub</span>
							</a>
						{/if}
						{#if leader.websiteUrl}
							<a
								href={leader.websiteUrl}
								target="_blank"
								rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#0b1730]/30 px-4 py-2 text-sm font-medium text-[#0b1730] transition hover:border-[#0b1730] hover:bg-[#0b1730] hover:text-white"
									aria-label={`Open ${getLeaderName(leader)}'s GitHub profile`}
								>
								<MaterialIcon name="language" class="text-base font-semibold" />
								<span>Website</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
