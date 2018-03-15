
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var orders=new Schema({


  price:Number,
  status:String,
  notes:String,
  time:{
    type:Date,
  },
  user:{
    type:Number,
    ref:"users"
  },
  created_at:{
    type:Date,
    default:Date.now
  },
  action:String,
  img:String




});





//register model
mongoose.model("orders",orders);