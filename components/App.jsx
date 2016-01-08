import React from 'react';
import Todo from './Todo.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Todo List App</h1>
                { this.props.todos.map( todo => <Todo key={todo.id} completed={todo.completed} text={todo.todo}/> ) }
            </div>
        );
    }
}

export default App;
