var express=require('express');
var router= express.Router();
var bodyParser=require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var mongoose=require('mongoose');

router.get('/login',function(req,resp){
  resp.render('auth/login',{

    msg: req.flash("msg")
  }) ;

});

router.post('/login',bodyParserMid,function(req,resp){
  var username=req.body.username;
  var password=req.body.password;
 var user=mongoose.model('users');
 user.findOne({name: username},function(err,user){
   console.log(user);
    if(err){
      console.log("404");
      return resp.status(404).send();
    }
    if(user)
    {  
      if( password=="123456"){

        req.session.username="admin";
        req.session.password="admin";
    
        resp.redirect('/products/list/');
        console.log( req.session.username);
      }else{
        req.flash("msg",'invalide username');
       resp.redirect('/auth/login');
      }
    
        return resp.status(200).send(); 
    }
   
  })
  // if(username=="admin" && password=="admin"){
  //   req.session.username="marwa";
  //   req.session.password="123456";

  //   resp.redirect('/products/list/');
  //   console.log( req.session.username);
  
});  

router.get('/register',function(req,resp){
  resp.render('auth/register') ;
});
router.post('/register',bodyParserMid,function(req,resp){
});

router.get('/logout',function(req,resp){
  req.session.destroy(function(){
    resp.redirect('auth/login') 
  });
});



module.exports=router;