import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import fetch from 'isomorphic-fetch';
import { actionQuan } from '../actions/quan';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
    container: {
        width: '100%',
        padding: 10,
        marginBottom: 80
    },
    page: {
        height: 300,
        width: 300,
        margin: 20,
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
    },
    others: {
        marginTop:40
    },
    ownertit: {
        // backgroundColor:'#ccc',
        borderBottom: '1px solid #ccc',
        fontSize: 18,
        marginTop:20,
        height: 30,
        // lineHeight: 30,
        fontSize: 19
    },
    imgwrap: {
        width:80,
        height: 80,
        overflow:'hidden',
        position: 'absolute'
    },
    imgwrap1: {
        width:80,
        height: 80,
        overflow:'hidden',
        position: 'relative'
    },
    img: {
        width: 'auto',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    },
    box: {
        position: 'relative',
        height: 80,
        marginTop:10
    },
    rightside: {
        
        padding: 10,
        paddingLeft: 90
    },
    h1: {
        margin: 0,
        fontSize: 17,
    },
    renshu: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#ccc'
    },
    description: {
        height:40,
        wordBreak: 'break-all',
        overflow: 'hidden'
    },
    addquan: {
        position: 'fixed',
        bottom: window.config.ismobile?80:40,
        right: window.config.ismobile?30:40
    }
};
class Zu extends React.Component {
    render() {
        return (
            <Link to={'quandetail/'+this.props.data.id}>
            <div className="col-md-4">
            <Paper style={styles.box}>

            <div style={styles.imgwrap}>
                <div style={styles.imgwrap1}>
                <img style={styles.img} src={this.props.data.pic}/>
                </div>
            </div>
            <div style={styles.rightside}>
                <h1 style={styles.h1}>{this.props.data.title}</h1>
                <div style={styles.description}>{this.props.data.description.substr(0,25)+'...'}</div>
                <div style={styles.renshu}>{this.props.data.member}人</div>
            </div>
            </Paper>
            </div>
            </Link>
        )
    }
}
class Quan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
  
        };
    }
    componentWillMount() {
        // if (this.props.value.content.length>0) {
        //     return;
        // }
        // let type = 'tuijian';
        // if (this.props.param) {
        //     type = this.props.param.id;
        // }
        fetch('/api/quan',{
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            this.props.actionQuan(json.content);
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    render() {
        let self = this;
        const ownzu = (function () {
            let result = [];
            
            let n = self.props.value.owner.length%3;
            let m = Math.floor(self.props.value.owner.length/3);
            for (let i = 0; i < m; i++) {
                result.push(
                    <div className="row">
                    <Zu data={self.props.value.owner[3*i]} key={3*i}/>
                    <Zu data={self.props.value.owner[3*i+1]} key={3*i+1}/>
                    <Zu data={self.props.value.owner[3*i+2]} key={3*i+2}/>
                    </div>
                );
            }
            let len = 3*(m-1)+2;
            let res = [];
            for (let i = 0; i < n; i++) {
                res.push(
                    <Zu data={self.props.value.owner[len+i+1]} key={len+i+1}/>
                );
            }
            if (n>0) {
                result.push(
                    <div className="row">
                    {res}
                    </div>
                );
            }
            
            return result;
        })()
        const others = (function () {
            let result = [];
            let n = self.props.value.others.length%3;
            let m = Math.floor(self.props.value.others.length/3);
            for (let i = 0; i < m; i++) {
                result.push(
                    <div className="row">
                    <Zu data={self.props.value.others[3*i]} key={3*i}/>
                    <Zu data={self.props.value.others[3*i+1]} key={3*i+1}/>
                    <Zu data={self.props.value.others[3*i+2]} key={3*i+2}/>
                    </div>
                );
            }
            let len = 3*(m-1)+2;
            let res = [];
            for (let i = 0; i < n; i++) {
                res.push(
                    <Zu data={self.props.value.others[len+i+1]} key={len+i+1}/>
                );
            }
            if (n>0) {
                result.push(
                    <div className="row">
                    {res}
                    </div>
                );
            }
            
            return result;
        })()
        if (ownzu.length == 0) {
            return (
                <div className="container" style={styles.container}>
                    
                    <div style={styles.others}>
                        <div style={styles.ownertit}>所有圈子</div>
                        <div>
                        {others}
                        </div>
                    </div>
                    <Link to="/addquan">
                    <FloatingActionButton style={styles.addquan}>
                      <ContentAdd />
                    </FloatingActionButton>
                    </Link>
                </div>
            );
        }
        return (
            <div className="container" style={styles.container}>
                <div style={styles.owner}>
                    <div style={styles.ownertit}>我关注的</div>
                    <div>
                    {ownzu}
                    </div>
                </div>
                <div style={styles.others}>
                    <div style={styles.ownertit}>其它圈子</div>
                    <div>
                    {others}
                    </div>
                </div>
                <Link to="/addquan">
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
    value: state.quan
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionQuan: (data) => dispatch(actionQuan(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quan);
// module.exports = Login;