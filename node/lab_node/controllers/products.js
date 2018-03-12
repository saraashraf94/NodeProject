
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
    mongoose.model('categories').find({},function(err,categories){
        resp.render('products/add',{categories:categories});
    });
    
});


router.post('/add',uploadMid.single('avatar'),function(req,resp){

    fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
    var PostModel=mongoose.model('products');
    
   var post=new PostModel({
     prod_name:req.body.prod_name,
     price:req.body.price,
     img:req.file.originalname,
     category:req.body.category   
   });
   post.save(function(err,doc){

       resp.send('done'   );
 // resp.json(req.file ); 

   })
});


router.get('/list',function(req,resp){
    mongoose.model('products').find({},function(err,result)
    {           
       // mongoose.model('users').populate(result,{path:"user",select:"name"},function(err,result){
         //resp.json(result);
      if(!err){
            resp.render('products/list',{data:result,msg:req.flash('msg')});
          //  resp.json(result);
        }
        else{
           resp.render(err);
       }
   // })
       

    });
});

router.get('/search',function(req,resp){
    //resp.json(req.query.search);
    mongoose.model('products').find({title:{"$regex":req.query.search,"$options":"i"}})
      .sort({_id:-1})
      .populate ({path:"user",select:"name"})
       .then(function(result,err)
       {                 
        if(!err){
                resp.render('products/list',{data:result,msg:req.flash('msg')});
            //  resp.json(result);
            }
            else{
            resp.render(err);
            } 
        });
});


router.get('/delete/:id',function(req,resp){
    mongoose.model('products').remove({_id:req.params.id},function(err,result){
        if(!err){
            req.flash("msg","Done")
            resp.redirect('/products/list');


        }
    })
})
router.get('/edit/:id',function(req,resp){
    mongoose.model('products').findOne({_id:req.params.id},function (err,result) {
        resp.render('products/edit',{obj:result});

    })
})
router.post('/edit/:id',[bodyParserMid],function(req,resp){
    console.log(req.params.id);
    mongoose.model('products').update({_id:req.params.id},{

    "$set":{name:req.body.name,price:req.body.price
    }
    },function(err,doc){
        
        resp.redirect('/products/list');
    });
})



module.exports=router;