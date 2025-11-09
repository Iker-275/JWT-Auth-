const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
   // console.log(err.message,err.code);

    let errors = { email: "", password: "" }

     //duplicate error code
    if(err.code === 11000){
        errors.email ="That email is already registered";
        return errors;
    }


    //validation errors
    if (err.message.includes('user validation failed')) {
        console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(
            ({ properties }) => {
                errors[properties.path] = properties.message;
            }
        )

    }

    return errors;
}

const maxAge = 1 * 24 *  60 * 60; //age in seconds -1 day
const  createToken = (id)=>{
    return jwt.sign({ id },'secrety',{
        expiresIn: maxAge,

    });
}

const signUp_get = async (req, res) => {
    res.render("signup");
}

const signUp_post = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email,password);

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge * 1000});
        res.status(201).json({ success: true, user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ success: false, errors })
    }
}

const login_get = async (req, res) => {
    res.render('login');
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login')
}

module.exports = { signUp_get, signUp_post, login_get, login_post };