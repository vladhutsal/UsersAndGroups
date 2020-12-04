import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import '../index.css';


export default class PopUp extends React.Component {
  
  render() {
    const action = this.props.data.action;
    const message = this.props.data.message;
    return (
      <Toast
        ref={this.props.popUpRef}
        autohide={true}
        delay={3000}
        show={this.props.show}
        className='PopUp'
        onClose={this.props.tooglePopup}
      >
        <ToastHeader closeButton={false}>
          <strong className="mr-auto">{action}</strong>
        </ToastHeader>
        <ToastBody>{message}</ToastBody>
      </Toast>
    )
  }
}
  
