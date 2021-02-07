const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: String },
    designation:{type:String},
    team:{type:String},
    phone:{type:Number},
    email:{type:String},
    cid:{type:String},
    location:{type:String}
});

module.exports = { Employee };
