const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    sports: {
        type: [String],
    }
});

module.exports = School = mongoose.model('schools', SchoolSchema);