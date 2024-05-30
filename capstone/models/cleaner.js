const mongoose = require(`mongoose`);
const Schema = mongoose.Schema

const cleanerSchema = new Schema({
    cleanerName: {
      type: String,
      required: true,
    },
    
  });


module.exports = mongoose.model("Cleaner",cleanerSchema)
