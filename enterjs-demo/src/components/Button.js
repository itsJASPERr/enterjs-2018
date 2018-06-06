import { Button as MuiButton } from '@material-ui/core'
import React from 'react'

export class Button extends React.Component {
  render () {
    const {
      onPress,
      title,
      ...rest
    } = this.props
    return (
      <MuiButton {...rest} color='primary' variant='raised' onClick={onPress}>{title}</MuiButton>
    )
  }
}