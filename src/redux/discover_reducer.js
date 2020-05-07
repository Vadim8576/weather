import { discover_api } from '../api/discover_api';
import {setTotalPages, setCurrentPage} from './pagination_reducer';
import { updateObjectInArray } from './../utils/genres_reducer_helper';




const FETCHING_DISCOVER_MOVIES = 'FETCHING_DISCOVER_MOVIES';
const SET_REQUEST_DATA= 'SET_REQUEST_DATA';
const SET_REQUEST_DATA_GENRE_IDS = 'SET_REQUEST_DATA_GENRE_IDS';
const DISCOVER_MOVIES_IS_FETCHING = 'DISCOVER_MOVIES_IS_FETCHING';




let initialState = {
    discover_movies: [],
    discover_movies_is_fetching: false,
    request: {
        sort_by: 'popularity.desc',
        release_date_gte: '',
        release_date_lte: '',
        genres_ids: [],
        btn_is_visible: false
    }
    
};



const discover_reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_DISCOVER_MOVIES:
            return {
                ...state,
                discover_movies: action.payload
            };

        case DISCOVER_MOVIES_IS_FETCHING:
            return {
                ...state,
                discover_movies_is_fetching: action.payload
            };


            case SET_REQUEST_DATA: {
                return {
                    ...state,
                    request: {
                        ...state.request,
                        ...action.payload
                    }
                    
                };
                
            }
    
            case SET_REQUEST_DATA_GENRE_IDS: 
                return {
                    ...state,
                    request: {
                        ...state.request,
                        genres_ids: updateObjectInArray(state.request.genres_ids, action.payload),
                        btn_is_visible: action.btn_is_visible
                    }
                };
     
        default:
            return state;
    }
}





const genresFetching = (payload) => ({ type: FETCHING_DISCOVER_MOVIES, payload });
const discoverMoviesIsFetchingAC = (payload) => ({ type: DISCOVER_MOVIES_IS_FETCHING, payload });
const setRequestDataAC = (payload) => ({ type: SET_REQUEST_DATA, payload });
const setRequestDataGenreIdsAC = (payload, btn_is_visible) => ({ type: SET_REQUEST_DATA_GENRE_IDS, payload, btn_is_visible });


export const discoverMoviesIsFetching = (payload) => (dispatch) => {
    dispatch(discoverMoviesIsFetchingAC(payload));
}

export const setRequestData = (payload) => (dispatch) => {
    dispatch(setRequestDataAC(payload));
}

export const setRequestDataGenreIds = (payload, btn_is_visible) => (dispatch) => {
    dispatch(setRequestDataGenreIdsAC(payload, btn_is_visible));
}

export const getDiscoverMovies = (request, currentPage=1) => (dispatch) => {
    discover_api.discover_movies(request, currentPage)
        .then(response => {

            console.log('discover_movies ', response);
            const payload = {
                total_results: response.total_results,
                total_pages: response.total_pages
            }
    
            dispatch(setTotalPages(payload));
            
            dispatch(discoverMoviesIsFetchingAC(true));

            dispatch(genresFetching(response.results));
        })
}




export default discover_reducer;