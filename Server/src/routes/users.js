var express = require('express');
const router = express.Router();
const user_controller =  require('../controllers/users-controller');
const user_verifier = require('../auth/user-verif.js');

/* GET user's information. */
router.get('/', user_controller.getInfo);

/* GET user's information from session */
router.get('/sessionLogin', user_controller.logInUserWithSessionCookie);

/*  Create new user. */
router.post('/register', user_controller.create);

/*  Log user in. */
router.post('/login', [user_verifier.isEmailPasswordMatch, user_controller.logIn]);

/* delete a user. */
router.delete('/', user_controller.delete);

/* update a password. */
router.post('/update', user_controller.updatePassword);

/* update a password. */
router.post('/signout', user_controller.signOut);

/* update a user's password. */
module.exports = router;

/* update a user's location. */

// Sample post for creating a new user
// curl -X POST http://localhost:5000/users -d "name=George&password=pw&city=lafayette&email=p@t.com"
// curl -X POST http://localhost:5000/users -d "name=Lenny&password=pw&city=lafayette&email=lenny@t.com"

// get user information request
// curl -X GET http://localhost:5000/users 