const Creative = require("../models/creative_model")
const User = require('../models/user_model')
var chalk = require('chalk');
const UserCreative = require('../models/user_creative_model');
const cipher = require('../auth/id-cipher');
module.exports = {

    /* returns an all creatives for a user*/
    getCreatives: (req, res) => {
        if (req.session.id) { 
            console.log((req.session.id));
            Creative.getAllUserCreatives(req.body.uid).then( data => {
                console.log(data);
                res.status(200).json(data);
            }).catch( error => {
                res.status(400).send(`❌ Error: ${error.message}\n`);
            })
        } else {
            res.status(400).send(`Must log in to request profile info\n`);
        }
    },

    addCreative: (req, res) => {
        //console.log(req.session);
        //console.log(req.session.id);
        console.log(req.body);
        
        function addCreatives(uid) {
            return new Promise((resolve, reject) => {
                let count = 0;
                req.body.creatives.forEach( creative_name => {
                    console.log("requesting from db");
                    Creative.get(creative_name).then( data => {
                        console.log(data.length);
                        // if creatives exists in db already
                        if (data.length >= 1) {
                            Creative.addUserCreative(data[0].c_id, uid).then( cid => {
                                count ++;
                                console.log(`SUCCESS 👍🏻: ${creative_name} added`);
                                console.log(count);
                                console.log(eq.body.creatives.length);
                                if (count == req.body.creatives.length) resolve();
                            }).catch( error => {
                                res.status(400).send(`❌ Error adding user_creative for creative with user with id ${uid} : ${error.message}\n`);
                            })
                        } else { //creative not in database yet
                            Creative.create({name: creative_name, type:'music'}).then( cinfo => {
                                Creative.addUserCreative(cinfo.c_id, uid).then( dbresult => {
                                    //counts are automatically incremented by trigger
                                    count ++;
                                    console.log(`SUCCESS 👍🏻: ${creative_name} added`);
                                    console.log(count);
                                    console.log(req.body.creatives.length);
                                    if (count == req.body.creatives.length) resolve();
                                 }).catch( error => {
                                    reject(error);
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

                });
            })
        }
        
        //console.log(cipher.decrypt(req.session.sid));
        if (req.session.id) {
            //check if creative exists\
            let uid = 35;
            if (req.body.creatives != null && uid) {
                addCreatives(uid).then( data => {
                    res.status(201).json("All Creatives added successfully")
                });

            } else {
                res.status(400).send(`{ "errors": ["Name and type missing in request"]}`);
            }
        } else {
            res.status(400).send(`{ "errors": ["User must be logged supplied in body. for this action"]}`);
       }
    },

    removeCreative: (req, res) => {
        //get user_count of creative from name (because it's unique)
        if (req.session.id) {
            const name = req.params.name;
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
