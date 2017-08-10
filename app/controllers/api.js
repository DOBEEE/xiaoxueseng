var User=require('../models/users');
var Tie=require('../models/ties');
var Comment=require('../models/comments');
var Quan=require('../models/quans');

// var deepPopulate = require('mongoose-deep-populate');
// exports.logout=function(req, res){
//   req.session.user=null;
//   res.redirect('/');
// };


//userlist page
exports.userlist=function (req,res) {
    User.find(function (err,users) {
        if(err) console.log(err);
        
        var result = [];
        for (var i = 0; i < users.length; i++) {
            
            result.push({
                id: users[i]._id,
                username: users[i].username,
                nicheng: users[i].nicheng,
                level: users[i].role
            })
        }
        // console.log(result);
        res.send({
            users:result
        })
    })
}
// exports.del=function (req,res) {
//     var id=req.query.id;
//     if (id) {
//         User.remove({_id:id},function (err,user) {
//             if (err) {
//                 console.log(err);
//             }else{
//                 res.json({success:1});
//             }
//         })
//     }
// }

// exports.showSignup=function(req, res){
//   res.render('signup',{title:'注册'});
// };

exports.admindeltie=function(req, res,next){
    if (!req.session.user) {
        res.send({state:'unerr',mes:'未登录'});
        return;
    }
    Tie.remove({_id:req.body.tieid},function (err,comment) {
        if (err) console.log(err);
        res.send({state:'ok'})
    })
}
exports.signup=function(req, res,next){
    // console.log(req.body);
  // res.send({state:'ok',name:'lilili',id:'00001'})
  User.findOne({username:req.body.username},function (err,user) {
    if(err) {console.log(err);}

    if(user){
        res.send({state:'unerr',name:'',id:''})
        // return res.redirect('/login');
    } else{
        User.findOne({nicheng:req.body.nicheng},function (err,user) {
            if(user){
                res.send({state:'ncerr',name:'',id:''})
                // return res.redirect('/login');
            } else {
                var user=new User(req.body);
                user.save(function (err,_user) {
                    if (err) return err;

                    req.session.user=_user;
                    res.send({state:'ok',name:_user.nicheng,level:_user.role,id:_user.id})
                    // res.redirect('/');
                })
            }
        })
        
    }
  })
  
}
// exports.showLogin=function(req, res){
//   res.render('login',{title:'登陆'});
// };

