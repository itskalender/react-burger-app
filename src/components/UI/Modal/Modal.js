import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('[Modal]: shouldComponentUpdate ');
    return (
      nextProps.isPurchasing !== this.props.isPurchasing ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop
          clicked={this.props.clicked}
          isPurchasing={this.props.isPurchasing}
        />
        <div
          className={
            this.props.isPurchasing
              ? classes.ModalDisplayed
              : classes.ModalHidden
          }
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
