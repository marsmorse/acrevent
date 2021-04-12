var session = require('express-session');
var redis = require("redis");
var redisStore = require('connect-redis')(session);
var config = require('./config/config');

var redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});
var rstore = new redisStore({ host: config.redis.host, port: config.redis.port, client: redisClient });

module.exports = {
    session,
    redisStore,
    redisClient,
    rstore
}