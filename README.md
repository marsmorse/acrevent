# Acrevent #
## Description ##
A web app designed show you when your favorite musical artists are playing a show in your area and when ticket sales start.

## Summary ##
Allows users who register/sign in to add artists to a list on the artists page of the web app. When a user does, the API calls the Songkick API with the artist to get any shows they are playing in the user's city and adds them to that users events. Project is hosted using amazon ec-2 instances.

## Installed Instructions ##
if the db, redis, config, and packages are set-up/installed, skip to step 6 below

## Fresh Install Instructions ##
1) clone the git repo
2) run npm install in both client and server folders
3)set up the postgress database. Either host a new postgress database or instantiate your own local version and run all the commands in the db.sql
4) set up the redis cache. Either host redis cache or instantiate your own local version
5) add redis and db address's to project config 
6) in a terminal window run ``` npm start ```  from the client directory
 
7) in a seperate terminal window run ``` npm run devstart ``` from the server directory



## API endpoints ##
endpoints can be found in the api doc

## Competitive Landscape ##
- Spotify with Eventbrite [https://www.eventbrite.com/blog/eventbrite-connects-music-fans-with-concerts-they-love-on-spotify-ds0d/]
  - > Spotify will now recommend Eventbrite events to listeners based on their music preferences and alongside their favorite artists and albums, in addition to emailing an artist’s followers when new tour dates are posted"

- Songkick
- Bandsintown

## Technologies ##
This program uses the following technologies:
- [postgreSQL](https://www.postgresql.org/) as a database set up on a free tier AWS EC2 Ubuntu server
- [Node.js](https://nodejs.org/en/) javascript environment to write the REST API in using [Express](https://expressjs.com/) as the server installed on a seperate AWS EC2 ubuntu server
- [Redis](https://redis.io/) as an external in memory store for session information. [https://www.infoworld.com/article/3063161/why-redis-beats-memcached-for-caching.html]. session store with redis over JWT tokens: http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
- HTML5 and CSS for front end
- Javascript with React and axios for front end


## Questions? ##
dm me here on github!
