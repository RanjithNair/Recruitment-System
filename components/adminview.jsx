var ReactDOM = require('react-dom');
var React = require('react');
var InterviewerListItem = require('./interviewer-item.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {candidateList: null, interviewerList: null}
  },

  componentDidMount: function() {
    fetch('http://localhost:3000/api/getcandidatedata').then((response) => response.json()).then((jsonresponse) => {
      this.setState({candidateList: jsonresponse})
    });

    fetch('http://localhost:3000/api/interviewers').then((response) => response.json()).then((jsonresponse) => {
      this.setState({interviewerList: jsonresponse})
    });
  },

  renderItems: function() {

  },

  render: function() {

    var self = this;

    if(this.state.candidateList != null && this.state.interviewerList != null) {
      var listitem = this.state.candidateList.map(function(candidate,index) {
        return (
            <InterviewerListItem name = {candidate.username} status = {candidate.result} interviewerList = {self.state.interviewerList} index={index}/>
        );
      });
    }
    else {
      return(
        <tr>
          <td>hell</td>
        </tr>
      );
    }

    return (
      <table className="table table-bordered admin-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Interviewer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listitem}
        </tbody>
      </table>
    );
  }
});
