
var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var users=new Schema({
   name:String,
  email:String,
  password:String,
  RoomNo:Number,
  EXT:Number,
  img:String,
  is_admin:Boolean,
  created_at:{
    type:Date,
    default:Date.now
  }
});

users.plugin(mongoosePaginate);
/*

users.post('remove',function(doc){
var user_id=doc._id;
  mongoose.model("posts").remove({user:user_id},function(err,result){
    
  });
});*/
//register model 
mongoose.model("users",users);