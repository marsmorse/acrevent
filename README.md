# Acrevent: creative event notification web applicaiton #
## Description ##
A web app designed show you when your favorite "creatives" ( comedians, musicians, etc.) are playing a show in your area and when ticket sales start.

## Technologies ##
This program uses the following technologies:
- [postgreSQL](https://www.postgresql.org/) as a database set up on a free tier AWS EC2 Ubuntu server
- [Node.js](https://nodejs.org/en/) javascript environment to write the REST API in using [Express](https://expressjs.com/) as the server installed on a seperate AWS EC2 ubuntu server
- [Redis](https://redis.io/) as a memory cache for storing session information
- HTML5 and CSS for front end
- Javascript with fetch for front end