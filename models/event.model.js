// require mongoose
const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    id: String,
    start: String,
    end: String
}, {
        versionKey: false,
        timeStamp: false
    });

module.exports = mongoose.model('Event', EventSchema);