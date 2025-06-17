if (process.env.NODE_ENV != "production"){
  require("dotenv").config();
}


const ListModel=require("../model/listing");
const ExpressError=require("../utils/ExpressError");
const flash=require("connect-flash");
module.exports.index=async(req,res)=>{
  let listingData= await ListModel.find();
    res.render("Listing.ejs",{listingData});
 };


 module.exports.NewListing=async(req,res,next)=>{
  const url=req.file.path;
   const filename=req.file.filename;
   const newInfo=req.body;
   const OwnerId=req.user._id;
   let newOne=new ListModel({
      title:newInfo.title,
      description:newInfo.description,
      price:newInfo.price,
      location:newInfo.location,
       country:newInfo.country,
      Reviews:req.user._id,
      image:{
        url:url,
        filename:filename,
      },
      Owner:OwnerId,
    });
  
   newOne.save().then((res)=>{
      console.log("Added");
      
    }).catch((err)=>{
        console.log(err);
    });
   req.flash("success","New listing is Added successfully!..")
  res.redirect("/listings");
 };

 module.exports.show_Listings=async(req,res)=>{
    let info=await ListModel.findById(req.params.id).populate( 
    {path: "Reviews",
      populate:{
             path:"author", //nested populate 
            } 
     }).populate("Owner"); 
     //with listing owner & Review ,author of Review information is also coming
                    // let reviews=await Review.findById(req.params.id);
    if(!info){
         req.flash("error",'Listing  you requested for does not exist');
         res.redirect("/listings");
  }
  else{ 
     res.render("show.ejs",{info} );///currUser is stored in locals therefore it is accesseble any where

  }
};

module.exports.GetEditForm=async(req,res)=>{
    try{
      let  {id}= req.params.id;
        let info=await ListModel.findById(req.params.id);
        if(!info){
            req.flash("error",'Listing  you requested for does not exist');
            res.redirect("/listings");
        }
        else{
        let originalImage= info.image.url;
         originalImage=originalImage.replace("/upload","/upload/h_300,w_250");//image transformation on cloudinary
         info.image.url=originalImage;
          res.render("update.ejs",{ info });
        }
        
      }
    
      catch(err){
    throw new ExpressError(400,"Send valid data for listing");
    }
};


module.exports.update=async(req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let info=await ListModel.findById(req.params.id);
    
  
   // console.log(info);
    let listings= await ListModel.findByIdAndUpdate(info._id,req.body,{new :true});
     if(typeof req.file !=="undefined"){
       let url=req.file.path;
    let filename=req.file.filename;
    listings.image={url,filename};
    await listings.save();
    }
  // req.file=undefined if user does not change the image
    req.flash("success"," listing is Updated successfully!..")
   return res.redirect(`/listings/${req.params.id}`);
};

module.exports.Del_Listings=async(req,res)=>{
  
    let id=req.params.id;
    await ListModel.findByIdAndDelete(id);
    req.flash("success"," listing is Deleted successfully!..")
    res.redirect("/listings");
};