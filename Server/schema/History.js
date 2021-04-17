const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    movieId: {
        type: [mongoose.SchemaType.ObjectId],
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = HistorySchema;