var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({



  render: function() {
    var repos;
    if(this.props.repos != null) {
      repos = this.props.repos.map(function(repo) {
        return (
          <a href={repo.html_url} className="list-group-item">
            <h4 className="list-group-item-heading">{repo.name}</h4>
            <p className="list-group-item-text">{repo.description}</p>
          </a>
        );
      });
    }




    return(
      <div id="collapse1" className="list-group">
          {repos}
      </div>
);

  }
});
