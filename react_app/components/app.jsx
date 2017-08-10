import React from 'react';
const styles = {
  main: {
    
    maxWidth: 960,
    margin: '0 auto'
  }
}
class App extends React.Component {
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    if (this.props.header) {
        return (
          <div>
            <div className="Header">
              {this.props.header}
            </div>
            <div style={styles.main} className="Main">
              {this.props.main}
            </div>
            
          </div>
        )
    } else {
        return (
          <div>
            <div style={styles.main} className="Main">
              {this.props.main}
            </div>
            
          </div>
        )
    }
  }
}
export default App;