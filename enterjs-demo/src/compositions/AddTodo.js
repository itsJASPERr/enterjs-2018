import { AddTodoContent } from './AddTodoContent'
import { Paper } from '@material-ui/core'
import React from 'react'

export class AddTodo extends React.Component {
  render () {
    const {
      ...props
    } = this.props
    return (
      <Paper>
        <AddTodoContent {...props} />
      </Paper>
    )
  }
}
