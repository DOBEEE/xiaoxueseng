import React from 'react';
import Paper from 'material-ui/Paper';
import { actionQuandetail, actionLikeQuandetail, actionStarQuandetail } from '../actions/quandetail';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

import Like from 'material-ui/svg-icons/action/favorite-border';
import Liked from 'material-ui/svg-icons/action/favorite';
import Star from 'material-ui/svg-icons/toggle/star-border';
import Stared from 'material-ui/svg-icons/toggle/star';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    wrap: {
        paddingTop: window.config.ismobile?0:20,
        maxWidth: 960,
        margin: '0 auto',
        marginBottom: window.config.ismobile?80:0
    },
    page: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    main: {
        // paddingLeft: 300,
    },
    m_main: {

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
        maxHeight: 25,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
        
    },
    CardHeader: {
        display: 'inline-block'
    },
    cardTitle_w: {
        padding: '0 16px'
    },
    cardTitle: {
        padding: '0',
        fontSize: window.config.ismobile?18:24
    },
    card: {
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
    txtlink: {
        display: 'block',
        textDecoration:'none'
    },
    addquan: {
        position: 'fixed',
        bottom: window.config.ismobile?80:40,
        right: window.config.ismobile?30:40
    },
    snackbar: {
      bottom:window.config.ismobile?59:0
    },
    arrbartitle: {
        fontSize: 16
    }
};
class CardItem extends React.Component {
    likeHandle() {
        if (!this.props.session.id) {
            this.props.errHandle('请先登录');
            return;
        }
        let data = ({
            id: this.props.data.id,
            like: '0'
        });
        var state = {
            key: this.props.index,
            // id: this.props.data.id,
            islike: this.props.data.islike,
            like: this.props.data.like
        };
        if (this.props.data.islike == '1') {
            data.like = '0';
            state.islike = '0';
            state.like -= 1;
        }else{
            data.like = '1';
            state.islike = '1';
            state.like += 1;
        }
        
        this.props.actionLikeQuandetail(state);
        fetch('/api/like',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'unerr') {
                this.props.errHandle('请先登录');
            }
            
        }.bind(this),function(error) {
          error.message //=> String
        }.bind(this));
    }
    starHandle() {
        if (!this.props.session.id) {
            this.props.errHandle('请先登录');
            return;
        }
        let data = ({
            id: this.props.data.id,
            star: '0'
        });
        var state = {
            key: this.props.index,
            
            isstar: this.props.data.isstar,
            star: this.props.data.star
        };
        if (this.props.data.isstar == '1') {
            state.isstar = '0';
            state.star -= 1;
            data.star = '0';
        }else{
            data.star = '1';
            state.isstar = '1';
            state.star += 1;
        }
        
        this.props.actionStarQuandetail(state);

        fetch('/api/star',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'unerr') {
                this.props.errHandle('请先登录');
            }
            
        }.bind(this),function(error) {
          error.message //=> String
        }.bind(this));
    }
    
    render() {
        if (this.props.data.pic) {
            return (
                <Card style={styles.card}>
                    <Link style={styles.link} to={"/user/"+this.props.data.authorid}>
                        <CardHeader
                          title={this.props.data.author}
                          subtitle={this.props.data.time}
                          avatar={this.props.data.authorImg}
                        />
                    </Link>
                    <Link style={styles.txtlink} to={"/tiedetail/"+this.props.data.id}>
                        <CardMedia
                            mediaStyle={styles.mediaStyle}
                          overlay={<CardTitle style={styles.cardTitle_w} 
                          title={this.props.data.title}
                          titleStyle={styles.cardTitle} />}
                        >
                            <img style={styles.mediaImg} src={this.props.data.pic} />
                        </CardMedia>
                        <CardText style={styles.cardText}>
                            {this.props.data.zhaiyao}
                        </CardText>
                    </Link>
                <CardActions>
                    <FlatButton 
                        onClick={this.likeHandle.bind(this)}
                        icon={(this.props.data.islike == 1)?(<Liked style={styles.iconStyles} color={red500} />):(<Like style={styles.iconStyles} color={red500} />)} 
                        label={this.props.data.like} 
                    />
                    <FlatButton 
                        onClick={this.starHandle.bind(this)}
                        icon={(this.props.data.isstar == 1)?(<Stared style={styles.iconStyles} color={red500} />):(<Star style={styles.iconStyles} color={red500} />)} 
                        label={this.props.data.star} 
                    />
                    </CardActions>
                </Card>
            )
        }
        return (
            <Card style={styles.card}>
            <Link style={styles.link} to={"/user/"+this.props.data.authorid}>
                <CardHeader
                    style={styles.CardHeader}
                  title={this.props.data.author}
                  subtitle={this.props.data.time}
                  avatar={this.props.data.authorImg}
                />
            </Link>
                <Link style={styles.txtlink} to={"/tiedetail/"+this.props.data.id}>
                <CardTitle style={styles.cardTitle_w} titleStyle={styles.cardTitle} title={this.props.data.title} />
                <CardText style={styles.cardText}>
                  {this.props.data.zhaiyao}
                </CardText>
                </Link>
                <CardActions>
                    <FlatButton 
                        onClick={this.likeHandle.bind(this)}
                        icon={(this.props.data.islike == 1)?(<Liked style={styles.iconStyles} color={red500} />):(<Like style={styles.iconStyles} color={red500} />)} 
                        label={this.props.data.like.toString()} 
                    />
                    <FlatButton 
                        onClick={this.starHandle.bind(this)}
                        icon={(this.props.data.isstar == 1)?(<Stared style={styles.iconStyles} color={red500} />):(<Star style={styles.iconStyles} color={red500} />)} 
                        label={this.props.data.star.toString()} 
                    />
                </CardActions>
            </Card>
        )
    }
};
class Noticed extends React.Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem onClick={this.props.noticehandle} primaryText="退出圈子" />
      </IconMenu>
    );
  }
}
class Enoticed extends React.Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem onClick={this.props.noticehandle} primaryText="加入圈子" />
      </IconMenu>
    );
  }
}
class AppBarQuan extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         noticed: this.props.isnotice=='0'?false:true
    //     };
    //     console.log(this.props.isnotice)
    // }
    noticehandle() {
        if (!this.props.session.name) {
            this.props.errHandle('未登录！');
            const path = '/login';
            setTimeout(function () {
                browserHistory.push(path);
            },1000)
        }
        if (this.props.isnotice == '2') {
            this.props.errHandle('你不能退出自己创建的圈子');
            return;
        }
        let data = {
            noticed: true,
            quanid: this.props.id
        };
        if (this.props.noticed) {
            data.noticed=false;
        }

        fetch('/api/quannotice',{
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
                this.props.changeNotice(data.noticed);
            }
            this.props.errHandle(json.mes);
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
        
    }
    closeHandle() {
        browserHistory.push('/quan');
    }
    render() {
    return (
      <div>
        <AppBar
            titleStyle={styles.arrbartitle}
          title={this.props.title}
          iconElementLeft={<IconButton onClick={this.closeHandle.bind(this)}><NavigationClose /></IconButton>}
          iconElementRight={this.props.noticed ? <Noticed noticehandle={this.noticehandle.bind(this)}/> : <Enoticed noticehandle={this.noticehandle.bind(this)}/>}
        />
      </div>
    );
  }
}

class Quandetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticed: false,
            isnotice: '0',
            isok: false,
            message: ''
        };
    }
    changeNotice(val) {
        this.setState({noticed:val});
    }
    componentWillMount() {
        
        let type = this.props.params.id;
        
        fetch('/api/quandetail',{
            method: "POST",
            body: JSON.stringify({type: type}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            this.props.actionQuandetail(json);
            console.log(json.isnotice)
            if (json.isnotice == '0') {
                this.setState({noticed:false});
            } else {
                this.setState({noticed:true}); 
            }
            this.setState({isnotice:json.isnotice});
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    errHandle(mes) {
        let self = this;
        this.setState({message:mes,isok:true});
        setTimeout(function () {
            self.setState({isok:false});
        },1000)
    }
    addHandle() {
        if (!this.state.noticed) {
            this.errHandle('需要先关注才能发帖哦~');
            return;
        }
        browserHistory.push("/quanfatie/"+this.props.params.id);
    }
    render() {
        const main = (function () {
            let res = [];
            for (let i = 0; i < this.props.value.content.length; i++) {

                res.push(
                    <CardItem key={i} session={this.props.session} errHandle={this.errHandle.bind(this)} actionStarQuandetail={this.props.actionStarQuandetail} actionLikeQuandetail={this.props.actionLikeQuandetail} data={this.props.value.content[i]} index={i}/>
                );
            }
            return res;
        }.bind(this))()
        if (window.config.ismobile) {
            return (
                <div style={styles.wrap}>
                    <AppBarQuan 
                        changeNotice={this.changeNotice.bind(this)}
                        noticed={this.state.noticed}
                        isnotice={this.state.isnotice}
                        title={this.props.value.title}
                        id={this.props.params.id} 
                        session={this.props.session} 
                        errHandle={this.errHandle.bind(this)}
                    />
                    <div style={styles.m_main}>
                    {main}
                    </div>
                    <Snackbar
                    style={styles.snackbar}
                      open={this.state.isok}
                      message={this.state.message}
                      autoHideDuration={4000}
                      onRequestClose={this.handleRequestClose}
                    />
                    <FloatingActionButton onClick={this.addHandle.bind(this)} style={styles.addquan}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
            );
        }
        return (
            <div style={styles.wrap}>
                
                <div style={styles.main}>
                {main}
                </div>
                <Snackbar
                    style={styles.snackbar}
                  open={this.state.isok}
                  message={this.state.message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
                <Link to={"/quanfatie/"+this.props.params.id}>
                <FloatingActionButton style={styles.addquan}>
                  <ContentAdd />
                </FloatingActionButton>
                </Link>
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    session: state.session,
    value: state.quandetail
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionQuandetail: (data) => dispatch(actionQuandetail(data)),
    actionLikeQuandetail: (data) => dispatch(actionLikeQuandetail(data)),
    actionStarQuandetail: (data) => dispatch(actionStarQuandetail(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quandetail);
// module.exports = Home;