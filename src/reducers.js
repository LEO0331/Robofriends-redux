import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants.js';

const initialState = {
	searchField: ''
}

const initialStateRobo = {
	isPending: false,
	robots: [],
	err: ''
}

export const searchRobots = (state = initialState, action = {}) => {
	switch(action.type){//USE SWITCH
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {searchField: action.payload});//update searchField property
			// return {...state, {searchField: action.payload}};
		default:
			return state;
	}
}

export const requestRobots = (state = initialStateRobo, action = {}) => {
	switch(action.type){
		case REQUEST_ROBOTS_PENDING:
			return Object.assign({}, state, {isPending: true})
		case REQUEST_ROBOTS_SUCCESS:
			return Object.assign({}, state, {robots: action.payload, isPending: false})
		case REQUEST_ROBOTS_FAILED:
			return Object.assign({}, state, {err: action.payload, isPending: false})
		default:
			return state;
	}
}