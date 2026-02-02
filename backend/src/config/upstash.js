import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

let redis;
try {
  redis = Redis.fromEnv();
} catch (error) {
  console.error('⚠️ Redis not available:', error.message);
  redis = null;
}

// Only use ratelimit if Redis is available
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '20 s'),
    })
  : null;

export default async function rateLimiter(req, res, next) {
  if (!ratelimit) return next(); // skip if Redis is down

  try {
    await ratelimit.limit(req, res);
    next();
  } catch (error) {
    console.error('⚠️ Rate limiter error:', error.message);
    next(); // allow requests even if Redis fails
  }
}
