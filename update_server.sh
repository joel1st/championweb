#!/bin/bash
cd /home/ubuntu/championweb/
git remote update

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
elif [ $LOCAL = $BASE ]; then
    echo "Behind"
    git pull
    sh ./bin/update_server.sh
elif [ $REMOTE = $BASE ]; then
    echo "Ahead"
    git reset --hard origin/master
    sh ./bin/update_server.sh
else
    echo "Diverged"
    git reset --hard origin/master
    sh ./bin/update_server.sh
fi
