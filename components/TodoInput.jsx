import React from 'react';

class TodoTextInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        }
    }

    handleSubmit(e) {
        const text = e.target.value.trim()
        if (e.which === 13) {
            this.props.onSubmit(text);
        }
    }

    render() {
        return (
            <input
                onKeyDown={this.handleSubmit.bind(this)}
        )
    }
}
