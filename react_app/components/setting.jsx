import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {List, ListItem} from 'material-ui/List';
import { actionHeaderLogout } from '../actions/header';
const styles = {
    container: {
        // background: ''
    },
    btnstyle: {
        marginTop: 20
    }
};

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    logout() {
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
    render() {
        return (
            <div style={styles.container}>
                <List>
                  <ListItem primaryText="个人资料" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="通用" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="隐私" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="新消息提醒" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="帐号与安全" rightIcon={<ActionInfo />} />
                </List>
                <RaisedButton onClick={this.logout.bind(this)} label="登出" primary={true} style={styles.btnstyle} fullWidth={true} />
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    session: state.session
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
)(Setting);
// module.exports = Login;