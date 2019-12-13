//requrie statements
const express = require('express');
const bodyParser = require('body-parser');

// create express application
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//simeple route to test the API
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Social FootPrint Index API" });
});

// app listening for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});