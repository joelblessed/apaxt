const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Assuming you have a Cart model

// Increment quantity
router.post('/increment', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const cart = await Cart.findOne({ userId });
    const item = cart.items.id(itemId);
    item.quantity += 1;
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Decrement quantity
router.post('/decrement', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const cart = await Cart.findOne({ userId });
    const item = cart.items.id(itemId);
    if (item.quantity > 1) {
      item.quantity -= 1;
      await cart.save();
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
