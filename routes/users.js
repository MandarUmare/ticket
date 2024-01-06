var express = require('express');
const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");


mongoose.connect("mongodb+srv://mandarumare2003:Mandar123@cluster0.oavp6ko.mongodb.net/Lokesh?retryWrites=true&w=majority");


const userschema=mongoose.Schema({
  username:String,
  email:String,
  fullname:String,
  password:String,

});
userschema.plugin(plm);
module.exports=mongoose.model("user",userschema);