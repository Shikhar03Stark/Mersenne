const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    GID:{
        type: mongoose.SchemaType.ObjectId,
        required: true  
    },
    uid: {
        type: [mongoose.SchemaType.ObjectId],
        required: true,
        default: () => []
    }
});

module.exports = GroupSchema;