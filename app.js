const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();


//middleware
app.use(express.static("public"));

//
app.set("view engine",'ejs')

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/smoothies",(req,res)=>{
    res.render("smoothies");
})


app.listen(PORT,async()=>{
 await connectDB(process.env.DB_URL);
 console.log("listening on port "+ PORT);
})