import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, value, children} = this.props;
        
        return (
            <form>
                {children}: <input type="text" onChange={onChange} value={value}/>
            </form>
        )
    }
}

export default Search;