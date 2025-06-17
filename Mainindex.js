const exp=require("express")
const app=exp();
const port=3000; 
const mongoose=require("mongoose");
const path=require("path");
const methodOver=require("method-override");
app.use(exp.urlencoded({extended:true}));
app.use(methodOver("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.use(exp.static("public"));
app.use(exp.static(path.join(__dirname,'public')));
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
const ExpressError=require("./utils/ExpressError");
const listingRoute=require("./routes/listingRoute");
const ReviewRoute=require("./routes/reviewRoute");
const CredentialRoute=require("./routes/authenticateRoute.js");//til
const sessions=require("express-session");
const MongoStore = require('connect-mongo');// Alwayes use express session first before using connect mongo
const flash=require("connect-flash");
const CredentialsModel=require("./model/authenticate.js");
const passport=require("passport");

const localStratergy=require("passport-local");
const { connect } = require("http2");
const { error } = require("console");
const databUrl=process.env.ATLAS_DB_URL;
const store=MongoStore.create({
  mongoUrl:databUrl,//Session info stores at Atlas mongo
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter : 24 * 3600, //Interval (in seconds) between session updates.in sec
});

store.on('error',()=>{
  console.log("Error in mongo session store",err);
})

const sessionOption={
    store:store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+ 7*24*60*60*1000,//one week from now in milli seconds
      maxAge: 7*24*60*60*1000,
      httpOnly:true,
    }
};







app.listen(port,()=>{
  console.log("Hell Yeah!!",port);
});


app.use(sessions(sessionOption));//assosiating sessions
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(CredentialsModel.authenticate()));
passport.serializeUser(CredentialsModel.serializeUser());
passport.deserializeUser(CredentialsModel.deserializeUser());



app.use((req,res,next)=>{
  
  
  res.locals.currUser=req.user;//to Check wheather User has Logged in or not
    res.locals.success=req.flash("success");
  
    res.locals.error=req.flash("error");
     next();
})

//DB url
const dbUrl=process.env.ATLAS_DB_URL;
async function main() {
    await mongoose.connect(dbUrl);
    }
    main().then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log(err);
    });

    


    //listing routes
app.use("/listings",listingRoute);//Reconstructing Listings routes (Middleware using)

//**ADDING REVIEW** 

  app.use("/listings/:id",ReviewRoute);//yaha /:id walla parameter Mainindex mai hi rehe jata hai therefore  reviewRoute cant acces it
//as program is finding common listings in listingRoute file therefore in listingRoute file only write / in place of /listings
  //app.use("/listings/:id",ReviewRoute);//Reconstructing review routes (Middleware using)

    app.use("/user",CredentialRoute);//Reconstructing signUp routes (Middleware using)

  
  ///if page route does'nt match with any of the route above the it executes app.all("",()=>{}) route
   app.all("/*splat",(req,res,next)=>{        // inExpress v5  '/*splat'== "*"
    next(new ExpressError(404,"page not Found"));
   });

  //Note always follow this sequence of param =>   (err,req,res,next)

 //Error Handling
  app.use((err,req,res,next)=>{
    let {statusCode=800,message="Something Went wrong.."}=err;
    console.log(message);
   // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
  });

 