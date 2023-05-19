const mongoose=require("mongoose");
const paymentSchema=new mongoose.Schema({
    razorpay_order_id:String,
    razorpay_payment_id:String,
    razorpay_signature:String
})

const Order=mongoose.model("order",paymentSchema);
module.exports=Order;