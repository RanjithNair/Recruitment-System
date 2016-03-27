var ReactDOM = require('react-dom');
var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({

  getInitialState() {
    return { showModal: true };
  },

  save() {
    this.setState({ showModal: false });
    this.props.onConfirm(); //callback to parent
  },

  close() {
    this.setState({ showModal: false });
    this.props.onCancel();
  },

  render: function() {
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Submit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to submit your profile?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.save}>Yes</Button>
            <Button onClick={this.close}>No</Button>
          </Modal.Footer>
        </Modal>
    );
  }

});
