const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = cartTotal + newItemPrice;
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  if (isMember) {
    cartTotal -= (cartTotal * discountPercentage) / 100;
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxAmount = (cartTotal * taxRate) / 100;
  res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod.toLowerCase() === 'standard') {
    deliveryDays = distance / 50;
  } else if (shippingMethod.toLowerCase() === 'express') {
    deliveryDays = distance / 100;
  } else {
    return res.send('Invalid shipping method.');
  }
  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
