#!/bin/bash

USER1='39'
USER2='40'
USER3='41'
USER4='42'
USER5='43'

USER6='33'
#create users for user 1
curl -X POST http://localhost:5000/creatives -d "name=Baca&type=music&uid=$USER1"
sleep 1
curl -X POST http://localhost:5000/creatives -d "name=Kanye West&type=music&uid=$USER1"
sleep 1
curl -X POST http://localhost:5000/creatives -d "name=Sia&type=music&uid=$USER1"
sleep 1
curl -X POST http://localhost:5000/creatives -d "name=Drake&type=music&uid=$USER1"
sleep 1


#create users for user 2
curl -X POST http://localhost:5000/creatives -d "name=Dixon&type=music&uid=$USER2"
sleep 1
curl -X POST http://localhost:5000/creatives -d "name=Carl Cox&type=music&uid=$USER2"
sleep 1

#create users for user 3
curl -X POST http://localhost:5000/creatives -d "name=Baca&type=music&uid=$USER3"
sleep 1
curl -X POST http://localhost:5000/creatives -d "name=Siatype=music&uid=$USER3"
sleep 1

#create users for user 4
curl -X POST http://localhost:5000/creatives -d "name=Baca&type=music&uid=$USER4"
sleep 1

#create users for user 5
curl -X POST http://localhost:5000/creatives -d "name=Dixon&type=music&uid=$USER5"
sleep 1

curl -X GET http://localhost:5000/dev/display
