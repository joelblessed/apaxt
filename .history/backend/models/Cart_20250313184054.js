const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: String,
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [itemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;