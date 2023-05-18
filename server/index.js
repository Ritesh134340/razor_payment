
const express=require("express");
require("dotenv").config()
const connection=require("./config/db")
const app=express()
const PORT=process.env.PORT || 8080


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT,async()=>{
    try{
      await connection;
      console.log("Database connected successfully !");
    }
    catch(err){
        console.log("Database connection failed !",err)
    }
    console.log("Express server listening on port",PORT)
})