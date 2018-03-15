
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

router.get('/orderpage',function(req,resp){
    mongoose.model('products').find({},  function(err,result ){
        if(err){
            console.log(err);
        }else{
            resp.render('products/orderpage', {
                data: result
            });
        }
    })
    
});


router.get('/search',function(req,resp){
    mongoose.model('products').find({prod_name:{"$regex":req.query.search,"$options":"i"}})
      .sort({_id:-1})
      .populate ({path:"user",select:"name"})
       .then(function(result,err)
       {                 
        if(!err){
                resp.render('products/list',{data:result,msg:req.flash('msg')});
          
            }
            else{
            resp.render(err);
            } 
        });
});


router.get('/delete/:id',function(req,resp){
    var productModel=mongoose.model('products');
    var product = new productModel({
        _id:req.params.id
    });
    product.remove(function(err,result){
        req.flash("msg","Done")
        resp.redirect('/products/list');
    })
    

})
router.get('/category',function(req,resp){
    resp.render('products/category')
   })
 router.post('/category',[bodyParserMid],function(req,resp){
  var Postcat=mongoose.model('categories');
   var post=new Postcat({ 
    cat_name:req.body.category_name
   });
     post.save(function(err,doc){
        resp.render('auth/links');
  

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