const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require("../helpers/user-helpers")



//------------------------------middleware to check is user login in or not ------------------
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

// get home page with products
  router.get('/', function(req, res, next) {
    var user=req.session.user
    productHelpers.getAllProducts().then((products)=>{
      var value=req.session.loggedIn
      res.render("./user/view-products",{products,admin:false,user,value})
      console.log(value);
    })
  });


//--------------------------------------user login--------------------------------------------

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')

  }else{
    res.render('user/login',{loginErr:req.session.loginErr,})
    req.session.loginErr=false 
  }
  
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
})

//---------------------------------------user logout--------------------------------------------

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})

 
//-----------------------------------------signup-------------------------------------------
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignUp(req.body).then((Data)=>{
    console.log(req.body);
    res.redirect('/login')
    
  })
})

//------------------------------------------cart----------------------------------------------

router.get('/cart',verifyLogin,(req,res)=>{
  res.render('user/cart')
})



module.exports = router;
