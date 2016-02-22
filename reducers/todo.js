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
            const todoWithMaxId = state.todos.reduce((max, todo) => { 
                return todo.id > max.id ? todo : max 
            })

            return Object.assign({}, state, {
                todos: [
                    {
                        id: todoWithMaxId.id + 1,
                        completed: false,
                        text: action.text
                    },
                ...state.todos
                ]
            })
        case 'TOGGLE_TODO':
            request
                .post('/check/' + action.id)
                .end((err, res) => {
                    if (err) console.log(err)
                    else console.log(res)
                })

            return Object.assign({},
                state,
                {
                    finishedCount: state.finishedCount + 1,
                    todos: state.todos.map((todo) => {
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
                }
            )

        case 'UPDATE_TODO':
            request
                .post('/updatetodo')
                .send({
                    id: action.id,
                    text: action.text
                })
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) console.log(err)
                    else console.log(res)
                })
            
             return Object.assign({}, state,
                state.map((todo) => {
                    if (todo.id === action.id) {
                        todo.text = action.text
                        return todo
                    }
                    
                    return todo
                })
            )
        default:
            return state
    }
}
