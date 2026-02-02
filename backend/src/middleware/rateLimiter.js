import { ratelimit } from '../config/upstash.js';

export default async function rateLimit(req, res, next) {
  if (!ratelimit) return next(); // skip if Redis is down

  try {
    // use IP as unique key
    const ip = req.ip;
    const { success, limit, reset } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: 'Too many requests, please try again later',
        limit,
        reset,
      });
    }

    next();
  } catch (error) {
    console.error('⚠️ Rate limiter error:', error);
    next(); // allow requests even if Redis fails
  }
}




        

