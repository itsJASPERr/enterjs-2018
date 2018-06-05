import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { Link } from '../Routing'

const todos = [
  { key: '1', name: 'Write Platform Agnostic Code' },
  { key: '2', name: 'Clean Kitchen' },
  { key: '3', name: 'Eat Pizza' }
]
export default class App extends Component {
  state = {
    status: {
      1: false,
      2: false,
      3: false
    },
    todos: todos,
    add: ''
  }
  isDone = (key) => (this.state[key])
  toggle = (key) => {
    this.setState(prev => ({
      status: {
        ...prev.status,
        [key]: !prev.status[key]
      }
      }))
  }
  onChangeAdd = (v) => {
    this.setState({ add: v })
  }
  addTodo = () => {
    this.setState(prev => {
      const k = prev.todos.length + 1
      return {
      status: {
        ...prev.status,
        [k]: false
      },
      todos: [
        ...prev.todos,
        { key: k + '', name: this.state.add }
      ],
      add: ''
    }})
  }
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Welcome to TodoApp ⚛️</Text>
        </View>
        <View>
          <FlatList data={this.state.todos} extraData={{
            ...this.state.todos,
            ...this.state.status
          }} renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.toggle(item.key)}>
              <View>
                <Text style={ this.state.status[item.key] ? styles.doneItem : '' }>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}/>
        </View>
        <View style={styles.appIntro}>
          <TextInput value={this.state.add} placeholder='Add Todo' onChangeText={this.onChangeAdd} />
          <Button disabled={this.state.add === ''} title='ok' onPress={this.addTodo} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2
  },
  doneItem: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.5
  }
})
