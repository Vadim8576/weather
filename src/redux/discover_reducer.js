import { discover_api } from '../api/discover_api';
import {setTotalPages, setCurrentPage} from './pagination_reducer';





const FETCHING_DISCOVER_MOVIES = 'FETCHING_DISCOVER_MOVIES';





let initialState = {
    discover_movies: [],
    discover_movies_is_fetching: false
};



const discover_reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_DISCOVER_MOVIES:
            return {
                ...state,
                discover_movies: action.payload,
                discover_movies_is_fetching: true
            };

     
        default:
            return state;
    }
}





const genresFetching = (payload) => ({ type: FETCHING_DISCOVER_MOVIES, payload });



export const getDiscoverMovies = (request) => (dispatch) => {
    discover_api.discover_movies(request)
        .then(response => {

            console.log('discover_movies ', response);


            const payload = {
                total_results: response.total_results,
                total_pages: response.total_pages
            }
    
            dispatch(setTotalPages(payload));
            dispatch(setCurrentPage(1));

            dispatch(genresFetching(response.results));
        })
}




export default discover_reducer;