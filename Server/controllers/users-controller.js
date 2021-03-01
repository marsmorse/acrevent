const User = require("../models/user_model")
const UserCreative = require('../models/user_creative_model');
const creative_model = require("../models/creative_model");
const chalk = require('chalk');
const crypto = require('crypto');
const cipher = require('../auth/id-cipher')
module.exports = {

    create: (req, res, next) => {
        if (!req.body.name || !req.body.password || !req.body.email || !req.body.city ) {
            console.log("missing input");
            return
        }
        let user_params = {
            email: req.body.email,
            name: req.body.name,
            //name : { first: req.body.first, last: req.body.last }
            password: req.body.password,
            city: req.body.city
        }
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        user_params.password = salt + "$" + hash;
        User.create(user_params).then( user => {
            if (user) {
                console.log(user);
                req.session.user = {};
                req.session.user.uid = user.u_id
                req.session.user.name = user.name;
                req.session.user.city = user.city;
                req.session.user.state = user.state;
                req.session.user.c_count = user.c_count;
                console.log(req.session.user);
                res.status(201).json(JSON.stringify(req.session.user));
            } else {
                res.status(400).send(`{ "errors": ["User created but not returned"]}`);
            }
        }).catch(error => {
            console.log(error);
             console.log(`❌ Error creating user: ${error.message}`);
             res.status(400).send(error);
        });

    },

    logIn: (req, res) => {
        console.log("logging in user");
        // Validation happens in middle ware function that comes before this
        let login_params = {
            email: req.body.email,
            password: req.body.password
        }
            req.session.user = {}
            req.session.user.uid = req.body.uid;
            req.session.user.name = req.body.name;
            req.session.user.city = req.body.city;
            req.session.user.state = req.body.state;

            req.session.cookie.uid = req.body.uid;
            req.session.uid = req.body.uid;
            req.session.name = req.body.name;
            req.session.city = req.body.city;
            req.session.state = req.body.state;
            res.status(200).json(JSON.stringify(req.session));

    },

    update: (req, res) => {
        /* 
            User.update(req.session.id(TOKEN), 'password', req.body.password).catch((err) => res.status(200).send(`Error: ${err.message}`))
        */

       let users = [req.body.newpass, session.name, session.city, session.state]
        User.update(15, req.body.newpass).then( data => {
            console.log(`✓`);
            res.status(200).send("✓\n");
        }).catch(error => {
             res.status(400).send(`❌ Error: ${error.message}\n`);
        });
    },

    updatePassword: (req, res) => {
        /* 
            User.update(req.session.id(TOKEN), 'password', req.body.password).catch((err) => res.status(200).send(`Error: ${err.message}`))
        */
       //if city and state are valid
       //(id, password, newpassword)
       if (req.session.id) {
            console.log(cipher.reveal(req.session.id));
            User.updatePassword(cipher.reveal(req.session.id), req.body.newpass).then( data => {
                
                res.status(200).send("✓\n");
            }).catch(error => {
                res.status(400).send(`❌ Error: ${error.message}\n`);
            });
       } else {
            res.status(400).send(`{ "errors": ["User not logged in"]}`);
       }
        
    },

    signOut: ((req, res) => {
        if (req.session.id) {
            req.session.destroy();
            //redirect to login page
            res.status(200).send('sign out succesfull');
        } else {
            res.status(400).send(`{ "errors": ["User not logged in"]}`);
        }
    }),

    getInfo: ((req, res) => {
        if (req.session.id) {
            User.get(/*req.session.sid*/15).then( data => {
                console.log(data);
                res.status(400).json(data);
            }).catch( error => {
                res.status(200).send(`❌ Error: ${error.message}\n`);
            })
        } else {
            res.status(200).send(`Must log in to request profile info\n`);
        }
    }),

    delete: ((req, res) => {
        if (req.session.id) {
            UserCreative.deleteAll(req.body.uid).then( data => {
                console.log("Delete all \n");
                User.destroy(req.body.uid).then( data => {
                    res.status(200).send(`${chalk.blue.bold('✓')} successfully deleted account with user id ${req.body.uid}`);
                }).catch( error => {
                    res.status(400).send(`❌ Error deleting all user_creatives: ${error.message}\n`);
                })
            }).catch(error => {
                res.status(400).send(`❌ Error deleting all user's creatives: ${error.message}\n`);
            });
        } else {
            res.status(400).send(`{ "errors": ["User not logged in"]}`);
        }
    })
}

