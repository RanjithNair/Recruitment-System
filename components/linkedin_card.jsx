var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      profile: {}
    }
  },

  componentDidMount: function() {
    this.setState({profile: this.props.profiledata});
  },

  render: function() {
    return (
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{this.state.profile.name}</h3>
        </div>
        <div class="panel-body">
          {this.state.profile.summary}
        </div>
      </div>
    );
  }
});
