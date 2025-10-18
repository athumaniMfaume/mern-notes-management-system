import ratelimit from '../config/upstash.js';


const rateLimit = async (req, res, next) => {   
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({message: 'Too many requests, please try again later'});
        }
        next();
    } catch (error) {
        console.log('error in rateLimiter middleware', error);
        next(error); // allow the request if there's an error with rate limiting service
    }
    
}
export default rateLimit;



        

