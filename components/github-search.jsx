var ReactDOM = require('react-dom');
var React = require('react');
var RepoInfo = require('./repo-info.jsx');
const API_ROOT = 'https://api.github.com/users';
module.exports = React.createClass({

  getInitialState: function() {
    return {
      showGithubCard: false,
      profile : {},
      showRepoInfo: false,
      githubid: ""
    }
  },

  handleTextChange: function(e) {
    this.setState({githubid: e.target.value});
  },

  showGithubCard: function() {
    this.setState({showGithubCard: true});
    this._getGithubData();
  },

  _getGithubData: function() {
    fetch(API_ROOT + "/" + this.state.githubid)
    .then((response) => response.json())
    .then((jsonresponse) => {
      this.setState({profile: jsonresponse});
      fetch(jsonresponse.repos_url)
      .then((response) => response.json())
      .then((jsonresponse => {
        this.setState({repos: jsonresponse});
      }))


    })

  },

  _showRepos: function() {
    this.setState({
      showRepoInfo: true
    })
  },


  render: function() {
    if (this.state.showGithubCard) {
      return (
        <div className="col-md-7 github-section">
          <div className="row github-header-row">
            <div className="col-md-2 image-section">
              <img className="img-rounded github-image" src={this.state.profile.avatar_url} alt="Chania"></img>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title-heading">{this.state.name != null
                      ? this.state.profile.name
                      : this.state.profile.login}</h2>
                </div>
              </div>
              <div className="row github-header">
                <div className="col-md-12">
                  <span>
                    <span className="glyphicon glyphicon-user"></span>
                    {this.state.profile.bio}</span>
                </div>
              </div>
              <div className="row github-header">
                <div className="col-md-12">
                  <span>
                    <span className="glyphicon glyphicon-map-marker"></span>{this.state.profile.location}</span>
                </div>
              </div>
              <div className="row github-header">
                <div className="col-md-12">
                  <span>
                    <span className="glyphicon glyphicon-envelope"></span>{this.state.profile.email}</span>
                </div>
              </div>
              <div className="row github-header">
                <div className="col-md-12">
                  <span>
                    <span className="glyphicon glyphicon-time"></span>Joined on
                    {this.state.profile.created_at}</span>
                </div>
              </div>
              <div className="row github-header">
                <div className="col-md-12">
                  <span>
                    <span className="glyphicon glyphicon-globe"></span>
                    <a href={this.state.profile.blog}>{this.state.profile.blog}</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-4">
                  <span className="highlight-number">
                    <a href={this.state.profile.followers_url}>{this.state.profile.followers}</a>
                  </span>Followers
                </div>
                <div className="col-md-4">
                  <span className="highlight-number">{this.state.profile.public_gists}</span>
                  Gists
                </div>
                <div className="col-md-4">
                  <span className="highlight-number">
                    <a href={this.state.profile.following_url}>{this.state.profile.following}</a>
                  </span>Following
                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-12 collapsible-repo">
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading repo-heading">
                    <h2 className="panel-title">
                      <a data-toggle="collapse" href="#" onClick={this._showRepos}>
                        <h3>{this.state.profile.public_repos} Repositories</h3>
                      </a>
                    </h2>
                  </div>

                  {this.state.showRepoInfo
                    ? <RepoInfo repos={this.state.repos}/>
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="group col-md-7">
          <input type="text" required className="material" value={this.state.githubid} onChange={this.handleTextChange}></input>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Enter Github ID</label>


            <button className="btn" type="button"><span>Button</span></button>
        </div>
      );
    }
  }
});
