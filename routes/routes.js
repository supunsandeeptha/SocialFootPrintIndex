module.exports = (app) => {
    const controller = require('../controller/controller.js');

    // route 
    app.get('/calender/events/confirmedevents', controller.findAll);
}

