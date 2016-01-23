export default function todosReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            fetch('./todo/' + action.text, {
                method: 'post'
            }).then((res) => {
            });
            return [
                {
                    id: 24,
                    completed: false,
                    text: action.text
                },
                ...state
            ]
        case 'TOGGLE_TODO':
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
