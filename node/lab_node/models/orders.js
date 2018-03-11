
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var orders=new Schema({
 
  price:Number,
  status:Number,
  notes:String,
  time:{
    type:Date,
    default:Date.now
  },
  user:{
    type:Number,
    ref:"users"
  },
  created_at:{
    type:Date,
    default:Date.now
  }

     


});





//register model 
mongoose.model("orders",orders);