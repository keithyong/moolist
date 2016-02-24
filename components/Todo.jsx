import React from 'react'
import EditInput from './EditInput.jsx'

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

    handleSave(newValue) {
        this.setState({ isEditing: false })
        console.log(newValue)
        this.props.onUpdate(this.props.id, newValue)
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
                return <EditInput
                            defaultValue={this.props.text}
                            onSave={this.handleSave.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                       />
            }
        })()

        return (
            <div className={ "todo " + (this.props.completed ? "completed" : "incomplete") + (this.state.isEditing ? " isEditing" : "") }>
                { textComponent }
                <span className="todo-buttons">
                    <a
                        className="edit-button"
                        onClick={this.handleEditButtonPress.bind(this)}
                    >
                        <i className="fa fa-pencil"></i>
                    </a>
                    <a
                        className="delete-button"
                        onClick={this.handleDelete.bind(this)}
                    >
                        <i className="fa fa-times"></i>
                    </a>
                </span>
            </div>
        )
    }
}

export default Todo
