import ioredis, { RedisOptions, RedisKey, RedisValue } from 'ioredis';

// Get Redis configuration from environment variables
export const { REDIS_HOST = '127.0.0.1', REDIS_PORT = '6379' } = process.env;

type Units = 'PX' | 'EX';
type Period = number;

type SetFunctionType = (
  key: RedisKey,
  value: string | Buffer | number,
  units: Units,
  periods: Period,
) => Promise<string>;

export class Redis extends ioredis {
  // Deprecated method, needed for backward compatibility
  getAsync(key: RedisKey): Promise<string | null> {
    return super.get(key);
  }
  // Deprecated method, needed for backward compatibility
  setAsync(key: RedisKey, value: RedisValue, units: Units, period: Period): Promise<string> {
    return (super.set as SetFunctionType)(key, value, units, period);
  }
}

export type RedisClient = Redis & {
  setAsync(key: RedisKey, value: RedisValue, units?: Units, period?: Period): Promise<void>;
  getAsync(key: RedisKey): Promise<string>;
  options: RedisOptions;
};

// Create a new Redis client instance
export const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
  // Include any additional options here
}) as RedisClient;

// Function to create a new Redis client with custom options
export function createClient(options: RedisOptions): RedisClient {
  return new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT, 10),
    ...options,
  }) as RedisClient;
}

export default redis;
