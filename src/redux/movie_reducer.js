import { movie_api } from '../api/movie_api';

const FETCHING_POPULAR_MOVIES = 'FETCHING_POPULAR_MOVIES';
const MOVIES_IS_FETCHING = 'MOVIES_IS_FETCHING';


let initialState = {
    popular_movies: [],
    isFetching: false
};

/*
state = {
    popular_movie: [1,2,3,4]
}
*/

const movie_reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCHING_POPULAR_MOVIES:
            return {
                ...state,
                popular_movies: action.payload
            };

        case MOVIES_IS_FETCHING:
            return {
                ...state,
                isFetching: true
            };

        // case FETCHING_POPULAR_MOVIES:
        //     return {
        //         ...state,
        //         popular_movies: [
        //             ...state.popular_movies, ...action.payload
        //         ] 
        //     };
        default:
        return state;
    }
}




const fetchingPopularMoviesAC = (payload) => ( {type: FETCHING_POPULAR_MOVIES, payload} );
const moviesIsFetching = () => ( {type: MOVIES_IS_FETCHING} );

export const fetchingPopularMovies = () => (dispatch) => {

    return movie_api.getPopularMovies()
        .then(response => {
            console.log('movie ', response);
            dispatch(fetchingPopularMoviesAC(response.results));
            dispatch(moviesIsFetching());
        })
}


export default movie_reducer;