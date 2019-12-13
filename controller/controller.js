const Event = require('../models/event.model.js');
const https = require('https');
const logger = require('../logger/logger.js');

/**
 * Controller method to query the database data
 */
exports.findAll = (req, res) => {
    //empty object 
    var eventobj = {};
    //calling the insert data method
    insertData();
    // querying the data
    Event.find({}, { '_id': 0 })
        .then(events => {
            eventobj.events = events;
            res.send(eventobj);
            logger.info("events requested " + events);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured while retrieving events."
            });
            logger.error("Error Occured while retrieving events");
        });


};


/**
 *This method reads the Json from from the URL and processes the Json Data 
 *then inserts the data in to the Mongo Database
 */
function insertData() {
    var url = 'https://dodat-programming-test.s3-ap-southeast-2.amazonaws.com/dodatrhys_events.json';

    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            logger.info("HTTP Req Successfull ! , Data" + body);
            var response = JSON.parse(body);
            var items = response.items;
            items.forEach(function (event) {
                var idnum = event.id;
                var startDate = event.start.dateTime;
                var endDate = event.end.dateTime;
                const calanderevent = new Event({
                    id: idnum,
                    start: startDate,
                    end: endDate
                });
                Event.countDocuments({ id: idnum }, function (err, count) {
                    if (count > 0) {
                        logger.info("Document already exists on database proceeding to update");
                        Event.updateOne({ id: idnum }, { start: startDate }, { end: endDate });
                    } else {
                        calanderevent.save();
                    }
                });

            });
        });
    }).on('error', function (e) {
        logger.error("Got an error", e);
    });

}






