function timeSleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

module.exports = timeSleep;
