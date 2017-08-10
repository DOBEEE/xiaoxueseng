var mongoose=require('mongoose');
var CommentSchema = require('../schema/comments');
var Comment=mongoose.model('comments',CommentSchema);//注册模型

module.exports=Comment;