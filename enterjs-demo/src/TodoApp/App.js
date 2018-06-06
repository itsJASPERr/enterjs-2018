import { Button, TextInput } from '../components'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, Route } from '../Routing'
import React, { Component } from 'react'

import { Modal } from '../components/Modal'

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
    add: '',
    menu: false
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
    const { height, width } = Dimensions.get('window')
    const { menu } = this.state
    const { withMenu } = this.props
    return (
      <View style={styles.app}>
        
        {width > 320 && width < 399 && menu && withMenu &&
          <View style={{ position: 'absolute', width: '80%', height: '100%', zIndex: 99, backgroundColor: 'white', paddingTop: 44 }}>
            <Text>hi</Text>
            <Button title='close' onPress={() => this.setState(prev => ({ menu: !prev.menu }))} />
          </View>
        }
        {width >= 399 && withMenu &&
          <View style={{ position: 'relative', width: 200, height: '100%', zIndex: 99, backgroundColor: 'white', paddingTop: 44 }}>
            <Text>hi</Text>
          </View>
        }

        <View style={styles.cont}>
          <View style={styles.appHeader}>
            <Text style={styles.appTitle}>Welcome to TodoApp ⚛️</Text>
            {width > 320 && width < 399 && withMenu &&
              <Button title='open menu' onPress={() => this.setState(prev => ({ menu: !prev.menu }))} />
            }
          </View>

          <View style={styles.appContent}>
            <View style={{flex:4}}>
              <FlatList data={this.state.todos} extraData={{
                ...this.state.todos,
                ...this.state.status
              }} renderItem={({item}) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.toggle(item.key)}>
                    <Text style={ [this.state.status[item.key] ? styles.doneItem : '', styles.listItem] }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <Link to={item.key} component={TouchableOpacity}>
                    <Text>Details</Text>
                  </Link>
                </View>
              )}/>
            </View>
            <View style={{flex:1}}>
              <TextInput label='Add Todo' value={this.state.add} placeholder='+ Add Todo' onChangeText={this.onChangeAdd} style={styles.input} />
              <Button disabled={this.state.add === ''} title='ok' onPress={this.addTodo} />
            </View>
          </View>

          <Route path='/:id' render={({history}) => (
            <Modal visible fullScreen animationType='slide' onRequestClose={() => history.goBack()}>
              <View style={{ paddingTop: 44 }}>
                <TouchableOpacity onPress={() => history.goBack()}>
                  <Text>back</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row'
  },
  cont: {
    flex: 1,
    flexDirection: 'column'
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
  appContent: {
    flex: 2,
  },
  doneItem: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.5
  },
  listItem: {
    height: 44,
    justifyContent: 'center',
    padding: 8,
    fontSize: 18
  },
  input: {
    margin: 8,
  }
})
