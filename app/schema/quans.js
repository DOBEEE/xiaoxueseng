var mongoose=require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);//深层查询

var QuanSchema=new mongoose.Schema({
    title: {type:String},
    description: {type:String},
    ties: [{type: mongoose.Schema.Types.ObjectId,ref:'ties'}],
    //0:nomal
    //1:jinghua
    //2:zhiding
    level: {type:Number,default:0},
    author: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    notice:[{type: mongoose.Schema.Types.ObjectId,ref:'users'}],
    // author: {type:String},
    // authorImg: {type:String,default:''},
    pic: {type:String,default:'//dn-mhke0kuv.qbox.me/a0c372a8cdd8ab4cdd40.jpg'},
    
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
QuanSchema.plugin(deepPopulate);
module.exports=QuanSchema;