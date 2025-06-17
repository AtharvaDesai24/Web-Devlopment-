const exp=require("express");
const router=exp.Router();//create router object
//const CredentialsModel=require("../model/authenticate");

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { Save }=require("../Middelware");
const {SignUp,GetSignUpForm,GetLoginForm,GettingLoggedin,GettingLoggedOut}=require("../controllers/authenticate");

//SignUp
router.get("/signup",GetSignUpForm)
router.post("/signup",Save,wrapAsync(SignUp));



//Login
router.get("/login",GetLoginForm);
router.post("/login",Save,passport.authenticate("local",{
   failureFlash:true,//not working
  failureRedirect:"/user/login",
 }),GettingLoggedin);


 //Logout
router.get("/logout",GettingLoggedOut);





module.exports=router;