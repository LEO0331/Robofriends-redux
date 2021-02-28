import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants.js';

export const setSearchField = (text) => ({//return an object
	type: CHANGE_SEARCH_FIELD,//capitalize the constant
	payload: text //what data to the reducer, user enter
})//actions are object

export const requestRobots = () => (dispatch) => {//return a function to trigger reduxthunk
	dispatch({type: REQUEST_ROBOTS_PENDING});
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
	.catch(err => dispatch({type: REQUEST_ROBOTS_FAILED, payload: err}))
}