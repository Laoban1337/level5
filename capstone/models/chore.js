const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const choreSchema = new Schema({
  choreName: {
    type: String,
    required: true,
  },
  choreImage: {
    type: String,
  },
  estimatedChoreTime: {
    type: Number,
    required: true,
  },
  choreComplete: {
    type: Boolean,
    default: false,
  },
  cleaner: {
    type: Schema.Types.ObjectId,
    ref: "Cleaner",
    required: true,
  },
});

module.exports = mongoose.model("Chore", choreSchema);
