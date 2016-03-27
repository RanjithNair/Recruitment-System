var ReactDOM = require('react-dom');
var React = require('react');
var Alert = require('react-bootstrap').Alert;

module.exports = React.createClass({

  getInitialState() {
    return{alertVisible: true}
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
    this.props.onDismissal();
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  },

  render: function() {

       if (this.state.alertVisible) {
         return(
           <Alert bsStyle={this.props.status} onDismiss={this.handleAlertDismiss}>
             <h4>{this.props.text}</h4>
           </Alert>
         );
       }
       return null;
  }

});
