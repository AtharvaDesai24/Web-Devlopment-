const mongoose = require("mongoose");
const initData = require("./data.js");
const ListModel = require("../model/listing.js");
const { object } = require("joi");
const CredentialsModel=require("../model/authenticate.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/trip";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await ListModel.deleteMany({});
  initData.data= initData.data.map((obj)=>({...obj , Owner:"68511d97351d7f1e239b7487"}));
  await ListModel.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();