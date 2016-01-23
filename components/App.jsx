import React from 'react'
import Todo from './Todo.jsx'
import TodoTextInput from './TodoTextInput.jsx'
import { createStore } from 'redux'
import { connect } from 'react-redux'
import config from '../config'

class App extends React.Component {
    render() {
        let todos = this.props.todos.map(
                todo =>
                    <Todo 
                        key={todo.id}
                        id={todo.id}
                        completed={todo.completed}
                        text={todo.text}
                        onToggle={(id) => {
                                this.props.dispatch({type:'TOGGLE_TODO', id: id})
                            }
                        }
                    />
        )

        return (
            <div>
                <h1>{ config.app_title }</h1>
                <h2>良い仕事をするためにやる気保ちます！</h2>
                <div className="gallery">
                    <img src="/images/vapor.gif" id="vapor"></img>
                </div>
                <TodoTextInput onSubmit={(text) => this.props.dispatch({type: 'ADD_TODO', text: text})} />
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
