const exp=require("express");
const router=exp.Router();//create router object
const wrapAsync=require("../utils/wrapAsync");
const multer=require("multer");

const {isLoggedIn,isOwner,validateListing}=require("../Middelware.js");
const {index,NewListing,GetEditForm,show_Listings, update,Del_Listings } =require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js")
const upload=multer({ storage }); //MULTER STORES The file in Storage folder in CLOUDINARY


/* not need to write /listing route as a parent route*/

  router.get("/cookies",(req,res)=>{
    res.cookie("greet","JHOL JHALL");
    res.send("you have been HACKED..")
   // console.dir(req.cookies);
  });



            //Index route
router.get("/",wrapAsync(index));

 
             //New Route
   router.get("/add",isLoggedIn,(req,res)=>{

    res.render("new.ejs");
   // console.log(req.user);//stores info about logged in person
   });


router.post("/",isLoggedIn,upload.single("image"),validateListing,wrapAsync(NewListing)); // NewListing,upload.single("image")=saves image into cloudinary taking image from feild' image' 



                
                /***Show route***/
 router.get("/:id",wrapAsync(show_Listings));
                 
                 
                 
                                     //**UPDATE &Edit route***
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(GetEditForm));
                 
                   
//UPDATE
router.put("/:id",isLoggedIn,isOwner,upload.single("image"),validateListing,wrapAsync(update));
                   
                 
                   //DELETE
                 
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(Del_Listings));




module.exports=router;