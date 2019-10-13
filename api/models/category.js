const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({ 
    categoryName: {type: String, required: true}, 
    categoryImage: { type: String }, 
    created_at: {type: Date, required:true },
    updated_at: {type: Date}, 
});

module.exports = mongoose.model('Category', categorySchema);