defaultmsg="updated data"
read -p "Please enter a git message (default : '$defaultmsg'):" gitmsg
if [ "$gitmsg" == "" ]; then
	gitmsg="$defaultmsg"
fi
echo $gitmsg

mongodump --db leaguetimes --collection weboverallstats --out ./db
mongodump --db leaguetimes --collection webchampionpages --out ./db
mongodump --db leaguetimes --collection webchampionroles --out ./db
mongodump --db leaguetimes --collection webmatchuppages --out ./db
mongodump --db leaguetimes --collection weboverallroledatas --out ./db
mongodump --db leaguetimes --collection webhomepagesummaries --out ./db
mongodump --db leaguetimes --collection webstatisticspages --out ./db

grunt production

git add -A && git commit -m "$gitmsg" && git push origin master

cd ../ssh && sh ssh_in.sh;