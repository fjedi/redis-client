import { Promise } from 'bluebird';
import {
  createClient as createRedisClient,
  RedisClient as Client,
  ClientOpts as Options,
} from 'redis';

//
const { REDIS_HOST = '127.0.0.1', REDIS_PORT = 6379 } = process.env;

type Units = 'PX' | 'EX';
type Period = number;
type Value = string | number;

export type RedisClient = Client & {
  setAsync(key: string, value: Value, units?: Units, period?: Period): Promise<void>;
  getAsync(key: string): Promise<string>;
  options: Options;
};

// Create client to work with Redis database
Promise.promisifyAll(Client.prototype);
export const redis = createRedisClient({
  host: `${REDIS_HOST}`,
  port: parseInt(`${REDIS_PORT}`, 10),
}) as RedisClient;

export default redis;
