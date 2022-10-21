var express = require('express');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
const adminHelpers=require('../helpers/admin-helpers')
const adminLogin=require('../helpers/admin-login');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
   productHelpers.getAllProducts().then((products)=>{
    res.render("admin/view-products",{products,admin:true,user:req.session.loggedIn})
   })
  }else{
    res.redirect('/admin/login')
  }
});


// -----------------------------------login----------------------------------------


router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('admin/admin-login',{admin:true,loginErr:req.session.loginErr,user:req.session.loggedIn})
  }
  
})


router.post('/login',(req,res)=>{
  adminLogin.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin')
    }else{
      console.log('test2');
      
      req.session.loginErr=true
      res.redirect('/admin/login')
    }
  })
})
// -----------------------------------------logout-------------------------------------

router.get('/admin-logout',(req,res)=>{
  console.log("test1");
  req.session.destroy();
  res.redirect("/admin");
})


  // --------------------------------------add product----------------------------------
  router.get('/add-product',(req,res)=>{
    if(req.session.loggedIn){
      res.render('admin/add-product',{admin:true})
    }else{
      res.redirect('/admin/login')
    }
    
  })

  router.post('/add-product',(req,res)=>{
    productHelpers.addProduct(req.body,(insertedId)=>{
      let image=req.files.image
      var id=insertedId
      image.mv('./public/product-images/'+id+'.jpg')
      
      res.render("admin/add-product")

    })
    
  })
//----------------------------------------delete products--------------------------------
  router.get('/delete-product/:id',(req,res)=>{
    let prodId=req.params.id
    productHelpers.deleteProduct(prodId).then((response)=>{
      res.redirect('/admin/')
    })
  })

//---------------------------------------view user--------------------------------------------\
router.get('/user', function(req, res, next) {
  if(req.session.loggedIn){
    adminHelpers.getAllUser().then((user)=>{
      res.render("admin/view-user",{user,admin:true})
    })
  }else{
    res.redirect('/admin/login')
  }
  
});
//----------------------------------------delete user--------------------------------
router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  adminHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/user')
  })
})
//----------------------------------------add user-------------------------------------
router.get('/add-user',(req,res)=>{
  if(req.session.loggedIn){
    res.render('admin/add-user',{admin:true})
  }else{
    res.redirect('/admin/login')
  }
 
})
router.post('/add-user',(req,res)=>{
  adminHelpers.addUser(req.body).then((data)=>{
    res.redirect('/admin/add-user')

  })
  
})

// ----------------------------------------edit user--------------------------------------
router.get('/edit-user/:id',async(req,res)=>{
  
  let user= await adminHelpers.getUser(req.params.id)
  res.render('admin/edit-user',{user,admin:true})
})

router.post('/edit-user/:id',(req,res)=>{

  console.log("test2");
  adminHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/user')
  })
})





module.exports = router;
