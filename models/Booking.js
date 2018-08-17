const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    date: {
        type: Date,
       
        default: Date.now
    },
    school: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    sports: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true

    }

});

module.exports = Booking = mongoose.model('bookings', BookingSchema);