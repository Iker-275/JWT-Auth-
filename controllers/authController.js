


const signUp_get =  async(req,res)=>{
res.render("signup");
}

const signUp_post =  async(req,res)=>{
res.render("new signup");
}

const login_get =  async(req,res)=>{
res.render('login');
}

const login_post =  async(req,res)=>{
res.render('user login')
}

module.exports = {signUp_get,signUp_post,login_get,login_post};