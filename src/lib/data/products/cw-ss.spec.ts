import { describe, it, expect } from 'vitest';
import cwSSProduct from './cw-ss';

describe('cwSSProduct', () => {
  it('includes basic product info', () => {
    expect(cwSSProduct.name).toBe('CropWatch Soil Sensor');
    expect(cwSSProduct.models[0].id).toBe('CW-SS-TMEPNPK');
  });

  it('lists standout features', () => {
    expect(cwSSProduct.standoutFeatures.length).toBeGreaterThan(0);
  });
});
