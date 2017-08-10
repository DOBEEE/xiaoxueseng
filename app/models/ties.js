var mongoose=require('mongoose');
var TieSchema = require('../schema/ties');
var Tie=mongoose.model('ties',TieSchema);//注册模型

module.exports=Tie;