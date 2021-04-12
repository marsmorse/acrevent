var pool = require('../db.js')
//const userC
var axiosInstance = require('../axios');
const config = require('../config/config');

class EventModel {
    
    getAllEvents(a_id) {
        return new Promise((resolve, reject) => {
            axiosInstance.get(`/artists/${a_id}/calendar.json?apikey=${config.songkickAPIkey}`)
            .then(function (response) {
                // handle success
                let res = [];
                console.log(response.data.resultsPage.results.artist);
                console.log(response.data.resultsPage.results.artist[0].id);
                req.body.songkickArtistID = response.data.resultsPage.results.artist[0].id;
                req.body.name = response.data.resultsPage.results.artist[0].displayName;
                resolve(res);
            }) 
            .catch(err => {
                reject(err);
            }) 
        });
    }
}
module.exports = new EventModel;