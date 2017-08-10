var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var deepPopulate = require('mongoose-deep-populate')(mongoose);//深层查询

var SALT_WORK_FACTOR=10;
var UserSchema=new mongoose.Schema({
    nicheng:{type:String},
    age:{type:Number,default:0},
    password:{type:String},
    username:{type:String,unique:true},
    picture:{type:String,default:'//dn-mhke0kuv.qbox.me/a0c372a8cdd8ab4cdd40.jpg'},
    //0:nomal user
    //1:VIP
    //2:VIP pro
    //10:admin
    role:{
        type:Number,
        default:0
    },

    like: [{type: mongoose.Schema.Types.ObjectId,ref:'ties'}],
    star: [{type: mongoose.Schema.Types.ObjectId,ref:'ties'}],
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:'comments'}],
    ties: [{type: mongoose.Schema.Types.ObjectId,ref:'ties'}],
    quans: [{type: mongoose.Schema.Types.ObjectId,ref:'quans'}],
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

UserSchema.methods={
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if (err) return cb(err);

            cb(null,isMatch);
        })
    }
}
UserSchema.pre('save',function (next) {
    var user=this;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password=hash;
               next();
        });
    });
})
UserSchema.plugin(deepPopulate);
module.exports=UserSchema;