var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-box auth0-box before">
      <img src="https://i.cloudup.com/StzWWrY34s.png" />
      <h3>Infy NMC Recruitment System</h3>
      <a onClick={this.showLock} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
    </div>);
  }
});
