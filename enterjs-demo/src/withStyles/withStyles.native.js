import React from 'react'
import { StyleSheet } from 'react-native'

export default function withStyles (styles) {
  return StyledComponent => class extends React.Component {
    render () {
      return (
        <StyledComponent
          // this results in a 'classes' instead of 'style' approach for styles for native
          classes={StyleSheet.create(styles)}
          {...this.props}
        />
      )
    }
  }
}
