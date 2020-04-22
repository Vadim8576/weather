import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './../redux/reducer';


let redusers = combineReducers({
    auth: reducer
});


let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;