import { genres_api } from '../api/genres_api';


const FETCHING_GENRES = 'FETCHING_GENRES';


let initialState = {
    genres: []
};


const genres_reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_GENRES:
            return {
                ...state,
                genres: action.payload, 
            };
            
        default:
            return state;
    }
}





const genresFetching = (payload) => ({ type: FETCHING_GENRES, payload });


export const getGenres = () => (dispatch) => {
    genres_api.getGenres()
        .then(response => {

            // console.log('genres ', response.genres);

            dispatch(genresFetching(response.genres));
        })
}




export default genres_reducer;