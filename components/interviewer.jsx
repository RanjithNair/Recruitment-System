var ReactDOM = require('react-dom');
var React = require('react');
var LinkedinCard = require('./linkedin_card.jsx');
var Uploads = require('./uploads.jsx');
var GithubCard = require('./github_card.jsx');
var GithubSearch = require('./github-search.jsx');
var GlassDoor = require('./glassdoor.jsx');
module.exports = React.createClass({

  getInitialState: function() {
    return {candidateList: null, showSubmissionInput: false}
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
    this.setState({
      showSubmissionInput: true
    });

    fetch('http://localhost:3000/api/getcandidatedataByName' + "/" + username).then((response) => response.json()).then((jsonresponse) => {
      this.setState({
        profile: jsonresponse.linkedin,
        githubprofile: jsonresponse.githubprofile,
        githubrepo: jsonresponse.githubrepo,
        showProfile: true,
        resumefile: jsonresponse.resumefile
      });
    });
  },

  showProfileSection: function() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            <LinkedinCard profiledata={this.state.profile} isInterviewer="true"/>
            <GithubSearch ref="githubcard" profiledata={this.state.githubprofile} githubrepo={this.state.githubrepo} isInterviewer="true"/>
            <GlassDoor companyname = "Infosys" />
          </div>
          <div className="col-md-5">
            <embed src={this.state.resumefile}
          width="900" height="600" type="application/pdf"></embed>
          </div>


        </div>
      </div>
    );
  },

  submitResult: function(username) {
    console.log("result for " + username);
    console.log(this.refs.intvwcomment + this.refs.result);
    this.saveResult(this.refs.intvwcomment.value, this.refs.result.value, username);
  },

  saveResult: function(comments, result, username) {
    fetch('http://localhost:3000/api/updateResult', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        comments : comments,
        result: result,
        username: username
      })
    }).then(function(response) {
      if(!response.ok) {
        console.log("Error: " + response.statusText);
      }
    }).catch(function() {
      console.log("error");
    });

  },

  showProfileSubmission: function(username) {
    return(
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea ref="intvwcomment" className="form-control" rows="5" id="comment"></textarea>

          <label for="sel1">Result:</label>
          <select ref="result" className="form-control" id="sel1">
            <option>Selected</option>
            <option>Rejected</option>
            <option>Deferred</option>
          </select>
          <button className="btn submit-profile" type="button" onClick={this.submitResult.bind(this,username)}><span>Submit Result</span></button>
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
            <td><button className="btn submit-profile" type="button" onClick={self.viewProfile.bind(this,candidate.username)}><span>View profile</span></button>
              {self.state.showSubmissionInput ? self.showProfileSubmission(candidate.username) : null}
            </td>

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
