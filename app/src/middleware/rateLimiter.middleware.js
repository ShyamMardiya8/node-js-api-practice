// const requestCount = new Map();

// const customRateLimiter = (options) => {
//   const windowMs = options.windowMs || 60 * 1000;
//   const maxRequest = options.max || 100;
//   const message = options.message || "Too many request please try again later";

//   return (req, res, next) => {
//     const ip = req.ip;
//     if (!requestCount.has(ip)) {
//       requestCount.set(ip, { count: 0, lastReset: Date.now() });
//     }

//     const clientData = requestCount.get(ip);
//     const currentTime = Date.now();
//     if (currentTime - clientData.lastReset > windowMs) {
//       clientData.count = 0;
//       clientData.lastReset = currentTime;
//     }
//     clientData.count++;
//     if (clientData.count) {
//     }
//   };
// };
