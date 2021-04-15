const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const cron = require('node-cron');
const server = http.createServer(app);
import profileQuery from "./utils/query"
cron.schedule('* * * * *', async () => {
    console.log('---------------------');
    console.log('Running Cron Job')
    await profileQuery("BC1YLjLGsTQvahXpu3afEd3hkkMqyx651NJ3SgcruiL8drN4XjQEukT")
  });

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
});