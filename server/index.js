
const express=require("express");
require("dotenv").config()
const PORT=process.env.PORT || 8080
const connection=require("./config/db")
const cors=require("cors")
const app=express()
const razorpayRouter=require("./routes/razorpay")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api",(req,res)=>{
  res.status(200).send("Welcome to payment server !")
})

app.get("/api/key",(req,res)=>{

  res.status(200).send({key:process.env.KEY_ID})
})

app.use("/api/razorpay",razorpayRouter)

app.listen(PORT,async()=>{
  try{
   await connection;
   console.log("Database connection successful !")
  }
  catch(err){
    console.log(err)
    console.log("Couldn't connect to database !")
  }
    console.log("Express server listening on port",PORT)
})





