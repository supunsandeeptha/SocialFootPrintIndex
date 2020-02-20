//logger 
const logger = require('../logger/logger.js');
//env variable
const database = 'mongodb://172.31.87.180:27017/socialdb';
// test envrionment log
logger.info("Environment Variable " + database);
module.exports = {
    url: database
}
