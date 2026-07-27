/**
 * Port of CropWatch/src/lib/utils/clientTableLoader.ts (plus the sortByColumn
 * comparator it depends on), trimmed to the options the demo tables use.
 */

import type { CwTableQuery, CwTableResult } from '@cropwatchdevelopment/cwui';

export type SortDirection = 'asc' | 'desc';

/**
 * Generic column comparator for in-memory table rows: numbers (and booleans)
 * compare numerically, everything else falls back to a locale-aware string
 * comparison. Returns a new sorted array; the input is not mutated.
 */
export function sortByColumn<T>(rows: readonly T[], column: string, direction: SortDirection): T[] {
	const dir = direction === 'asc' ? 1 : -1;

	return [...rows].sort((a, b) => {
		const left = (a as unknown as Record<string, unknown>)[column];
		const right = (b as unknown as Record<string, unknown>)[column];

		if (typeof left === 'boolean' && typeof right === 'boolean') {
			return (Number(left) - Number(right)) * dir;
		}

		if (typeof left === 'number' && typeof right === 'number') {
			return (left - right) * dir;
		}

		return String(left ?? '').localeCompare(String(right ?? '')) * dir;
	});
}

export interface ClientTableLoaderOptions<T> {
	/**
	 * Reverse the rows before filtering — for chronological sources rendered
	 * newest-first in the table.
	 */
	reverse?: boolean;
	/**
	 * Build the searchable text for a row (matched case-insensitively against
	 * the query). Omit for tables without a search box.
	 */
	searchText?: (row: T) => string;
	/** Loading-state callback, wired to the table's `loading` prop. */
	onLoadingChange?: (loading: boolean) => void;
}

/**
 * Build a `CwDataTable` `loadData` callback over an in-memory row set:
 * optional reverse → optional search filter → sort → slice to the page.
 *
 * `getRows` is invoked on every query, so reactive (`$derived`) row sources
 * stay live without re-creating the loader.
 */
export function createClientTableLoader<T>(
	getRows: () => readonly T[],
	options: ClientTableLoaderOptions<T> = {}
): (query: CwTableQuery) => Promise<CwTableResult<T>> {
	return async (query) => {
		options.onLoadingChange?.(true);
		try {
			let rows = [...getRows()];
			if (options.reverse) rows.reverse();

			const search = query.search?.trim().toLowerCase();
			if (search && options.searchText) {
				const { searchText } = options;
				rows = rows.filter((row) => searchText(row).toLowerCase().includes(search));
			}

			if (query.sort) {
				rows = sortByColumn(rows, query.sort.column, query.sort.direction);
			}

			const start = Math.max(0, (query.page - 1) * query.pageSize);
			return { rows: rows.slice(start, start + query.pageSize), total: rows.length };
		} finally {
			options.onLoadingChange?.(false);
		}
	};
}
