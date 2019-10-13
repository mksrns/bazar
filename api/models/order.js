const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    // name: {
    //     firstname: {type: String, required: true},
    //     lastname: {type: String}
    // }, 
    rate: {type: Number}, 
    price: {type: Number}, 
    created_at: {type: Date, required:true },
    updated_at: {type: Date}, 
});

module.exports = mongoose.model('Order', orderSchema);