# React 学习(the Road to React)

## npm 依赖

* npm install react react-dom

## vscode 配置

在settings.json文件中添加,默认所有的js文件都使用react

```
    "files.associations": {"*.js":"javascriptreact"}
```

## 利用Facebook脚手架create-react-app搭建项目
* npm install -g create-react-app
* create-react-app --version
* create-react-app projectName

## 项目文件结构

* public 项目构建出的产品文件。最终所有你写在 src/ 文件夹里面的代码都会在项目构建的时候被打包放在 public 文件夹下。
* src 项目的源码文件
* src/index.js react 应用程序的入口文件
* src/App.js 实现 React 组件的文件,类似于Vue中的App.vue文件。

## 脚本启动

```
    
    npm start // 在 http://localhost:3000 启动应用
    
    npm test // 运行所有测试
    
    npm run build // 构建项目的产品文件
```

##  笔记

* props 父组件的属性和方法，子组件可以通过this.props来获取
	state 组件内部自己的属性，通过this.state声明和获取，通过this.setState() 方法修改
	每次你修改组件的内部状态state和props时，组件的 render 方法会再次运行。只要state和props一修改，就会执行render方法再次渲染。

	```
	class App extends Component{

		constructor(props){
			super(props);       
			this.state = {      //声明组件内部属性
				Myname:'xiaoxi'
			}
		}

		changeName()=>{
			this.setState({
				Myname:'xing'
			})

		}

		render(){
			return (
				<span>{this.props.parentName}</span>
				<span>{this.state.myName}</span>
				<Button onClick={this.changeName}>修改名字</Button>
			)
		}
	}

    ```

* React 自定义的方法需要传递参数到类的方法中时，你需要将它封装到另一个（箭头）函数中。

    ```    
    class App extends Component {
    
    	onDelete = (id)=>{
    
    	}
    	render() {
    		return (
    		<div className="App">
    			<button
    				onClick={() => this.onDelete(item.objectID)}  //onDelete() 方法被另外一个函数包裹在
    ‘ onClick ‘ 事件处理器中,它是一个箭头函数。这样你可以拿到 item 对象中的 objectID 
    				type="button"
    				>
    				删除
    			</button>
    		</div>
    }
    ```    

> 当使用 onClick={this.onDelete()} 时， onDelete() 函数会在浏览器打开程序时立即执行，
由于监听表达式是函数执行的返回值而不再是函数，所以点击按钮时不会有任何事发生。
但当使用 onClick={this.onDelete} 时，因为 onDelete 是一个函数，所以它会在点击按钮
时执行。然而，使用 onClick={this.onDelete} 并不够，因为这个类方法需要接收 item.objectID 属
性来识别那个将要被忽略的项，这就是为什么它需要被封装到另一个函数中来传递这个属性。



* connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options]) 连接react组件与redux store<br>

> 参数说明：<br>
mapStateToProps(state, ownProps) : stateProps  这个函数允许我们将 store 中的state数据作为 props 绑定到组件上。<br>
connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到组件上，也会成为 MyComp 的 props。