exports.login=function(req, res){
    User.findOne({username:req.body.username},
    function (err,doc) {
        if(err) return next(err);

        if(!doc){
            res.send({state:'unerr',name:'',id:''})
        }

        doc.comparePassword(req.body.password,function (err,isMatch) {
            if(err) console.log(err);

            if(isMatch){
                req.session.user=doc;
                res.send({
                    state:'ok',
                    name:doc.nicheng,
                    level:doc.role,
                    id:doc._id,
                    touxiang: doc.picture
                })
                // res.redirect('/');
            }else{
                res.send({state:'pwerr',touxiang:'', name:'',id:doc._id})
                // res.redirect('/login');
            }
        })
        
    })
}
exports.logout=function(req, res){
    req.session.user=null;
    res.send({state: 'ok'});
}
var leimap = {
    nong: '农学',
    math: '数学',
    en: '英语',
    computer: '计算机'
}
exports.user=function(req, res){
    User.findOne({_id: req.body.userid}).deepPopulate('ties star comments comments.tie').exec((err,person) =>{
        if(err) {
            // console.log(err)
            res.send({state:'404',mes:'你要找的东西不存在'});
            return;
        };

        var data = {
            author: person.nicheng,
            authorid: person._id,
            authorImg: person.picture,
            ties: [],
            comments: [],
            stars: []
        }
        var ties = [];
        for (var i = 0; i < person.ties.length; i++) {
            
            ties.push({
                tieid: person.ties[i]?person.ties[i]._id:'404',
                title: person.ties[i]?person.ties[i].title:'原帖已被管理员删除',
                time: person.ties[i]?person.ties[i].meta.createAt.toString().substr(4,21):'2017-01-01',
                zhaiyao: person.ties[i]?person.ties[i].zhaiyao:'原帖已被管理员删除',
                lei: person.ties[i]?leimap[person.ties[i].lei]:'垃圾箱',
                commentsnum: person.ties[i]?person.ties[i].comments.length:'99'
            })
            
        }
        data.ties = ties;
        var comments = [];
        for (var i = 0; i < person.comments.length; i++) {
            
            comments.push({
                comid: person.comments[i]._id,
                tieid: person.comments[i].tie?person.comments[i].tie._id:'404',
                tietitle: person.comments[i].tie?person.comments[i].tie.title:'原帖已被删除',
                time: person.comments[i].meta.createAt.toString().substr(4,21),
                zhaiyao: person.comments[i].zhaiyao
            })
            
        }
        var stars = [];
        for (var i = 0; i < person.star.length; i++) {
            
            stars.push({
                tieid: person.star[i]?person.star[i]._id:'404',
                title: person.star[i]?person.star[i].title:'原帖已被删除',
                time: person.star[i]?person.star[i].meta.createAt.toString().substr(4,21):'2017-01-01',
                zhaiyao: person.star[i]?person.star[i].zhaiyao:'原帖已被删除',
                lei: leimap[person.star[i]?person.star[i].lei:'en'],
                commentsnum: person.star[i]?person.star[i].comments.length:'100'
            })
            
        }
        var content = {};
        if (req.body.type == 'main') {
            content = data;
        } else if (req.body.type == 'comments'){
            content = comments;
        } else {
            content = stars;
        }
        let isOwner = '0';
        if (req.session.user && req.session.user._id == req.body.userid) {
            isOwner = '1';
        }
        res.send({
            isOwner: isOwner,
            type: req.body.type,
            content: content
        })
    })
}
exports.home=function(req, res){
    var ser = {
        lei: req.body.type
    };
    if (req.body.type === 'tuijian') {
        ser = {}
    }
    Tie.find(ser).deepPopulate('author star like').exec((err,ties) =>{
        if(err) console.log(err);

        var result = [];
        for (let i = 0; i < ties.length; i++) {
            result.push({
                id: ties[i]._id,
                title: ties[i].title,
                authorid: ties[i].author._id,
                author: ties[i].author.nicheng,
                authorImg: ties[i].author.picture,
                time: ties[i].meta.createAt.toString().substr(4,21),
                zhaiyao: ties[i].zhaiyao,
                pic: ties[i].pic,
                islike: islikeorstar(ties[i].like,req.session.user ? req.session.user._id : ''),
                like: ties[i].like.length,
                isstar: islikeorstar(ties[i].star,req.session.user ? req.session.user._id : ''),
                star: ties[i].star.length
            })
            
        }

        res.send({
            type: req.body.type,
            content: result
        })
    })
}
exports.tiedetail=function(req, res){
    Tie.findOne({_id: req.body.tieid}).deepPopulate('author star like comments comments.author').exec((err,tie) =>{
        if(err) {
            // console.log(err)
            res.send({state:'404',mes:'你要找的帖子不存在'});
            return;
        };
        var result = {
            tieid: tie._id,
            title: tie.title,
            content: tie.content,
            author: tie.author.nicheng,
            authorid: tie.author._id,
            authorImg: tie.author.picture,
            pic: tie.pic,
            time: tie.meta.createAt,
            islike: islikeorstar(tie.like,req.session.user ? req.session.user._id : ''),
            like: tie.like.length,
            isstar: islikeorstar(tie.star,req.session.user ? req.session.user._id : ''),
            star: tie.star.length
        };
        var comments = [];
        for (let i = 0; i < tie.comments.length; i++) {
                comments.push({
                    content: tie.comments[i].content,
                    author: tie.comments[i].author.nicheng,
                    authorid: tie.comments[i].author._id,
                    authorImg: tie.comments[i].author.picture,
                    time: tie.comments[i].meta.createAt.toString().substr(4,21)
                })
            
        }
        result.comments = comments;
        
        res.send({
            content: result
        })
    })
}
function islikeorstar(arr,user) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id == user) {
            return '1'
        }
    }
    return '0';
}
exports.fatie=function(req, res){
    if (!req.session.user) {
        res.send({state:'err',mes:'未登录'});
        return;
    }
    var data = {
        author: req.session.user._id,
        title: req.body.title,
        zhaiyao: req.body.zhaiyao,
        lei: req.body.lei,
        pic: req.body.pic,
        content: req.body.content
    }
    var tie=new Tie(data);
    tie.save(function (err,_tie) {
        if (err) console.log(err);

        res.send({state:'ok',id:_tie._id})
        User.findOne({username:req.session.user.username},function(err,person){
            person.ties.push(_tie._id);
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            
        });

    })
}
exports.quan=function(req, res){
    
    Quan.find({}).exec((err,quans) =>{
        if(err) console.log(err);

        var others = [];
        var owner = [];
        for (let i = 0; i < quans.length; i++) {
            others.push({
                id: quans[i]._id,
                title: quans[i].title,
                description: quans[i].description,
                pic: quans[i].pic,
                owner: quans[i].author,
                member: quans[i].notice.length+1
            })
            
        }
        if (req.session.user) {

            User.findOne({_id:req.session.user._id}).deepPopulate('quans').exec((err,user) =>{
                if(err) console.log(err);
                
                for (let i = 0; i < user.quans.length; i++) {
                    owner.push({
                        id: user.quans[i]._id,
                        title: user.quans[i].title,
                        description: user.quans[i].description,
                        pic: user.quans[i].pic,
                        owner: req.session.user._id,
                        member: user.quans[i].notice.length+1
                    })
                    
                }
                var result={
                    owner: owner,
                    others: others
                }
                res.send({
                    state:'ok',
                    content: result
                })

            })

        } else {
            var result={
                owner: owner,
                others: others
            }
            res.send({
                state:'ok',
                content: result
            })
        }

        
    })
}
exports.addquan=function(req, res){
    if (!req.session.user) {
        res.send({state:'err',mes:'未登录'});
        return;
    }
    var data = {
        author: req.session.user._id,
        title: req.body.title,
        description: req.body.description,
        pic: req.body.pic
    }
    var quan=new Quan(data);
    quan.save(function (err,_quan) {
        if (err) console.log(err);

        res.send({state:'ok',id:_quan._id})
        User.findOne({username:req.session.user.username},function(err,person){
            person.quans.push(_quan._id);
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            
        });

    })
}
exports.quannotice=function(req, res){
    if (!req.session.user) {
        res.send({state:'err',mes:'未登录'});
        return;
    }
    User.findOne({_id:req.session.user._id}).exec((err,person) =>{
        if (req.body.noticed) {
            person.quans.push(req.body.quanid);
        } else {
            for(var i=0; i<person.quans.length; i++) {
                if(person.quans[i] == req.body.quanid) {
                  person.quans.splice(i, 1);
                  break;
                }
            }
        }
        
        var _id = person._id; //需要取出主键_id
        delete person._id;    //再将其删除
        User.update({_id:_id},person,function(err){});
        Quan.findOne({_id:req.body.quanid}).exec((err,quan) =>{
            if (req.body.noticed) {
                quan.notice.push(req.session.user._id);
            } else {
                for(var i=0; i<quan.notice.length; i++) {
                    if(quan.notice[i] == req.session.user._id) {
                      quan.notice.splice(i, 1);
                      break;
                    }
                }
            }
            
            var _id = quan._id; //需要取出主键_id
            delete quan._id;    //再将其删除
            Quan.update({_id:_id},quan,function(err){});
            res.send({
                state:'ok',
                mes:'成功'
            })
        })
    })

}
exports.quandetail=function(req, res){
    Quan.findOne({_id:req.body.type}).deepPopulate('ties ties.author ties.star ties.like').exec((err,quan) =>{
        var result = [];
        var isnotice = '0';
        var ties = quan.ties;
        for (var i = 0; i < ties.length; i++) {
            result.push({
                id: ties[i]._id,
                title: ties[i].title,
                authorid: ties[i].author._id,
                author: ties[i].author.nicheng,
                authorImg: ties[i].author.picture,
                time: ties[i].meta.createAt.toString().substr(4,21),
                zhaiyao: ties[i].zhaiyao,
                pic: ties[i].pic,
                islike: islikeorstar(ties[i].like,req.session.user ? req.session.user._id : ''),
                like: ties[i].like.length,
                isstar: islikeorstar(ties[i].star,req.session.user ? req.session.user._id : ''),
                star: ties[i].star.length
            })
        }
        if (req.session.user) {
            User.findOne({_id:req.session.user._id}).exec((err,user) =>{
                for (var i = 0; i < user.quans.length; i++) {
                    if (user.quans[i] == req.body.type) {
                        isnotice = '1';
                    }
                }
                if (quan.author.toString() == user._id.toString()) {
                    isnotice = '2';
                }
                res.send({
                    title: quan.title,
                    isnotice: isnotice,
                    type:req.body.type,
                    content: result
                })
            })
        } else {
            res.send({
                title: quan.title,
                isnotice: isnotice,
                type:req.body.type,
                content: result
            })
        }
        
    })
    
}
exports.quanfatie=function(req, res){
    if (!req.session.user) {
        res.send({state:'err',mes:'未登录'});
        return;
    }
    var data = {
        author: req.session.user._id,
        title: req.body.title,
        zhaiyao: req.body.zhaiyao,
        quan: req.body.quanid,
        pic: req.body.pic,
        content: req.body.content
    }
    var tie=new Tie(data);
    tie.save(function (err,_tie) {
        if (err) console.log(err);

        res.send({state:'ok',id:_tie._id})
        User.findOne({username:req.session.user.username},function(err,person){
            person.ties.push(_tie._id);
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            
            Quan.findOne({_id:req.body.quanid},function(err,quan){
                quan.ties.push(_tie._id);
                var _id = quan._id; //需要取出主键_id
                delete quan._id;    //再将其删除
                Quan.update({_id:_id},quan,function(err){});
            })
        });

    })
}
exports.userdel=function(req, res){
    if (!req.session.user) {
        res.send({state:'unerr',mes:'未登录'});
        return;
    }
    User.findOne({_id:req.session.user._id},function(err,person){
        if (req.body.type=='comment') {
            for(let i=0; i<person.comments.length; i++) {
                if(person.comments[i] == req.body.comid) {
                  person.comments.splice(i, 1);
                  break;
                }
            }
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            Comment.remove({_id:req.body.comid},function (err,comment) {
                if (err) console.log(err);

                Tie.findOne({_id:req.body.tieid},function(err,tie){
                    for(let i=0; i<tie.comments.length; i++) {
                        if(tie.comments[i] == comment.tie) {
                          tie.comments.splice(i, 1);
                          break;
                        }
                    }
                    var _id = tie._id; //需要取出主键_id
                    delete tie._id;    //再将其删除
                    Tie.update({_id:_id},tie,function(err){});
                })
                res.send({state:'ok'})
            })
        } else if(req.body.type=='tie') {
            for(let i=0; i<person.ties.length; i++) {
                if(person.ties[i] == req.body.tieid) {
                  person.ties.splice(i, 1);
                  break;
                }
            }
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            Tie.remove({_id:req.body.tieid},function (err,comment) {
                if (err) console.log(err);
                res.send({state:'ok'})
            })
        } else if(req.body.type=='star') {
            for(let i=0; i<person.star.length; i++) {
                if(person.star[i] == req.body.tieid) {
                  person.star.splice(i, 1);
                  break;
                }
            }
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            Tie.findOne({_id:req.body.tieid},function(err,tie){
                for(let i=0; i<tie.star.length; i++) {
                    if(tie.star[i] == req.session.user._id) {
                      tie.star.splice(i, 1);
                      break;
                    }
                }
                var _id = tie._id; //需要取出主键_id
                delete tie._id;    //再将其删除
                Tie.update({_id:_id},tie,function(err){});
                res.send({state:'ok'})
            })
        }
    });  
}
exports.star=function(req, res){
    if (!req.session.user) {
        res.send({state:'unerr',mes:'未登录'});
        return;
    }
    Tie.findOne({_id:req.body.id},function(err,tie){
        if (req.body.star == '1') {
            tie.star.push(req.session.user._id);
        } else {
            for(var i=0; i<tie.star.length; i++) {
                if(tie.star[i] == req.session.user._id) {
                  tie.star.splice(i, 1);
                  break;
                }
            }
        }
        
        var _id = tie._id; //需要取出主键_id
        delete tie._id;    //再将其删除
        Tie.update({_id:_id},tie,function(err){});

        User.findOne({_id:req.session.user._id},function(err,person){
            if (req.body.star == '1') {
                person.star.push(req.body.id);
            } else {
                for(var i=0; i<person.star.length; i++) {
                    if(person.star[i] == req.body.id) {
                      person.star.splice(i, 1);
                      break;
                    }
                }
            }
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            res.send({state:'ok'});
        })
    });  
}
exports.like=function(req, res){
    if (!req.session.user) {
        res.send({state:'unerr',mes:'未登录'});
        return;
    }
    Tie.findOne({_id:req.body.id},function(err,tie){
        if (req.body.like == '1') {
            tie.like.push(req.session.user._id);
        } else {
            for(var i=0; i<tie.like.length; i++) {
                if(tie.like[i] == req.session.user._id) {
                  tie.like.splice(i, 1);
                  break;
                }
            }
        }
        
        var _id = tie._id; //需要取出主键_id
        delete tie._id;    //再将其删除
        Tie.update({_id:_id},tie,function(err){});
        
        User.findOne({_id:req.session.user._id},function(err,person){
            if (req.body.like == '1') {
                person.like.push(req.body.id);
            } else {
                for(var i=0; i<person.like.length; i++) {
                    if(person.like[i] == req.body.id) {
                      person.like.splice(i, 1);
                      break;
                    }
                }
            }
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            res.send({state:'ok'});
        })
    });  
}
exports.comment=function(req, res){
    if (!req.session.user) {
        res.send({state:'err',mes:'未登录'});
        return;
    }
    var data = {
        author: req.session.user._id,
        tie: req.body.tieid,
        content: req.body.content,
        zhaiyao: req.body.zhaiyao
    }
    var comment=new Comment(data);
    comment.save(function (err,_com) {
        if (err) console.log(err);
        
        res.send({
            state:'ok',
            content: _com.content,
            author: req.session.user.nicheng,
            authorid: req.session.user._id,
            authorImg: req.session.user.picture,
            time: _com.meta.createAt.toString().substr(4,21)
        })
        
        // req.session.user=_user;
        User.findOne({username:req.session.user.username},function(err,person){
            person.comments.push(_com._id);
            var _id = person._id; //需要取出主键_id
            delete person._id;    //再将其删除
            User.update({_id:_id},person,function(err){});
            
        });
        Tie.findOne({_id:req.body.tieid},function(err,tie){
            tie.comments.push(_com._id);
            var _id = tie._id; //需要取出主键_id
            delete tie._id;    //再将其删除
            Tie.update({_id:_id},tie,function(err){});
            
        });

    })
}
// //userlist中间件
// exports.loginRequired=function (req,res,next) {
//     var user=req.session.user;
//     if (!user) {
//         return res.redirect('/login');
//     }
//     next();
// }
// exports.adminRequired=function (req,res,next) {
//     var user=req.session.user;
//     if (user.role<=10) {
//         return res.send('你没有权限');
//     }
//     next();
// }