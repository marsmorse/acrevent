const { session, redisStore, redisClient, rstore} = require('../redisSession');

const uid = (req, res, next) => {
    rstore.get(`sess:${req.sessionID}`, (error, session) => {
        if (error) {
            console.log(error);
        } else {
            console.log(session);
        }
    })
}
module.exports = uid