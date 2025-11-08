const mongoose = require("mongoose");
const { isEmail} = require('validator');
const bcrypt = require ("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:[6,'Password cannot be less than 6 characters']
    }
})


//before event is fired
userSchema.pre('save',async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt);
//console.log('user about to be created',this);
next();
})


const User = mongoose.model('user',userSchema);


module.exports = User;



//mongoose hooks
// userSchema.post('save',function(doc,next){
// console.log('new user was created and saved',doc);
// next();//after 
// });
// //before event is fired
// userSchema.pre('save',(next)=>{
// console.log('user about to be created',this);
// next();
// })