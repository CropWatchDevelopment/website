// The .io US/Global marketing site is fully static - prerender every route
// for fast first paint and clean SEO. (Vercel adapter serves these as static
// assets.) Override per-route if a page later needs server-side data.
export const prerender = true;
