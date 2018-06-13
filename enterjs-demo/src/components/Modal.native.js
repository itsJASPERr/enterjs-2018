import { Modal as ModalNative, SafeAreaView } from 'react-native'

import React from 'react'

export class Modal extends React.Component {
  render () {
    const {
      children,
      ...props
    } = this.props
    return (
      <ModalNative {...props}>
        <SafeAreaView>
          {React.Children.map(children, child => child)}
        </SafeAreaView>
      </ModalNative>
    )
  }
}
