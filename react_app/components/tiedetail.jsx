import React from 'react';
import Paper from 'material-ui/Paper';
import { actionTiedetail, actionComment} from '../actions/tiedetail';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {grey400} from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

const styles = {
    wrap: {
        paddingTop: window.config.ismobile?0:20,
        maxWidth: 960,
        margin: '0 auto'
    },
    page: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    main: {
        position: 'relative'
        // paddingLeft: 300,
    },
    deleteBtn_main: {
        position: 'absolute',
        top:window.config.ismobile?180:10,
        right: 16
    },
    loucengmain: {
        position: 'absolute',
        right: 16,
        top: window.config.ismobile?86:46,
        color: '#aaa',
        fontSize: 45
    },
    louceng: {
        position: 'absolute',
        right: 16,
        top: 16,
        color: '#aaa',
        fontSize: 30
    },
    mediaStyle: {
        position: 'relative',
        height: 200,
        overflow:'hidden'
    },
    mediaImg: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    cardText: {
        paddingTop: 0
    },
    CardHeader: {
        display: 'inline-block'
    },
    cardTitle: {
        fontSize: window.config.ismobile?23:34,
        padding: '10px 0px'
    },
    cardTitle_w: {
        paddingBottom: 0
    },
    card: {
        position: 'relative',
        marginBottom: 10
    },
    iconStyles: {
        marginRight: 5
    },
    link: {
        display: 'inline-block',
        textDecoration:'none'
        // color: '#fff'
    },
    commit: {
        marginTop:50
    },
    edit: {
        height: 400
    },
    btnstyle: {
        marginTop: 20,
        marginBottom: window.config.ismobile?80:0
    },
    snackbar: {
      bottom:window.config.ismobile?59:0
    }
};
class CardItem extends React.Component {
    likeHandle() {
        
        var state = {
            key: this.props.index,
            // id: this.props.data.id,
            islike: this.props.data.islike,
            like: this.props.data.like
        };
        if (this.props.data.islike == '1') {
            state.islike = '0';
            state.like -= 1;
        }else{
            state.islike = '1';
            state.like += 1;
        }
        
        this.props.actionLikeHome(state);
    }
    starHandle() {
        
        var state = {
            key: this.props.index,
            // id: this.props.data.id,
            isstar: this.props.data.isstar,
            star: this.props.data.star
        };
        if (this.props.data.isstar == '1') {
            state.isstar = '0';
            state.star -= 1;
        }else{
            state.isstar = '1';
            state.star += 1;
        }
        
        this.props.actionStarHome(state);
    }
    
