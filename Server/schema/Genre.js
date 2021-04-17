const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    GID: {
        type: mongoose.SchemaType.ObjectId,
        required: true
    },
    genre: {
        type: [String],
        required: false,
    },
    count: {
        type: [Number],
        required: true,
        default: 0
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    }
}); 

module.exports = GenreSchema;