const Credentials=require("./authenticate")
const Review=require("./review_schema");
const mongoose=require("mongoose");
const { type } = require("../schema(joy)");
const { ref, required } = require("joi");
const Schema=mongoose.Schema;
const ListingSchema=new mongoose.Schema({
   title:{
     type:String,
     required:true,
   },
   
   description:{
    type:String,
    required:true,
  
   }
   ,
   image:{
    url:String,
    filename:String,



    //type:String,
    //default:"https://tse1.mm.bing.net/th/id/OIP.vXmLY5v6LPxpZ7oA3xndMwHaEK?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain",//if img val is not entered i.e undefined then it going to execute..
    //set:(v)=>v===" " ? "https://tse1.mm.bing.net/th/id/OIP.vXmLY5v6LPxpZ7oA3xndMwHaEK?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain":v,//if img val is " "(empty) the it going to execute.
   }, 
   price:{
     type: Number,
    // positive:true,
    required:true,
       
   },
   location:String,
   country:String,
   Reviews:[
      {
      type: Schema.Types.ObjectId,
      ref:"Review",//from review model Id is gona come
      },
     ], 
    Owner :{
      type: Schema.Types.ObjectId,
      ref:"Credentials",//ref:Schema Name
     }  
});


ListingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
       await Review.deleteMany({_id:{$in: listing.Reviews}});
       }
});
const ListModel= mongoose.model("List",ListingSchema);
module.exports=ListModel;