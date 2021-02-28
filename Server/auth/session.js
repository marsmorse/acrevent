var session = require('express-session');
var redisStore = require('connect-redis')(session);
const redisClient = require('../redis.js')

module.exports = {
    createSession: (req, res, next) => {
        console.log("creating session");
        return session({
          secret: 'GirlsInPants62',
          store: new redisStore({ host:'localhost', port: 6379, client: redisClient, ttl: 60000 * 2 }),
          saveUninitialized: true,
          resave: false,
          cookie: { secure: false, maxAge: 60000 * 2 }
          });
        /* 
        req.body = {
                        uid: user[0].u_id,
                        email: user[0].email,
                        name: user[0].name,
                        city: user[0].city,
                        state: user[0].state
                    };
        */

    }
}