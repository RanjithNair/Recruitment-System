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
    var self = this;
    if(this.state.candidateList != null && this.state.interviewerList != null) {
      return (
          this.state.candidateList.map(function(candidate) {
            < InterviewerListItem name = {candidate.username} interviewerList = {this.state.interviewerList} />
          })
      );
    }
    else {
      return(
        <tr>
          <td>hell</td>
        </tr>
      );
    }
  },

  render: function() {
    return (
      <table>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
});
