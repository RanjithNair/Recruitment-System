var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({



  render: function() {
    var repos;
    if(this.props.repos != null) {
      repos = this.props.repos.map(function(repo) {
        return (
          <li className="list-group-item">
            <span className="list-title">
              <a href={repo.html_url}>{repo.name}</a>
            </span>
            <span className="title-desc">
              {repo.description}
            </span>
          </li>
        );
      });
    }




    return(
      <div id="collapse1" className="">
        <ul className="list-group">
          {repos}
        </ul>
      </div>
);

  }
});
