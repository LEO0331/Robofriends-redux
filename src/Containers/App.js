import React, {Component} from 'react';
import Cardlist from '../Components/Cardlist';//first dot: leave the current folder, second dot: enter the folder
//import {robots} from './robots'; fetch robot data ONLINE
import SearchBar from '../Components/SearchBar';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import {setSearchField, requestRobots} from '../actions';
import {connect} from 'react-redux';
//state: Object, discribe application, able to change VS props: things come out of state 
//className attribute: 指定一個 CSS class
/*
	const state = {
		robots: robots, //from robots.js
		searchField: ''
	}
	constructor(){
		super() //represent element in React.Component
		this.state = state;//state is self-build
	}
	OR No definition of const state -->
	constructor(props){//inbuild method in React.Component, NO need to use () => {}
		super(props);
		this.state = {
			robots: props.robots,
		};
	}

	searchChange(event){//in class, must be method, no need "function" name(){}
		console.log(event);//the value of the search
	}
	
	searchChange(event){
		console.log(event.target.value);//return the value of the search u type/term
	}
	ALWAYS use searchChange = event => {} to create method so that 'this' will always refer to the App.js not the Callback function in the child e.g. SearchBar.js
	searchChange = (event) => {
		const filterRobots = this.state.robots.filter((robot) => {//find elements in robots.js
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase();) //return robot name that match to the searchfield
		});
	}
	setState(): inbuild function to set the value of state(property in constructor)
*/
/*HOOK: convert Class into functional Component
import {useSTATE, useEffect} from 'react';

function App() {
	//name, change, initial value
	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')
	const [count, setCount] = useState(0)

	useEffect(() => {//if no second param, looping
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json()) 
			.then(user => setRobots(user));
	},[])
	//second param: only run when things(e.g. searchfield) change --> [searchfield]; []: shortcut for componentDidMount()
	//[count]: counter, only run if count changes
	const searchChange = (event) => {
		setSearchfield(event.target.value);
	}
	
	//const setCount = () => {setCount(count+1);}
	
	const filterRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		if(!robots.length){
			return <h1 className='f2 tc'>Loading</h1>
		} else{
			return (
			<div className='tc'>
				<h1 className='f2'>RobotsFriends</h1>
				<button onClick={() => setCount(count+1)}>CLICK!!!</button>
				<SearchBar searchChange={searchChange}/>
				<Scroll>
					<ErrorBoundry>
						<Cardlist robots={filterRobots}/> 
					</ErrorBoundry>
				</Scroll>
			</div>
			);
		}
	}
}
export default App;
}
*/
/*STATE MANAGEMENT with REDUX

*/
const mapStateToProps = (state) => {//what state need to listen to
	return{//if write js without semicolons--> ERROR: expected assignment or function call: no-unused-expressions ReactJS
		//searchField: state.searchField
		searchField: state.searchRobots.searchField,
    	robots: state.requestRobots.robots,
    	isPending: state.requestRobots.isPending,
    	err: state.requestRobots.err
	}
}

const mapDispatchToProps = (dispatch) => {//what state need to get actions to dispatch
	return {//object, in the same line return{
		searchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())//dispatch function
	}
}

class App extends Component{//Classes Are Functions:https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript
	
	componentDidMount(){
    	this.props.onRequestRobots();
  	}
  	/*
	constructor(){//不要在constructor()中呼叫setState()
		super();
		this.state = {//Constructor是唯一一個直接指定this.state的地方。在所有其他的方法中，則需要使用this.setState()
			robots: []
			//searchfield: ''
		}
	}
	//https://zh-hant.reactjs.org/docs/react-component.html; 和瀏覽器互動
	componentDidMount(){//set up any subscriptions; unsubscribe in componentWillUnmount()
		fetch('https://jsonplaceholder.typicode.com/users')//{JSON} Placeholder: fake API for testing
			.then(response => response.json())//http request, get response, then transform the response to json
			.then(user => this.setState({robots: user}));//trigger an extra rendering before the browser updates the screen: cons -> rend -> comp -> rend
	}
	
	//不能在render裡面使用setState，不在render()中修改state或是和瀏覽器互動
	searchChange = (event) => {//self defined method
		this.setState({searchfield: event.target.value});//update searchfield when we type
	}
	*/
	//render() function是pure的，它並不會改變component的state，每次呼叫時都會回傳同樣的結果，並不會直接和瀏覽器有所互動。
	render(){//inbuild method in React.Component
		//const {robots, searchfield} = this.state;
		const {robots, searchField, searchChange, isPending} = this.props;
		const filterRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return (
			<div className='tc'>
				<h1 className='f2'>RobotsFriends</h1>
				<SearchBar searchChange={searchChange} />
				<Scroll>
					{isPending ? <h1 className='f2 tc'>Loading</h1> :
						<ErrorBoundry>
							<Cardlist robots={filterRobots} /> 
						</ErrorBoundry>
					}
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);//higher order function: return another function
/*
const App = () => {
	return (
		<div classname='tc'>
			<h1>RobotsFriends</h1>
			<SearchBar />
			<Cardlist robots={robots}/> robots: properties
				2. <SearchBar searchChange={this.searchChange}/>
				2. <Cardlist robots={this.state.robots}/> 
		</div>
	);
}
!robots.length ?
	<h1 className='f2 tc'>Loading</h1> :
	(THINGS TO BE RETURNED)
*/
