champion.gg
========
WEBSITE: http://champion.gg

A MEAN project (with a dash of angular).
In order to get a local version of champion.gg running you need to have MongoDb, Node and NPM installed. (ensure MongoDB is running when trying to run champion.gg)

To get a working version set up you'll need to clone the repo, install the dependencies, build the database and then start the server from the command line. 
The commands to enter are listed below.

# Getting set up

Clone champion.gg:
```sh
git clone https://github.com/joel1st/championweb.git
```

Install dependencies from project directory: 
```sh
npm install
```

Restore database from project directory
```sh
mongorestore --db leaguetimes --collection championdatas --drop db/leaguetimes/championdatas.bson
mongorestore --db leaguetimes --collection championmatchups --drop db/leaguetimes/championmatchups.bson
mongorestore --db leaguetimes --collection championroles --drop db/leaguetimes/championroles.bson
mongorestore --db leaguetimes --collection roles --drop db/leaguetimes/roles.bson
mongorestore --db leaguetimes --collection stattables --drop db/leaguetimes/stattables.bson
mongorestore --db leaguetimes --collection summaries --drop db/leaguetimes/summaries.bson
```

Start Champion.gg
```sh
npm start
#if you have another web server running on port 80 you can set the port as such
PORT=8888 npm start
```
You can now access champion.gg on http://localhost/ or if you set a port number http://localhost:8888/

# Development 

In order to work on champion.gg more effectively I've created a grunt tasks to facilitate automation of javascript hinting (helps avoid nasty javascript errors).
```sh
grunt watch
```

To get assets ready for production:
```sh
grunt production
```
