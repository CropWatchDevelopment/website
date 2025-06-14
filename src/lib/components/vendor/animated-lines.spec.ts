const globalAny: any = globalThis as any;
if (!globalAny.window) { globalAny.window = { addEventListener() {}, removeEventListener() {} }; }

import { describe, it, expect } from 'vitest';
import LinkedParticles from './animated-lines.js';

describe('LinkedParticles', () => {
  it('initializes with the correct number of points', () => {
    const ctx = {
      canvas: {
        width: 100,
        height: 100,
        addEventListener() {},
        removeEventListener() {}
      },
      clearRect() {},
      fillRect() {},
      beginPath() {},
      moveTo() {},
      lineTo() {},
      stroke() {},
      closePath() {},
      fill() {},
      arc() {},
      createLinearGradient() { return { addColorStop() {} }; }
    } as unknown as CanvasRenderingContext2D;

    const lp = new (LinkedParticles as any)(ctx);
    expect(lp.points.length).toBe(lp.points_count);
  });
});
