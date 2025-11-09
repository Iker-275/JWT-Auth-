const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())

//
app.set("view engine",'ejs')

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/smoothies",(req,res)=>{
    res.render("smoothies");
})

app.use("/",authRoutes);




app.listen(PORT,async()=>{
 await connectDB(process.env.DB_URL);
 console.log("listening on port "+ PORT);
})




// app.get("/set-cookies",(req,res)=>{
// //res.setHeader('Set-Cookie','newUser=true')
// res.cookie('newUser',false,{
//     maxAge:1000 * 60 * 60 * 24, //session expiry 24 hours
//     httpOnly:true
// });
// res.cookie('isEmployee',false,{
//     maxAge:1000 * 60 * 60 * 24, //session expiry 24 hours
//     secure:true,
// });
// res.send('you got the cookies');
// })

// app.get("/read-cookies",(req,res)=>{
//    const cookies =  req.cookies;

//    //console.log(cookies);
//    res.json(cookies);
// })