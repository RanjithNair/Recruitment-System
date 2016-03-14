var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data_uri: null,
    };
  },

  handleCodingFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        codingfile: upload.target.result,
      });
    };


    this.setState({
      codingfile: reader.readAsBinaryString(file)
    });
  },

  handleResumeFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        resumefile: upload.target.result,
      });
    };

    this.setState({
      resumefile: reader.readAsBinaryString(file)
    });

  },

  render: function() {
    return(
    <div className="col-md-5 upload-sections">

        <div className="row upload-row">
          <div className="col-md-12 uploads-header">
            <h3>Uploads</h3>
          </div>
        </div>


        <div className="row upload-row">
          <div className="col-md-12">
            <div className="panel panel-default upload-file-section">
              <div className="panel-heading">Upload coding exercise</div>
              <div className="panel-body"><input type="file" onChange={this.handleCodingFile}/></div>
            </div>
            </div>
          </div>
          <div className="row upload-row">
            <div className="col-md-12">
              <div className="panel panel-default upload-file-section">
                <div className="panel-heading">Upload your resume</div>
                <div className="panel-body"><input type="file" onChange={this.handleResumeFile} /></div>
              </div>
              </div>
            </div>

          </div>
);

  }
});
