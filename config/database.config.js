//logger 
const logger = require('../logger/logger.js');
//env variable
const database = 'mongodb://127.0.0.1:27017/socialdb';
// test envrionment log
logger.info("Environment Variable " + database);
module.exports = {
    url: database
}
