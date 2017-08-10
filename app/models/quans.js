var mongoose=require('mongoose');
var QuanSchema = require('../schema/quans');
var Quan=mongoose.model('quans',QuanSchema);//注册模型

module.exports=Quan;