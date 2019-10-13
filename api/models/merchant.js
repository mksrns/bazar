const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var merchantSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String}
    },
    merchantImage: { type: String },
    username: {type: String},
    password: {type: String },
    created_at: {type: Date, required:true },
    updated_at: {type: Date},
    contactInfo:{
        telephone: [String],
        email: {type: String},
        address: { 
            street: {type: String},
            city: {type: String},
            state: {type: String},
            pincode: {type: Number},
        }
    }
});

module.exports = mongoose.model('Merchant', merchantSchema);