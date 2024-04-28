<script lang="ts">
	import {
		AppBar,
		AppLayout,
		Card,
		Button,
		NavItem,
		Tooltip,
		settings,
		Toggle,
		Menu,
		MenuItem,
		Dialog,
		Icon,
		SelectField,
		cls
	} from 'svelte-ux';
	import {
		mdiAccountBadge,
		mdiAccountLock,
		mdiAccountLockOpen,
		mdiDotsGrid,
		mdiFire,
		mdiLinkedin,
		mdiStore
	} from '@mdi/js';

	import '../app.postcss';
	import Footer from '$lib/components/Footer.svelte';
	import CropWatchSVG from '$lib/images/cropwatch.svg';

	settings({
		components: {
			AppBar: {
				classes: 'bg-primary text-white shadow-md'
			},
			AppLayout: {
				classes: {
					nav: 'bg-neutral-800'
				}
			},
			NavItem: {
				classes: {
					root: 'text-sm text-gray-400 pl-6 py-2 hover:text-white hover:bg-gray-300/10 [&:where(.is-active)]:text-sky-400 [&:where(.is-active)]:bg-gray-500/10'
				}
			}
		}
	});

	const handleChange = ({ currentTarget }) => {
		const { value } = currentTarget;
		document.cookie = `lang=${value} ;`;
	};
</script>

<AppLayout navWidth={0} classes={{ root: 'elevation-0' }}>
	<AppBar>
		<div slot="title" class="flex">
			<img src={CropWatchSVG} class="mr-3 h-6 sm:h-9" alt="CropWatch Company Icon" />
			<span class="hidden md:inline-block translate-y-1/4">CropWatch</span>
		</div>
		<div slot="actions" class="flex gap-3">
			<Tooltip>
				<!-- <select bind:value={$locale} on:change={handleChange}>
					{#each $locales as value}
						<option {value} selected={$locale === value}>{$t(`lang.${value}`)}</option>
					{/each}
				</select> -->

				<!-- <SelectField
					options={$locales.map((m) => {
						return { label: m, value: m };
					})}
					bind:value={$locale}
					activeOptionIcon={true}
				>
					<div slot="option" let:option let:index let:selected let:highlightIndex>
						<MenuItem
							class={cls(
								index === highlightIndex && 'bg-surface-content/5',
								option === selected && 'font-semibold',
								option.group ? 'px-4' : 'px-2'
							)}
							scrollIntoView={index === highlightIndex}
							icon={{ data: (option.value == 'en' ? mdiFire : mdiLinkedin), style: 'color: #0000FF;' }}
						>
							{option.label}
						</MenuItem>
					</div>
				</SelectField> -->
			</Tooltip>
			<!-- <Tooltip title="CropWatch Web Store" placement="bottom" offset={2}>
				<Button icon={mdiStore} href="#" class="p-2" target="_blank" />
			</Tooltip> -->

			<Tooltip title="Open LinkedIn" placement="bottom" offset={2}>
				<Button
					icon={mdiLinkedin}
					href="https://www.linkedin.com/company/cropwatch-system/"
					class="p-2"
					target="_blank"
				/>
			</Tooltip>

			<Tooltip title="CropWatch Github" placement="bottom" offset={2}>
				<Button
					icon="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
					href="https://github.com/CropWatchDevelopment/"
					class="p-2"
					target="_blank"
				/>
			</Tooltip>

			<Tooltip title="Login to Services" placement="left" offset={2}>
				<Toggle let:on={open} let:toggle={toggleDialog}>
					<Button on:click={toggleDialog} icon={mdiDotsGrid} />
					<Dialog {open} on:close={toggleDialog} persistent>
						<div slot="title">
							<Icon data={mdiAccountLockOpen} />
							App Login Selection
						</div>
						<div class="grid grid-cols-1 grid-rows-2 h-40 p-2 gap-2">
							<a href="https://app.cropwatch.io/auth/login">
								<div
									class="w-fit h-fit rounded-xl bg-emerald-900 p-2 hover:scale-105"
									style="min-width: 30px min-height: 30px;"
								>
									<img src={CropWatchSVG} class="w-10 mx-auto" />
									<p class="text-center text-xs mt-1 text-slate-300">Agri-Watch</p>
								</div>
							</a>

							<!-- <div
								class="w-fit h-fit rounded-xl bg-blue-900 p-2 hover:scale-105"
								style="min-width: 30px min-height: 30px;"
							>
								<img src={CropWatchSVG} class="w-10 mx-auto" />
								<p class="text-center text-xs mt-1 text-slate-300">WaterWatch</p>
							</div>

							<div
								class="w-fit h-fit rounded-xl bg-red-500 p-2 hover:scale-105"
								style="min-width: 30px min-height: 30px;"
							>
								<img src={CropWatchSVG} class="w-10 mx-auto" />
								<p class="text-center text-xs mt-1 text-black-300">FireWatch</p>
							</div> -->
						</div>
						<div slot="actions">
							<Button variant="fill" color="primary">Close</Button>
						</div>
					</Dialog>
				</Toggle>
			</Tooltip>
		</div>
	</AppBar>

	<div>
		<slot />
		<Footer />
	</div>
</AppLayout>
