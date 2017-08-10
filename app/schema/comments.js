var mongoose=require('mongoose');

var CommentSchema=new mongoose.Schema({
    content: {type:String},
    //0:nomal
    //1:jinghua
    //2:zhiding
    // level: {type:Number,default:0},
    zhaiyao: {type:String},
    tie: {type: mongoose.Schema.Types.ObjectId,ref:'ties'},
    author: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    // author: {type:String},
    // authorImg: {type:String,default:''},
    // yue: {type:Number,default:0},
    
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

module.exports=CommentSchema;