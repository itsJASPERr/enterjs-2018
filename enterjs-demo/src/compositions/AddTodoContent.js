import { Button, TextInput } from '../components'

import React from 'react'
import { View } from 'react-native'

export class AddTodoContent extends React.Component {
  state = {
    value: ''
  }
  _change = (value) => {
    this.setState({ value })
  }
  _submit = () => {
    this.props.onSubmit(this.state.value)
    this.setState({ value: '' })
  }
  
  render () {
    const {
      onChange,
      style,
      InputStyle,
      ButtonWrapperStyle
    } = this.props
    const {
      value
    } = this.state
    return (
      <View style={[ { flex: 1, padding: 8 }, style ]}>
        <TextInput value={value} label='Add Todo' placeholder='+ Add Todo' onChangeText={this._change} style={InputStyle} />
        <View style={ButtonWrapperStyle}>
          <Button disabled={value === ''} title='ok' onPress={this._submit} />
        </View>
      </View>
    )
  }
}
