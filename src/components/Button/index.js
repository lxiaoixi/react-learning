import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onClick = '', className = '', children , disabled = false } = this.props;
        return (
            <button onClick={onClick} className={className} disabled={disabled}>
                {children}
            </button>
        )
    }

}

export default Button;