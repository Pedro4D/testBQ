'use strict'

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* Mongoose Schemas for script */
var ScriptSchema = new Schema({

    code : { type: String, required: true, index: true  },
    lib : { type: String, required: true},
    method : { type: String, required: true}

}, {collection: 'script'});

mongoose.model('Script', ScriptSchema);
//exports
module.exports.Script = mongoose.model('Script');
