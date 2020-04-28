import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth_reducer from './auth_reducer';
import movie_reducer from './movie_reducer';
import people_reducer from './people_reducer';
import search_reducer from './search_reducer';


let redusers = combineReducers({
    auth: auth_reducer,
    movies: movie_reducer,
    people: people_reducer,
    found_movies: search_reducer
});


let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;