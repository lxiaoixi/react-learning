import React, { Component } from 'react';
// import {Button} from 'antd';
import Button from '../Button'

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const largeColumn = {
            width:'40%'
        }
        const midColumn = {
            width:'30%'
        }
        const smallColumn = {
            width:'10%'
        }

        const { list, onDelete, isSearched } = this.props;
        
        return (
            <div  className="table">
                {list.filter(isSearched()).map((item)=>{
                    return (
                        <div key={item.objectID}  className="table-row">
                            <span style={largeColumn}><a href={item.url}>{item.title}</a></span>
                            <span style={midColumn}>{item.author}</span>
                            <span style={smallColumn}>{item.points}</span>
                            <span style={smallColumn}>{item.points}</span>
                            <span style={smallColumn}> 
                                <Button type="primary" 
                                    onClick={()=>{onDelete(item.objectID)}}
                                    className="button-inline"
                                >
                                    删除
                                </Button>
                            </span>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Table;