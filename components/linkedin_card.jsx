var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      profile: {}
    }
  },

  componentDidMount: function() {
    this.setState({profile: this.props.profiledata});
  },

  render: function() {
    return (
      <div className="col-md-7 linkedin-profile">
        <div className="row header-image">


        </div>

        <div className="row header-title">
          <div className="col-md-12">
            <h1 className="title-heading">Ranjith Nair, Technology Lead at Infosys</h1>
            <h2 className="sub-title-heading">
        Milwaukee<span className="glyphicon glyphicon-map-marker"></span>
        (414)-581-3882<span className="glyphicon glyphicon-phone"></span>
        ranjith2112@gmail.com<span className="glyphicon glyphicon-envelope"></span>
      </h2>
          </div>
        </div>

        <div className="row summary-text">
          <div className="col-md-12">
            <blockquote>
              "6 years of professional IT experience, currently working as Technology Lead @ NorthwesternMutual Insurance. As part of my work experience in various Fortune 500 companies, donned the role of Web Developer, Technology Lead and Offshore-Onsite Coordinator
              spanning across multiple technologies. Technology enthusiast and mastered the treasures of various Javascript frameworks like React.js & Backbone, HTML5/CSS3, Node.js alongside the traditional ASP.NET MVC & Java. Specialties: React.js, ASP.NET(MVC),
              Node.js, Backbone, Java Web Services."
            </blockquote>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 footer-info">
            <h3>100 Connections. Visit profile <a href="#">here.</a></h3>
          </div>
        </div>
      </div>
    );
  }
});
