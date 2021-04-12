const passport = require('passport');
const User = require('../models/user_model.js')
const LocalStrategy = require('passport-local').Strategy;

const passport_init = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.getUserWithEmail(email).then( user => {
        if (!user) {
            return done(null, false, { message: 'Incorrect email' })
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
    }).catch( err => {
        return done(err);
    })
  }
))};

module.exports =  passport_init;