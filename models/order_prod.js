
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var order_prod=new Schema({
 
    prod_id:Number,
    order_id:Number,
    quantity:Number
     


});