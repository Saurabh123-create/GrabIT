const mongoose = require("mongoose");
const {Schema} = mongoose;

let AdvSchema = new Schema({
    header : String,
    subtitle : String,
    img : String,
}, {collection : "advertisementCards"})

module.exports =  mongoose.model("advertisementCards" ,AdvSchema)