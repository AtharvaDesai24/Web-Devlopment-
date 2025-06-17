const ListModel=require("./model/listing");
const ExpressError=require("./utils/ExpressError");
const {ListingSchema,reviewSchema} =require("./schema(joy)");
const { model } = require("mongoose");
const Review=require("./model/review_schema");
module.exports.isLoggedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
         console.log(req.originalUrl);
         req.session.redirectUrl= req.originalUrl;
          req.flash("error","You have to Be Logged in  to Create new Listings!..")
         return  res.redirect("/user/login");
  }

   next();
}


module.exports.Save=(req,res,next)=>{
  if(req.session.redirectUrl && req.session.redirectUrl!='/user/login' && req.session.redirectUrl!="/user/signup" ){
     res.locals.url=req.session.redirectUrl;
   }
  
    else{
   res.locals.url='/listings';
    }

 next();

}


module.exports.isOwner=async(req,res,next)=>{
    let info=await ListModel.findById(req.params.id);
       if(!info.Owner.equals( res.locals.currUser._id)){
         req.flash("error","You dont have Permision to edit & update the listings");
         return  res.redirect(`/listings/${req.params.id}`);
        }
   next();
}

module.exports.validateListing=(req,res,next)=>{
  let {error}=ListingSchema.validate(req.body);

  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
}

module.exports.Validatereview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);

  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
}




module.exports.isReviewAuthor=async(req,res,next)=>{
   let {id,reviewId}=req.params;
  const rev=await Review.findById(reviewId);
  
  if(!req.user._id.equals(rev.author)){
 req.flash("error","You don't have access to Delete Review");
  return res.redirect("/listings/"+id);
}
next();
}