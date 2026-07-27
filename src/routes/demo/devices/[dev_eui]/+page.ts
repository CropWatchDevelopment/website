import type { PageLoad } from './$types';

/**
 * The demo fleet is a fixed, hard-coded list, so the page resolves the device
 * from the route param itself rather than fetching anything. Passing the param
 * through a load keeps the component free of `$app/state` reads.
 */
export const load: PageLoad = ({ params }) => {
	return { devEui: params.dev_eui };
};
