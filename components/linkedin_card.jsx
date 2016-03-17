var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {profile: {}}
  },

  componentDidMount: function() {
    this.setState({profile: this.props.profiledata});
  },

  render: function() {
    return (
      <div className="col-md-7 linkedin-profile">
        <div className="row header-image"></div>

        <div className="row header-title">
          <div className="col-md-12">
            <h1 className="title-heading">{this.state.profile.name},
              {this.state.profile.headline}</h1>
            <h2 className="sub-title-heading">
              {this.state.profile.location == null
                ? ""
                : this.state.profile.location.name}
              <span className="glyphicon glyphicon-map-marker"></span>
              {this.state.profile.email}
              <span className="glyphicon glyphicon-envelope"></span>
            </h2>
          </div>
        </div>

        <div className="row summary-text">
          <div className="col-md-12">
            <blockquote>

              {this.state.profile.summary}
            </blockquote>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 footer-info">
            <h3>{this.state.profile.numConnections}
              Connections. Visit profile
              <a href={this.state.profile.publicProfileUrl}>here.</a>
            </h3>
          </div>
        </div>
      </div>
    );
  }
});
