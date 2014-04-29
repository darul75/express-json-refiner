'use strict';

var mongoose = require('mongoose'),    
    Schema   = mongoose.Schema;

module.exports = function (app) {
    
    var db, schema, model, ObjectId;

        
    ObjectId = require('mongoose').Types.ObjectId;
        
    db = mongoose.createConnection('mongodb://toto:5353/toto');

    mongoose.connection.on('error', function (err) {
    
    });
    db.on('error', function (err) {
    
    });
    db.once('open', function callback() {
    
    });

    schema = new Schema(
        {
            field1: { type: String, required: true},
            field2: { type: String, required: false },                        
            field3 : { type: Date , required : false },
            field4: { type: Schema.Types.ObjectId, required : true }
        }, 
        { collection: 'test' });
    
    
    model  = db.model('test', schema);
               
    return model;
};