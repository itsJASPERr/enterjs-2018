import { Button as MuiButton } from '@material-ui/core'
import { Button as NB } from 'react-native'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

export class Button extends React.Component {
  render () {
    const {
      onPress,
      title,
      style,
      ...rest
    } = this.props
    return (
      <MuiButton className={style} {...rest} color='primary' variant='raised' onClick={onPress}>{title}</MuiButton>
    )
  }
}
