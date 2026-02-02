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

// Only create ratelimiter if Redis is available
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '20 s'),
    })
  : null;
