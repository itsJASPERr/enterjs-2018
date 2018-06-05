import App from './TodoApp'
import React from 'react'
import { Router } from './Routing'

export default class WebApp extends React.Component {
  render () {
    return (
      <Router>
        <App />
      </Router>
    )
  }
}
