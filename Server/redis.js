var session = require('express-session');
var redis = require("redis");
var redisStore = require('connect-redis')(session);
var redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

module.exports = redisClient;
