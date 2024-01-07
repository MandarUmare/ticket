var express = require('express');
var router = express.Router();
const userModel = require('./users');
const { model, default: mongoose } = require('mongoose');

const passport = require('passport');
require('dotenv').config();
const { route } = require('../app');
const localStrategy=require("passport-local").Strategy;
passport.use(new localStrategy(userModel.authenticate()));





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get("/profile",isLoggedIn,function(req,res){
   res.render("profile");
});

router.get("/feed",isLoggedIn,function(req,res){
  res.render("feed");
});

router.post("/register",function(req,res){
  const {username,email}=req.body;
  let userData=new userModel({
     username:username,
     email:email
   
  });

  userModel.register(userData,req.body.password)
  .then(function(){
   passport.authenticate("local")(req,res,function(){
    res.redirect("profile");
   })
  });
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){});

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect("/login");
  })
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}


module.exports = router;
