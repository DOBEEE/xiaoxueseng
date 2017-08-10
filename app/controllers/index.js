import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../../react_app/store';
import { Provider } from 'react-redux';
import React from 'react';
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import routes from '../../react_app/components/routes.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'; 

injectTapEventPlugin();

var User=require('../models/users');
var Tie=require('../models/ties');
var Comment=require('../models/comments');

var state = {

    session: {
        name: '',
        id: ''
    },
    home: {
        type: 'tuijian',
        content: []
    },
    quan: {
        owner: [],
        others: []
    },
    quandetail: {
        type: '',
        title: '',
        isnotice: false,
        content: []
    },
    tiedetail:{
        tieid: '0001',
        title: '我是一篇文章',
        zhaiyao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed ',
        author: '令狐冲',
        authorid: '122333',
        authorImg: '//dn-mhke0kuv.qbox.me/a0c372a8cdd8ab4cdd40.jpg?imageView2/1/w/100/h/100/q/85/interlace/1',
        pic: '',
        time: '2017-04-28',
        islike: '0',
        like: 10,
        isstar: '1',
        star: 5,
        comments: []
    },
    userlist: [
        {username: 'llll',id: '0111',nicheng:'hahaha',level:'1'}
    ],
    user: {
        author: '令狐冲',
        authorid: '122333',
        authorImg: '//dn-mhke0kuv.qbox.me/a0c372a8cdd8ab4cdd40.jpg?imageView2/1/w/100/h/100/q/85/interlace/1',
        ties: [],
        comments: [],
        stars: []
    },
    signup: {},
    login: {}
};
function islikeorstar(arr,user) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id == user) {
            return '1'
        }
    }
    return '0';
}

exports.index= function(req, res){
      match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.send(500, error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            if (req.session.user) {
                state.session = {
                    name: req.session.user.nicheng,
                    touxiang: req.session.user.picture,
                    id: req.session.user._id,
                    level: req.session.user.role
                }
            } else {
                state.session = {
                    name: '',
                    id: '',
                    touxiang: '',
                    level: 0
                }
            }
            global.window.config.ismobile = (function () {
                var deviceAgent = req.headers['user-agent'].toLowerCase();
                return deviceAgent.match(/(iphone|ipod|ipad|android)/);
            })()
            Tie.find({}).populate('author star like').exec((err,ties) =>{
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
                state.home = {
                    type: 'tuijian',
                    content: result
                };
                const initialState = state;
                const store = configureStore(initialState);
                res.render('home.pug',{
                    react: renderToString(
                        <Provider store={store}>
                            <MuiThemeProvider>
                                <RouterContext {...renderProps} />
                            </MuiThemeProvider>
                        </Provider>
                    ),
                    ismobile:global.window.config.ismobile,
                    state: JSON.stringify(state)
                });
            })
            
        } else {
            res.send(404, 'Not found')
        }
        
    });
};
exports.userlist= function(req, res){
    if (!req.session.user) {
        res.redirect('/');
        return;
    } else if (req.session.user.level != 10) {
        res.send('你没有权限');
        return;
    }
      match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.send(500, error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            
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
                state.userlist = result;
                const initialState = state;
                const store = configureStore(initialState);
                // console.log(result);
                res.render('home.pug',{
                    react: renderToString(
                        <Provider store={store}>
                            <MuiThemeProvider>
                                <RouterContext {...renderProps} />
                            </MuiThemeProvider>
                        </Provider>
                    ),
                    state: JSON.stringify(state)
                });
            })
            
        } else {
            res.send(404, 'Not found')
        }
        
    });
};