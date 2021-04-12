var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');
//var session = require('express-session');

const { session, redisStore, redisClient, rstore} = require('./redisSession');
var uuid = require('uuid');

//var passport = require('./auth/passport-login');
const passport = require('passport');
const User = require('./models/user_model.js')
const LocalStrategy = require('passport-local').Strategy;






var app = express();
var dev = require('./devModel');
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
  Middleware functions
*/
var config = require('./config/config');



app.use(session({
    genid : function(req) {
      return uuid.v4();
    },
    secret: config.secret,
    store: rstore,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 10 } //10 minutes
    })
);

/*
middleware that retrieves the user id from the session store
*/
app.use( (req, res, next) => {
  rstore.get(`${req.sessionID}`, (error, session) => {
    if (error) {
        console.log(error);
        res.status(400).send(`Must log in to request profile info\n`);
    } else {
        if (!session) {
          console.log(chalk.bgCyan('session not found'));
        } else {
          console.log(chalk.bgCyan('session found'));
          console.log(session);
          req.uid = session.user.uid;
          req.city = session.user.city;
          req.state = session.user.state;
        }
        console.log(`uid in middleware = ${req.uid}`)
        next()
    }
    
  })
})
/*
Routers
*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var creativesRouter = require('./routes/creative');
var eventsRouter = require('./routes/event');
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
