
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var categories=new Schema({
 
  prod_name:String,
})



//register model 
mongoose.model("categories",categories);