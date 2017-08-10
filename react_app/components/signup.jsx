import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import { actionSignup } from '../actions/signup';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const styles = {
    container: {
        background: ''
    },
    page: {
        height: 400,
        width: 300,
        // margin: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        textAlign: 'center',
        display: 'inline-block',
    },
    wrap: {
        width: '100%',
        height: '100%',
        positon: 'relative'
    },
    inputwrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    h1: {
        margin: 0,
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'normal',
        color: 'rgb(0, 188, 212)'
    }
};
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isdisabled: true,
            unok: false,
            pwok: false,
            ncok: false,
            unerrorText: '',
            pwerrorText: '',
            ncerrorText: '',
            unval: '',
            pwval: '',
            ncval: ''
        };
    }
    unHandler(event, val) {
        if (val.length>6) {
            this.setState({unval: val,unok: true,unerrorText: ''});
            if (this.state.pwok && this.state.ncok) {
                this.setState({isdisabled: false});
            }
            
        } else {
            this.setState({unval: val,unok: false,isdisabled:true, unerrorText: '账户名不少于6位'});
        }
    }
    pwHandler(event, val) {
        if (val.length>8) {
            this.setState({pwval: val,pwok: true,pwerrorText: ''});
            if (this.state.unok && this.state.ncok) {
                this.setState({isdisabled: false});
            }
        } else {
            this.setState({pwval: val,pwok: false,isdisabled:true, pwerrorText: '密码不少于8位'});
        }
    }
    ncHandler(event, val) {
        if (val.length>0) {
            this.setState({ncval: val,ncok: true, ncerrorText: ''});
            if (this.state.unok && this.state.pwok) {
                this.setState({isdisabled: false});
            }
        } else {
            this.setState({ncval: val,ncok: false,isdisabled:true, ncerrorText: '昵称不能为空'});
        }
    }
    clickHandle() {
        const data = {
            username: this.state.unval,
            password: this.state.pwval,
            nicheng: this.state.ncval
        };
        // const self = this;
        fetch('/api/signup',{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            if (json.state == 'ok') {

                this.props.actionSignup(json);
                const path = '/';
                browserHistory.push(path);
            } else if (json.state == 'unerr'){
                this.setState({isdisabled: false,ncerrorText: '账户名已存在'});
            } else if (json.state == 'ncerr'){
                this.setState({isdisabled: false,ncerrorText: '昵称已存在'});
            }
            
        }.bind(this),function(error) {
          error.message //=> String
        }.bind(this));
    }
    render() {
        return (
            <div style={styles.container}>
            <Paper style={styles.page} zDepth={2}>
            <div style={styles.wrap}>
            <h1 style={styles.h1}>注册</h1>
            
            <div style={styles.inputwrap}>
                <TextField
                  hintText="帐号"
                  floatingLabelText="帐号"
                  onChange={this.unHandler.bind(this)}
                  errorText={this.state.unerrorText}
                />
                
                <TextField
                  hintText="密码"
                  floatingLabelText="密码"
                  type="password"
                  onChange={this.pwHandler.bind(this)}
                  errorText={this.state.pwerrorText}
                />
                <TextField
                  hintText="昵称"
                  floatingLabelText="昵称"
                  onChange={this.ncHandler.bind(this)}
                  errorText={this.state.ncerrorText}
                />
             </div>
             <div>已有帐号？直接<Link to="/login">登录</Link></div>
                <RaisedButton disabled={this.state.isdisabled} style={styles.btn} fullWidth={true} label="提交" primary={true} onClick={this.clickHandle.bind(this)}/>
            </div>
            </Paper>
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    value: state.signup
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionSignup: (data) => dispatch(actionSignup(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
// module.exports = Login;