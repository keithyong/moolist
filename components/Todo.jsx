import React from 'react'

class Todo extends React.Component {
    handleToggle() {
        this.props.onToggle(this.props.id)
    }

    render() {
        return (
            <div className="todo-wrapper">
                <a
                key={this.props.id}
                onClick={this.handleToggle.bind(this)}
                className={ "todo " + (this.props.completed ? "completed" : "incomplete") } >
                {this.props.text}
                </a>
                <a>
                    <i className="fa fa-pencil-square-o-2x"></i>
                </a>
            </div>
        )
    }
}

export default Todo