    render() {
        let self = this;
        function renderHTML() {
            return {__html:self.props.data.content}
        }
        return (
            <Card style={styles.card}>
            <span style={styles.louceng}>#{this.props.index+2}</span>
            <Link style={styles.link} to={"/user/"+this.props.data.authorid}>
                <CardHeader
                  title={this.props.data.author}
                  subtitle={this.props.data.time}
                  avatar={this.props.data.authorImg}
                />
            </Link> 
                <CardText style={styles.cardText}>
                    <div dangerouslySetInnerHTML={renderHTML()} />
                </CardText>   
            </Card>
        )
    }
};
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isok: false,
        content: '',
        zhaiyao: '',
        message: ''
    };
  }
  componentDidMount() {
    var self = this;
    this.setState({isok:false});
    if (!document.getElementById('eidt')) {
        this.refs.edit.setAttribute('id','edit');
        this.editor = new wangEditor(this.refs.edit);
        
        this.editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
             if (item === 'location') {
                 return null;
             }
             return item;
        });
        this.editor.config.menuFixed = false;
        this.editor.create();
    }
        
  }
    submitHandle() {
        if (!this.props.session.name) {
            const path = '/login';
            browserHistory.push(path);
            return;
        }
        if (this.editor.$txt.formatText().length<20) {
            this.setState({isok:true,message:'长度不能低于20个字符'});
            let self = this;
            setTimeout(function () {
                self.setState({isok:false});
            },1000)
            return;
        }
        this.setState({zhaiyao:this.editor.$txt.formatText().substr(0,100),content: this.editor.$txt.html()});
        let data = ({
            tieid: this.props.tieid,
            zhaiyao: this.editor.$txt.formatText().substr(0,100),
            content: this.editor.$txt.html()
        });
        fetch('/api/comment',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            let self = this;
            if (json.state == 'ok') {
                this.setState({isok:true,message:'发布成功'});
                this.props.actionComment(json);
                setTimeout(function () {
                    self.setState({isok:false});
                },1000)

            } else {
                this.setState({isok:true,message:'发布失败'});
                setTimeout(function () {
                    self.setState({isok:false});
                },1000)
            }
            
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
  }
  render() {
    return (
        <div style={styles.commit}>
        <div style={styles.edit} ref="edit">
            <p>请输入内容...</p>
        </div>
        <RaisedButton onClick={this.submitHandle.bind(this)} disabled={false} label="发布" primary={true} style={styles.btnstyle} fullWidth={true} />
        <Snackbar
        style={styles.snackbar}
          open={this.state.isok}
          message={this.state.message}
          autoHideDuration={4000}
        />
        </div>
    );
  }
}
class Tiedetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        action: 'tuijian',
        message: '',
        isok: false
        };
    }
    
    componentWillMount() {
        let data = {
            tieid: this.props.params.id
        }
        fetch('/api/tiedetail',{
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
            this.props.actionTiedetail(json.content);
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    delHandle() {

        let data = {
            tieid: this.props.params.id
        }
        fetch('/api/admindeltie',{
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
                this.setState({message:'删除成功',isok:true});
                
                const path = '/';
                setTimeout(function () {
                    browserHistory.push(path);
                },1000)
                
            } else if(json.state == 'unerr'){
                let self = this;
                this.setState({message:'未登录',isok:true});
                setTimeout(function () {
                    self.setState({isok:false});
                },1000)
                this.props.errHandle('未登录');
            }
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    render() {
        const main = (function () {
            let res = [];
            for (let i = 0; i < this.props.value.comments.length; i++) {

                res.push(
                    <CardItem key={i} data={this.props.value.comments[i]} index={i}/>
                );
            }
            return res;
        }.bind(this))()
        let self = this;
        function renderHTML() {
            return {__html:self.props.value.content}
        }
        if (this.props.session&&this.props.session.level == 10) {
            return (
                <div style={styles.wrap}>
                    <div style={styles.main}>
                        <FlatButton
                            onClick={this.delHandle.bind(this)}
                            icon={<DeleteIcon color={grey400} />}
                            style={styles.deleteBtn_main}
                        />
                        <span style={styles.loucengmain}>#1</span>
                        <CardTitle style={styles.cardTitle_w} titleStyle={styles.cardTitle} title={this.props.value.title} />
                            <Link style={styles.link} to={"/user/"+this.props.value.authorid}>
                                <CardHeader
                                    style={styles.CardHeader}
                                    title={this.props.value.author}
                                    subtitle={this.props.value.time}
                                    avatar={this.props.value.authorImg}
                                />
                            </Link>
                        <CardText style={styles.cardText}>
                            <div dangerouslySetInnerHTML={renderHTML()} />
                        </CardText>
                    </div>
                    {main}
                    <Comment 
                        actionComment={this.props.actionComment} 
                        session={this.props.session} 
                        tieid={this.props.params.id}
                    />
                    <Snackbar
                    style={styles.snackbar}
                      open={this.state.isok}
                      message={this.state.message}
                      autoHideDuration={4000}
                    />
                </div>
            );
        }
        return (
            <div style={styles.wrap}>
                <div style={styles.main}>
                    <span style={styles.loucengmain}>#1</span>
                    <CardTitle titleStyle={styles.cardTitle} title={this.props.value.title} />
                        <Link style={styles.link} to={"/user/"+this.props.value.authorid}>
                            <CardHeader
                                style={styles.CardHeader}
                                title={this.props.value.author}
                                subtitle={this.props.value.time}
                                avatar={this.props.value.authorImg}
                            />
                        </Link>
                    <CardText style={styles.cardText}>
                        <div dangerouslySetInnerHTML={renderHTML()} />
                    </CardText>
                </div>
                {main}
                <Comment 
                    actionComment={this.props.actionComment} 
                    session={this.props.session} 
                    tieid={this.props.params.id}
                />
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    session: state.session,
    value: state.tiedetail
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionTiedetail: (data) => dispatch(actionTiedetail(data)),
    actionComment: (data) => dispatch(actionComment(data))
    // actionStarHome: (data) => dispatch(actionStarHome(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tiedetail);
// module.exports = Home;