import React from 'react'

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isEditing: false }
    }

    handleToggle() {
        this.props.onToggle(this.props.id)
    }

    handleEditButtonPress() {
        this.setState({ isEditing: !this.state.isEditing })
    }

    handleUpdate() {
        this.setState({ isEditing: false })
        this.props.onUpdate(this.props.id, this.textInput.value)
    }

    handleCancel() {
        this.setState({ isEditing: false })
    }

    handleDelete() {
        this.props.onDelete(this.props.id)
    }

    render() {
        const textComponent = (() => {
            if (this.state.isEditing === false) {
               return (<a
                        key={this.props.id}
                        onClick={this.handleToggle.bind(this)}
                        className="todo-text"
                    >
                        {this.props.text}
                    </a>)
            } else {
                return (<span>
                            <input 
                                ref={(ref) => this.textInput = ref}
                                defaultValue={this.props.text} 
                                className="todo-edit-field"
                            ></input>
                            <button
                                onClick={this.handleUpdate.bind(this)}
                            >
                                Save
                            </button>
                            <button
                                onClick={this.handleCancel.bind(this)}
                            >
                                Cancel
                            </button>
                        </span>)
            }
        })()

        return (
            <div className={ "todo " + (this.props.completed ? "completed" : "incomplete") }>
                { textComponent }
                <span className="todo-buttons">
                    <a
                        onClick={this.handleEditButtonPress.bind(this)}
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
