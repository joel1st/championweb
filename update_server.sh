git pull
mongorestore --db leaguetimes --collection webchampionpages --drop db/leaguetimes/webchampionpages.bson
mongorestore --db leaguetimes --collection webchampionroles --drop db/leaguetimes/webchampionroles.bson
mongorestore --db leaguetimes --collection webmatchuppages --drop db/leaguetimes/webmatchuppages.bson
mongorestore --db leaguetimes --collection weboverallroledatas --drop db/leaguetimes/weboverallroledatas.bson
mongorestore --db leaguetimes --collection webhomepagesummaries --drop db/leaguetimes/webhomepagesummaries.bson
mongorestore --db leaguetimes --collection webstatisticspages --drop db/leaguetimes/webstatisticspages.bson
cd bin && NODE_ENV=production pm2 restart www.js