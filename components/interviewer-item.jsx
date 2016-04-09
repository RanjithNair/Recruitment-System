var ReactDOM = require('react-dom');
var React = require('react');
var interviewers;

module.exports = React.createClass({

  saveInterviewer: function(i) {
    console.log(this.refs.selintvw.value);
    console.log(this.refs.candidateName.textContent);
    fetch('http://localhost:3000/api/updateInterviewerData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        username : this.refs.candidateName.textContent,
        interviewer: this.refs.selintvw.value
      })
    }).then(function(response) {
      if(!response.ok) {
        console.log("Error: " + response.statusText);
      }
    }).catch(function() {
      console.log("error");
    });

  },

  render: function() {
    var selItems = this.props.interviewerList.map(function(interviewer) {
      return (
        <option key={interviewer.email}>{interviewer.name}</option>
      );
    });

    return (
      <tr>
        <td ref="candidateName">{this.props.name}</td>
        <td>
          <select ref="selintvw">
            {selItems}
          </select>
        </td>
        <td>
          {this.props.status}
        </td>
        <td>
          <button className="btn submit-profile" type="button" onClick={this.saveInterviewer.bind(this,this.props.index)}><span>Save</span></button>
        </td>
      </tr>
    );
  }

});
