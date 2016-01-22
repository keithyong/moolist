export default function todosReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            fetch('./todo/' + action.text, {
                method: 'post'
            }).then((res) => {
                console.log(res)
            });
            return [
                {
                    id: 24,
                    completed: false,
                    text: action.text
                },
                ...state
            ]
        case 'COMPLETE_TODO':
            return state
        default:
            return state
    }
}
