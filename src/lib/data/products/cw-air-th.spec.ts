import { describe, it, expect } from 'vitest';
import cwAirThProduct from './cw-air-th';

describe('cwAirThProduct', () => {
  it('includes basic product info', () => {
    expect(cwAirThProduct.name).toBe('CropWatch Air Temperature & Humidity Sensor');
    expect(cwAirThProduct.models[0].id).toBe('CW-AIR-TH');
  });

  it('lists standout features', () => {
    expect(cwAirThProduct.standoutFeatures.length).toBeGreaterThan(0);
  });
});
