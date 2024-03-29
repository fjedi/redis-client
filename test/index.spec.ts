import { redis } from '../src';

const CACHE_KEY = 'test_cache_key';
const CACHED_VALUE = 'test_cache_value';

describe('Test caching database', function () {
  beforeAll(async () => {
    console.log('Emit beforeAll test-hook');
  });

  afterAll(async () => {
    console.log('Emit afterAll test-hook');
    redis.disconnect();
  });

  it('Save value to cache', async function () {
    const result = await redis.set(CACHE_KEY, CACHED_VALUE);

    expect(result).toBe('OK');
  });

  it('Get value from cache', async function () {
    const result = await redis.get(CACHE_KEY);

    expect(result).toBe(CACHED_VALUE);
  });
});
