
var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var products=new Schema({
 
  prod_name:String,
  price:Number,
  img:String,
  status:String,
  category:{
    type:Number,
    ref:"categories"
  }
  


});


products.plugin(mongoosePaginate);



//register model 
mongoose.model("products",products);