import { movie_api } from '../api/movie_api';

const FETCHING_POPULAR_MOVIES = 'FETCHING_POPULAR_MOVIES';
const MOVIES_IS_FETCHING = 'MOVIES_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const LOAD_MOVIE_DETAILES = 'LOAD_MOVIE_DETAILES';



let initialState = {
    popular_movies: [],
    total_results: 0,
    total_pages: 0,
    current_page: 1,
    isFetching: false,
    movie_details: {}
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
                popular_movies: action.payload.popular_movies,
                total_results: action.payload.total_results,
                total_pages: action.payload.total_pages
            };

        case MOVIES_IS_FETCHING:
            return {
                ...state,
                isFetching: true
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                current_page: action.payload
            };


        case LOAD_MOVIE_DETAILES:
            return {
                ...state,
                movie_details: action.payload
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
const setCurrentPageAC = (payload) => ( {type: SET_CURRENT_PAGE, payload} );
const loadMovieDetailes = (payload) => ( {type: LOAD_MOVIE_DETAILES, payload} );



export const fetchingPopularMovies = () => (dispatch) => {

    return movie_api.getPopularMovies(1)
        .then(response => {

            console.log('movie ', response);

            const payload = {
                popular_movies: response.results,
                total_results: response.total_results,
                total_pages: response.total_pages
            }
            dispatch(fetchingPopularMoviesAC(payload));
            dispatch(moviesIsFetching());
        })
}



export const setCurrentPage = (current_page) => (dispatch) => {

    return movie_api.getPopularMovies(current_page)
        .then(response => {

            console.log('movie ', response);

            const payload = {
                popular_movies: response.results,
                total_results: response.total_results,
                total_pages: response.total_pages
            }
            dispatch(fetchingPopularMoviesAC(payload));
            dispatch(moviesIsFetching());
            dispatch(setCurrentPageAC(current_page));
        })
}


export const getDetails = (movie_id) => (dispatch) => {

    return movie_api.getDetails(movie_id)
        .then(response => {

            console.log('movie details', response);

           
            dispatch(loadMovieDetailes(response));

            // dispatch(moviesIsFetching());
            // dispatch(setCurrentPageAC(current_page));
        })
}


export default movie_reducer;