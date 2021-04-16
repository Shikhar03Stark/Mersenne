const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid : {
        type : String,
        required: true,
    },
    name : {
        type : String,
        required : true,
        index : true //field level Index
    },
    email : {
        type : String,
        required : true,
        index : true, //field Level Index
    },
    profile : {
        type : String, //URL of Static image
        required : false,
    },
    phone : {
        type : String,
        required : false, //But prompt user for mobile number for contact discovery service
        index : true, //field Level Index
    },
    //History Object of User
    HID : {
        type : mongoose.SchemaTypes.ObjectId,
        required : false, //will be created for new sign up
    },
    //Genre Object of User
    GID : {
        type : mongoose.SchemaType.ObjectId,
        required : false, //will be created for new sign up
    },
    //1st Degree Friends Object
    FID : {
        type : mongoose.SchemaType.ObjectId,
        required : false, //will be created for new sign up
    },
    //Array of Groups in which user is involved
    groups : {
        type : [mongoose.SchemaType.ObjectId],
        required : true,
        default : () => [],
    },
    //Date of Creation of user in JS Date object
    DOC : {
        type : Date,
        required : true,
        default : Date.now,
    }

});

module.exports = UserSchema;