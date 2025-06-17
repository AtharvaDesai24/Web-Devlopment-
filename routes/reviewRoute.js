const exp=require("express");
const router=exp.Router({mergeParams:true});//create router object
const wrapAsync=require("../utils/wrapAsync");
const Review=require("../model/review_schema")
const ListModel=require("../model/listing");
const flash=require("connect-flash");
const {Validatereview}=require("../Middelware")
const { isLoggedIn,isReviewAuthor }=require('../Middelware');
const { reviewSchema } = require("../schema(joy)");
const {AddReview,RenderReviewForm, DeleteReview}=require("../controllers/Reviews");

//Adding Review route

router.get("/review",RenderReviewForm); 
router.post("/",isLoggedIn,Validatereview, wrapAsync(AddReview));

//Delete review Router(for deletion of review)
 router.delete("/review/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(DeleteReview));

// routes/user.js
module.exports = router;
