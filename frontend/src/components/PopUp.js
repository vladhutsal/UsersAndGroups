import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import '../index.css';


export default class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        show: false
      });
      this.handleClose();
    }
  }
  

  handleClose() {
    this.setState(state => ({
      show: !state.show
    }));
  }
 

  render() {
    return (
      <Toast
        autohide={true}
        animation={false}
        delay={3000}
        show={this.state.show}
        className='PopUp'
        onClose={this.handleClose}
      >
        <ToastHeader closeButton={false}>
          <strong className="mr-auto">{this.props.data.eventName}</strong>
        </ToastHeader>
        <ToastBody>{this.props.data.message}</ToastBody>
      </Toast>
    );
  }
}
  
