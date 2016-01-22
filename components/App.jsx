import React from 'react'
import Todo from './Todo.jsx'
import TodoTextInput from './TodoTextInput.jsx'
import { createStore } from 'redux'
import { connect } from 'react-redux'
import config from '../config'

class App extends React.Component {
    render() {
        let todos = this.props.todos.map(todo => <Todo key={todo.id} completed={todo.completed} text={todo.text}/>)
        return (
            <div>
                <h1>{ config.app_title }</h1>
                <img src="/images/vapor.gif" id="vapor"></img>
                <TodoTextInput onSubmit={(text) => console.log(text)} />
                { todos }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
