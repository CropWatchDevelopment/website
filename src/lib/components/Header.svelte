<script lang="ts">
import { page } from '$app/state';
import { afterNavigate } from '$app/navigation';

// 仮の日本連絡先（後で差し替え）— placeholder Japan contact details.
const JP = {
	tel: '080-4284-3390',
	telHref: 'tel:08042843390',
	email: 'sayaka@cropwatch.io'
};

const LOGO = '/cropwatch_icons/cropwatch_static.svg';

type Product = { href: string; icon: string; t: string; d: string };
type NavLink = { key: string; href: string; label: string; children?: Product[] };

const PRODUCTS: Product[] = [
	{ href: '/cold-chain', icon: 'ac_unit', t: 'コールドチェーン温度監視', d: '飲食店・ホテル・工場・倉庫' },
	{ href: '/livestock', icon: 'pets', t: 'スマート畜産・養鶏', d: '鶏舎・畜舎・酪農' },
	{ href: '/agriculture', icon: 'eco', t: 'スマート農業・ハウス', d: 'ハウス・露地・土壌' },
	{ href: '/replacement-sensors', icon: 'cable', t: '交換用センサー', d: '自分で交換・校正証明書つき' },
	{ href: '/replacement-case', icon: 'deployed_code', t: '交換用ケース', d: '頑丈な防塵防水ケース（3D）' }
];

const NAV: NavLink[] = [
	{ key: 'home', href: '/', label: 'ホーム' },
	{ key: 'products', href: '/sectors', label: '製品', children: PRODUCTS },
	{ key: 'tech', href: '/technology', label: '技術' },
	{ key: 'testimonials', href: '/testimonials', label: 'お客様の声' },
	{ key: 'help', href: '/help', label: 'ヘルプ' },
	{ key: 'contact', href: '/contact', label: 'お問い合わせ' }
];

const PRODUCT_PATHS = new Set(PRODUCTS.map((p) => p.href));

const activeKey = $derived.by(() => {
	const path = page.url.pathname.replace(/\/$/, '') || '/';
	if (path === '/') return 'home';
	if (PRODUCT_PATHS.has(path)) return 'products';
	if (path === '/technology') return 'tech';
	if (path === '/sectors') return 'sectors';
	if (path === '/testimonials') return 'testimonials';
	if (path === '/help') return 'help';
	if (path === '/contact') return 'contact';
	return '';
});

let mobileOpen = $state(false);

function openMenu() {
	mobileOpen = true;
	if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
}
function closeMenu() {
	mobileOpen = false;
	if (typeof document !== 'undefined') document.body.style.overflow = '';
}

afterNavigate(() => closeMenu());
</script>

<header class="hdr">
	<div class="hdr__top">
		<div class="wrap hdr__top-in">
			<div class="hdr__top-left">
				<span class="flag">🇯🇵</span><strong>CropWatch 日本</strong><span class="sep">|</span><span
					>産業用環境監視サービス</span
				>
			</div>
			<div class="hdr__top-links">
				<a class="hdr__phone" href={JP.telHref}>
					<span class="material-symbols-rounded">call</span>
					{JP.tel}
				</a>
				<a href="mailto:{JP.email}">
					<span class="material-symbols-rounded">mail</span>
					{JP.email}
				</a>
				<!-- <a class="hdr__lang" href="https://cropwatch.io">
					<span class="material-symbols-rounded">language</span> English
				</a> -->
			</div>
		</div>
	</div>

	<div class="hdr__bar">
		<div class="wrap hdr__main">
			<a class="brand" href="/" aria-label="CropWatch ホーム">
				<img src={LOGO} alt="CropWatch" class="brand__mark" />
				<span class="brand__txt">
					<span class="brand__name">CropWatch<sup>®</sup></span>
					<span class="brand__tag">クロップウォッチ 日本</span>
				</span>
			</a>

			<nav class="nav" aria-label="メインメニュー">
				{#each NAV as item (item.key)}
					{#if item.children}
						<div class="navdrop">
							<a class="nav__item" class:is-current={activeKey === item.key} href={item.href}>
								{item.label}
								<span class="material-symbols-rounded">expand_more</span>
							</a>
							<div class="pd">
								{#each item.children as p (p.href)}
									<a class="pd__item" href={p.href}>
										<span class="pd__ic"><span class="material-symbols-rounded">{p.icon}</span></span>
										<span class="pd__tx"><b>{p.t}</b><span>{p.d}</span></span>
									</a>
								{/each}
							</div>
						</div>
					{:else}
						<a class="nav__item" class:is-current={activeKey === item.key} href={item.href}>
							{item.label}
						</a>
					{/if}
				{/each}
			</nav>

			<div class="hdr__actions">
				<a href="https://app.cropwatch.io" class="util">
					<span class="material-symbols-rounded">exit_to_app</span> アプリ
				</a>
				<a href="/contact" class="btn btn--accent">相談予約</a>
				<button class="burger" type="button" aria-label="メニューを開く" onclick={openMenu}>
					<span class="material-symbols-rounded">menu</span>
				</button>
			</div>
		</div>
	</div>
</header>

<div class="m-menu" hidden={!mobileOpen} onclick={(e) => { if (e.target === e.currentTarget) closeMenu(); }} role="presentation">
	<div class="m-menu__panel">
		<div class="m-menu__head">
			<b>メニュー</b>
			<button class="m-close" type="button" aria-label="閉じる" onclick={closeMenu}>
				<span class="material-symbols-rounded">close</span>
			</button>
		</div>
		<nav>
			{#each NAV as item (item.key)}
				{#if item.children}
					<div class="m-group">
						<a class="m-link" href={item.href} onclick={closeMenu}>{item.label}</a>
						{#each item.children as p (p.href)}
							<a class="m-sub" href={p.href} onclick={closeMenu}>
								<span class="material-symbols-rounded">{p.icon}</span>{p.t}
							</a>
						{/each}
					</div>
				{:else}
					<a class="m-link" href={item.href} onclick={closeMenu}>{item.label}</a>
				{/if}
			{/each}
			<a class="btn btn--accent btn--lg" style="width:100%;margin-top:18px" href="/contact" onclick={closeMenu}>
				無料デモを予約
			</a>
			<div class="m-util">
				<a href="https://app.cropwatch.io"><span class="material-symbols-rounded">exit_to_app</span> アプリを開く</a>
				<a href={JP.telHref}><span class="material-symbols-rounded">call</span> {JP.tel}</a>
				<a href="mailto:{JP.email}"><span class="material-symbols-rounded">mail</span> {JP.email}</a>
				<a href="https://cropwatch.io"><span class="material-symbols-rounded">language</span> English site</a>
			</div>
		</nav>
	</div>
</div>
