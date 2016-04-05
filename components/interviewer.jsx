var ReactDOM = require('react-dom');
var React = require('react');
var LinkedinCard = require('./linkedin_card.jsx');
var Uploads = require('./uploads.jsx');
var GithubCard = require('./github_card.jsx');
var GithubSearch = require('./github-search.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {candidateList: null}
  },

  _getCandidateList: function() {
    fetch('http://localhost:3000/api/getcandidatedata').then((response) => response.json()).then((jsonresponse) => {
      this.setState({candidateList: jsonresponse});
    });

  },

  componentDidMount: function() {
    this._getCandidateList();
  },

  viewProfile: function(username) {
    fetch('http://localhost:3000/api/getcandidatedataByName' + "/" + username).then((response) => response.json()).then((jsonresponse) => {
      this.setState({
        profile: jsonresponse.linkedin,
        showProfile: true
      });
    });
  },

  showProfileSection: function() {
    return(
      <div className="container-fluid">
        <div className="row">
          <LinkedinCard profiledata={this.state.profile}/>
          <Uploads ref="uploadsection"/>
        </div>
        <div className="row">
          <div className="form-group">
            <GithubSearch ref="githubcard"/>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    var self = this;
    if (this.state.candidateList != null) {
      var rowItem = this.state.candidateList.map(function(candidate) {
        return (
          <tr>
            <td ref="username">{candidate.username}</td>
            <td><button className="btn submit-profile" type="button" onClick={self.viewProfile.bind(this,candidate.username)}><span>View profile</span></button></td>
          </tr>
        );
      });
    }
    else {
      return(
        <tr>hell</tr>
      );
    }
    return (
      <div>
      <table className="table table-bordered admin-table">
        <tbody>
          {rowItem}
        </tbody>
      </table>
      {this.state.showProfile ? self.showProfileSection(): null}
    </div>
    );
  }

});
