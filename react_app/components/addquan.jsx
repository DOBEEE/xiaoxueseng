import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// var wangEditor = require('wangeditor');
const styles = {
    wrap: {
        padding:20,
        paddingTop: window.config.ismobile?0:20
    },
    edit: {
        height: 400
    },
    btnstyle: {
        marginTop: 20,
        marginBottom: window.config.ismobile?30:0
    },
    // title: {
    //     position: 'absolute',
    //     bottom: 0,
    //     width: '75%',
    //     marginRight: '5%'
    // },
    lei: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '20%'
    },
    tit: {
        position: 'relative',
        verticalAlign: 'bottom',
        height: 80,
        marginBottom: 20
    },
    snackbar: {
      bottom:window.config.ismobile?59:0
    }
}
class AddQuan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isok: false,
        pic: '',
        title: '',
        description: '',
        titok: false,
        picok: false,
        conok: false,
        titerrorText: '',
        picerrorText: '',
        conerrorText: '',
        isdisabled: true,
        message: ''
    };
    // this.onChange = (editorState) => this.setState({editorState});
  }
  componentWillMount() {
    if (!this.props.value.name) {
        const path = '/login';
        browserHistory.push(path);
    }
  }
  componentDidMount() {
    this.setState({isok:false});
    var self = this;
    if (!document.getElementById('eidt')) {
        this.refs.edit.setAttribute('id','edit');
        var editor = new wangEditor(this.refs.edit);
        editor.onchange = function () {
            var val = this.$txt.formatText();
            // console.log(this.$txt.formatText());
            if (val.length>8) {
                self.setState({description:val.substr(0,200), conok: true,conerrorText: ''});
                if (self.state.titok && self.state.picok) {
                    self.setState({isdisabled: false});
                }
            } else {
                self.setState({isdisabled:true, conerrorText: '内容不少于8个字符'});
            }
            // this.setState({content:this.$txt.html()});
        };
        editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
             if (item === 'location') {
                 return null;
             }
             return item;
        });
        editor.config.menuFixed = false;
        editor.create();
    }
        
  }
  titleChange(event, val) {
    if (val.length>3) {
        this.setState({title: val,titok: true,titerrorText: ''});
        if (this.state.conok && this.state.picok) {
            this.setState({isdisabled: false});
        }
        
    } else {
        this.setState({isdisabled:true, titerrorText: '标题不少于3个字符'});
    }
  }
  picChange(event, val) {
    if (val) {
        this.setState({pic: val,picok: true,picerrorText: ''});
        if (this.state.conok && this.state.titok) {
            this.setState({isdisabled: false});
        }
        
    } else {
        this.setState({isdisabled:true, picerrorText: '图片必填'});
    }
  }
    submitHandle() {
        let data = ({
            // author: this.state
            description: this.state.description,
            pic: this.state.pic,
            title: this.state.title
        });
        fetch('/api/addquan',{
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
                
                const path = '/quandetail/'+json.id;
                setTimeout(function () {
                    self.setState({isok:false});
                    browserHistory.push(path);
                },1000);
                
            } else {
                this.setState({isok:true,message:'发布失败'});
                setTimeout(function () {
                    self.setState({isok:false});
                },1000);
            }
            
        }.bind(this),function(error) {
          error.message //=> String
        }.bind(this));
  }
  render() {
    return (
        <div style={styles.wrap}>
        <TextField
            style={styles.title}
            fullWidth={true}
            hintText="标题"
            floatingLabelText="标题"
            onChange={this.titleChange.bind(this)}
            errorText={this.state.titerrorText}
        />

        <TextField
            style={styles.title}
            fullWidth={true}
            hintText="图片"
            floatingLabelText="图片"
            onChange={this.picChange.bind(this)}
            errorText={this.state.picerrorText}
        />
        <div style={styles.edit} ref="edit">
            <p>请输入内容...</p>
        </div>
        <RaisedButton onClick={this.submitHandle.bind(this)} disabled={this.state.isdisabled} label="创建" primary={true} style={styles.btnstyle} fullWidth={true} />
        <Snackbar
        style={styles.snackbar}
          open={this.state.isok}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    value: state.session
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // actionHeaderLogout: (data) => dispatch(actionHeaderLogout(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuan);
// export default FaTie;