const User = require("../models/user_model")
const crypto = require('crypto');

module.exports = {
    isEmailPasswordMatch: (req, res, next) => {
        User.findByEmail(req.body.email).then( user => {
            if (user[0]) {
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
                if (hash === passwordFields[1]) {
                    req.body = {
                        uid: user[0].u_id,
                        email: user[0].email,
                        name: user[0].name,
                        city: user[0].city,
                        state: user[0].state
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid email or password']});
                }
            } else {
                res.status(404).send({});
            }
        }).catch(error => {
            res.status(404).send({errors: ['email and password combination not found']});
        })
    }

}