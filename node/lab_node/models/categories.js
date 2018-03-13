
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var categories=new Schema({
 
  cat_name:String,
})



//register model 
mongoose.model("categories",categories);