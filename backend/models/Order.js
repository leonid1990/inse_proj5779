const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  details: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      },
      title: {
        type: String
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
