const mongoose = require("mongoose");
const { Schema } = mongoose;

let varietySchema = new Schema({
  heading: {
    type: String,
    required: [true, "Heading is Required"],
  },
  category: {
    type: String,
    required: [true, "Heading is Required"],
  },
  imgData: String,
});

module.exports = mongoose.model("varietys" , varietySchema)