import React from 'react';
import Todo from './Todo.jsx';
import { createStore } from 'redux';

const initialState = [
    {
        text: 'Hi',
        completed: false,
        id: 0
    }
]

function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                {
                    id: 24,
                    completed: false,
                    text: action.text
                },
                ...state
            ]
        case 'COMPLETE_TODO':
            return state;
        default:
            return state;
    }
}

let todosStore = createStore(todosReducer);

todosStore.dispatch({type: 'ADD_TODO', text: 'test todo'});

class App extends React.Component {
    render() {
        let todos =  todosStore.getState().map(todo => <Todo key={todo.id} completed={todo.completed} text={todo.text}/>);
        return (
            <div>
                <h1>Todo List App</h1>
                { todos }
            </div>
        );
    }

}

export default App;
