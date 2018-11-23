import React, { Component } from 'react';
import './assets/css/App.css';
import Search from './components/Search'
import Table from './components/Table'


const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class App extends Component{
    
    constructor(props){
        super(props);

        this.state = {    //组件内部自己的属性
            list,
            welcome:'Welcome to the Road to learn React',
            user:{
                firstName:'liu',
                lastName:'xiaoxi'
            },
            searchTerm:''
        }

        this.onDelete = this.onDelete.bind(this); //绑定this
        this.onSearchChange = this.onSearchChange.bind(this); 
        this.isSearched = this.isSearched.bind(this); 
        
    }

    onDelete(id){
        const updateList = this.state.list.filter(val=>{
            return val.objectID !== id;
        })

        this.setState({
            list:updateList
        })
    }

    onSearchChange(event){
        this.setState({
            searchTerm:event.target.value
        })
    }

    isSearched(){
        return (item)=>{
            return item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
        }
    }

    render(){   
        const { welcome, user, list, searchTerm } = this.state;
        return(
            <div className='page'>
                <div className="interactions">
                    <Search 
                        onChange={this.onSearchChange}
                        value={searchTerm}
                    >
                    Search
                    </Search>
                </div>
                <Table 
                    list={list}
                    onDelete={this.onDelete}
                    isSearched={this.isSearched}
                />
               
            </div>
        )
    }
}

export default App;
