
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var products=new Schema({
 
  prod_name:String,
  price:Number,
  img:String,
  status:Boolean,
  category:{
    type:Number,
    ref:"categories"
  }
  


});





//register model 
mongoose.model("products",products);