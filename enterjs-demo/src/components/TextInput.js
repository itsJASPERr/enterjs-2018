import React from 'react'
import { TextField } from '@material-ui/core'
import { View } from 'react-native'

export class TextInput extends React.Component {
  onChange = (e) => {
    this.props.onChangeText(e.target.value)
  }
  render () {
    const {
      onChangeText,
      style,
      ...rest
    } = this.props
    return (
      <View style={style}>
        <TextField onChange={this.onChange} {...rest} />
      </View>
    )
  }
}