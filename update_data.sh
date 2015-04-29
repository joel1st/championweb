mongodump --db leaguetimes --collection championdatas --out ./db
mongodump --db leaguetimes --collection championmatchups --out ./db
mongodump --db leaguetimes --collection championroles --out ./db
mongodump --db leaguetimes --collection roles --out ./db
mongodump --db leaguetimes --collection stattables --out ./db
mongodump --db leaguetimes --collection summaries --out ./db
git add -A && git commit -m "updated data" && git push origin master