* 父组件调用子组件方法及子组件调用父组件方法

	```
	class Parent extends Component {
			
		  constructor(props) {
		  
			super(props);
			this.child = null;
			this.state = {ListResult: {}, loading: false,visibleDetails:false,isPlay:false};
			this._handleSubmit = this._handleSubmit.bind(this)
			this.cacheSearch = this.cacheSearch.bind(this)
			this._clear = this._clear.bind(this)
			this.exportExcel = this.exportExcel.bind(this)
		  }
		  
		  // 获取子组件this，将子组件this赋值给父组件的this.child,以后调用子组件属性和方法都通过this.child获取
		  
		  onRef = (ref) => {
			this.child = ref
			console.log(this.child)
		  }
		
		  
		  clickEmitChild() = >{
			
			// 父组件调用子组件的alertName方法,通过this.child
			
			this.child.alertName(params);
			
		  }
		  
		  closeRecord()=>{
		  
			console.log(' this is parent');
		  
		  }
		

		render() {
			 return (
			 
				<Child onRef={this.onRef} musicTitle={musicTitle} musicSrc={musicSrc} closeRecord={this.closeRecord}/>
				
				<button onClick={this.clickEmitChild} >click</button>
			 
			 )
		
		}

	}
	
	
	class Child extends Component {
			
		  constructor(props) {
		  
			super(props);   // 通过props获取父组件传给子组件的值和方法
			
			//设置子组件的state
			this.state = {ListResult: {}, loading: false,visibleDetails:false,isPlay:false};
			
		  }
		  
	      // 组件加载时
		  componentDidMount() {
		
			//必须在这里声明，所以 ref 回调可以引用它
			this.props.onRef(this)
		
		  }
		  
		  alertName(params)=>{
		  
			console.log('this is child method');
		  }
		  
		  
		  clickEmitParent() = >{
			
			//触发父组件的方法
			
			this.props.closeRecord();
			
		  }
		  
		

		render() {
		
			const { musicSrc, musicTitle } = this.props;   //通过this.props获取父组件传给子组件的值

			 return (
			 
				<a href={musicSrc}>{musicTitle}</a>
				
				<button onClick={this.clickEmitParent} >click</button>
			 
			 )
		
		}

	}
	```
	
* 组件类型

> 函数式无状态组件: <br>                         &ensp;&ensp;&ensp;&ensp;这类组件就是函数，它们接收一个输入并返回一个输出。输入是
props，输出就是一个普通的 JSX 组件实例。到这里，它和 ES6 类组件非常的相似。然
而，函数式无状态组件是函数（函数式的） ，并且它们没有本地状态（无状态的） 。你
不能通过 this.state 或者 this.setState() 来访问或者更新状态，因为这里没有 this
对象。此外，它也没有生命周期方法。虽然你还没有学过生命周期方法，但是你已
经用到了其中两个： constructor() and render() 。constructor 在一个组件的生命周期
中只执行一次，而 render() 方法会在最开始执行一次，并且每次组件更新时都会执
行。当你阅读到后面关于生命周期方法的章节时，要记得函数式无状态组件是没有
生命周期方法的。<br>

> ES6 类组件:<br>  &ensp;&ensp;&ensp;&ensp;在你的四个组件中，你已经使用过这类组件了。在类的定义中，它们继
承自 React 组件。 extend 会注册所有的生命周期方法， 只要在 React component API 中，
都可以在你的组件中使用。通过这种方式你可以使用 render() 类方法。此外，通过
使用 this.state 和 this.setState() ，你可以在 ES6 类组件中储存和操控 state。
	
* 生命周期

    组件挂载时，有四个生命周期方法，它们的调用顺序如下：

    	• constructor(props)    它在组件初始化时被调用。在这个方法中，你可以设置初始化状态以及绑定类方法。
    	• componentWillMount()  在 render() 方法之前被调用。这就是为什么它可以用作去设置组件内部的状态，因为它不会触发组件的再次渲染。
    	• render()   这个生命周期方法是必须有的，它返回作为组件输出的元素。这个方法应该是一个纯函数，因此不应该在这个方法中修改组件的状态。它把属性和状态作为输入并且返回（需要渲染的）元素
    	• componentDidMount()   它仅在组件挂载后执行一次。这是发起异步请求去 API 获取数据的绝佳时期。获取到的数据将被保存在内部组件的状态中然后在 render() 生命周期方法中展示出来。

    组件更新时，组件内部状态(state)或者属性(props)改变时更新组件时，有5个生命周期方法，它们的调用顺序如下：
    
    	• componentWillReceiveProps(nextProps)   这个方法在一个更新生命周 （updatelifecycle）中被调用。新的属性会作为它的输入。因此你可以利用 this.props 来对比之后的属性和之前的属性，基于对比的结果去实现不同的行为。此外，你可以基于新的属性来设置组件的状态。
    	• shouldComponentUpdate(nextProps, nextState)    每次组件因为状态或者属性更改而更新时，它都会被调用。你将在成熟的 React 应用中使用它来进行性能优化。在一个更新生命周期中，组件及其子组件将根据该方法返回的布尔值来决定是否重新渲染。这样你可以阻止组件的渲染生命周期（render lifecycle）方法，避免不必要的渲染。
    	• componentWillUpdate(nextProps, nextState)    这个方法是 render() 执行之前的最后一个方法。你已经拥有下一个属性和状态，它们可以在这个方法中任由你处置。你可以利用这个方法在渲染之前进行最后的准备。注意在这个生命周期方法中你不能再触发 setState() 。如果你想基于新的属性计算状态，你必须利用componentWillReceiveProps() 。
    	• render()
    	• componentDidUpdate(prevProps, prevState)   这个方法在 render() 之后立即调用。你可以用它当成操作 DOM 或者执行更多异步请求的机会。

    组件卸载时，只有一个生命周期方法：
    
    	• componentWillUnmount()   它会在组件销毁之前被调用。你可以利用这个生命周期方法去执行任何清理任务。
	
