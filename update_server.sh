git pull
mongorestore --db leaguetimes --collection championdatas --drop db/leaguetimes/championdatas.bson
mongorestore --db leaguetimes --collection championmatchups --drop db/leaguetimes/championmatchups.bson
mongorestore --db leaguetimes --collection championroles --drop db/leaguetimes/championroles.bson
mongorestore --db leaguetimes --collection roles --drop db/leaguetimes/roles.bson
mongorestore --db leaguetimes --collection stattables --drop db/leaguetimes/stattables.bson
mongorestore --db leaguetimes --collection summaries --drop db/leaguetimes/summaries.bson
cd bin && NODE_ENV=production pm2 restart www.js