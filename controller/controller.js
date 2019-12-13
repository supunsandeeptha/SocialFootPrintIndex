const Event = require('../models/event.model.js');
const https = require('https');

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
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured while retrieving events."
            });
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
                        console.log("Document Exists");
                        Event.updateOne({ id: idnum }, { start: startDate }, { end: endDate });
                    } else {
                        calanderevent.save();
                    }
                });

            });
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });

}






