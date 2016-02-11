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
                <header>
                    <div className="content">
                        <h1>{ config.app_title }</h1>
                        <h2>良い仕事をするためにやる気保ちます！</h2>
                    </div>
                </header>
                <div className="content">
                    <TodoTextInput onSubmit={(text) => this.props.dispatch({type: 'ADD_TODO', text: text})} />
                    <div className="todo-list">
                        { todos }
                    </div>
                </div>
                <footer>
                    <div className="content">
                        <p>Made without <i className="fa fa-heart"></i> by <a href="http://keithy.me">Keith Yong</a> ©2016</p>
                        <p>
                            <a className="icon-link" href="https://github.com/keithyong/todo-list"><i className="fa fa-github fa-2x"></i></a>
                            <a className="icon-link" href="https://twitter.com/keithyong12"><i className="fa fa-twitter fa-2x"></i></a>
                            <a className="icon-link" href="mailto:terda12@gmail.com"><i className="fa fa-envelope-o fa-2x"></i></a>
                        </p>
                    </div>
                </footer>
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
