const express = require('express');
const app = express();
const cartRoutes = require('./routes/cart');

app.use(express.json());
app.use('/api/cart', cartRoutes);

// ...existing code...

module.exports = app;