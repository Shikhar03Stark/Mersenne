const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    FID:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    friend: {
        type: Array,
        of: mongoose.SchemaType.ObjectId,
        required: false
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = FriendSchema;