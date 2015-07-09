sudo npm install
mongorestore --db championgg --collection webchampionpages --drop db/championgg/webchampionpages.bson
mongorestore --db championgg --collection webchampionroles --drop db/championgg/webchampionroles.bson
mongorestore --db championgg --collection webmatchuppages --drop db/championgg/webmatchuppages.bson
mongorestore --db championgg --collection weboverallroledatas --drop db/championgg/weboverallroledatas.bson
mongorestore --db championgg --collection weboverallstats --drop db/championgg/weboverallstats.bson
mongorestore --db championgg --collection webhomepagesummaries --drop db/championgg/webhomepagesummaries.bson
mongorestore --db championgg --collection webstatisticspages --drop db/championgg/webstatisticspages.bson
cd bin && NODE_ENV=production pm2 restart www.js
