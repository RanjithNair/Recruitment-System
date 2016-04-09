var ReactDOM = require('react-dom');
var React = require('react');
var Rater = require('react-rating');
const API_ROOT = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=60155&t.k=c8d4VBzJ7r1&action=employers&q=';
module.exports = React.createClass({

  getInitialState: function() {
    return ({companyinfo: null})
  },

  componentDidMount: function() {
    fetch("http://localhost:3000/api/getCompanyData/Infosys").then((response) => response.json()).then((jsonresponse) => {
      this.setState({companyinfo: jsonresponse.response.employers})
    });

  },

  render: function() {
    if (this.state.companyinfo != null) {
      return (
        <div className="col-md-12 github-section">
          <div className="col-md-2">
            <img className="img-rounded github-image" src={this.state.companyinfo[0].squareLogo} alt="Chania"></img>
          </div>
          <div className="col-md-10">
            <div className="row">
              <h2>Ratings</h2>
              <div className="col-md-6">
                <span>Overall Rating</span>
              </div>
              <div className="col-md-6">
                <Rater readonly={true} initialRate={this.state.companyinfo[0].overallRating}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <span>Cultural & Values Rating</span>
              </div>
              <div className="col-md-6">
                <Rater readonly={true} initialRate={this.state.companyinfo[0].cultureAndValuesRating}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <span>Senior Leadership Rating</span>
              </div>
              <div className="col-md-6">
                <Rater readonly={true} initialRate={this.state.companyinfo[0].seniorLeadershipRating}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <span>Compensation & Benefits Rating</span>
              </div>
              <div className="col-md-6">
                <Rater readonly={true} initialRate={2.6}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <span>Loading</span>
      )
    }

  }
});
