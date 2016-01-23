export default function todosReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            fetch('./todo/' + action.text, {method: 'post'})
            
            // Get the maximum ID from the list of todo's
            const todoWithMaxId = state.reduce((max, todo) => { 
                return todo.id > max.id ? todo : max 
            })

            return [
                {
                    id: todoWithMaxId.id + 1,
                    completed: false,
                    text: action.text
                },
                ...state
            ]
        case 'TOGGLE_TODO':
            fetch('./check/' + action.id, {method: 'post'})
            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.completed = !todo.completed
                    return todo
                }

                return todo
            })
        default:
            return state
    }
}
