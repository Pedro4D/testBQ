'use strict'

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* Mongoose Schemas for user */
var UserSchema = new Schema({

    name : { type: String, required: true },
    surname : { type: String, required: true},
    email : { type: String, required: true, index: true },
    active : { type: Boolean, default: true },
    created: { type: Date, default: Date.now }

}, {collection: 'user'});

mongoose.model('User', UserSchema);
//exports
module.exports.User = mongoose.model('User');