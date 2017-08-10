import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Link } from 'react-router';
import {actionUser, actionComments, actionStars, actionUserDel} from '../actions/user';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import FlatButton from 'material-ui/FlatButton';
import {grey400} from 'material-ui/styles/colors';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import Snackbar from 'material-ui/Snackbar';
const styles = {
    page: {
        // height: 100,
        width: '100%',
        marginTop: window.config.ismobile?0:20,
        marginBottom: 50,
        textAlign: 'center',
        display: 'inline-block',
        marginBottom: window.config.ismobile?50:0
    },
    link: {
        display: 'block',
        textDecoration:'none'
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    authorImgWrap: (function () {
        if (window.config.ismobile) {
            return {
                marginTop: 20,
                width: 100,
                height: 100,
                overflow:'hidden',
                borderRadius: 50,
                display: 'inline-block'
            }
        }
        return {
            marginTop: 20,
            width: 150,
            height: 150,
            overflow:'hidden',
            borderRadius: 75,
            display: 'inline-block'
        }
    })(),
    authorImg: {
        width: '100%',
        height: '100%'
    },
    tieWrap: {
        position:'relative',
        padding: 35,
        borderBottom: '1px solid #eee'
    },
    title: {
        fontWeight: 'normal',
        fontSize: '1.5rem',
        margin: 0,
        marginBottom: 10,
        color: '#000',
    },
    zhaiyao: {
        color: '#aaa'
    },
    footer: {
        color: '#aaa',
        marginTop: 10,
        fontSize: '.8rem'
    },
    rightfooter: {
        float: 'right'
    },
    time: {
        float: 'right',
        fontSize: '.8rem',
        color: '#aaa'
    },
    commentPaper: {
        width: '80%',
        padding: '15px',
        paddingBottom: 5
    },
    commentTitle: {
        fontWeight: 'normal',
        fontSize: '1.0rem',
        margin: 0,
        marginBottom: 10,
        color: '#000',
        display: 'inline-block',
        maxheight: 200,
        overflow:'hidden',
        textOverflow:'ellipsis'
    },
    deleteBtn: {
        position: 'absolute',
        right:0
    },
    deleteBtn_comment: {
        position: 'absolute',
        right:0,
        bottom:0
    },
    snackbar: {
      bottom:window.config.ismobile?59:0
    },
    settingbtn: {
        position: 'absolute',
        top:5,
        right: 5
    }
};
class Tie extends React.Component {
    delHandle() {
        
        let data = {
            type: this.props.val,
            tieid: this.props.data.tieid
        }
        fetch('/api/userdel',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'ok') {
                this.props.errHandle('删除成功');
                this.props.actionUserDel({
                    type: this.props.val,
                    index: this.props.index
                });
            } else if(json.state == 'unerr'){
                this.props.errHandle('未登录');
            }
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    render() {
        if (this.props.isOwner== '1' ) {
            return (
                <div style={styles.tieWrap}>
                    <FlatButton
                        onClick={this.delHandle.bind(this)}
                        icon={<DeleteIcon color={grey400} />}
                        style={styles.deleteBtn}/>
                    <Link style={styles.link} to={"/tiedetail/"+this.props.data.tieid}>
                        <h1 style={styles.title}>{this.props.data.title}</h1>
                        <div style={styles.zhaiyao}>{this.props.data.zhaiyao}</div>
                        <div style={styles.footer}>
                            <span>{this.props.data.lei}</span>
                            <span style={styles.rightfooter}>回复 {this.props.data.commentsnum}</span>
                        </div>
                    </Link>
                </div>
            )
        }

        return (
            <Link style={styles.link} to={"/tiedetail/"+this.props.data.tieid}>
                <div style={styles.tieWrap}>
                    <h1 style={styles.title}>{this.props.data.title}</h1>
                    <div style={styles.zhaiyao}>{this.props.data.zhaiyao}</div>
                    <div style={styles.footer}>
                        <span>{this.props.data.lei}</span>
                        <span style={styles.rightfooter}>回复 {this.props.data.commentsnum}</span>
                    </div>
                </div>
            </Link>
        )
    }
}
class Comment extends React.Component {
    delHandle() {
        
        let data = {
            comid: this.props.data.comid,
            type: this.props.val,
            tieid: this.props.data.tieid
        }
        fetch('/api/userdel',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'ok') {
                this.props.errHandle('删除成功');
                this.props.actionUserDel({
                    type: this.props.val,
                    index: this.props.index
                });
            } else if(json.state == 'unerr'){
                this.props.errHandle('未登录');
            }
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    render() {
        if (this.props.isOwner== '1' ) {
            return (
                <div style={styles.tieWrap}>
                    <FlatButton
                        onClick={this.delHandle.bind(this)}
                        icon={<DeleteIcon color={grey400} />}
                        style={styles.deleteBtn_comment}
                    />
                    <h1 style={styles.commentTitle}>回复：{this.props.data.zhaiyao}</h1>

                    <span style={styles.time}>{this.props.data.time}</span>
                    <Link style={styles.link} to={"/tiedetail/"+this.props.data.tieid}>
                    <Paper style={styles.commentPaper}>
                        <h1 style={styles.commentTitle}>{this.props.data.tietitle}</h1>
                    </Paper>
                    </Link>
                </div>
                
            )
        }
        return (
            <div style={styles.tieWrap}>
                <h1 style={styles.commentTitle}>回复：{this.props.data.zhaiyao}</h1>

                <span style={styles.time}>{this.props.data.time}</span>
                <Link style={styles.link} to={"/tiedetail/"+this.props.data.tieid}>
                <Paper style={styles.commentPaper}>
                    <h1 style={styles.commentTitle}>{this.props.data.tietitle}</h1>
                </Paper>
                </Link>
            </div>
            
        )
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'ties',
          isOwner: '0',
          isok: false,
            message: ''
        };
    }
    componentWillMount() {
        if (!this.props.session.name) {
            browserHistory.push('/login');
            return;
        }
        const data = {
            userid: this.props.params.id,
            type: 'main'
        }
        if (this.props.params.id == '0000') {
            this.setState({isOwner:1});
            this.props.actionUser({
                author: '未登录',
                time: '',
                authorid: '',
                authorImg: '//dn-mhke0kuv.qbox.me/a0c372a8cdd8ab4cdd40.jpg?imageView2/1/w/100/h/100/q/85/interlace/1',
                ties: [],
                comments: [],
                stars: []
            });
            return;
        }
        // if (this.props.value.ties.length==0) {
            fetch('/api/user',{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            })
            .then(res => res.json())
            .then(function (json) {
                if (json.state == '404') {
                    const path = '/404';
                    browserHistory.push(path);
                    return;
                }
                this.setState({isOwner:json.isOwner});
                this.props.actionUser(json.content);
                
            }.bind(this),function(error) {
              console.log(error.message) //=> String
            }.bind(this));
        // }
    }
    handleChange(value) {
        this.setState({
          value: value,
        });
        const data = {
            userid: this.props.params.id,
            type: value
        }
        if (this.props.value[value].length==0) {
            fetch('/api/user',{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            })
            .then(res => res.json())
            .then(function (json) {
                if (json.type == 'comments') {
                    this.props.actionComments(json.content);
                } else if (json.type == 'stars') {
                    this.props.actionStars(json.content);
                }
            }.bind(this),function(error) {
              console.log(error.message) //=> String
            }.bind(this));
        }
        
    };
    errHandle(mes) {
        let self = this;
        this.setState({message:mes,isok:true});
        setTimeout(function () {
            self.setState({isok:false});
        },1000)
    }
    settinghandle() {
        browserHistory.push('/setting/'+this.props.params.id);
    }
    render() {
        let stars = [];
        let comments = [];
        if (this.props.value.stars.length>0) {
            stars = (function () {
                let res = [];
                for (let i = 0; i < this.props.value.stars.length; i++) {

                    res.push(
                        <Tie 
                            errHandle={this.errHandle.bind(this)} 
                            val="star" 
                            key={i} 
                            isOwner={this.state.isOwner} 
                            data={this.props.value.stars[i]} 
                            index={i}
                            actionUserDel={this.props.actionUserDel}
                        />
                    );
                }
                return res;
            }.bind(this))()
        }
        if (this.props.value.comments.length>0) {
            comments = (function () {
                let res = [];
                for (let i = 0; i < this.props.value.comments.length; i++) {

                    res.push(
                        <Comment 
                            errHandle={this.errHandle.bind(this)} 
                            val="comment" 
                            key={i} 
                            isOwner={this.state.isOwner} 
                            data={this.props.value.comments[i]} 
                            index={i}
                            actionUserDel={this.props.actionUserDel}
                        />
                    );
                }
                return res;
            }.bind(this))()
        }
        const ties = (function () {
            let res = [];
            for (let i = 0; i < this.props.value.ties.length; i++) {

                res.push(
                    <Tie 
                        errHandle={this.errHandle.bind(this)}
                        val="tie" 
                        key={i} 
                        isOwner={this.state.isOwner} 
                        data={this.props.value.ties[i]} 
                        index={i}
                        actionUserDel={this.props.actionUserDel}
                    />
                );
            }
            return res;
        }.bind(this))()
        if (window.config.ismobile) {
            return (
                <Paper style={styles.page} zDepth={2}>
                <FlatButton 
                    onClick={this.settinghandle.bind(this)} 
                    icon={<SettingIcon color={grey400} />} 
                    style={styles.settingbtn} 
                />
                  <div style={styles.authorImgWrap}>

                    <img style={styles.authorImg} src={this.props.value.authorImg}/>

                  </div>
                  <div>
                    <p>{this.props.value.author}</p>
                    <p>创建于: 2017-05-01</p>
                  </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    >
                    <Tab value="ties" label={(this.state.isOwner == '0'?'他':'我')+"的帖子"}>
                        <div>{ties}</div>
                    </Tab>
                    <Tab value="comments" label={(this.state.isOwner == '0'?'他':'我')+"的回复"}>
                        <div>{comments}</div>
                    </Tab>
                    <Tab value="stars" label={(this.state.isOwner == '0'?'他':'我')+"的收藏"}>
                        <div>{stars}</div>
                    </Tab>
                </Tabs>
                <Snackbar
                style={styles.snackbar}
                  open={this.state.isok}
                  message={this.state.message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
              </Paper>
            )
        }
          return (
              <Paper style={styles.page} zDepth={2}>
                  <div style={styles.authorImgWrap}>

                    <img style={styles.authorImg} src={this.props.value.authorImg}/>

                  </div>
                  <div>
                    <p>{this.props.value.author}</p>
                    <p>创建于: 2017-05-01</p>
                  </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    >
                    <Tab value="ties" label={(this.state.isOwner == '0'?'他':'我')+"的帖子"}>
                        <div>{ties}</div>
                    </Tab>
                    <Tab value="comments" label={(this.state.isOwner == '0'?'他':'我')+"的回复"}>
                        <div>{comments}</div>
                    </Tab>
                    <Tab value="stars" label={(this.state.isOwner == '0'?'他':'我')+"的收藏"}>
                        <div>{stars}</div>
                    </Tab>
                </Tabs>
                <Snackbar
                style={styles.snackbar}
                  open={this.state.isok}
                  message={this.state.message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
              </Paper>
          );
      }
}
function mapStateToProps(state) {
  return {
    session: state.session,
    value: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionUser: (data) => dispatch(actionUser(data)),
    actionComments: (data) => dispatch(actionComments(data)),
    actionStars: (data) => dispatch(actionStars(data)),
    actionUserDel: (data) => dispatch(actionUserDel(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
// module.exports = User;