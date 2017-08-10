import React from 'react';
import Paper from 'material-ui/Paper';
import { actionHome, actionLikeHome, actionStarHome } from '../actions/home';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

import Like from 'material-ui/svg-icons/action/favorite-border';
import Liked from 'material-ui/svg-icons/action/favorite';
import Star from 'material-ui/svg-icons/toggle/star-border';
import Stared from 'material-ui/svg-icons/toggle/star';
// import MobileTearSheet from '../../../MobileTearSheet';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import TuijianIcon from 'material-ui/svg-icons/maps/my-location';
import ComputerIcon from 'material-ui/svg-icons/hardware/mouse';
import MathIcon from 'material-ui/svg-icons/action/extension';
import NongIcon from 'material-ui/svg-icons/places/spa';
import EnglishIcon from 'material-ui/svg-icons/action/translate';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import {Tabs, Tab} from 'material-ui/Tabs';

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
    sidebar: {
        width: 250,
        position: 'absolute'
    },
    main: {
        paddingLeft: 300,
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
    snackbar: {
      bottom:window.config.ismobile?59:0
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
        
        this.props.actionLikeHome(state);
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
        
        this.props.actionStarHome(state);

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
                          overlay={<CardTitle style={styles.cardTitle_w} titleStyle={styles.cardTitle} />}
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

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {action: 'tuijian'};
      this.propTypes = {
          children: PropTypes.node.isRequired,
          defaultValue: PropTypes.number.isRequired,
        };
    }
    

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
      fetch('/api/home',{
            method: "POST",
            body: JSON.stringify({type: index}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            this.props.actionHome(json);
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange.bind(this)}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);
class Sidebar extends React.Component {
    render() {
        return (
          <Paper style={styles.sidebar}>
          <SelectableList actionHome={this.props.actionHome} defaultValue="tuijian">
            
              <ListItem value="tuijian" primaryText="推荐" leftIcon={<TuijianIcon />} />
            
              <ListItem value="en" primaryText="英语" leftIcon={<EnglishIcon />} />
            
              <ListItem value="nong" primaryText="农学" leftIcon={<NongIcon />} />
            
              <ListItem value="math" primaryText="数学" leftIcon={<MathIcon />} />
            
              <ListItem value="computer" primaryText="计算机" leftIcon={<ComputerIcon />} />
            
        </SelectableList>
            <Divider />
            <List>
              <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
            </List>
            
          </Paper>
        )
    }
}
class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        action: 'tuijian',
        isok: false,
        message: '',
        value: 'tuijian'
        };
    }

    componentWillMount() {
        // if (this.props.value.content.length>0) {
        //     return;
        // }
        let type = 'tuijian';
        if (this.props.param) {
            type = this.props.param.id;
        }
        fetch('/api/home',{
            method: "POST",
            body: JSON.stringify({type: type}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            this.props.actionHome(json);
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
    handleChange(value) {
        this.setState({
          value: value,
        });
        fetch('/api/home',{
            method: "POST",
            body: JSON.stringify({type: value}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
            this.props.actionHome(json);
        }.bind(this),function(error) {
          console.log(error.message) //=> String
        }.bind(this));
    }
    render() {
        const main = (function () {
            let res = [];
            for (let i = 0; i < this.props.value.content.length; i++) {

                res.push(
                    <CardItem key={i} session={this.props.session} errHandle={this.errHandle.bind(this)} actionStarHome={this.props.actionStarHome} actionLikeHome={this.props.actionLikeHome} data={this.props.value.content[i]} index={i}/>
                );
            }
            return res;
        }.bind(this))()
        if (window.config.ismobile) {
            return (
                <div>
                <Tabs
                    style={styles.m_tabs}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    >
                    <Tab 
                        icon={<TuijianIcon />}
                        value="tuijian" 
                        label="推荐"
                    />
                    <Tab 
                        icon={<ComputerIcon />}
                        value="computer" 
                        label="计算机"
                    />
                    <Tab 
                        icon={<EnglishIcon />}
                        value="en" 
                        label="英语"
                    />
                    <Tab 
                        icon={<MathIcon />}
                        value="math" 
                        label="数学"
                    />
                    <Tab 
                        icon={<NongIcon />}
                        value="nong" 
                        label="农学"
                    />
                         
                    </Tabs>
                <div style={styles.wrap}>
                    
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
                </div>
                </div>
            );
        }
        return (
            <div style={styles.wrap}>
                <Sidebar actionHome={this.props.actionHome} />
                
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
            </div>
        );
    }
};
function mapStateToProps(state) {
  return {
    session: state.session,
    value: state.home
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actionHome: (data) => dispatch(actionHome(data)),
    actionLikeHome: (data) => dispatch(actionLikeHome(data)),
    actionStarHome: (data) => dispatch(actionStarHome(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
// module.exports = Home;