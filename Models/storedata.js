const mongoose = require ("mongoose");
const { Schema } = mongoose;


const storeschema = new Schema({
  id: Number,
  storeName: String,
  phoneNumber: String,
  address: {},
  openStatusText: String,
  addressLines: Array,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = mongoose.model("store", storeschema);