

const request = require('request');

const { reset } = require('nodemon');

const config = require('../config/config');
const UserCreative = require('../models/user_creative_model');
const EventModel = require('../models/event');

module.exports = {
    
    
    /*
    @input: Number aid
    */
   getUserEvents: (req, res) => {
       console.log(req.session.uid);
       console.log(req.uid);
       UserCreative.getAll(req.uid).then(data => {
           console.log(data);
            //get all user events
            EventModel.getAllEvents().then(data => {
                console.log(data);
            }).catch( err => {
                console.log(err);
            })
       }).catch( err => {
            console.log(err);
       })
   },
    /*
    @input: Number aid
    */
    getArtistEvents: (req, res) => {
        //find user artist

        //for each one check if they have an event in user's area

        //
        //https://api.songkick.com/api/3.0/artists/{artist_id}/calendar.json?apikey={your_api_key}
        instance.get(`/artists/${a_id}/calendar.json?apikey=${config.songkickAPIkey}`)
            .then(function (response) {
                // handle success
                console.log(response.data.resultsPage.results.artist);
                console.log(response.data.resultsPage.results.artist[0].id);
                req.body.songkickArtistID = response.data.resultsPage.results.artist[0].id;
                req.body.name = response.data.resultsPage.results.artist[0].displayName;
                next();
            }) 
            .catch(err => {

            }) 
    }
}