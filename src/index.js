import React from 'react';
import ReactDOM from 'react-dom';//react-dom in node_modules
import './index.css'; //./ --> in the same directory
//import Card from './Card';
import App from './Containers/App';//father of all child nodes; same layer, no need to leave, just enter the folder
//import Cardlist from './Cardlist';
import 'tachyons';//new package
import {robots} from './robots';//more than one export: {}
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';//redux: ACTION-->(middleware)-->REDUCER->STORE->MAKE CHANGES
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {requestRobots, searchRobots} from './reducers'
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';//async

const logger = createLogger()//middleware
const rootReducers = combineReducers({requestRobots, searchRobots})
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger)) //combine all the reducer: createStore(rootReducer)

ReactDOM.render(//use reducer to create the store
	<Provider store={store}>
		<App />
	</Provider>,
 	document.getElementById('root')
);
/*
ReactDOM.render(
	<App />,
 	document.getElementById('root')
);
*/

reportWebVitals();
