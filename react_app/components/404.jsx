import React from 'react';
import Paper from 'material-ui/Paper';

const styles = {
    page: {
        height: 500,
        width: "100%",
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    }
};
class ErrorPage extends React.Component {
    render() {
        return (
            <Paper style={styles.page} zDepth={2}>
                <h1>404 你要找的东西不存在~</h1>
            </Paper>
        );
    }
};
export default ErrorPage;
// module.exports = Tie;