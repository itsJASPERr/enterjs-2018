import { AddTodoContent } from './AddTodoContent'
import React from 'react'
import { View } from 'react-native'

export class AddTodo extends React.Component {
  render () {
    const {
      ...props
    } = this.props
    return (
      <AddTodoContent {...props} />
    )
  }
}
