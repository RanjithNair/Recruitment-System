var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },
  render: function() {
    return (
      <div className="login">
        <div className="heading">
          <h1 className="title-heading home-title">Infosys Recruitment System</h1>
          <button className="float" onClick={this.showLock}>Login</button>
        </div>
      </div>
    );
  }
});
