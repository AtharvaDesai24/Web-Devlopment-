const CredentialsModel=require("../model/authenticate");
const passport = require("passport");
module.exports.SignUp=async(req,res,next)=>{
  try{
        let {username,password,email}=req.body;
    let newUser=new CredentialsModel({
      email:email,
      username:username,
   });
    const registered_user= await  CredentialsModel.register(newUser,password);

  //Directly logging in to User After SignUp

      req.login(registered_user,(err)=>{
        if(err){
         return  next(err);
        }

      req.flash("success","You have been Signed Up successfully..");
      res.redirect(`${res.locals.url}`);
      });

  }
catch(e){

      req.flash("error",e.message + ', Please signUp again!..');
      res.redirect("/signup");

  }

};


module.exports.GetSignUpForm=(req,res)=>{
    res.render("signup.ejs");
    };

 module.exports.GetLoginForm=(req,res)=>{
  res.render("login.ejs")
};


 module.exports.GettingLoggedin=async(req,res)=>{
 req.flash("success","Welcome to Kholi dekho.com❣️,Your are Logged in..")
res.redirect(`${res.locals.url}`);
}


module.exports.GettingLoggedOut=(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
   req.flash("success","You have been logged out succesfully!..");
   
   res.redirect("/listings");
  });
};