const Creative = require("../models/creative_model")
const User = require('../models/user_model')
var chalk = require('chalk');
const UserCreative = require('../models/user_creative_model');
const cipher = require('../auth/id-cipher');
const { session, redisStore, redisClient, rstore} = require('../redisSession');
const eventController = require('./event-controller');

const config = require('../config/config');
const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://api.songkick.com/api/3.0/',
    timeout: 2000
  });

module.exports = {
    validArtist: (req, res, next) => {
        if (req.body.name) {
            instance.get(`/search/artists.json?apikey=${config.songkickAPIkey}&query=${req.body.name}`)
            .then(function (response) {
                // handle success
                console.log(response.data.resultsPage.results.artist);
                console.log(response.data.resultsPage.results.artist[0].id);
                req.body.songkickArtistID = response.data.resultsPage.results.artist[0].id;
                req.body.name = response.data.resultsPage.results.artist[0].displayName;
                next();
            }) 
            .catch( (err) => {
                console.log(err);
                res.status(404).send();
            })
        } else {
            res.status(400).send();
        }
    },
    /* returns an all creatives for a user*/
    getCreatives: (req, res) => {           
        Creative.getAllUserCreatives(req.session.uid).then( data => {
            res.status(200).json(data);
        }).catch( error => {
            console.log(`❌ Error: ${error.message}`);
            res.status(400).send(`❌ Error: ${error.message}`);
        })
    },

    addCreative: (req, res) => {
                let uid = req.uid;
                console.log(req.body);
                let creative_name = req.body.name;
                console.log(creative_name);
                Creative.get(creative_name).then( data => {
                    // if creatives exists in db already
                    if (data.length >= 1) {
                        Creative.addUserCreative(data[0].c_id, uid).then( cid => {
                            console.log(`SUCCESS 👍🏻: ${creative_name} added`);
                            eventController.getArtistEvents();
                            //res.status(201).json(`SUCCESS 👍🏻: ${creative_name} added`);
                        }).catch( error => {
                            console.log(`❌ Error adding user_creative for creative with user with id ${uid} : ${error.message}\n`);
                            res.json({error: `User already has creative`, code: 400});
                        })
                    } else { //creative not in database yet
                        Creative.create({name: creative_name, type:'music'}).then( cinfo => {
                            Creative.addUserCreative(cinfo.c_id, uid).then( dbresult => {
                                eventController.getArtistEvents();
                                console.log(`SUCCESS 👍🏻: ${creative_name} added`);
                                //res.status(201).json(`SUCCESS 👍🏻: ${creative_name} added`);
                             }).catch( error => {
                                console.log(`❌ Error adding user_creative for creative ${cinfo.name} with user with id${uid}: ${error.message}\n`)
                                res.status(400).send(`❌ Error adding user_creative for creative ${cinfo.name} with user with id${uid}: ${error.message}\n`);
                            })
                        }).catch( error => {
                            console.log(`Couldn't create new Creative: ${error}\n`)
                            res.status(400).send(`❌ Error adding user_creative for creative ${ creative_name } with user with id ${uid}: ${error.message}\n`);
                        })
                    }
                }).catch( error => {
                    res.status(400).send(`❌ Error with getting creative: ${error.message}\n`);
                })
    },

    removeCreative: (req, res) => {
        //get user_count of creative from name (because it's unique)
        if (req.session.id) {
            const name = req.body.name;
            console.log(name);
            Creative.get(name).then( data => {
                let uid = 35;
                if (data.length > 0) {
                    let creative_info = data[0]
                    //check if user has creative in user_creatives table
                    UserCreative.getUserCreative(creative_info.c_id, uid).then( data => {
                        console.log(data);
                        if (data.length > 0) {
                            console.log( `userid ${uid}, cid ${creative_info.c_id}`)
                            UserCreative.deleteUserCreative(creative_info.c_id, uid).then( data => {
                                    res.status(200).send("UserCreative Deleted and creative deleted\n")
                            }).catch( error => {
                                console.log(`❌ ERROR: ${error.message}`)
                                res.status(400).send(`❌ Error deleting user_creative with user ${uid}: ${error.message}\n`);
                            }) 
                        } else {
                            console.log(`❌ ERROR: user_creative not found from DB request`)
                            res.status(400).send(`❌ Error user_creative not found with user ${uid} and creative ${name}`)
                        }
                    }).catch(error => {
                        console.log(`❌ ERROR with getUserCreative DB request: ${error.message}`)
                        res.status(400).send(`❌ Error checking if user has creative ${uid}: ${error.message}\n`);
                    }) 
                } else {
                    console.log(`❌ ERROR: Creative not found in creatives table`)
                    res.status(400).send(`❌ Error creative not found in creative table\n`);
                }
            }).catch( error => {
                console.log(`❌ ERROR with retrieving creative Name: ${error.message}`)
                res.status(400).send(`❌ Error with getting creative: ${error.message}\n`);
            })
        } else {
            console.log(`❌ ERROR: ${error.message}`)
            res.status(400).send(`{ "errors": ["User must be logged in for this action"]}`);
       }
    }
}
