var mongoose=require('mongoose');
var UserSchema = require('../schema/users');
var User=mongoose.model('users',UserSchema);//注册模型

module.exports=User;