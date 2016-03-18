var React = require('react');
var LinkedinCard = require('./linkedin_card.jsx');
var Uploads = require('./uploads.jsx');
var Header = require('./Header.jsx');
var Dummy = require('./dummy.jsx');
var GithubCard = require('./github_card.jsx');
var AdminCard = require('./adminview.jsx');
var GithubSearch = require('./github-search.jsx');
import {Router, Route, Link, browserHistory} from 'react-router'

module.exports = React.createClass({
  callApi: function() {
    $.ajax({url: 'http://localhost:3001/secured/ping', method: 'GET'}).then(function(data, textStatus, jqXHR) {
      alert("The request to the secured enpoint was successfull");
    }, function() {
      alert("You need to download the server seed and start it to call this API");
    });
  },

  getInitialState: function() {
    return {profile: null, showGithubInfo: false, githubid: ''}
  },

  componentDidMount: function() {
    this.props.lock.getProfile(this.props.idToken, function(err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        alert("Error loading the Profile");
      }
      this.setState({profile: profile});
    }.bind(this));
  },
  showGithubCard: function() {
    this.setState({showGithubInfo: true})
  },
  handleTextChange: function(e) {
    this.setState({githubid: e.target.value});
  },

  grabAllCardsData: function() {
    console.log('data is' + this.refs.uploadsection.state.resumefile);
    fetch('http://localhost:3000/api/savecandidatedata', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        linkedin: this.state.profile, githubprofile: this.refs.githubcard.state.profile, githubrepo: this.refs.githubcard.state.repos, codingfile: this.refs.uploadsection.state.codingfile, resumefile: this.refs.uploadsection.state.resumefile
      })
    })

  },

  render: function() {
    if (this.state.profile) {
      if(this.state.profile.roles != null && this.state.profile.roles[0] == 'admin') {
        return(
        <AdminCard />
        );
      }
      else {
        return (
          <div className="container-fluid">
            <Header username={this.state.profile.name}/>
            <div className="row">
              <LinkedinCard profiledata={this.state.profile}/>
              <Uploads ref="uploadsection"/>
            </div>
            <div className="row">
              <div class="form-group">
                <GithubSearch />
              </div>
            </div>
            <div className="row">
              <button type="button" class="btn btn-default" onClick={this.grabAllCardsData}>Grab Data</button>
            </div>
          </div>
        );
      }

    } else {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png"/></h1>
        </div>
      );
    }
  }
});
