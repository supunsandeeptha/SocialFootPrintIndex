//logger 
const logger = require('../logger/logger.js');
//env variable
const database = process.env.DB;
// test envrionment log
logger.info("Environment Variable " + database);
module.exports = {
    url: database
}