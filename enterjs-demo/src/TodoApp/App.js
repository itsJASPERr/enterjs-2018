import { Button, TextInput } from '../components'
import { Dimensions, FlatList, Button as NativeButton, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, Route } from '../Routing'
import React, { Component } from 'react'

import { AddTodoContent as AddTodoComposition } from '../compositions/AddTodoContent'
import { Modal } from '../components/Modal'
import { AddTodo as WrappedAddTodoComposition } from '../compositions/AddTodo'

const todos = [
  { key: '1', name: 'Write Platform Agnostic Code' },
  { key: '2', name: 'Clean Kitchen' },
  { key: '3', name: 'Eat Pizza' }
]
export default class App extends Component {
  state = {
    width: 0,
    status: {
      1: false,
      2: false,
      3: false
    },
    todos: todos,
    menu: false
  }
  _sizeUpdate = ({ window }) => {
    this.setState({
      height: window.height,
      width: window.width
    })
  }
  componentWillMount = () => {
    this._sizeUpdate({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', this._sizeUpdate)
  }
  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this._sizeUpdate) 
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
  addTodo = (todo) => {
    this.setState(prev => {
      const k = prev.todos.length + 1
      return {
      status: {
        ...prev.status,
        [k]: false
      },
      todos: [
        ...prev.todos,
        { key: k + '', name: todo }
      ]
    }})
  }
  render() {
    const { menu } = this.state
    const { withMenu } = this.props
    const { width } = this.state
    return (
      <View style={styles.app}>
        {width > 320 && width < 399 && menu && withMenu &&
          <View style={{ position: 'absolute', width: '80%', height: '100%', zIndex: 99, backgroundColor: 'white', paddingTop: 44 }}>
            <Text>Menu</Text>
            <Button title='close' onPress={() => this.setState(prev => ({ menu: !prev.menu }))} />
          </View>
        }
        {width >= 399 && withMenu &&
          <View style={{ position: 'absolute', width: 200, height: '100%', zIndex: 99, backgroundColor: 'white', paddingTop: 44 }}>
            <Text>Menu</Text>
          </View>
        }

        <View style={[styles.cont, {
          marginLeft: Platform.OS === 'web' && width >= 399 && withMenu ? 200 : 0
        }]}>
          <View style={styles.appHeader}>
            <Text style={styles.appTitle}>Welcome to TodoApp ⚛️</Text>
            {width < 399 && withMenu &&
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
            <WrappedAddTodoComposition InputStyle={styles.addTodoInput} ButtonWrapperStyle={styles.addTodoButtonWrapper} ButtonStyle={styles.addTodoButton} style={styles.addTodo} onSubmit={this.addTodo} />
          </View>

          <Route path='/:id' render={({history}) => (
            <Modal visible fullScreen animationType='slide' onRequestClose={() => history.goBack()}>
              <View>
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
  addTodoButtonWrapper: {
    paddingTop: 16,
    paddingBottom: 16
  },
  addTodoButton: {
    fontSize: 24
  },
  addTodo: {
    flex:1
  },
  app: {
    flex: 1,
    flexDirection: 'row',
    height: '100%'
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
