const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bountySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  living: {
    type: Boolean,
    default: true // optional: setting a default value
  },
  bountyAmount: {
    type: Number,
    required: true,
    default:15000
  },
  type: {
    type: String,
    // required: true // assuming type is required, adjust if necessary
  }
});

module.exports = mongoose.model("Bounty", bountySchema);
