var React = require('react');
var LinkedinCard = require('./linkedin_card.jsx');
var Uploads = require('./uploads.jsx');
var Header = require('./Header.jsx');
var Dummy = require('./dummy.jsx');
var GithubCard = require('./github_card.jsx');
var AdminCard = require('./adminview.jsx');
var GithubSearch = require('./github-search.jsx');
var Modal = require('./modal.jsx');
import {Router, Route, Link, browserHistory} from 'react-router'
var Alert = require('./alerts.jsx');

module.exports = React.createClass({
  callApi: function() {
    $.ajax({url: 'http://localhost:3001/secured/ping', method: 'GET'}).then(function(data, textStatus, jqXHR) {
      alert("The request to the secured enpoint was successfull");
    }, function() {
      alert("You need to download the server seed and start it to call this API");
    });
  },

  getInitialState: function() {
    return {profile: null, showGithubInfo: false, githubid: '', isModalVisible: false, saveSuccessful: 0}
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
    var self = this;
    fetch('http://localhost:3000/api/savecandidatedata', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        linkedin: this.state.profile, githubprofile: this.refs.githubcard.state.profile, githubrepo: this.refs.githubcard.state.repos, codingfile: this.refs.uploadsection.state.codingfile, resumefile: this.refs.uploadsection.state.resumefile
      })
    }).then(function(response) {
      if(!response.ok) {
        console.log("Error: " + response.statusText);
        self.setState({ saveSuccessful: 2});
      }
      self.setState({ saveSuccessful: 1});
    }).catch(function() {
      console.log("error");
      self.setState({ saveSuccessful: 2});
    });

  },

  showModal: function() {
    this.setState({
      isModalVisible: true
    })
  },

  submitProfile: function() {
    this.setState({
      isModalVisible: false
    });
    this.grabAllCardsData();
  },

  cancel: function() {
    this.setState({
      isModalVisible: false
    });
  },

  callbackAlert: function() {
    this.setState({
      saveSuccessful: 0
    });
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
              {this.state.saveSuccessful == 1 ? <Alert status="success" text="Save Successful !" onDismissal={this.callbackAlert}/> : null}
              {this.state.saveSuccessful == 2 ? <Alert status="danger" text="Save failed !" onDismissal={this.callbackAlert} /> : null}
            <div className="row">
              <LinkedinCard profiledata={this.state.profile}/>
              <Uploads ref="uploadsection"/>
            </div>
            <div className="row">
              <div class="form-group">
                <GithubSearch ref="githubcard"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 submit-row">
              <button className="btn submit-profile" type="button" onClick={this.showModal}><span>Submit</span></button>
              {this.state.isModalVisible ? <Modal onConfirm={this.submitProfile} onCancel={this.cancel}/> : null}


              </div>
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
