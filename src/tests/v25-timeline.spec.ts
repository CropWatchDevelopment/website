import { describe, expect, it } from 'vitest';
import {
	DURATION,
	MIN_CAPTION,
	STEPS,
	STORY_DURATION,
	toPlayer,
	toStory
} from '$lib/components/v25-teardown/timeline';

const EPS = 1e-9;

describe('V25 teardown timeline', () => {
	it('keeps every caption on screen for at least MIN_CAPTION seconds', () => {
		STEPS.forEach((s, i) => {
			const shown = (STEPS[i + 1]?.t ?? DURATION) - s.t;
			expect(shown, `${s.title} / ${s.note}`).toBeGreaterThanOrEqual(MIN_CAPTION - EPS);
		});
	});

	it('has no empty captions', () => {
		for (const s of STEPS) {
			expect(s.title.trim(), `step at ${s.t}`).not.toBe('');
			expect(s.note.trim(), s.title).not.toBe('');
		}
	});

	it('maps the player clock onto the whole story, never running backwards', () => {
		expect(toStory(0)).toBe(0);
		expect(toStory(DURATION)).toBeCloseTo(STORY_DURATION, 9);
		let prev = 0;
		for (let t = 0; t <= DURATION; t += 0.01) {
			const s = toStory(t);
			expect(s).toBeGreaterThanOrEqual(prev - EPS);
			prev = s;
		}
	});

	it('round-trips story time through the player clock', () => {
		for (let s = 0; s <= STORY_DURATION; s += 0.05) {
			expect(toStory(toPlayer(s))).toBeCloseTo(s, 9);
		}
	});
});
