const mongoose = require("mongoose");
const {Schema} = mongoose;
const categorySchema = new Schema({
    heading : {
        type : String,
        required : [true, 'Heading is required']
    },
    category : {
        type : String,
        required : [true, 'Category is required']
    },
    subcategory : {
        type : String,
        required : [true, 'Sub category is required']
    },
    imgData : {
        type : String,
    },
});

module.exports = mongoose.model('category',categorySchema);