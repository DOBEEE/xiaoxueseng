require('babel-core/register');

import express from 'express';
import mongoose from 'mongoose';

global.window = global.window || {
    config: {}
};
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
var Index=require('../app/controllers/index');
var Api=require('../app/controllers/api');

var router = express.Router();
router.use(function (req, res,next) {
    res.locals.user=req.session.user;//本地变量
    next();
})


router.get('/', Index.index);
router.get('/userlist', Index.userlist);

router.post('/api/quannotice',Api.quannotice);
router.post('/api/quanfatie',Api.quanfatie);
router.post('/api/quandetail',Api.quandetail);
router.post('/api/quan',Api.quan);
router.post('/api/addquan',Api.addquan);
router.post('/api/admindeltie',Api.admindeltie);
router.post('/api/userdel',Api.userdel);
router.post('/api/like',Api.like);
router.post('/api/star',Api.star);
router.post('/api/user',Api.user);
router.post('/api/tiedetail',Api.tiedetail);
router.post('/api/comment',Api.comment);
router.post('/api/home',Api.home);
router.post('/api/fatie',Api.fatie);
router.post('/api/logout',Api.logout);
router.post('/api/signup',Api.signup)
router.post('/api/login', Api.login)
router.post('/api/userlist',Api.userlist);

module.exports = router;