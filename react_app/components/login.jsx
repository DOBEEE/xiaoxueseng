import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import fetch from 'isomorphic-fetch';
import { actionLogin } from '../actions/login';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
const styles = {
    container: {
        background: ''
    },
    page: {
        height: 300,
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isdisabled: true,
            unok: false,
            pwok: false,
            unerrorText: '',
            pwerrorText: '',
            unval: '',
            pwval: ''
        };
    }
    unHandler(event, val) {
        if (val.length>6) {
            this.setState({unval: val,unok: true,unerrorText: ''});
            if (this.state.pwok) {
                this.setState({isdisabled: false});
            }
            
        } else {
            this.setState({isdisabled:true, unerrorText: '账户名不少于6位'});
        }
    }
    pwHandler(event, val) {
        if (val.length>8) {
            this.setState({pwval: val,pwok: true,pwerrorText: ''});
            if (this.state.unok) {
                this.setState({isdisabled: false});
            }
        } else {
            this.setState({isdisabled:true, pwerrorText: '密码不少于8位'});
        }
    }
    clickHandle() {
        let data = ({
            username: this.state.unval,
            password: this.state.pwval
        });
        fetch('/api/login',{
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
                this.props.actionLogin(json);
                const path = '/';
                browserHistory.push(path);
            } else if (json.state == 'unerr'){
                this.setState({isdisabled: false,unerrorText: '账户名错误'});
            } else if (json.state == 'pwerr'){
                this.setState({isdisabled: false,pwerrorText: '密码错误'});
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
            <h1 style={styles.h1}>登录</h1>
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
             </div>
                <RaisedButton disabled={this.state.isdisabled} style={styles.btn} fullWidth={true} label="提交" primary={true} onClick={this.clickHandle.bind(this)}/>
                <div>没有帐号？<Link to="/signup">注册</Link></div>
            </div>
            </Paper>
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    value: state.login
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionLogin: (data) => dispatch(actionLogin(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
// module.exports = Login;