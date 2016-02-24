import React from 'react'

class EditInput extends React.Component {

    componentDidMount() {
        this.editInput.focus()
        
        // After focusing, move the cursor all the way to the end of the text.
        const len = this.editInput.value.length
        this.editInput.setSelectionRange(len, len)
    }

    handleSave() {
        this.props.onSave(this.editInput.value.trim())
    }

    handleCancel() {
        this.props.onCancel()
    }

    handleInputEnter(e) {
        if (this.editInput.value === '') {
            return;
        }

        if (e.which === 13) {
            this.props.onSave(this.editInput.value.trim())
        }
    }

    render() {
        return (
            <span>
                <label className="edit-label">EDIT</label>
                <input
                    ref={(ref) => this.editInput = ref}
                    defaultValue={this.props.defaultValue}
                    className="todo-edit-field"
                    onKeyDown={this.handleInputEnter.bind(this)}
                ></input>
                <button
                    onClick={this.handleSave.bind(this)}
                >
                    Save
                </button>
                <button
                    onClick={this.handleCancel.bind(this)}
                >
                    Cancel
                </button>
            </span>
        )
    }
}

export default EditInput
