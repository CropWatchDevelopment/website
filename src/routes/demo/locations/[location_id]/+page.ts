import type { PageLoad } from './$types';

/** The demo locations are a fixed list; the page resolves its location from the param. */
export const load: PageLoad = ({ params }) => {
	return { locationId: Number(params.location_id) };
};
