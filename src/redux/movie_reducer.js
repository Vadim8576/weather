import { movie_api } from '../api/movie_api';
import { config_api } from '../api/config_api';

import {setTotalPages, setCurrentPage} from './pagination_reducer';

import {getRatedMovies} from './account_reducer';


const FETCHING_POPULAR_MOVIES = 'FETCHING_POPULAR_MOVIES';
const MOVIE_INFO_IS_FETCHING = 'MOVIE_INFO_IS_FETCHING';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const FETCHING_MOVIE_DETAILES = 'FETCHING_MOVIE_DETAILES';
const FETCHING_CREDITS = 'FETCHING_CREDITS';
const FETCHING_RELEASES = 'FETCHING_RELEASES';
const FETCHING_GENRE = 'FETCHING_GENRE';
const SET_YOUR_RATE = 'SET_YOUR_RATE';



let initialState = {
    popular_movies: [],
    popular_movies_isFetching: false,
    total_results: 0,
    total_pages: 0,
    current_page: 1,
    movie_info: {},
    movie_info: false,
    credits: [],
    credits_isFetching: false,
    releases: [],
    releases_isFetching: false,
    genre: [],
    your_rate: null
};



const movie_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_YOUR_RATE:
            return {
                ...state,
                your_rate: action.payload
            };

        case FETCHING_GENRE:
            return {
                ...state,
                genre: action.payload
            };

        case FETCHING_POPULAR_MOVIES:
            return {
                ...state,
                popular_movies: action.payload.popular_movies,
                popular_movies_isFetching: true
            };

        // case MOVIES_IS_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: true
        //     };

        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         current_page: action.payload
        //     };


        case FETCHING_MOVIE_DETAILES:
            return {
                ...state,
                movie_info: action.payload
            };

        case FETCHING_CREDITS:
            return {
                ...state,
                credits: action.payload,
                credits_isFetching: true
            };

        case FETCHING_RELEASES:
            return {
                ...state,
                releases: action.payload,
                releases_isFetching: true
            };


        case MOVIE_INFO_IS_FETCHING:
            return {
                ...state,
                movie_info_isFetching: true
            };
        default:
            return state;
    }
}




const fetchingPopularMoviesAC = (payload) => ({ type: FETCHING_POPULAR_MOVIES, payload });
// const moviesIsFetching = () => ( {type: MOVIES_IS_FETCHING} );
// const setCurrentPageAC = (payload) => ({ type: SET_CURRENT_PAGE, payload });
const fetchingMovieDetailes = (payload) => ({ type: FETCHING_MOVIE_DETAILES, payload });
const genreFetching = (payload) => ({ type: FETCHING_GENRE, payload });
const setCreditsAC = (payload) => ({ type: FETCHING_CREDITS, payload });
const setReleasesAC = (payload) => ({ type: FETCHING_RELEASES, payload });
const setYourRate = (payload) => ({ type: SET_YOUR_RATE, payload });
const movie_info_isFetching = () => ({ type: MOVIE_INFO_IS_FETCHING });



export const getGenres = () => (dispatch) => {

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





export const fetchingPopularMovies = (current_page) => (dispatch) => {

    movie_api.getPopularMovies(current_page)
        .then(response => {

            console.log('movie ', response);
            

            const payload = {
                total_results: response.total_results,
                total_pages: response.total_pages
            }

            // dispatch(setCurrentPage(current_page));
            dispatch(setTotalPages(payload));

            payload.popular_movies = response.results;
           
            dispatch(fetchingPopularMoviesAC(payload));

        })
}



// export const setCurrentPage = (current_page) => (dispatch) => {

//     movie_api.getPopularMovies(current_page)
//         .then(response => {

//             console.log('movie ', response);

//             const payload = {
//                 popular_movies: response.results,
//                 total_results: response.total_results,
//                 total_pages: response.total_pages
//             }
//             dispatch(fetchingPopularMoviesAC(payload));
//         })
// }


export const getDetails = (movie_id) => async (dispatch) => {

    await movie_api.getDetails(movie_id)
        .then(response => {
            console.log('movie details', response);
            console.log('video', response.videos.results);
            dispatch(fetchingMovieDetailes(response));
            dispatch(movie_info_isFetching());

        })
}


export const rateMovie = (request_body) => async (dispatch) => {

    // request_body = {id, session_id, rate}

    await movie_api.rateMovie(request_body)
        .then(response => {
            console.log('rating', response);
            // console.log('rating=', request_body.rate);
           
            // let payload = {
            //     session_id: request_body.session_id,
            //     id: request_body.id
            // };
            // console.log('!!!!1=', payload);
            
            dispatch(setYourRate(request_body.rate));
            
        })
}

export const rateMovieDelete = (request_body) => async (dispatch) => {

    await movie_api.rateMovieDelete(request_body)
        .then(response => {
            console.log('rating delete', response);       
            dispatch(setYourRate(null));  

            // dispatch(getRatedMovies(null));    
        })
}



export const getCredits = (movie_id) => (dispatch) => {

    movie_api.getCredits(movie_id)
        .then(response => {

            console.log('Credits', response);

            dispatch(setCreditsAC(response));

        })
}


export const getAccountStates = (payload) => (dispatch) => {

    movie_api.getAccountStates(payload)
        .then(response => {

            console.log('AccountStates', response);
            // console.log('AccountStates.rate=', response.rated.value);

            dispatch(setYourRate(response.rated.value));

        })
}



export const getReleases = (movie_id) => async (dispatch) => {

    let releases = await movie_api.getReleases(movie_id);

    console.log('Releases', releases.results);


    let countries = await config_api.getCountries();


    let payload = {};


    countries.map(i => {
        payload[i.iso_3166_1] = i.english_name;
        return payload;
    })

    if (countries.length>0 && releases.results) {
        releases.results.map(i => {
            i.iso_3166_1 = payload[i.iso_3166_1]
        })
    }



    console.log('releases', releases);

    dispatch(setReleasesAC(releases.results));


}





export default movie_reducer;