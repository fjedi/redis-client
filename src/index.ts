import { promisifyAll } from 'bluebird';
import {
  createClient as createRedisClient,
  RedisClient as Client,
  ClientOpts as Options,
} from 'redis';

//
export const { REDIS_HOST = '127.0.0.1', REDIS_PORT = 6379 } = process.env;

type Units = 'PX' | 'EX';
type Period = number;
type Value = string | number;

export type RedisClient = Client & {
  setAsync(key: string, value: Value, units?: Units, period?: Period): Promise<void>;
  getAsync(key: string): Promise<string>;
  options: Options;
};

// Create client to work with Redis database
promisifyAll(Client.prototype);
export const redis = createRedisClient({
  host: `${REDIS_HOST}`,
  port: parseInt(`${REDIS_PORT}`, 10),
}) as RedisClient;

export function createClient(options: Options): RedisClient {
  return createRedisClient({
    host: `${REDIS_HOST}`,
    port: parseInt(`${REDIS_PORT}`, 10),
    ...(options ?? {}),
  }) as RedisClient;
}

export default redis;
