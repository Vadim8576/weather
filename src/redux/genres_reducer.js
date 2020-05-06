import { genres_api } from '../api/genres_api';
import { updateObjectInArray } from './../utils/genres_reducer_helper';




const FETCHING_GENRES = 'FETCHING_GENRES';
const SET_REQUEST_DATA= 'SET_REQUEST_DATA';
const SET_REQUEST_DATA_GENRE_IDS= 'SET_REQUEST_DATA_GENRE_IDS';




let initialState = {
    genres: [],
    request: {
        sort_by: 'popularity.asc',
        release_date_gte: '',
        release_date_lte: '',
        genres_ids: []
    },
    request_btn_is_visible: false
};



const genres_reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_GENRES:
            return {
                ...state,
                genres: action.payload,
                
            };

        case SET_REQUEST_DATA: {
            return {
                ...state,
                request: {
                    ...state.request,
                    ...action.payload
                },
                request_btn_is_visible: true
            };
            
        }

        case SET_REQUEST_DATA_GENRE_IDS: 
            return {
                ...state,
                request: {
                    ...state.request,
                    genres_ids: updateObjectInArray(state.request.genres_ids, action.payload)
                },
                request_btn_is_visible: true
            };
            
        default:
            return state;
    }
}





const genresFetching = (payload) => ({ type: FETCHING_GENRES, payload });
const setRequestDataAC = (payload) => ({ type: SET_REQUEST_DATA, payload });
const setRequestDataGenreIdsAC = (payload) => ({ type: SET_REQUEST_DATA_GENRE_IDS, payload });


export const setRequestData = (payload) => (dispatch) => {
    dispatch(setRequestDataAC(payload));
}

export const setRequestDataGenreIds = (payload) => (dispatch) => {
    dispatch(setRequestDataGenreIdsAC(payload));
}

export const getGenres = () => (dispatch) => {
    genres_api.getGenres()
        .then(response => {

            console.log('genres ', response.genres);

            dispatch(genresFetching(response.genres));
        })
}





export default genres_reducer;