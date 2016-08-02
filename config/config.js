module.exports.config = {
    worker: {
        local: {
            githubRoot: 'https://raw.githubusercontent.com/joel1st/championweb/master/',
            githubRoute : 'https://raw.githubusercontent.com/joel1st/championweb/master/db/championgg/',
            files: [
                'webchampionpages.bson',
                'webchampionpages.metadata.json',
                'webchampionroles.bson',
                'webchampionroles.metadata.json',
                'webhomepagesummaries.bson',
                'webhomepagesummaries.metadata.json',
                'webmatchuppages.bson',
                'webmatchuppages.metadata.json',
                'weboverallroledatas.bson',
                'weboverallroledatas.metadata.json',
                'weboverallstats.bson',
                'weboverallstats.metadata.json',
                'webstatisticspages.bson',
                'webstatisticspages.metadata.json'
            ],
            headline: 'headline.js',
            tmpFolder: 'tmp/',
            mongo: {
                host: 'localhost',
                port: '27017',
                db: 'championgg',
                user: '',
                password: ''
            },
            queue: {
                prefix: 'championggQ_',
                host: 'localhost',
                pass: '',
                port: 6379
            },
            fastly: {
                api_key: process.env.FASTLY_API_KEY,
                purgeall: 'https://api.fastly.com/service/' + process.env.FASTLY_SERVICE_ID + '/purge_all'
            }
        },
        production: {
            githubRoot: 'https://raw.githubusercontent.com/joel1st/championweb/master/',
            githubRoute : 'https://raw.githubusercontent.com/joel1st/championweb/master/db/championgg/',
            files: [
                'webchampionpages.bson',
                'webchampionpages.metadata.json',
                'webchampionroles.bson',
                'webchampionroles.metadata.json',
                'webhomepagesummaries.bson',
                'webhomepagesummaries.metadata.json',
                'webmatchuppages.bson',
                'webmatchuppages.metadata.json',
                'weboverallroledatas.bson',
                'weboverallroledatas.metadata.json',
                'weboverallstats.bson',
                'weboverallstats.metadata.json',
                'webstatisticspages.bson',
                'webstatisticspages.metadata.json'
            ],
            headline: 'headline.js',
            tmpFolder: 'tmp/',
            mongo: {
                host: process.env.WORKER_MONGO_HOST,
                port: process.env.WORKER_MONGO_PORT,
                db: process.env.WORKER_MONGO_DB,
                user: process.env.WORKER_MONGO_USER,
                password: process.env.WORKER_MONGO_PASSWORD
            },
            queue: {
                prefix: process.env.QUEUE_PREFIX || 'championggQ_',
                host: process.env.REDIS_HOST || 'localhost',
                pass: process.env.REDIS_PASS || '',
                port: process.env.REDIS_PORT || 6379
            },
            fastly: {
                api_key: process.env.FASTLY_API_KEY,
                purgeall: 'https://api.fastly.com/service/' + process.env.FASTLY_SERVICE_ID + '/purge_all'
            }
        }
    }
};
