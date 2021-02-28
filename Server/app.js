var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var chalk = require('chalk');
var session = require('express-session');
var redis = require("redis");
var redisStore = require('connect-redis')(session);
var redisClient = redis.createClient();
var uuid = require('uuid');
var config = require('./config/config');
//var passport = require('./auth/passport-login');
const passport = require('passport');
const User = require('./models/user_model.js')
const LocalStrategy = require('passport-local').Strategy;

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});




var app = express();
var dev = require('./devModel');
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
  Middleware functions
*/
app.use(session({
    genid : function(req) {
      return uuid.v4();
    },
    secret: config.secret,
    store: new redisStore({ host: config.redis.host, port: config.redis.port, client: redisClient }),
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false, maxAge: 60000 * 5 } //five minutes
    })
);

/*
Routers
*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/event');
var creativesRouter = require('./routes/creative');
var devRouter = require('./routes/dev');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/creatives', creativesRouter);
app.use('/dev', devRouter);



/*
Redis
*/






/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n');
})


module.exports = app;
