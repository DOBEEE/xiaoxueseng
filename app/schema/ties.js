var mongoose=require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);//深层查询

var TieSchema=new mongoose.Schema({
    title: {type:String},
    lei: {type:String},
    quan: {type: mongoose.Schema.Types.ObjectId,ref:'quans'},
    content: {type:String},
    comments: [{type: mongoose.Schema.Types.ObjectId,ref:'comments'}],
    zhaiyao: {type:String},
    //0:nomal
    //1:jinghua
    //2:zhiding
    level: {type:Number,default:0},
    author: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    // author: {type:String},
    // authorImg: {type:String,default:''},
    pic: {type:String,default:''},
    like: [{type: mongoose.Schema.Types.ObjectId,ref:'users'}],
    star: [{type: mongoose.Schema.Types.ObjectId,ref:'users'}],
    yue: {type:Number,default:0},
    
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
TieSchema.plugin(deepPopulate);
module.exports=TieSchema;