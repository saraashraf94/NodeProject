var express=require('express');
var router= express.Router();
var bodyParser=require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var fs=require('fs');
var multer=require('multer');
var mongoose=require('mongoose');
var uploadMid=multer({ dest:"./public/img"})
//var dateFormat = require('dateformat');



router.get('/addorder',[bodyParserMid],function(req,resp){

    var UserModel=mongoose.model('users');
    var post=new UserModel({
      name:req.body.name,
      password:req.body.password,
      email:req.body.email,
      RoomNo:req.body.RoomNo,
      EXT:req.body.EXT,
      img:req.file.originalname
    });
    post.save(function(err,doc){
    
     resp.render('auth/links');
 
     //resp.json(doc ); 
 
    })
 });
 

router.get('/list',function(req,resp){
    mongoose.model('orders').find({},function(err,order){
        mongoose.model('users').find({},function(error,user){
            resp.render('orders/list',{orders:order,users:user});
        })
       
    });
 });


router.get('/add',function(req,resp){
    mongoose.model('orders').find({},function(err,order){
        resp.render('orders/add',{orders:order});
    });
});
router.get('/delete/:id',function(req,resp){
    mongoose.model('orders').remove({_id:req.params.id},function(err,result){
        if(!err){
            req.flash("msg","Done")
            // resp.redirect('/orders/add');
            resp.render('orders/add',{orders:result});


        }
    })
});
module.exports=router;