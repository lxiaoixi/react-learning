import React, { Component } from 'react'
import Button from '../Button'
import { sortBy } from 'lodash';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey:'NONE'
        }

        this.sortBySortKey = this.sortBySortKey.bind(this); 
    }

    sortBySortKey(list,sortKey){
        return sortBy(list, sortKey);
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

        const { list, onDelete, isSearched, page, pageSearch, sortKey } = this.props;
        
        let sortList = list;

        if(sortKey !== 'NONE'){
            sortList = this.sortBySortKey(list,sortKey);
        }

        return (
            <div>
                <div  className="table">
                    {sortList.filter(isSearched()).map((item)=>{
                        return (
                            <div key={item.objectID}  className="table-row">
                                <span style={largeColumn}><a href={item.url}>{item.title}</a></span>
                                <span style={midColumn}>{item.author}</span>
                                <span style={smallColumn}>{item.num_comments}</span>
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
                <div className="interactions">
                    <Button onClick={() => pageSearch({page:page - 1})} disabled={ page > 0 ? false:true}>
                        Last
                    </Button>
                    <Button onClick={() => pageSearch({page:page + 1})}>
                        Next
                    </Button>
                </div>
            </div>
        )
    }
}

export default Table;