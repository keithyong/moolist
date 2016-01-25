import request from 'superagent'

export default function todosReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            request
                .post('/todo')
                .send(action.text)
                .set('Content-Type', 'text/plain')
                .end((err, res) => {
                    if (err) console.log(err)
                    else console.log(res)
                });
            
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
            request
                .post('/check/' + action.id)
                .end((err, res) => {
                    if (err) console.log(err)
                    else console.log(res)
                });

            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.completed = !todo.completed
                    return todo
                }

                return todo
            }).sort((a, b) => {
                // Sort by completed
                const greater = a.completed - b.completed
                if (greater) return greater

                // If there is a tie, sort by ID
                return b.id - a.id
            })
        default:
            return state
    }
}
