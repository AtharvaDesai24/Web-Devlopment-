const ListModel=require("../model/listing");
const  Review=require("../model/review_schema");

module.exports.RenderReviewForm=(req,res)=>{
    let id= req.params;
    console.log(id);
   res.render("review.ejs",id);
   };


module.exports.AddReview=async(req,res)=>{
    let listing=await ListModel.findById(req.params.id);
    let reviewInfo=req.body;
    reviewInfo.author=req.user._id;
    let newReview=new Review(reviewInfo);
   
    listing.Reviews.push(newReview);
    await newReview.save();
    let resl= await listing.save();
   req.flash("success",'Your Review is  Added Successfully!..');
   res.redirect("/listings/"+req.params.id);
   };

module.exports.DeleteReview=async(req,res)=>{
  let {id,reviewId}=req.params;
 await Review.findByIdAndDelete(reviewId); //to delete from database..But also we need to delete from listing Review array
 req.flash("success","Review Deleted Successfully!..");
 await ListModel.findByIdAndUpdate(id,{$pull:{Reviews:reviewId}}); 
  res.redirect("/listings/"+id);
 };

