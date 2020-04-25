import { movie_api } from '../api/movie_api';

const FETCHING_POPULAR_MOVIES = 'FETCHING_POPULAR_MOVIES';
const MOVIE_DETAILS_IS_FETCHING = 'MOVIE_DETAILS_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const FETCHING_MOVIE_DETAILES = 'FETCHING_MOVIE_DETAILES';
const FETCHING_CREDITS = 'FETCHING_CREDITS';



let initialState = {
    popular_movies: [],
    popular_movies_isFetching: false,
    total_results: 0,
    total_pages: 0,
    current_page: 1,
    movie_details: {},
    movie_details_isFetching: false,
    credits: []
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
                total_pages: action.payload.total_pages,
                popular_movies_isFetching: true
            };

        // case MOVIES_IS_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: true
        //     };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                current_page: action.payload
            };


        case FETCHING_MOVIE_DETAILES:
            return {
                ...state,
                movie_details: action.payload
            };

        case FETCHING_CREDITS:
            return {
                ...state,
                credits: action.payload
            };


        case MOVIE_DETAILS_IS_FETCHING:
            return {
                ...state,
                movie_details_isFetching: true
            };
        default:
        return state;
    }
}




const fetchingPopularMoviesAC = (payload) => ( {type: FETCHING_POPULAR_MOVIES, payload} );
// const moviesIsFetching = () => ( {type: MOVIES_IS_FETCHING} );
const setCurrentPageAC = (payload) => ( {type: SET_CURRENT_PAGE, payload} );
const fetchingMovieDetailes = (payload) => ( {type: FETCHING_MOVIE_DETAILES, payload} );
const getCreditsAC = (payload) => ( {type: FETCHING_CREDITS, payload} );
const movie_details_isFetching = () => ( {type: MOVIE_DETAILS_IS_FETCHING} );




export const fetchingPopularMovies = () => (dispatch) => {

    movie_api.getPopularMovies(1)
        .then(response => {

            console.log('movie ', response);

            const payload = {
                popular_movies: response.results,
                total_results: response.total_results,
                total_pages: response.total_pages
            }
            dispatch(fetchingPopularMoviesAC(payload));
            // dispatch(moviesIsFetching());
        })
}



export const setCurrentPage = (current_page) => (dispatch) => {

    movie_api.getPopularMovies(current_page)
        .then(response => {

            console.log('movie ', response);

            const payload = {
                popular_movies: response.results,
                total_results: response.total_results,
                total_pages: response.total_pages
            }
            dispatch(fetchingPopularMoviesAC(payload));
            // dispatch(moviesIsFetching());
            dispatch(setCurrentPageAC(current_page));
        })
}


export const getDetails = (movie_id) => async (dispatch) => {

    await movie_api.getDetails(movie_id)
        .then(response => {
            console.log('movie details', response);      
            dispatch(fetchingMovieDetailes(response));
        })

      await dispatch(getCredits(movie_id));

        dispatch(movie_details_isFetching());
}

export const getCredits = (movie_id) => (dispatch) => {

    movie_api.getCredits(movie_id)
        .then(response => {

            console.log('Credits', response);     

            dispatch(getCreditsAC(response));

        })
}





export default movie_reducer;