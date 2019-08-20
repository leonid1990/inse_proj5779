const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String
  },
  details: [
    {
      products: {
        type: Schema.Types.ObjectId,
        ref: "product"
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
