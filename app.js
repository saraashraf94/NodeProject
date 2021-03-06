
var express=require('express');
var server=express();
var session=require('express-session');
var flash =require('connect-flash');
var mongoose=require('mongoose');
require('./models/orders');
require('./models/users');
require('./models/categories');
require('./models/products');
require('./models/order_prod');
var authRoutes=require('./controllers/auth');
var postRoutes=require('./controllers/products');
var userRoutes=require('./controllers/users');
var ordersRoutes=require('./controllers/orders');
mongoose.connect('mongodb://localhost:27017/cafee');

server.use(express.static('public'));
server.use(session({
  secret:"@#%#$^$%",
  cookie:{maxAge:1000*60*60*7}
}));


server.use(flash()); 
server.use('/auth',authRoutes);

server.use(function(req,resp,next){
  if(!(req.session.username&&req.session.password)){
  
    resp.redirect('/auth/login');
  }
  else{
    resp.locals={
     username:req.session.username
    }
    next();
    

  }
})
server.use('/products',postRoutes);
server.use('/users',userRoutes);
server.use('/orders',ordersRoutes);


 server.set('view engine','ejs');
 server.set('views','./views');



server.listen (9090,function(){
  console.log("starting....");
});
