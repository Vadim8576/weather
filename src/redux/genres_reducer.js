import { genres_api } from '../api/genres_api';




const FETCHING_GENRES = 'FETCHING_GENRES';
const TOGGLE_CLASS = 'TOGGLE_CLASS';
const SET_REQUEST_DATA= 'SET_REQUEST_DATA';
const SET_REQUEST_DATA_GENRE_IDS= 'SET_REQUEST_DATA_GENRE_IDS';




let initialState = {
    genres: [],
    request: {
        sort_by: '',
        release_date_gte: '',
        release_date_lte: '',
        genres_ids: []
    }
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
                }
            };
            
        }

        case SET_REQUEST_DATA_GENRE_IDS: {
            console.log(action.payload);
            return {
                ...state,
                request:  {
                    ...state.request,
                    ...state.request.genres_ids, ...action.payload
                }
            };
            
        }
            
        case TOGGLE_CLASS:
            return {
                ...state,
                genres: state.genres.map((genres_class) => {
                    if (genres_class.id === action.payload) {
                        genres_class.isActive = !genres_class.isActive;
                        // console.log('todo', todo);
                    }
                    return genres_class;
                })
            }
        default:
            return state;
    }
}





const genresFetching = (payload) => ({ type: FETCHING_GENRES, payload });
const setRequestDataAC = (payload) => ({ type: SET_REQUEST_DATA, payload });
const setRequestDataGenreIdsAC = (payload) => ({ type: SET_REQUEST_DATA_GENRE_IDS, payload });
const ToggleClassAC = (id) => ({ type: 'TOGGLE_CLASS', payload: id });



export const setRequestData = (payload) => (dispatch) => {
    dispatch(setRequestDataAC(payload));
}

export const setRequestDataGenreIds = (payload) => (dispatch) => {
    dispatch(setRequestDataGenreIdsAC(payload));
}


export const ToggleClass = (id) => (dispatch) => {
    dispatch(ToggleClassAC(id));
}


export const getGenres = () => (dispatch) => {

    genres_api.getGenres()
        .then(response => {

            console.log('genres ', response.genres);

            dispatch(genresFetching(response.genres));
        })
}





export default genres_reducer;