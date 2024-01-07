var express = require('express');
const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);


const userschema=mongoose.Schema({
  username:String,
  email:String,
  fullname:String,
  password:String,

});
userschema.plugin(plm);
module.exports=mongoose.model("user",userschema);