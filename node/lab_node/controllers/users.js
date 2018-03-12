
var express=require('express');
var router= express.Router();
var bodyParser=require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var fs=require('fs');
var multer=require('multer');
var mongoose=require('mongoose');
var uploadMid=multer({
    dest:"./public/img" 
  })


router.get('/add',function(req,resp){
    resp.render('users/add')
});


router.post('/add',uploadMid.single('avatar'),function(req,resp){

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
   
       resp.send('done');
    //resp.json(doc ); 

   })
});


router.get('/list/:page?',function(req,resp){
    var page=1;
    if(req.params.page)
    page=req.params.page
    
    mongoose.model('users').paginate({},{page:page,limit:5},function(err,result)
    {
        if(!err){
         resp.render('users/list',{data:result,msg:req.flash('msg')});
        //resp.json(result.docs);
        }
        else{
           resp.render(err);
        }

    });
    
});
router.get('/delete/:id',function(req,resp){
    var UserModel=mongoose.model('users');
    var user = new UserModel({
        _id:req.params.id
    });
    user.remove(function(err,result){
        req.flash("msg","Done")
        resp.redirect('/users/list');
    })
    
})
router.get('/edit/:id',function(req,resp){

    
    mongoose.model('users').findOne({_id:req.params.id},function (err,result) {
        resp.render('users/edit',{obj:result});

    })
})
router.post('/edit/:id',[bodyParserMid],function(req,resp){
    console.log(req.params.id);
    mongoose.model('users').update({_id:parseInt(req.params.id)},{

    "$set":{name:req.body.name,RoomNo:req.body.RoomNo,email:req.body.email,EXT:req.body.EXT}
    },function(err,doc){
        
        resp.redirect('/users/list');
    });
})



module.exports=router;