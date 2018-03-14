
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
var ProductModel=mongoose.model('products');
var UserModel=mongoose.model('users');
router.get('/add',function(req,resp){
    mongoose.model('categories').find({},function(err,categories){
        resp.render('products/add',{categories:categories});
    });
    
});

/*router.get('/status/:id',function(req,resp){
    
    //resp.send("done");
    mongoose.model('products').find({_id:req.param.id},(function(result,err)
        {                 
         if(!err){
                 resp.render('products/list',{data:result,msg:req.flash('msg')});
             //  resp.json(result);
             }
             else{
            if( mongoose.model('products').status=="available"){
                mongoose.model('products').update({_id:req.params.id},{

                    "$set":{status:"unavailable" }
                    },function(err,doc){
                        resp.render('product_updated');
                    });
            }
            else{
                mongoose.model('products').update({_id:req.params.id},{

                    "$set":{status:"available" }
                    },function(err,doc){
                        resp.render('product_updated');
                    });
               }
             } 
        })
    )
});

*/
router.post('/add',uploadMid.single('avatar'),function(req,resp){
    fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
    //resp.send(req.file);
    console.log(req.file);
    var product=new ProductModel({
        prod_name:req.body.prod_name,
        price:req.body.price,
        img:req.file.originalname,
        category:req.body.category 
        
      });
      product.save(function(err,doc){
          resp.send('done');
       //resp.json(doc ); 
   
      })
 });
// router.post('/add',uploadMid.single('avatar'),function(req,resp){
//     //fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
//     var PostModel=mongoose.model('products');
//     console.log(req.body);
//     //resp.send(req.file.filename);
//     var post=new PostModel({
//      prod_name:req.body.prod_name,
//      price:req.body.price,
//      img:req.file.filename,
//      category:req.body.category   
//    });
  
//    post.save(function(err,doc){

//        resp.send('done');
//  // resp.json(req.file ); 

//    })
// });
router.get('/list/:page?',function(req,resp){
    var page=1;
    if(req.params.page)
    page=req.params.page
    mongoose.model('products').paginate({},{page:page,limit:5},function(err,result)
    {
        if(!err){
         resp.render('products/list',{data:result,msg:req.flash('msg')});
        
        }
        else{
           resp.render(err);
        }

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
router.get('/category',function(req,resp){
    resp.render('products/category')
   })
 router.post('/category',[bodyParserMid],function(req,resp){
  var Postcat=mongoose.model('categories');
  //console(req.body.category_name);
   var post=new Postcat({ 
    cat_name:req.body.category_name
   });
     post.save(function(err,doc){
       resp.send('done');
    //resp.json(doc ); 

   })

   
});



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