import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { actionUserlist } from '../actions/userlist';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
    page: {
        position: 'absolute',
        height: 'auto',
        width: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    loginBtn: {
      color: '#fff'
    },
    las: {
      marginTop: 5
    }
};

class Userlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {open: false};
    }
    componentWillMount() {
        if (this.props.value.length <= 0) {
            fetch('/api/userlist',{
                method: "POST",
                body: '',
                headers:{
                    "Content-type":"application/json"
                }
            })
            .then(res => res.json())
            .then(function (json) {
                this.props.actionUserlist(json.users);
                
            }.bind(this),function(error) {
              error.message //=> String
            }.bind(this));
        }
        
    }
    render() {
        var list = (function () {
            var res = [];
            for (var i = 0; i < this.props.value.length; i++) {
                
                res.push(
                    <TableRow>
                        <TableRowColumn>{this.props.value[i].id}</TableRowColumn>
                        <TableRowColumn>{this.props.value[i].nicheng}</TableRowColumn>
                        <TableRowColumn>{this.props.value[i].username}</TableRowColumn>
                        <TableRowColumn>{this.props.value[i].level}</TableRowColumn>
                    </TableRow>
                )
            }
            return res;
        }).bind(this)()
        return(
            <Paper style={styles.page} zDepth={2}>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>昵称</TableHeaderColumn>
                    <TableHeaderColumn>帐号</TableHeaderColumn>
                    <TableHeaderColumn>权限</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list}
                </TableBody>
            </Table>
            </Paper>
        )
    }
};
function mapStateToProps(state) {
  return {
    value: state.userlist
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionUserlist: (data) => dispatch(actionUserlist(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Userlist);
// export default Userlist;