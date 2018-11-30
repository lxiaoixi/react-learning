import React, { Component } from 'react';
import './assets/css/App.css';
import 'antd/dist/antd.css'
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE } from './constants';
import Search from './components/Search'
import Table from './components/Table'
import { Spin } from 'antd';

class App extends Component{
	
	constructor(props){
		super(props);

		this.state = {    //组件内部自己的属性
			list:[],
			welcome:'Welcome to the Road to learn React',
			user:{
				firstName:'liu',
				lastName:'xiaoxi'
			},
			searchTerm:'',
			page:0,
			error:null,
			isLoading:false,
			sortOptions :[
				{value:'title',label:'标题'},
				{value:'author',label:'作者'},
				{value:'num_comments',label:'评论'},
				{value:'points',label:'评分'}
			],
			sortKey:'NONE'
		}

		this.onDelete = this.onDelete.bind(this); //绑定this
		this.onSearchChange = this.onSearchChange.bind(this); 
		this.isSearched = this.isSearched.bind(this); 
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this); 
		this.setSearchTopStories = this.setSearchTopStories.bind(this); 
		this.onSort = this.onSort.bind(this);
	}

	componentDidMount(){
		this.fetchSearchTopStories(this.state.searchTerm);
	}

	fetchSearchTopStories({searchTerm = this.state.searchTerm,page = 0} = {}){
		page = page < 0 ? 0 : page;
		this.setState({ isLoading: true });
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then(response => response.json())
			.then(result=>this.setSearchTopStories(result,page))
			.catch(e=>this.setState({error:e}))
	}

	setSearchTopStories(result,page){
		this.setState({ list:result.hits, page, isLoading: false})
	}

	onDelete(id){
		const updateList = this.state.list.filter(val=>{
			return val.objectID !== id;
		})

		this.setState({
			list:[...updateList]
		})
	}

	onSearchChange(event){
		this.setState({ searchTerm:event.target.value })
		this.fetchSearchTopStories({searchTerm:event.target.value})
	}

	isSearched(){
		return (item)=>{
			return item;
		}
	}

	onSort(sortKey){
		this.setState({ sortKey });
  }

	render(){   

		const { user, list, searchTerm, page, error, isLoading, sortOptions, sortKey } = this.state;

		if (error) {
			return <p>Something went wrong.</p>;
		}

		return(
			<div className='page'>
				<h1>{user.firstName+user.lastName+' 初识react'}</h1>

				<div className="interactions">
					<Search 
						onChange={this.onSearchChange}
						value={searchTerm}
						sortOptions={sortOptions}
						onSort={this.onSort}
					>
					Search
					</Search>
				</div>

				{ isLoading ? 
					<div style={{textAlign:'center',marginTop:'100px'}}><Spin size='large'/></div>:
					<Table 
						list={list}
						onDelete={this.onDelete}
						isSearched={this.isSearched}
						page={page}
						pageSearch={this.fetchSearchTopStories}
						sortKey={sortKey}
					/>
				}
			</div>
		)
	}
}

export default App;
