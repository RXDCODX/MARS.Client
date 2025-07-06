import { getVideoPath, videoAssets } from './videoAssets';

describe('videoAssets', () => {
  test('should have cirno video asset', () => {
    expect(videoAssets.cirno).toBeDefined();
    expect(typeof videoAssets.cirno).toBe('string');
    expect(videoAssets.cirno.length).toBeGreaterThan(0);
  });

  test('should have reimu video asset', () => {
    expect(videoAssets.reimu).toBeDefined();
    expect(typeof videoAssets.reimu).toBe('string');
    expect(videoAssets.reimu.length).toBeGreaterThan(0);
  });

  test('getVideoPath should return correct paths', () => {
    expect(getVideoPath('cirno')).toBe(videoAssets.cirno);
    expect(getVideoPath('reimu')).toBe(videoAssets.reimu);
  });

  test('getVideoPath should return fallback path for invalid video names', () => {
    // @ts-ignore - testing invalid input
    const result = getVideoPath('invalid');
    expect(result).toBe('./FumosVideos/invalid.webm');
  });
}); 