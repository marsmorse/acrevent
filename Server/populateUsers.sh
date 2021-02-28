#!/bin/bash

#create users
curl -X POST http://localhost:5000/users/register -d "name=Johar&password=pw&city=lafayette&email=marcel@t.com"
sleep 1
curl -X POST http://localhost:5000/users/register -d "name=Casey&password=pw&city=lafayette&email=lenny@t.com"
sleep 1
curl -X POST http://localhost:5000/users/register -d "name=Ari&password=pw&city=lafayette&email=sara@t.com"
sleep 1
curl -X POST http://localhost:5000/users/register -d "name=Cutter&password=pw&city=lafayette&email=andre@t.com"
sleep 1
curl -X POST http://localhost:5000/users/register -d "name=Kyle&password=pw&city=lafayette&email=ari@t.com"
sleep 1
curl -X POST http://localhost:5000/users/register -d "name=Johanne&password=pw&city=lafayette&email=joho@t.com"
sleep 1
#add creative's for user with 
#curl -X POST http://localhost:5000/creatives -d "name=Baca&type=music&uid=15"
#sleep(1)
#curl -X POST http://localhost:5000/creatives -d "name=Kanye West&type=music&uid=15"
#sleep(1)

#delete creative
#curl -X DELETE http://localhost:5000/creatives -d "name=Baca"

#get all creatives 
#curl -X GET http://localhost:5000/creatives

curl -X GET http://localhost:5000/dev/display