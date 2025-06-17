const exp=require("express")
const app=exp();
const port=3000;
const path=require("path");
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
const cookie_parser=require("cookie-parser");
//express session
const session=require("express-session");
const flash=require("connect-flash");





const sessionOptions={secret: "mySecret",
  saveUninitialized:true,
  resave:false,
}




app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.hi=req.flash("hi");
  res.locals.hi2=req.flash("hi2");
  res.locals.err=req.flash("err");
  next();
});

app.get("/register",(req,res)=>{
   req.session.name=req.query.name;
   if(!req.session.name){
    req.session.name=='Sardesai';
    req.flash("err","Login Failed")
   }
   /* res.send("Welcome "+ "Sardesai");
   
  }
  else{
    res.send("Welcome "+ nam);
  
  }*/else{
       req.flash("hi",'Login successfull');
       req.flash("hi2","notyet");
  }

  res.redirect("/hello");
   
});
//method 1:-
/*app.get("/hello",(req,res)=>{
 console.log(req.session.name);
 let g=req.flash("hi");
  res.render("session.ejs",{name: req.session.name,g});
 
})
*/
app.get("/hello",(req,res)=>{

  res.render("session(DeleteKaroBaadMe)).ejs",{name: req.session.name});
 
})



/*app.get("/reqcount",(req,res)=>{
  //req.session.count==0
  console.log(req.session);
  if  (!req.session.count){
     req.session.count=1;
     res.send(`you sent a request ${req.session.count}  times.`);
  } 
  else {
   
     req.session.count= req.session.count+1;
     res.send(`you sent a request ${req.session.count}  times.`);
    }
  });*/




//initialising cookie parsing using middelware
app.use(cookie_parser("desai"));

app.listen(port,()=>{
  console.log("Hell Yeah!!");
});

app.get("/verify",(req,res)=>{
  //console.log(req.cookies+req.signedCookies);
  let g=req.signedCookies
  console.log(g)
  res.send("verified");
})
app.get("/cookies",(req,res)=>{
  res.cookie("Sar-desai","Dance",{signed:true});

    res.send("yep-signed");
})
app.get("/",(req,res)=>{
  res.send("yoo");
  console.dir(req.cookies);

})
