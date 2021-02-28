# Acrevent #
## Description ##
A web app designed show you when your favorite "creatives" ( comedians, musicians, etc.) are playing a show in your area and when ticket sales start.

//Photo by Mark Angelo from Pexels

## Competitive Landscape ##
- Spotify with Eventbrite [https://www.eventbrite.com/blog/eventbrite-connects-music-fans-with-concerts-they-love-on-spotify-ds0d/]
  - > Spotify will now recommend Eventbrite events to listeners based on their music preferences and alongside their favorite artists and albums, in addition to emailing an artist’s followers when new tour dates are posted"

## Technologies ##
This program uses the following technologies:
- [postgreSQL](https://www.postgresql.org/) as a database set up on a free tier AWS EC2 Ubuntu server
- [Node.js](https://nodejs.org/en/) javascript environment to write the REST API in using [Express](https://expressjs.com/) as the server installed on a seperate AWS EC2 ubuntu server
- [Redis](https://redis.io/) as a in memory store for session information. Chose redis to have control over my eviction policy as well as the flexibility that it's data structures can provide. reference: [https://www.infoworld.com/article/3063161/why-redis-beats-memcached-for-caching.html]
- HTML5 and CSS for front end
- Javascript with fetch for front end
- session store with redis over JWT tokens: http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
### Reset Database
curl -X GET http://localhost:5000/dev/clear 
ssh into db using private info doc
copy and paste SQL commands from db.sql 
Done
#### WARNING: atomicity issues with incr and decr
- group or single delete row in creatives if u_count == 1
- incr or decr u_count in creatives table
- add a single creative
### Event Page Actions
- find events for a user. return data for data for an event found from e_id from user_events table. join request.
##  actions required from frontend
- log in
- registration
- delete account
- check creative u_count
- incr creative u_count
- dec creative u_count
- validate log in information
- validate registration information
- get user location
- add user-shows rows
- delete user-shows rows based on date (if before current)
- get user location

### Why these technologies ##
- I was caught between a REST API and GraphQL API but ended up choosing a REST API because of familiarity with API's in node.js from past projects. 


## reasoning behind certain decisions to improve performance ## 
    - priotitize batch inserts over sequential inserts [https://stackoverflow.com/questions/1793169/which-is-faster-multiple-single-inserts-or-one-multiple-row-insert]
    - sql over no sql []

    - db.js file sets up a pool connection to the database because https://node-postgres.com/guides/project-structure 
        because:
        Allows my project to adjust to any changes to the node-postgres API without having to trace down all the places I directly use node-postgres in my application.
        Allows me to have a single place to put logging and diagnostics around my database.
        Allows me to make custom extensions to my database access code & share it throughout the project.
        Allows a single place to bootstrap & configure the database.

####  BLOG POST  ####
title(working): My full stack project over view 
summary: 
    This article is an overview of my first full stack project covering the steps I took to create my first full stack application. Including Ideation, UI/UX design, backend, and frontend.
    For each of the subjects I will talk about what I did to accomplish them and why. For those curious the tools and technology I used for my project are Node.js, HTML/CSS, Bootstrap, figma, postgreSQL, and AWS. An outline of how I developed a full stack application.
purpose:
    Give readers new to full stack development an overview of my project so that they may take similar steps to create their own. This is not a step by step tutorial. It is simple an article covering what I did to develop my full stack application. 
background:
    I recently graduated with a BS in CS from Santa Cruz, CA and after gradauting started interview prep and application process. I found that most of the junior level jobs I was applying for were web development positions. I had a ton of varied experience from my coursework ranging from multithreaded C servers, WebGL, to amazon alexa, to a small front-end HTML/CSS/javascript. After 2 months of frustrating results I searched for people in my position, new grads without a junior year internship from bootcamps and university, that were landing the entry level positions. After finding a couple hits I scoured their linked IN page and resume to compare myself and find out what my applications were missing. I found that while my resume wasn't that bad it was missing some crucial projects that were inlcluded in everyone I found. I needed a full stack project! A project that 
audience: 
    Recruiters who look at my linked in profile for releveant projects to see that I'm legit (most entry level developer hires have projects listed). Folks looking to get a grasp of how to create and deploy a full stack application without following a tutorial. 

### STEPS ###
- Find an Idea for project. As someone who enjoy's seeing specific artists, mucisians, and comedians. I would like to know when they are visiting my area on an event as well as if the event   
is available and when it will be availible. I wanted this because many times an event will be announced and can be found if people check platforms like eventbrite often or see a post from a creatives social media announcing an event. I'm not a fan of having to stay up to date with creatives I like on social media or eventbrite so I wanted to make an event notification system that would notify you when an artist you like is coming and when you can buy tickets so that I could check one place and see upcoming events and schedule time to plan to go those events and make sure that I buy tickets when they release. This way I don't find out about a show that I really would have liked to go to after the tickets have sold out!

- After creating an idea in my head about what I trimmed down my idea to the core objectives of solving the problem I had. In this process, I removed a lot of unneccessary ideas that would
nt be completely necessary right away. For example I wanted to have users be able to select multiple locations as well as the radius around a city much like craigslist. However I decided to simplify this feature to just having users be able to chose one idea. Doing this helped me have a narrow focus for my idea so that I could complete the project in a reasonable amount of time. Some of my trimmed idea's weren't necessary right away and could be added later but this helped me have a really strong idea for the core functionality without biting off more than I could chew.

- With a focused idea down I then started the design process. For the design process, I used an awesome free UI/UX design tool called Figma that I had used for multiple projects before. Before doing any designing I used some IDEO design frameworks to get a better sense for the user experience I wanted to have. For this I used [INSERNAMES FOR the 3 IDEO METHODS USED]. For the the user journey used [INSERT IDEO TECHNIQUE FOR USER ROLEPLAY] to map out the user journey. I then used [INSERT IDEO TECHNIQUE FOR FINDING PAGE HIERARCHY]. And lastly I [INSERT ONE MORE IDEO TECHNIQUE]. This process helped me get a sense for the how I wanted the site to function and most importantly mapped out how I wanted the user experience to go. With this done I moved on to start designing the UI.
- With the user experience research finished I had a great sense of the requirements and structure for my website. So I started translating the core elements for my project into UI elements that I believe would be a good way to display the feature. I needed a sign in/ registration page. a homepage for prospective users to inform them of what acrevent is/ does with plenty of options to "Get Started". A user homepage to display events. I would need a page For creating and editing a list of creatives for a given user, while this could go on the homepage if the events list was long it would be too cluttered to have both on the same page. To handle user interactions like deleting accounts, signing out, and changing location I wanted to have a drop down bar in the top left instead of a profile page because there were'nt so many user interactions that I would need a whole page to containt. With these core functionalities defined into UI elements. Having takedn UI and UX classes I would normally design everything from scratch meaning style tile, sketch 3-5 different wireframes for different devices, design wireframes in figma, review the wireframes and narrow choices, create 2-3 low fidelty prototypes from the wireframes without prototyping links, review and chose one, create a high fidelity prototype that would essentially look and function (through fimga's prototyping tools) just how my website would, and finally review and test the prototype with different screen sizes including mobile on the figma mobile mirror app. However this "complete" design process is time intensive and for a my simplified project idea that was trimmed down in the UX step I decided to take some shortcuts. So I made a site map to lay out the navigation of the pages then sketched out wireframes and brainstormed the different User interactions to get a sense of how the website would flow. After this I brainstormed color and font choices and came up with [INSERT ] as my primary color, [INSERT ] as my secondary color, [INSERT ] as my header font, and _ as my text font. After that I checked out a bunch of UI kits on the figma community page and picked and pulled different elements from them and compiled them into my page design. For example I used the [HERO PAGE COMMUNITY UI KIT] to make a good prospective user homepage. After that I converted my very simple sketched wireframes for the event, creatives, and user functionalities ui actions into their respective ui elements as drafted above. I tried to use the Bootstrap UI Kit for the different UI elements as much as possible so that the front-end coding process could efficiently be converted from my figma design. This resulted in a polished design prototype that I was happy with and could  qiuckly be converted to bootstrap. Insert photos of finialized design (If you have a figma account you can check out my project file [HERE ]). 

- With my UI and UX work done it was time to start thinking about my data. I usede my design to come up with a database model in Universal Modeling Language. [INSERT PHOTO OF Model]. After I did some research to assess databse to use for my project. So I did some research and since my data was relativley structured and simple I decided a SQL db would be optimal over a noSQL db like mongoDB since average queries for postgreSQL have a speedup of 2.1 over NoSQL [INSERT ReFERENCE LINK FROM chrome bookmarks]. I chose postgresql because of its popular, open-source, and has great community support.

- Created DB on a free tier IC2 Amazon instance
    I decided to create and manage my own db on a free ic2 server to save on project costs instead of using amazon RDS which would significantly increase the monthly cost of the project. I then set up alerts and breakpoints
    For this section I spun up a IC2 amazon instance following this youtube tutorial: []. After creating the tables that are mapped out in "SQL_DESIGN_ LANGAUGE THAT I CANT REMEMBER RIGHT NOW" "INSERT DB DESIGN PICTURE" I added some users, events, and artists as sample data to start off with. From there I had to make a decision on how to handle a backup for my database as well as security. For backups I decided to save this for after the Web APP was finished. As to security I temporarily configured the postgres db to only accept connections from my computer's ip address to later replace this with the API server's ip address. All other security would be postponed till after the web app was finished. 
- followed this youtube 
- Creating a industry standard REST API
    I had previously worked with API's and created simple one's using MongoDB and SQLite3 with Node.js. However these were for practice and not production ready with documentation, security, and public availability. Before starting this step I read this article to make sure I knew the guidelines for creating a proper REST API [https://www.oreilly.com/content/how-to-design-a-restful-api-architecture-from-a-human-language-spec/]. 
    After reading part 1, I started with writing the API spec before writing any code so that when I did start building my API I would have a clear idea of my API actions. These include the request and response data including example's. I closely followed the eventbrite API reference page [https://www.eventbrite.com/platform/api#/reference/event/create/create-an-event] as inspiration for my documentation.


