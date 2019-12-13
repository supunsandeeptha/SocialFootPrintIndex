//requrie statements
const express = require('express');
const bodyParser = require('body-parser');
//logger 
const logger = require('./logger/logger.js');
// create express application
const app = express();

//including the routes 
require('./routes/routes.js')(app);

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//configuring the database
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose');

//promise
mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    logger.info("Successfully connected to the database");
}).catch(err => {
    logger.error("Could not connect to the database ")
});

//simeple route to test the API
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Social FootPrint Index API" });
    logger.info("API GET request sucessful !");
});

// app listening for requests
app.listen(8080, () => {
    logger.info("Server is listening on port 8080");
});