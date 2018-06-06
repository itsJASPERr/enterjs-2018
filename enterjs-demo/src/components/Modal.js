import { Dialog, Slide } from '@material-ui/core'

import React from 'react'

const Transition = (props) => (<Slide direction='up' {...props} />)

export class Modal extends React.Component {
  render () {
    const {
      visible,
      fullScreen,
      onRequestClose,
      children
    } = this.props
    return (
      <Dialog TransitionComponent={Transition} fullScreen={fullScreen} open={visible} onClose={onRequestClose}>
      { React.Children.map(children, child => child) }
      </Dialog>
    )
  }
}
