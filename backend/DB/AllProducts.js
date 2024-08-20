const mongoose = require("mongoose");
const {Schema} = mongoose;

const productsSchema = new Schema({
    heading : {type : String, required : true},
    category : {type : String , required : true},
    subcategory : {type : String , required : true},
    price : {type : Number , required : true},
    quantity : {type : String , default : '300ml'},
    imgData : {type : String , required : true},
})

module.exports = mongoose.model("allproducts",productsSchema)