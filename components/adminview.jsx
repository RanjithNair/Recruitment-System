var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({

componentDidMount: function() {
  fetch('http://localhost:3000/api/getcandidatedata')
  .then((response) => response.json())
  .then
},


render: function() {
    return(
      <h2>Admin View</h2>
    );
  }
});
