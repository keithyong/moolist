import React from 'react'

class TodoTextInput extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            text: this.props.text || ''
        }
    }

    handleInputEnter(e) {
        const text = this.textInput.value.trim()
        if (e.which === 13) {
            this.textInput.value = ''
            this.props.onSubmit(text)
        }
    }

    handleButtonClick(e) {
        this.props.onSubmit(this.textInput.value.trim())
        this.textInput.value = ''
    }

    render() {
        return (
            <div>
                <input
                    ref={(ref) => this.textInput = ref}
                    onKeyDown={this.handleInputEnter.bind(this)}
                />
                <button onClick={this.handleButtonClick.bind(this)}>Add Todo</button>
            </div>
        )
    }
}

export default TodoTextInput
