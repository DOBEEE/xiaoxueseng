import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { actionHeaderLogout } from '../actions/header';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import FatieIcon from 'material-ui/svg-icons/content/add-circle';
import HomeIcon from 'material-ui/svg-icons/action/home';
import UserIcon from 'material-ui/svg-icons/social/person';
import QuanIcon from 'material-ui/svg-icons/editor/bubble-chart';

const styles = {
    page: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    menulink: {
        textDecoration:'none',
        display: 'block',
        width: '100%',
        color: '#000'
    },
    link: {
        width: '100%',
        display: 'inline-block',
        textDecoration:'none',
        color: '#fff'
    },
    loginBtn: {
      color: '#fff'
    },
    las: {
      marginTop: 5
    },
    touxiangbtn: {
        right: 190,
        position: 'absolute',
        display: 'inline-block',
        textDecoration:'none',
        color: '#fff'
    },
    namebtn:{
        right: 108,
        position: 'absolute'
    },
    logoutbtn:{
        right: 20,
        position: 'absolute'
    },
    fatieBtn: {
        position: 'absolute',
        right: 260,
        display: 'inline-block',
        textDecoration:'none',
        marginRight: 5
    },
    touxiangWrap: {
        marginRight: 10,
        width: 40,
        height: 40,
        overflow:'hidden',
        borderRadius: 20,
        display: 'inline-block'
    },
    touxiang: {
        width: '100%',
        height: '100%'
    },
    footer:{
        position: 'fixed',
        bottom:0,
        backgroundColor:'#fff',
        zIndex:'99999'
    }
};

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        selectedIndex: 0
    };
    }

    handleToggle() {
      // alert(this.a);
      this.setState({open: !this.state.open});
    }

    handleClose() {
      this.setState({open: false});
    }
    logoutHandle() {
        fetch('/api/logout',{
            method: "POST",
            body: '',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'ok') {
                const path = '/';
                browserHistory.push(path);
            }
        }.bind(this),function(error) {
          error.message //=> String
        }.bind(this));

        this.props.actionHeaderLogout({
            name: '',
            id: ''
        });
    }
    select(index) {
        this.setState({selectedIndex: index});
    }

    render() {
    const self = this;
      const logining = (function (self) {
        // console.log(self.props.value);
        if (self.props.value.name) {
          return (
            <div style={styles.las}>
                <Link style={styles.fatieBtn} to={"/fatie"}><FlatButton backgroundColor="#a4c639" hoverColor="#8AA62F" style={styles.loginBtn} label="发帖" /></Link>
                <Link style={styles.touxiangbtn} to={"/user/" + self.props.value.id}>
                <div style={styles.touxiangWrap}>
                    <img style={styles.touxiang} src={self.props.value.touxiang}/>
                </div>
                </Link>
                <Link style={styles.namebtn} to={"/user/" + self.props.value.id}>
                    <FlatButton style={styles.loginBtn} label={self.props.value.name} />
                </Link>
                <span style={styles.logoutbtn}>
                <FlatButton style={styles.loginBtn} onClick={self.logoutHandle.bind(self)} label="登出" />
                </span>
            </div>
          ); 
        } else {
          return (
            <div style={styles.las}>
              <Link to="/login"><FlatButton style={styles.loginBtn} label="登录" /></Link>
              <Link to="/signup"><FlatButton style={styles.loginBtn} label="注册" /></Link>
            </div>
          ); 
        }
      })(self)
    const menu = (function () {
        if (self.props.value.level == 10) {
          return (
        <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
        >
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/">首页</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/quan">圈子</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/userlist">用户列表</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to={"/user/"+self.props.value.id}>个人中心</Link></MenuItem>
        </Drawer>
          ); 
        } else if (self.props.value.id){
          return (
            <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/">首页</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/quan">圈子</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to={"/user/"+self.props.value.id}>个人中心</Link></MenuItem>
            </Drawer>
          );  
        } else {
            return (
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/">首页</Link></MenuItem>
                <MenuItem onTouchTap={this.handleClose.bind(this)}><Link style={styles.menulink} to="/quan">圈子</Link></MenuItem>
                </Drawer>
            ); 
        }
    }).bind(this)()
       if (window.config.ismobile) {
            return (
              <div style={styles.footer}>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <Link to="/">
                      <BottomNavigationItem
                        label="首页"
                        icon={<HomeIcon />}
                        onTouchTap={() => this.select(0)}
                      />
                    </Link>
                    <Link to="/fatie">
                      <BottomNavigationItem
                        label="发帖"
                        icon={<FatieIcon />}
                        onTouchTap={() => this.select(1)}
                      />
                    </Link>
                    <Link to="/quan">
                      <BottomNavigationItem
                        label="圈子"
                        icon={<QuanIcon />}
                        onTouchTap={() => this.select(1)}
                      />
                    </Link>
                    <Link to={"/user/"+(this.props.value.id?this.props.value.id:"0000")}>
                      <BottomNavigationItem
                        label="个人中心"
                        icon={<UserIcon />}
                        onTouchTap={() => this.select(2)}
                      />
                    </Link>
                    </BottomNavigation>
                  </Paper>
              </div>
            );
       }
        return (
          <div>
          <AppBar
            title={<span style={styles.title}><Link style={styles.link} to="/">小学僧</Link></span>}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={logining}
          />   
            {menu}
          </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    value: state.session
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionHeaderLogout: (data) => dispatch(actionHeaderLogout(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);