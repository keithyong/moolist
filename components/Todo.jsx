import React from 'react'

class Todo extends React.Component {
    render() {
        return (
            <li
                key={this.props.key}
                className={ "todo " + (this.props.completed ? "completed" : "incomplete") } >
                {this.props.text}
            </li>
        )
    }
}

export default Todo
