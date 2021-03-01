const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const CatModel = mongoose.model("Cat", CatSchema);
module.exports = CatModel;
