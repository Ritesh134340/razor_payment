const { Router } = require("express");
const razorpay = Router();
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order=require("../models/payment.model")

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

razorpay.post("/checkout", async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).send(order);
});

razorpay.post("/paymentverification", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const  expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthenticated=(razorpay_signature===expectedSignature)
  if(isAuthenticated){
      const newPayment=Order({razorpay_order_id, razorpay_payment_id, razorpay_signature})
      await newPayment.save();
      res.redirect(`http://localhost:3000/payment/success?ref=${razorpay_payment_id}`)
  }
  else{
    res.status(403).send({mesg:"Payment verification failed"})
  }
});

module.exports = razorpay;
