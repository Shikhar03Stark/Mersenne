const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    GID:{
        type: mongoose.SchemaType.ObjectId,
        required: true  
    },
    members: {
        type: [mongoose.SchemaType.ObjectId],
        required: true,
        default: () => []
    }
});

module.exports = GroupSchema;