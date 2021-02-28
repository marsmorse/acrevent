var config = {};

config.redis = {};
config.db = {};

config.uidTest = 35;

config.redis.host = 'localhost';
config.redis.port = 6379;

config.secret = 'GirlsInPants62';

config.db.user = 'api';
config.db.host = 'ec2-34-207-155-43.compute-1.amazonaws.com';
config.db.database = 'postgres';
config.db.password = 'SunM4n&51';
config.db.port = 5432;

module.exports = config;