var ReactDOM = require('react-dom');
var React = require('react');
const API_ROOT = 'https://api.github.com/users';
module.exports = React.createClass({

  getInitialState: function() {
    return {
      profile : {}
    }
  },

  _getGithubData: function() {
    fetch(API_ROOT + "/" + this.props.username)
    .then((response) => response.json())
    .then((jsonresponse) => {
      this.setState({profile: jsonresponse});
    });
  },

  componentDidMount: function() {
    this._getGithubData();
  },

  render: function() {
    const followersUrl = `${this.state.profile.html_url}/followers`;
    const repositoriesUrl = `${this.state.profile.html_url}/repositories`;
    const gistsUrl = `https://gist.github.com/${this.props.username}`;
    const className = this.props.className ? `github-profile ${this.props.className}` : 'github-profile';

    return (
      <div className={className}>
        <div className="github-profile__avatar">
          <a href={this.state.profile.blog || this.state.profile.html_url}><img alt={this.props.username} src={this.state.profile.avatar_url} /></a>
        </div>
        <div className="github-profile__details">
          <a href={this.state.profile.html_url}><h3 className="github-profile__username">@{this.props.username}</h3></a>
          <h2 className="github-profile__name">{this.state.profile.name}</h2>
          <ul className="github-profile__stats">
            <li className="github-profile__followers">
              <a href={followersUrl}><strong>{this.state.profile.followers}</strong> Followers</a>
            </li>
            <li className="github-profile__repos">
              <a href={repositoriesUrl}><strong>{this.state.profile.public_repos}</strong> Repos</a>
            </li>
            <li className="github-profile__gists">
              <a href={gistsUrl}><strong>{this.state.profile.public_gists}</strong> Gists</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
