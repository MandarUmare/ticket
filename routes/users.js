var express = require('express');
const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");





const userschema=mongoose.Schema({
  username:String,
  email:String,
  fullname:String,
  password:String,

});
userschema.plugin(plm);
module.exports=mongoose.model("user",userschema);