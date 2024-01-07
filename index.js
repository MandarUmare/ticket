var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Session=require("express-session");
const passport = require('passport');
const ejs = require('ejs');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(Session({
  resave:false,
  saveUninitialized:false,
  secret:"ksfkjhfaka"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var express = require('express');
var router = express.Router();
const userModel = require('./users');
const { model, default: mongoose } = require('mongoose');

const passport = require('passport');

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