* React 允许组件通过返回 null 来不渲染任何东西。
    
    ```
	render() {
		const { searchTerm, result } = this.state;
		if (!result) { return null; }
	}
    ```
* 在 React 中，你会经常遇到用 event.preventDefault(); 事件方法来阻止类似于提交form表单，浏览器重新加载的原生行为。

* React 可以用PropTypes来进行组件类型检查。

	```
	npm install prop-types
	import PropTypes from 'prop-types';

	Button.propTypes = {
		onClick: PropTypes.func.isRequired,
		className: PropTypes.string,
		children: PropTypes.node.isRequired,
	};
	```
* React中可以通过 ref 属性引用 DOM 节点。获得原生DOM对象。官方文档提到了三种情况，引用 DOM 元素：

	• 使用 DOM API（focus 事件，媒体播放等）<br>
	• 调用命令式 DOM 节点动画<br>
	• 与需要 DOM 节点的第三方库集成（例如 D3.JavaScript¹¹⁵）

	```
	// 通过ref将audio对象赋予给state.audio
	<audio
		src={musicSrc}
		preload={"auto"}
		ref={node => (this.state.audio = node)}
	></audio>
	```

*  setState() 方法不仅可以接收对象。在它的第二种形式中，你还可以传入一个函数来
更新状态信息。来阻止脏状态的 bug。

    ```
    this.setState((prevState, props) => {
    
    });
    	
    ```

> 使用函数作为参数而不是对象，有一个非常重要的应用场
景，就是当更新状态需要取决于之前的状态或者属性的时候。如果不使用函数参数的形式，
组件的内部状态管理可能会引起 bug。因为 React 的 setState() 方法是异步的。在你调用 setState() 方法的时候
在其他地方被异步地改变了。这样会产生脏状态信息造成的 bug。

## 打包部署到github pages上

* 在packjson.json 文件中添加配置：

 	"homepage": "https://lxiaoixi.github.io/react-learning/",

	https://lxiaoixi.github.io/react-learning/  即为你在github上项目的地址

	若为本地，则 './'

	github pages 设置参考：
	https://blog.csdn.net/dreamconan/article/details/79155975


* npm install --save-dev gh-pages

* 在package.json中添加如下脚本：
	```
	 "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
	```
* 执行 npm run deploy	后会自动将build文件夹的代码push到gh-pages分支上
* 访问 https://lxiaoixi.github.io/react-learning/index.html

## 采坑

* 如下 我们在①处修改组件的searchTerm属性值，但在②处通过this.state.searchTerm 获取的searchTerm 值仍为改变前的值，故仍需要使用③中的做法。
	即使setState号称“同步更新”this.state，实际上还是不能立即更新，因为setState引发的生命周期函数shouldComponentUpdate和componentWillUpdate里，this.state还没有改变。

    ```
	onSearchChange(event){
		this.setState({ searchTerm:event.target.value })  ①
		this.fetchSearchTopStories(this.state.searchTerm)  ②
		this.fetchSearchTopStories(event.target.value)  ③
	}
    ```
## 扩展

* react 音频播放插件 https://github.com/lijinke666/react-music-player/blob/master/CN.md
* 音视频倍速播放实现 https://www.zhangxinxu.com/wordpress/2018/07/html5-video-double-speed-play/
* 自己用react和ant实现音频播放组件  player.js
* h5 audio介绍 http://www.w3school.com.cn/html5/av_prop_volume.asp
