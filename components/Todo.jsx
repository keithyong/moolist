import React from 'react'

class Todo extends React.Component {
    handleToggle() {
        this.props.onToggle(this.props.id)
    }

    handleUpdate() {
        this.props.onUpdate(this.props.id, 'FILLER TEXT')
    }

    handleDelete() {
        this.props.onDelete(this.props.id)
    }

    render() {
        return (
            <div className={ "todo " + (this.props.completed ? "completed" : "incomplete") }>
                <a
                    key={this.props.id}
                    onClick={this.handleToggle.bind(this)}
                    className="todo-text"
                >
                    {this.props.text}
                </a>
                <span className="todo-buttons">
                    <a
                        onClick={this.handleUpdate.bind(this)}
                    >
                        <i className="fa fa-pencil-square-o"></i>
                    </a>
                    <a
                        onClick={this.handleDelete.bind(this)}
                    >
                        <i className="fa fa-trash-o"></i>
                    </a>
                </span>
            </div>
        )
    }
}

export default Todo
