const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({ 
    productImage: { type: String },
    sku: {type: String}, 
    created_at: {type: Date, required:true },
    updated_at: {type: Date}, 
});

module.exports = mongoose.model('Product', productSchema);